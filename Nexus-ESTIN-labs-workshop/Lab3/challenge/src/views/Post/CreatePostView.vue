<template>
    <PathNotFoundView v-if="!userState || !isAdmin" />
    <div v-else>
        <NavBarView />
        <section class="create-post">
            <div class="post-publish-header">
                <input type="text" placeholder="Enter Blog Title" v-model="blogTitle" class="blog-title">
                <label class="btn upload" for="file">Upload Cover Photo
                    <span>Note: it's preferable to upload wider images have width more than hight!</span>
                </label>
                <button ref="preview" @click="photoShow" class="btn preview file-input disabled">Preview Photo</button>
                <input @change="checkFile" id="file" type="file" accept=".png, .jpg, .jpeg" ref="fileInput">
                <span ref="fileInputName" class="file-name">{{ blogCoverPhoto }}</span>
            </div>
            <div class="blog-editor">
                <Editor class="text-area" placeholder="Write your blog title here..." v-model="blogHTML" :init="{
                plugins: 'codesample print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen link media template codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount textpattern noneditable help charmap quickbars emoticons',
                toolbar: 'codesample undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft alignjustify | outdent indent |  numlist bullist | forecolor backcolor | charmap emoticons | fullscreen  preview | insertfile link codesample | ltr rtl',
                toolbar_sticky: true
                }" />
            </div>
            <div class="blog-tags">
                <textarea class="tags-area" @keyup="setTags"
                    placeholder="Enter at least one tag for your post! don't add the '#' mark, just spaces between tags!"
                    v-model="blogTagsText"></textarea>
            </div>
            <div class="option-buttons">
                <button class="btn" @click="publishPost">PUBLISH POST</button>
                <a class="btn" @click="reviewPost">POST REVIEW</a>
            </div>
        </section>
        <FooterView />
        <LoadingView v-if="loading" />
        <ModalView :modalConfirm="false" :modalPhoto="true" :modalMessage="errorMessage" :modalCase="error"
            @close-modal="closeModal" />
        <ModalView :modalConfirm="false" :modalPhoto="false" :modalMessage="errorMessage2" :modalCase="error2"
            @close-modal="closeModal" />
        <ModalView :modalConfirm="true" :modalPhoto="false" :modalMessage="errorMessage3" :modalCase="error3"
            @close-modal="closeModal" @confirm-modal="confirmModal" />
    </div>
</template>

<script>
    import {
        auth,
        blogsRef,
        storage,
        db
    } from '../../firebase/index.js';
    import {
        setDoc,
        doc,
        serverTimestamp,
        updateDoc
    } from 'firebase/firestore';
    import {
        getDownloadURL,
        ref,
        uploadBytes
    } from 'firebase/storage';
    import PathNotFoundView from '../Error/PathNotFoundView.vue';
    import NavBarView from '../../components/Main/NavBarView.vue';
    import FooterView from '../../components/Main/FooterView.vue';
    import LoadingView from '../../components/PopUps/LoadingView.vue';
    import ModalView from '../../components/PopUps/ModalView.vue';
    import {
        mapState
    } from 'vuex';
    import Editor from '@tinymce/tinymce-vue'
    export default {
        name: "CreatePostView",
        components: {
            PathNotFoundView,
            NavBarView,
            Editor,
            FooterView,
            LoadingView,
            ModalView
        },
        data() {
            return {
                file: null,
                error: false,
                errorMessage: '',
                error2: false,
                errorMessage2: '',
                error3: false,
                errorMessage3: '',
                loading: false,
                inputFileName: null,
                blogTagsText: '',
                userNotifications: [],
                blogsWithSameFileName: []
            }
        },
        async mounted() {
            this.userNotifications = await this.notifications.slice();
            this.blogTagsText = this.blogTags.join(' ').replaceAll('#', '');
            this.file = this.theFile;
            if (!this.blogCoverPhoto || !this.blogCoverFileURL) {
                this.$refs.fileInputName.textContent = 'No file chosen';
                this.$refs.preview.classList.add("file-input", "disabled");
            } else {
                this.$refs.fileInputName.textContent = this.blogCoverPhoto;
                this.$refs.preview.classList.remove("file-input", "disabled");
            }
        },
        methods: {
            setTags(e) {
                if (e.key == '#') {
                    this.error2 = true;
                    this.errorMessage2 = "Tags don't need a '#' sign, write you tags directly";
                    this.blogTagsText = this.blogTagsText.replaceAll('#', '');
                    return;
                } else if (e.key == '-') {
                    this.error2 = true;
                    this.errorMessage2 = "Tags don't accept a '-' sign, only '_' are accepted";
                    this.blogTagsText = this.blogTagsText.replaceAll('-', '');
                    return;
                };
                this.$store.commit("editBlogTags", this.blogTagsText.toLowerCase().split(' ').map((elem) => {
                    return `#${elem}`
                }).filter((elem) => {
                    return ((elem != '#') && (elem != '#All'))
                }));
            },
            closeModal() {
                this.error = false;
                this.errorMessage = '';
                this.error2 = false;
                this.errorMessage2 = '';
                this.error3 = false;
                this.errorMessage3 = '';
            },
            checkFile() {
                this.$refs.preview.classList.remove("file-input", "disabled");
                this.file = this.$refs.fileInput.files[0];
                const fileName = this.file.name;
                this.$store.commit("editFile", this.file);
                this.$store.commit("editFileName", fileName);
                this.$store.commit("editFileURL", URL.createObjectURL(this.file));
            },
            photoShow() {
                this.error = true;
            },
            reviewPost() {
                if ((this.blogCoverPhoto) && (this.blogTitle) && (this.blogHTML) && (this.blogTagsText)) {
                    this.$router.push({
                        name: 'post-review'
                    });
                    window.scrollTo(0, 0);
                } else {
                    this.error2 = true;
                    this.errorMessage2 =
                        "Can't Preview your post, Please ensure Blog Cover Image, Title Tags and Post has been filled!";
                }
            },
            publishPost() {
                this.error3 = true;
                this.errorMessage3 = "Are you sure you want to post this blog?";
            },
            async confirmModal() {
                this.error3 = false;
                this.errorMessage3 = "";
                if ((this.blogCoverPhoto) && (this.blogTitle) && (this.blogHTML) && (this.blogTagsText)) {
                    this.loading = true;
                    const storageRef = ref(storage, `document/BlogCards/${this.blogCoverPhoto}`);
                    await uploadBytes(storageRef, this.file)
                        .catch((err) => {
                            this.error2 = true;
                            this.errorMessage2 = err.message.slice(9, -1);
                        });
                    const photoURL = await getDownloadURL(storageRef);
                    const blogID = doc(blogsRef).id;
                    const newBlogRef = doc(blogsRef, blogID);
                    this.blogsWithSameFileName = this.blogPosts.slice().filter((post) => {
                        return post.blogCoverPhoto == this.blogCoverPhoto
                    })
                    for (let i = 0; i < this.blogsWithSameFileName.length; i++) {
                        const docRef = doc(db, 'blogs', this.blogsWithSameFileName[i].blogID);
                        await updateDoc(docRef, {
                            blogCoverPhoto: this.blogCoverPhoto,
                            blogCoverFileURL: photoURL
                        })
                    }
                    const docRef = doc(db, 'users', auth.currentUser.uid);
                    this.userNotifications.unshift({
                        userID: null,
                        blogID: blogID,
                        type: 'new-post',
                        readed: false,
                        date: new Date()
                    })
                    updateDoc(docRef, {
                        notifications: this.userNotifications
                    })
                    await setDoc(newBlogRef, {
                        blogTitle: this.blogTitle,
                        blogHTML: this.blogHTML,
                        blogTime: serverTimestamp(),
                        blogCoverFileURL: photoURL,
                        blogCoverPhoto: this.blogCoverPhoto,
                        blogID: blogID,
                        blogTags: this.blogTags,
                        profileID: auth.currentUser.uid,
                        editTime: null,
                        likes: [],
                        comments: [],
                        saved: []
                    })
                    this.blogTitle = '';
                    this.blogHTML = 'Write your blog title here...';
                    this.loading = false;
                    this.blogTagsText = '';
                    this.$store.commit("resetBlogTags", []);
                    this.$store.commit("editFileURL", '');
                    this.$store.commit("editFileName", 'No file chosen');
                    this.$router.push({
                        name: 'view-post',
                        params: {
                            blogid: blogID
                        }
                    });
                    window.scrollTo(0, 0);
                    return;
                } {
                    this.error2 = true;
                    this.errorMessage2 =
                        "Can't Publish your post, Please ensure Blog Cover Image, Title ,Tags and Post has been filled!";
                }
            }
        },
        computed: {
            ...mapState(['userState', 'blogCoverPhoto', 'blogTime', 'isAdmin', 'blogCoverFileURL', 'theFile',
                'blogTags', 'blogPosts', 'notifications'
            ]),
            blogTitle: {
                get() {
                    return this.$store.state.blogTitle;
                },
                set(payload) {
                    this.$store.commit("editBlogTitle", payload);
                }
            },
            blogHTML: {
                get() {
                    return this.$store.state.blogHTML;
                },
                set(payload) {
                    this.$store.commit("editBlogHTML", payload);
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @use '../../assets/sass/mixins.scss'as *;
    @use '../../assets/sass/classStyles.scss'as *;

    .create-post {
        display: flex;
        flex-direction: column;
        row-gap: 20px;
        padding: 80px 50px;

        @include width(800px) {
            padding: 80px 10px
        }

        .post-publish-header {
            @include flex(flex-start,center,row);
            gap: 15px;
            flex-wrap: wrap;

            .blog-title {
                padding: 8px 8px 8px 0;
                width: 60%;
                max-width: 450px;
                outline: none;
                border-color: transparent transparent grey transparent;
                transition: .5s;

                @include width(500px) {
                    width: 100%;
                }

                &:focus {
                    border-color: transparent transparent #303030 transparent;
                }
            }

            button,
            label {
                @extend %btn;
                font-size: 13.333px;
            }

            .upload {
                position: relative;

                span {
                    opacity: 0;
                    position: absolute;
                    top: 45px;
                    left: 0;
                    border-radius: 8px;
                    padding: 8px;
                    background-color: red;
                    pointer-events: none;
                    transition: 1s;
                    z-index: 20;
                    cursor: default;

                    &::after {
                        content: '';
                        position: absolute;
                        height: 15px;
                        width: 15px;
                        top: -2px;
                        left: 50%;
                        background-color: red;
                        transform: rotate(135deg);
                        pointer-events: none;
                        z-index: -1;
                        cursor: default;
                    }
                }

                &:hover span {
                    opacity: 1;
                }

            }

            .file-input {
                pointer-events: none;
            }

            .disabled {
                background-color: grey;
            }

            #file {
                display: none;
            }

            .file-name {
                font-size: 13.3333px;
            }
        }

        .blog-editor {

            .text-area {
                width: 100%;
                height: 60vh;
                resize: none;
                outline: none;
                padding: 20px;
            }
        }

        .blog-tags {
            width: 100%;

            .tags-area {
                width: 100%;
                resize: none;
                outline: none;
                padding: 20px;
                border: 1px solid #ccc;
                font-size: 14px;
            }
        }

        .option-buttons {
            @include flex(flex-start,center,row);
            gap: 15px;
            flex-wrap: wrap;

            button,
            a {
                font-size: 13.3333px;
                @extend %btn;
            }
        }

    }
</style>
# Nexus-Labs

In this repository, we will solve three Capture The Flag (CTF) challenges to demonstrate some real world web exploitation techniques, this is the challenges that been presented in NexLabs event orgainzed by [Nexus Club](https://github.com/n3xusss) in which a huge thanks goes to them for the invitation!

## Challenges

1. **Challenge 1**: UUID V1 exploit from reset password request into account takedown. The challenge ecosystem is taken from [IngeHack2K25](https://github.com/Ingeniums/IngeHack-2k25-Challenges/tree/main/web/budapest) I managed to get the first blood in this challenge, credits to the author [poysa213](https://github.com/poysa213) for the challenge setup!
2. **Challenge 2**: SSTI-2-RCE in Javascript, I made the challenge ecosystem, and this is a challenge that I created for [PwnyCup 2k24 Finals](https://github.com/Shellmates/Pwny-Cup-2k24-Public/tree/main/web/royal-runtime).
3. **Challenge 3**: Frontend source map leak, Firebase credentials exposed! This is basically a frontend project that I worked on when I was learning Vue.js, and it seems later that it's vulnerable. Here’s the [patched version](https://github.com/ELHart05/RealBlogs).


## Objective

The objective of this repository is to provide a hands-on approach to learning web exploitation techniques through practical CTF challenges. Each challenge will cover different aspects of web security and exploitation.

## How to run challenges

1. **Challenge 1**:
```bash
cd ./Lab1
docker build -t lab1-nexus .
docker run -p 8080:8080 lab1-nexus
```

2. **Challenge 2**:
```bash
cd ./Lab2
docker build -t lab2-nexus .
docker run -p 3000:3000 lab2-nexus
```

3. **Challenge 3**:
```bash
cd ./Lab3
docker build -t lab3-nexus .
docker run -p 8082:80 lab3-nexus
```

Happy hacking!

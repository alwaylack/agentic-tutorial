# HTTP Request Libraries · Course Guide

This **20-chapter** course systematically covers Python's two most popular HTTP client libraries:

| Library | Positioning | Version Baseline |
|---|---|---|
| **requests** | The de-facto standard for sync requests; richest ecosystem | requests **2.34.x** |
| **httpx** | Modern full-featured client with native async + HTTP/2 | httpx **0.28.x** |

## What You Will Learn

| Stage | Chapters | Content |
|---|---|---|
| Beginner | 01–05 | HTTP basics, core requests API, request parameters, response handling, JSON/files |
| Intermediate | 06–10 | Sessions, timeouts & retries, proxies & SSL, exceptions, httpx intro |
| Advanced | 11–15 | Async requests, concurrency, HTTP/2, middleware, pytest integration |
| Production | 16–20 | Performance tuning, API client wrappers, security, deployment, capstone |

## How It Connects to Other Courses

- Pairs with [pytest](/pytest/) chapter 19 (web service testing);
- Complements [FastAPI](/fastapi/) chapter 20 (testing) for a complete web-testing skill set;
- Complements [Playwright](/playwright/) — Playwright tests browsers, while requests/httpx test APIs.


## Official References

This course is written strictly against the following authoritative documentation:

| Source | Link |
|---|---|
| requests.readthedocs.io | [https://requests.readthedocs.io/en/latest/](https://requests.readthedocs.io/en/latest/) |
| www.python-httpx.org | [https://www.python-httpx.org/](https://www.python-httpx.org/) |

Version baseline: **requests 2.34 + httpx 0.28**


## Prerequisites

- Basic Python; a grasp of fundamental HTTP concepts (GET/POST, status codes, headers);
- Completing the first six chapters of our [pytest course](/pytest/) first is recommended.

👉 Start from [Chapter 1](/http/ch01).

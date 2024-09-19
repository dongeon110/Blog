- [Side Project](#side-project)
  - [Architecture](#architecture)
    - [Web Server](#web-server)
      - [nginx](#nginx)
    - [Service](#service)
      - [FastAPI (AI Server)](#fastapi-ai-server)
      - [Java Spring (General Service)](#java-spring-general-service)
      - [Kotlin Spring (Admin Service)](#kotlin-spring-admin-service)
    - [DB](#db)
      - [PostgreSQL](#postgresql)
      - [Redis](#redis)
  - [고려사항](#고려사항)
    - [JWT vs Session Login](#jwt-vs-session-login)

- - -
# Side Project

## Architecture

### Web Server
#### nginx

### Service
#### FastAPI (AI Server)
- 
#### Java Spring (General Service)
- JPA
#### Kotlin Spring (Admin Service)
- Java To Kotlin

### DB
#### PostgreSQL
- Backup strategy (Master/Slave) & Schedule backup
#### Redis
- cache
- session 공유

## 고려사항
### JWT vs Session Login
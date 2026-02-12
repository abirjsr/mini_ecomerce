 <p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">Mini E-Commerce API - A robust backend system for online shopping platform built with NestJS</p>

<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
  <a href="https://github.com/abirjsr/mini_ecomerce" target="_blank"><img src="https://img.shields.io/github/stars/abirjsr/mini_ecomerce" alt="GitHub Stars" /></a>
</p>

## Description

A production-ready backend system designed to simulate a basic online shopping platform with NestJS. This project focuses on **authentication**, **role-based access control**, **product management**, **cart operations**, and **order processing** while ensuring proper business logic and data consistency.

### Key Features

✅ **JWT-based Authentication** with role separation (Admin & Customer)  
✅ **Product Management** - CRUD operations with stock tracking  
✅ **Shopping Cart** - Add, update, remove items with stock validation  
✅ **Order Processing** - Transaction-based order placement  
✅ **Fraud Prevention** - Automatic suspension after repeated cancellations  
✅ **Database Transactions** - Ensuring data integrity across operations

![ER Diagram](https://i.postimg.cc/G26CRDKV/Screenshot-2026-02-12-192133.jpg)

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **NestJS** | Progressive Node.js framework |
| **TypeScript** | Type-safe development |
| **PostgreSQL** | Relational database |
| **TypeORM** | Database ORM |
| **JWT & Passport** | Authentication & authorization |
| **bcrypt** | Password hashing |
| **class-validator** | Input validation |

## 📋 Prerequisites

- Node.js (v18+)
- PostgreSQL or Supabase account
- npm or yarn

## 🚀 Project Setup

```bash
# Install dependencies
$ npm install

# Configure environment variables
# Create .env file (see Environment Configuration section)

# Run database migrations (optional for dev)
$ npm run migration:run
## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).
## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).


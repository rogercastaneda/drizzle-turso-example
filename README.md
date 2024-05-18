## About

This project is created following the Youtube tutorial ["Learn Drizzle In 60 Minutes"](https://www.youtube.com/watch?v=7-NZ0MlPpJA) by **Web Dev Simplified**.

### Environment file

Create .env with the following env var.

```
TURSO_DATABASE_URL=
TURSO_AUTH_TOKEN=
```

I was using [Turso](turso.tech).
Get your url and auth token from Turso using this [tutorial](https://orm.drizzle.team/learn/tutorials/drizzle-with-turso)

## Schema generate

```
npm run db:gen
```

## Schema migration

```
npm run db:migrate
```

## Run project

```
npm run dev
```

# Notebook API Endpoints

## Get all notes

```http
    GET /notes
```

## Get a single note

```http
    GET /notes/${id}
```

## Create a new note

```http
    POST /notes
```

| Parameter | Type     | Description                    |
| :-------- | :------- | :----------------------------- |
| `title`   | `string` | **Required**. Title of note    |
| `content` | `string` | **Required**. Content of note  |

## Update a note

```http
    PUT /notes/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`   | `string` | **Optional**. Title of note       |
| `content` | `string` | **Optional**. Content of note     |

## Delete a note

```http
    DELETE /notes/${id}
```

# nestjs-generate-questions

This repository houses a question generation tool, enabling users to input a text, from which it generates multiple questions for selection, with one of them being the correct answer.

### Technologies

- NestJS
- Prisma
- Jest
- SWC
- OpenAI
- Zod

### How to use

1. Configure .env file
2. Create an user by using POST /user
3. Create an question using POST /question

Example of POST /question response

```
{
  "id": "2c9218cd-99c7-49f7-990a-381983017112",
  "content": "When Britney Spears' much-hyped autobiography, The Woman in Me, went on sale in October, it instantly became the bestselling book on Amazon, thanks to presales from eager fans. This week it debuted at number one on the New York Times Bestsellers List (memoirs from actors John Stamos and Jada Pinkett Smith also earned spots on the coveted list). In her book, Spears recounts, with a kind of fevered urgency, her rise from small town Louisiana to mega-stardom. Even before she gets to the subject of the infamous 2008 court-ordered conservatorship, which gave Spears's father power over her finances and daily life, the reader feels intimately familiar with the singer. Some of the more salacious details from the book made their way into the media in the weeks before the memoir's publication: the painful at-home abortion endured as her then-partner, the singer and actor Justin Timberlake strummed an acoustic guitar; the night she shaved her head in front of a throng of camera-toting paparazzi; even the menacing hiss of the giant snake she bore aloft at the 2001 MTV Video Music Awards. ",
  "createdAt": "2023-11-03T21:17:35.455Z",
  "updatedAt": "2023-11-03T21:17:35.455Z",
  "authorId": "f82828f7-ba96-443c-b45a-90d4803f4111",
  "answers": [
    {
      "id": "e4b227e9-0472-4417-b0a3-78bd7486a02c",
      "content": "The Woman in Me debuted at number one on the New York Times Bestsellers List.",
      "createdAt": "2023-11-03T21:17:35.465Z",
      "updatedAt": "2023-11-03T21:17:35.465Z",
      "questionId": "2c9218cd-99c7-49f7-990a-381983017112",
      "correct": true
    },
    {
      "id": "232f236d-688f-4a28-bc5c-ba942275dbb2",
      "content": "The book instantly became the bestselling book on Amazon due to presales from eager fans.",
      "createdAt": "2023-11-03T21:17:35.471Z",
      "updatedAt": "2023-11-03T21:17:35.471Z",
      "questionId": "2c9218cd-99c7-49f7-990a-381983017112",
      "correct": false
    },
    {
      "id": "06133b15-b6f7-471b-b502-50032772cb85",
      "content": "John Stamos and Jada Pinkett Smith also earned spots on the New York Times Bestsellers List with their memoirs.",
      "createdAt": "2023-11-03T21:17:35.475Z",
      "updatedAt": "2023-11-03T21:17:35.475Z",
      "questionId": "2c9218cd-99c7-49f7-990a-381983017112",
      "correct": false
    }
  ]
}
```

### swagger

![Preview](https://raw.githubusercontent.com/henriqueweiand/nestjs-generate-questions/main/assets/swagger.png)

### Changes

Common libraries

- [x] Base library with database and user repository
- [x] unit-tests for all parts of the library
- [x] Questions and answers repositories
- [x] Swagger (http://localhost:3000/api)

User module

- [x] Module
- [x] Use-case
- [x] unit-tests
- [x] e2e-tests

Question and answers module

- [x] Module
- [x] Use-case
- [x] unit-tests
- [ ] e2e-tests

To-do

- [ ] Review unit-test of questions create
- [ ] Review e2e-test of questions create

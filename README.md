# Experis Connect (experis-connect-frontend)

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

After creating an account, users can login and maintain their personal profile. They can create and join groups and topics, and publish posts in these groups and topics.

## Table of Contents

- [Background](#Background)
- [Install](#Install)
- [Usage](#Usage)
- [Component tree](#component-tree)
- [Maintainers](#Maintainers)
- [Contributing](#Contributing)
- [License](#License)

## Background

The aim of this project was to create an Alumni Networking Portal to maintain contact between current and previous candidates in the Noroff Accelerate program.

### Technologies

This app is built with [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/) and [Vite](https://vitejs.dev/). It uses [Redux](https://redux.js.org/) for global state management, [React Router](https://reactrouter.com/), [TanStack Query](https://tanstack.com/query/latest) and other libraries for extended functionality.

Authentication is handled by a [Key Cloak](https://www.keycloak.org) server and implemented using the [JavaScript adapter](https://www.keycloak.org/docs/latest/securing_apps/#_javascript_adapter) to follow the [OpenID Connect](https://openid.net/connect/)/[OAuth 2.0](https://oauth.net/2/) standard.

Code standard is maintained by using [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/).

## Install

Use `git clone` to clone the repository. Run `npm install` to install dependencies.

## Usage

### Environment variables

Create a `.env` file following the `.env.template` file to supply the required environment variables.

### Development server

Run `npm run dev` for a dev server. Navigate to `http://localhost:5173/`. The application will automatically reload if you change any of the source files.

## Component tree

```mermaid
flowchart TD
1{{App}} --> 2(Header)
2 --> 4(UserIcon)
2 --> 5(SearchForm)

1 --> 3(PageLayout)

3 --> 6([LoginPage])
6 --> 20(Login)

3 --> 7([DashboardPage])
7 --> 21(Dashboard)
21 --> 22(PostList)
22 --> 23(PostListItem)
23 --> 24(UserIcon)
21 --> 25(Footer)

3 --> 8([ProfilePage])
8 --> 26(Profile)

3 --> 9([ProfileSettingsPage])
9 --> 27(ProfileSettings)
27 --> 28(ProfileSettingsForm)

3 --> 10([GroupListPage])
10 --> 29(GroupList)
29 --> 30(GroupListItem)
29 --> 31(Footer)

3 --> 11([GroupPage])
11 --> 32(Group)
32 --> 33(PostList)
33 --> 34(PostListItem)
34 --> 35(UserIcon)
32 --> 36(UserList)
36 --> 63(GroupAddUserForm)

3 --> 12([CreateGroupPage])
12 --> 37(CreateGroup)
37 --> 38(CreateGroupForm)

3 --> 13([TopicListPage])
13 --> 39(TopicList)
39 --> 40(TopicListItem)
39 --> 41(Footer)

3 --> 14([TopicPage])
14 --> 42(Topic)
42 --> 43(PostList)
43 --> 44(PostListItem)
44 --> 45(UserIcon)
42 --> 46(UserList)

3 --> 15([CreateTopicPage])
15 --> 47(CreateTopic)
47 --> 48(CreateTopicForm)

3 --> 16([CreatePostPage])
16 --> 49(CreatePost)
49 --> 50(CreatePostForm)

3 --> 17([ThreadPage])
17 --> 51(Thread)
51 --> 52(Post)
52 --> 53(Post)
53 --> 56(...)
52 --> 54(UserIcon)
51 --> 55(PostReplyForm)

3 --> 18([SearchResultPage])
18 --> 57(SearchResult)
57 --> 58(SearchResultList)
58 --> 59(PostList)
59 --> 60(PostListItem)
60 --> 61(UserIcon)

3 --> 19([Error404Page])
19 --> 62(Error404)
```

## Maintainers

- [@Luisa Möhle](https://github.com/ansmeer)
- [@Odd Martin Kveseth](https://github.com/OddM91)
- [@Eivind Skandsen](https://github.com/Ddayisme)
- [@William Vilhelmsen](https://www.github.com/William-vil)
- [Eir Aulie]()

## Contributing

This project is currently not open for contributions, but you are welcome to work on your own copy of it.

## License

MIT © 2023 Luisa Möhle, Odd Martin Kveseth, William Vilhelmsen, Eivind Skandsen & Eir Aulie

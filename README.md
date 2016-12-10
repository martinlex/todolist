> todolist

## Todo list, with tags

The user can add a todo in the list.

To each todo, it's optional to also attach one or multiple tags:
- todo #tag => ok
- #tag todo => reversed order ok
- todo #tag-hello => dash ok
- todo #tagåäö => diacritics ok
- todo #tag1_% => special chars ok

It should not be possible to add only tags (without todo).

Each tag will get a random color.

The colors are saved and will be reused if the same tag appears again.

The todo can be deleted.

The todo-list knows if it's empty or not.

======================

Martin Lexelius, 2016. Built with js, Scss and Gulp.

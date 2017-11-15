# lego_sql

This project uses an express server and handlebars, and is linked to mySQL.

It is currently deployed at: https://protected-cliffs-80757.herokuapp.com/

It was originally the 'burger-app' assignment, but since I wanted
to implement full CRUD capability, and I didn't want to 'un-eat' a
burger, I changed it to 'legos'.  In the current state it is not 
beautifully formatted, but it has all the features:

Create:  top box where a new project can be entered
Read:    all existing projects are read from the database and displayed according to boolean 'built' property
Update:  two ways - 1.  build or disassemble (toggle on 'built' property), or
                    2.  change the project description (available for 'built'=false)
Delete:  deletes selected object from the database (select 'donate this toy' option)


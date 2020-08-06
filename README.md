## Setting up Heroku
```
heroku create dfilter-task-manager
heroku config:set JWT_SECRET=kshdisuhfgiehrou3h4r09 SENDGRID_API_KEY=SG.thisisaninvalidkeymakesuretoreplacethiswithaproperkey MONGODB_URL=mongodbatlasurlhere
git push heroku master
```
yarn start

yarn add node-sass@^5.0.0
yarn add react-router-dom        and       yarn add @types/react-router-dom




Firebase roles:
{
  "rules": {
    "rooms":{
      ".read": false,
      ".write": "auth != null",
      "$roomId":{
        ".read": true,
        ".write": "auth != null && (!data.exists()||data.parent().child('authorId').val() == auth.id)",
        "questions": {
          ".read": true,
          ".write": "auth !=null && (!data.exists()||data.parent().child('authorId').val() == auth.id)",
        	"likes": {
            ".read": true,
            ".write":"auth !=null && (!data.exists()||data.parent().child('authorId').val() == auth.id)"
          }
        }
      }
    }
  }
}
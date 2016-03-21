var express = require('express'),
    PORT    = process.env.PORT || 5000,
    app     = express();

app.use(express.static('./'));

app.listen(PORT, function () {
  console.log('server is listening on port ' + PORT + "!");
});

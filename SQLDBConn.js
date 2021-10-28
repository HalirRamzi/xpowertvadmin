const express = require('express');
const mysql = require('mysql');

 const connection = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'xpowertvadmindb'
  });

  const app = express();
  app.use(express.urlencoded());
  app.use(express.json());
  app.get('/ActiveDeviceMonitors', function (req, res) {
      connection.getConnection(function (err, connection) {
      connection.query('SELECT Devicename,ipAddress,createdDate,model,deviceId,brand,userTb,lastActivedate FROM monitordetails JOIN userdetail ON monitordetails.userTb = userdetail.ID', function (error, results, fields) {
        if (error) throw error;
        res.send({langs:results})
      });
    });
  });

  app.get('/UserAddress', function (req, res) {
    connection.getConnection(function (err, connection) {
    connection.query('SELECT * FROM companydetails', function (error, results, fields) {
      if (error) throw error;
      res.send({langs:results})
    });
  });
});

  app.post('/UserAddress', function (req, res) {
    connection.getConnection(function (err, connection) {
      var UserAddressNm = req.body.user.UserAddress;
      connection.query("UPDATE companydetails SET address = '"+UserAddressNm+"'", function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
      });
  });
});

  app.get('/SelectedDocument', function (req, res) {
      connection.getConnection(function (err, connection) {
      connection.query('SELECT * FROM companydetails', function (error, results, fields) {
        if (error) throw error;
        res.send({langs:results})
      });
    });
});

  app.post('/SelectedDocument', function (req, res) {
    connection.getConnection(function (err, connection) {
      var comLogoNm = req.body.user.imageNm;
      connection.query("UPDATE companydetails SET comLogo = '"+comLogoNm+"'", function (err, result) {
      if (err) throw err;
      console.log("record(s) inserted");
      });
  });
});

  app.get('/CompanyName', function (req, res) {
    connection.getConnection(function (err, connection) {
    connection.query('SELECT com_code FROM companydetails', function (error, results, fields) {
      if (error) throw error;
      res.send({langs:results})
    });
  });
});

  app.post('/CompanyName', function (req, res) {
    connection.getConnection(function (err, connection) {
      var CompanyNameNm = req.body.user.CompanyName;
      var results = req.body.user.userId;
      var expireDateNm = "2022-10-14";
      var statusNm = "Active";
   
      connection.query("SELECT com_code FROM companydetails ORDER BY ID DESC LIMIT 1", function (err, userDet) {
        if (err) throw err;
        if(userDet.length == 0){
          var nextComCode = '1000';
        }else{
          var nextComCode = parseFloat(userDet[0].com_code)+1;
        }

        console.log(nextComCode+" COMCODE");
        connection.query("INSERT INTO companydetails (userTb,companyName,expireDate,status,com_code) VALUES ('"+results+"','"+CompanyNameNm+"','"+expireDateNm+"','"+statusNm+"', '"+nextComCode+"')", function (err, result) {
          if (err) throw err;
          console.log(result.affectedRows + " record(s) inserted");
          console.log(results)
        });
      });
  });
});


  app.get('/specialnotes', function (req, res) {
      connection.getConnection(function (err, connection) {
      connection.query('SELECT * FROM companydetails', function (error, results, fields) {
        if (error) throw error;
        res.send({langs:results})
      });
    });
});

  app.post('/specialnotes', function (req, res) {
    connection.getConnection(function (err, connection) {
      var specialNoteNm = req.body.user.specialNote;
      connection.query("UPDATE companydetails SET specialNote = '"+specialNoteNm+"'", function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
      });
  });
});

  app.get('/companywebsite', function (req, res) {
    connection.getConnection(function (err, connection) {
    connection.query('SELECT * FROM companydetails', function (error, results, fields) {
      if (error) throw error;
      res.send({langs:results})
    });
  });
});

  app.post('/companywebsite', function (req, res) {
    connection.getConnection(function (err, connection) {
      var companywebsiteNm = req.body.user.companywebsite;
      connection.query("UPDATE companydetails SET companyWebsite = '"+companywebsiteNm+"'", function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
      });
  });
});

  app.get('/Useremailaddress', function (req, res) {
    connection.getConnection(function (err, connection) {
    connection.query('SELECT * FROM companydetails', function (error, results, fields) {
      if (error) throw error;
      res.send({langs:results})
    });
  });
});

  app.post('/Useremailaddress', function (req, res) {
    connection.getConnection(function (err, connection) {
      var emailaddressNm = req.body.user.emailaddress;
      connection.query("UPDATE companydetails SET emailAddress = '"+emailaddressNm+"'", function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
      });
  });
});

  app.get('/homepage', function (req, res) {
    connection.getConnection(function (err, connection) {
    connection.query('SELECT Devicename,ipAddress,createdDate,model,deviceId,brand,userTb,lastActivedate FROM monitordetails JOIN userdetail ON monitordetails.userTb = userdetail.ID', function (error, results, fields) {
      if (error) throw error;
      res.send(results)
    });
  });
});

  app.post('/userdetails', function (req, res) {
    connection.getConnection(function (err, connection) {
      var emailNm = req.body.user.email;
      var nameNm = req.body.user.name;
      var profileimage = req.body.user.profileimage;
      var currencyNm = "$";
      var languageNm = "en";
      var statusNm = "Active";
      var userTbb = '';
      var comName = '';
      var comId = '';
      connection.query("SELECT ID FROM userdetail WHERE emailNo = '"+emailNm+"'", function (err, userDet) {
        if (err) throw err;
        if(userDet.length == 0){
          connection.query("INSERT INTO userdetail (emailNo, Name, profileUrl, language, currency, status) VALUES ('"+emailNm+"','"+nameNm+"','"+profileimage+"','"+currencyNm+"','"+languageNm+"','"+statusNm+"')", function (err, result) {
              if (err) throw err;
              userTbb =  result.insertId;

              res.end(JSON.stringify({ userId: userTbb, comName: '', comId: ''}));
          });
        }else{
          userTbb =  userDet[0].ID;

          connection.query("SELECT `ID`, `companyName` FROM `companydetails` WHERE `userTb` = '"+userTbb+"'", function(err, comDetail){
            if (err) throw err;
            if(comDetail.length > 0){
              comName = comDetail[0].companyName;
              comId = comDetail[0].ID;
            }

            res.end(JSON.stringify({ userId: userTbb, comName: comName, comId:comId }));
          });
        }
        
      });
  });
});

  app.post('/SelectedDocuments', function (req, res) {
    connection.getConnection(function (err, connection) {
      var comLogoNm = req.body.user.imageNm;
      var userId = req.body.user.userId;
      var comId = req.body.user.comId;
      var imageTb = '';
      var fDate = req.body.user.fDate;
      var tDate = req.body.user.tDate;
      var fTime = req.body.user.fTime;
      var tTime = req.body.user.tTime;
      var text = req.body.user.text;
      var imgetext = req.body.user.imgetext;

      connection.query("INSERT INTO imageposts (imageUrl,userTb,comTb,fromDate,toDate,fromTime,toTime,imgTimer,imageText) VALUES ('"+comLogoNm+"','"+userId+"','"+comId+"','"+fDate+"','"+tDate+"','"+fTime+"','"+tTime+"','"+text+"','"+imgetext+"')", function (err, result) {
        if (err) throw err;
        imageTb = result.insertId;
        res.end(JSON.stringify({ imageTb: imageTb }));
        });
        console.log(text = "jdhfasjhd");
  });
});

//   app.post('/autoenterpincode', function (req, res) {
//     connection.getConnection(function (err, connection) {
//       connection.query("INSERT INTO imageposts (com_code) VALUES (?) SELECT com_code FROM imageposts ORDER BY com_code DESC", function (err, result) {
//         if (err) throw err;
//         imageTb = result.insertId;
//         res.end(JSON.stringify({ imageTb: imageTb }));
//         });
//         console.log(text = "auto pin code entered success!");
//   });
// });

  app.get('/Userphonenumber', function (req, res) {
    connection.getConnection(function (err, connection) {
    connection.query('SELECT * FROM companydetails', function (error, results, fields) {
      if (error) throw error;
      res.send({langs:results})
    });
  });
});

  app.post('/Userphonenumber', function (req, res) {
    connection.getConnection(function (err, connection) {
      var telephonenumberNm = req.body.user.telephonenumber;
      connection.query("UPDATE companydetails SET mobNo = '"+telephonenumberNm+"'", function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
      });
  });
});


// Starting our server.
app.listen(2100, () => {
 console.log('Go to http://localhost:2100/SQLDBConn so you can see the data.');
});
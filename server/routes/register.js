var express = require('express');
var router = express.Router();
var conn = require('../db');
const multer=require('multer');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'static/img/head')
    },
    filename: function (req, file, cb) {
      const str = file.originalname.substr(file.originalname.indexOf("."))
    //   cb(null, file.fieldname + '-' + Date.now()+'.'+arry)
      cb(null,  'head_' + req.session.accountCheck+ str)
    },
  })
var upload = multer({ storage: storage });

router.get('/check/:account',function(req,res,next){
console.log(req.params.account)
  let sql = `select * from member where m_account like ? `;
  conn.query(sql,[req.params.account],function(err,rows){
    console.log(rows);

    if(rows != ""){      
      res.send("ng")
    }
    else{
      req.session.accountCheck = req.params.account;
      res.send("ok")
    }

  })
})

// var cpUpload = upload.fields([{ name: 'file', maxCount: 1 }, { name: 'member', maxCount: 10 }])
router.post('/',upload.single('file'), (req, res, next) => {

    //TODO 錯誤處理
    /**
     *  1. 資料正確性
     *  2. 帳號使否已存在
     *  --> 正確告知使用者資料有異常，異常的訊息是什麼
     */
    let sql = "insert into member set m_name = ?, m_sex = ?, m_account = ?, m_password = ?, m_email = ?, m_phone = ?, m_birthday = ?, m_address = ?, introduce = ? ,m_profile = ? ";

    conn.query(sql,
        [
            req.body.m_name,
            req.body.m_sex,
            req.body.m_account,
            req.body.m_password,
            req.body.m_email,
            req.body.m_phone,
            req.body.m_birthday,
            req.body.m_address,
            req.body.m_introduce,
            req.file.filename
        ],

        function (err, result) { // result return increment -> member id
            if (err) {
                console.log(err);
                return;
            } else {
                let favSql = "insert into member_fav set m_ID = " + result.insertId + ", fav_category =? ";
                var favArr = req.body.m_checkName.split(",");
                // console.log(favArr);
                for ( index in favArr ) {
                  // console.log(index);
                    if ( index == 0 ) {
                        continue;
                    } // continue 以後程式不跑，直接進入下一個迴圈，跳過index==0，直接跑下一個迴圈，等於跳過all。

                    // else會接收到result回傳的m_ID，做一個for迴圈跑喜愛類別，裡面下一個if判斷式
                    // 如果Index == 0 就continue
                    // 點下註冊鈕
                    // 再post後端之前，把確定註冊按鈕disable掉
                    conn.query(favSql,
                        [ 
                          favArr[index] 
                        ],
                        function (err, result) { // result return auto increment -> PrimaryId
                            if (err) {
                                console.log(err);
                                return;
                            } else {
                                var favId = result.insertId; // insertId指的就是db memeber_fav table裡auto_increment最新一筆的值
                                // console.log(favId);
                            }
                        }
                    )
                }  
            }
        })

    res.send("member innsert OK");
       
});

module.exports = router;


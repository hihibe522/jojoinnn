var express = require('express');
var router = express.Router();
var conn = require('../db');
const { response } = require('express');

router.post('/', (req, res, next) => {
    // console.log(req.body.data)
    // res.send("noProblem")
    // console.log("OKKK")
    // console.log(req.body.memberData);
    // console.log(req.body.data);
    // console.log(req.body.data);
    // console.log(req.body.data.m_sex);
    //TODO 錯誤處理
    /**
     *  1. 資料正確性
     *  2. 帳號使否已存在
     *  --> 正確告知使用者資料有異常，異常的訊息是什麼
     */
    let sql = "insert into member set m_name = ?, m_sex = ?, m_account = ?, m_password = ?, m_email = ?, m_phone = ?, m_birthday = ?, m_address = ?, introduce = ?";

    conn.query(sql,
        [
            req.body.data.m_name,
            req.body.data.m_sex,
            req.body.data.m_account,
            req.body.data.m_password,
            req.body.data.m_email,
            req.body.data.m_phone,
            req.body.data.m_birthday,
            req.body.data.m_address,
            req.body.data.m_introduce,
        ],

        function (err, result) { // result return increment -> member id
            if (err) {
                console.log(err);
                return;
            } else {
                let favSql = "insert into member_fav set m_ID = " + result.insertId + ", fav_category =? ";
                var favArr = req.body.data.m_checkName;
                for ( index in favArr ) {
                    if ( index == 0 ) {
                        continue;
                    } // continue 以後程式不跑，直接進入下一個迴圈，跳過index==0，直接跑下一個迴圈，等於跳過all。

                    //else會接收到result回傳的m_ID，做一個for迴圈跑喜愛類別，裡面下一個if判斷式
                    //如果Index == 0 就continue
                    //點下註冊鈕
                    //再post後端之前，把確定註冊按鈕disable掉
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
                                console.log(favId);
                                // res.send(rows)
                            }
                        }
                    )
                }
                // res.send(rows)
            }
        }
    )
});

module.exports = router;


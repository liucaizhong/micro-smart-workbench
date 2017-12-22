const express = require('express')
const http = require('http')
const url = require('url')
// const formidable = require('formidable')
// const util = require('util')
// const querystring = require('querystring')
const router = express.Router()

// const orientUrl = 'http://wwy94621.sinaapp.com'
const orientUrl = 'http://qy.mtouyan.cn'

const urlMap = {
  // '/getcs': `${orientUrl}/Communication/API/getCS.php`,
  // '/updatecs': `${orientUrl}/Communication/API/updateCS.php`,
  '/getUserList': `${orientUrl}/Revenue/API/userList.php`,
  '/getPoints': `${orientUrl}/Revenue/API/getPaidian.php`,
  '/getPointDetail': `${orientUrl}/Revenue/API/getPaidianDetail.php`,
}

function mapUrl(rawUrl) {
  const urlObj = url.parse(rawUrl)
  return urlMap[urlObj.pathname]
}

function requestGet(realUrl, req, res) {
  const getReq = http.get(realUrl, (response) => {
    let body = ''
    response.on('data', (d) => {
      body += d
    })

    response.on('end', () => {
      res.json(JSON.parse(body))
    })
  })

  getReq.on('error', (e) => {
    console.log(`problem with request: ${e.message}`)
  })
  getReq.end()
}

function requestPost(realUrl, req, res) {
  console.log(req.body)
  const data = Object.keys(req.body)[0]
  // console.log(rawData)
  // const data = JSON.parse(rawData)
  // console.log(rawData)
  // const data = querystring.stringify(rawData)
  console.log(data)
  const urlObj = url.parse(realUrl)
  const options = {
    host: urlObj.hostname,
    path: urlObj.path,
    port: urlObj.port,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(data),
    },
  }

  const postReq = http.request(options, (response) => {
    let body = ''
    response.setEncoding('utf8')
    response.on('data', (chunk) => {
      body += chunk
    })
    response.on('end', () => {
      res.json(body)
    })
  })

  postReq.on('error', (e) => {
    console.log(`problem with request: ${e.message}`)
  })

  postReq.write(data)
  postReq.end()
}

// function requestPostForm (realUrl, req, res) {
//   const form = new formidable.IncomingForm()
//   const data = {}
//
//   form.parse(req, (err, fields, files) => {
//     if (err) {
//       console.log('err', err)
//     }
//     console.log('fields', fields)
//     console.log('files', files)
//     console.log('data', util.inspect({fields: fields, files: files}))
//
//     data.fields = Object.assign({}, fields)
//     data.files = Object.assign({}, files)
//   })
//
//   const urlObj = url.parse(realUrl)
//   const options = {
//     host: urlObj.hostname,
//     path: urlObj.path,
//     port: urlObj.port,
//     method: 'POST',
//     headers: {
//       'Content-Type': 'multipart/form-data'
//     }
//   }
//
//   const postReq = http.request(options, function (response) {
//     let body = ''
//     response.setEncoding('utf8')
//     response.on('data', function (chunk) {
//       body += chunk
//     })
//     response.on('end', function () {
//       res.json(body)
//     })
//   })
//
//   postReq.on('error', (e) => {
//     console.log(`problem with request: ${e.message}`)
//   })
//
//   postReq.write(data)
//   postReq.end()
// }

module.exports = () => {
  // // get contacts
  // router.get('/getcontact', (req, res) => {
  //   console.log('getcontact start!')
  //   const urlObj = url.parse(req.url)
  //   urlObj.pathname = mapUrl(urlObj.pathname)
  //   const realUrl = url.format(urlObj)
  //   requestGet(realUrl, req, res)
  // })
  // insert contacts
  router.post('/insertcontact', (req, res) => {
    console.log('insertcontact start!')
    const realUrl = mapUrl(req.url)
    requestPost(realUrl, req, res)
  })

  // get user list
  router.get('/getUserList', (req, res) => {
    console.log('getUserList start!')
    const urlObj = url.parse(req.url)
    urlObj.pathname = mapUrl(urlObj.pathname)
    const realUrl = url.format(urlObj)
    requestGet(realUrl, req, res)
  })

  // get points
  router.get('/getPoints', (req, res) => {
    console.log('getPoints start!')
    const urlObj = url.parse(req.url)
    urlObj.pathname = mapUrl(urlObj.pathname)
    const realUrl = url.format(urlObj)
    requestGet(realUrl, req, res)
  })
  // get point detail
  router.get('/getPointDetail', (req, res) => {
    console.log('getPointDetail start!')
    const urlObj = url.parse(req.url)
    urlObj.pathname = mapUrl(urlObj.pathname)
    const realUrl = url.format(urlObj)
    requestGet(realUrl, req, res)
  })

  return router
}

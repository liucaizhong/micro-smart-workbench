#   m i c r o - s m a r t - w o r k b e n c h 
 
# get user info through getCookie
*userId: 用户ID
*userName：用户姓名
*roleId：角色ID，0: admin（晓燕，所长）, 1: analyst, 2: sales，其他中后台可以并入角色1
*groupId：用户所属小组ID
**
# get userList 如果登陆用户是首席或者销售总监，需要获取组员
*get params: userId
*返回结果数据格式样例：
[{
  groupName: '战略',
  groupId: 'zhanlue',
  roleId: 1,
  members: [{
    userId: 'sunjx',
    userName: '孙金霞',
  }, {
    userId: 'xuej',
    userName: '薛俊',
  }],
},
...
]
**
# get fee 获取登录用户的费用信息
*get params:
1：userId
2: year, 年度
3：date/quarter, 研究员为季度，销售为月度
*返回结果数据格式样例：
[{
  total: '100000', //为保证数据格式一致，建议结果为string
  used: '50000',
  unused: '50000',
}]
**
# get fee detail 获取用户的费用明细
*get params:
1：userId
2: year, 年度
3：date/quarter, 研究员为季度，销售为月度
*返回结果数据格式样例：
[{
  fee: '56.88',
  category: '印刷费',
  remark: '期货年报',
},
...]
**
# get points 获取研究员派点明细
*get params:
1：userId
2: year, 年度
3：date/quarter, 研究员为季度，销售为月度
*返回结果数据格式样例：
[{
  category: '上海',
  point: '50',
}, {
  category: '广深',
  point: '30',
}, {
  category: '北京',
  point: '30',
}, {
  category: '经纪业务VIP',
  point: '50',
}, {
  category: '自营资管',
  point: '30',
}, {
  category: '其他',
  point: '30',
}]
**
# get points 获取研究员某个类别下的派点明细
*get params:
1：userId
2: year, 年度
3：date/quarter, 研究员为季度，销售为月度
4: category, 上海，广深，北京，经纪业务VIP，自营资管
*返回结果数据格式样例：
上海，广深，北京:
[
[{
  customer: '易方达',
  point: '20'
}, ...], //一级客户
[...], //二级客户
[...], //三级客户
[...], //四级客户
]
经纪业务VIP:
[{
  customer: '经纪业务VIP',
  point: '20'
}]
自营资管:
[{
  customer: '自营',
  point: '20'
}, {
  customer: '资管',
  point: '20'
}]
**
# get commission 获取销售净佣金明细
*get params:
1：userId
2: year, 年度
3：date/quarter, 研究员为季度，销售为月度
*返回结果数据格式样例：
[{
  customer: '交银施罗德', //销售名下所有的机构
  amount: '2,921,235.34',
}, {
  customer: '华安',
  amount: '5,021,022.01',
},
...]
**
# get commission 获取销售某个机构的净佣金组成明细
*get params:
1：userId
2: year, 年度
3：date/quarter, 研究员为季度，销售为月度
4：customer 机构id
*返回结果数据格式样例：(只需显示以下三个类别)
[{
  category: '毛佣金',
  amount: '2,921,235.34',
}, {
  category: '社保收入',
  amount: '2,921,235.34',
}, {
  category: '非佣金收入',
  amount: '2,921,235.34',
}]
# post intern detail 新增实习生信息
*data:
1. name 实习生姓名
2. status 0: 在职 1: 离职
3. entryDate 入职时间 YYYY-MM-DD
4. departureDate 离职时间 YYYY-MM-DD
5. school 所在学校
6. comments 评论
*返回
1.code 0: success ,其他: failed
# post intern detail 更改实习生信息
*data:
0. id 实习生id
1. name 实习生姓名
2. status 0: 在职 1: 离职
3. entryDate 入职时间 YYYY-MM-DD
4. departureDate 离职时间 YYYY-MM-DD
5. school 所在学校
6. comments 评论
*返回
1.code 0: success ,其他: failed
# get intern list 获取实习生列表
*返回 按入职时间倒序排列
1. name 实习生姓名
2. status 0: 在职 1: 离职
3. entryDate 入职时间 YYYY-MM-DD
# 批量导入实习生
*data
1. file
*返回
1.code 0: success ,其他: failed
# 获取某个销售的销售信息
* get params:
1：userId
* data
customers: ['富国', '天治', '中银', '富安达'], // 罗列销售名下客户
rank: {
  // 销售排名，Q1, Q2, Q3, Q4
  '富国': [4, 6, 3, 2],
  '天治': [2, 10, 7, 5],
  '中银': [6, 3, 11, 2],
  '富安达': [4, 8, 3, 1],
},
fee: {
  // '富国', '天治', '中银', '富安达'，数组顺序和客户顺序保持一致
  '代销费用': [{
    amount: 205,
    percent: '20.2%',
  }, {
    amount: 0,
    percent: '0.0%',
  }, {
    amount: 2,
    percent: '1.6%',
  }, {
    amount: 35,
    percent: '10.1%',
  }], // 代销费用
  '代付费用': [{
    amount: 103,
    percent: '10.2%',
  }, {
    amount: 75,
    percent: '12.5%',
  }, {
    amount: 56,
    percent: '51.2%',
  }, {
    amount: 103,
    percent: '30.1%',
  }], // 代付费用
  '专家费': [{
    amount: 9,
    percent: '0.9%',
  }, {
    amount: 9,
    percent: '1.4%',
  }, {
    amount: 0,
    percent: '0.0%',
  }, {
    amount: 0,
    percent: '0.0%',
  }], // 专家费
  '剩余毛佣金': [{
    amount: 699,
    percent: '',
  }, {
    amount: 518,
    percent: '',
  }, {
    amount: 52,
    percent: '',
  }, {
    amount: 205,
    percent: '',
  }], // 剩余毛佣金
  '毛佣金': [{
    amount: 1016,
    percent: '',
  }, {
    amount: 602,
    percent: '',
  }, {
    amount: 110,
    percent: '',
  }, {
    amount: 343,
    percent: '',
  }], // 毛佣金
  '合计': [{
    amount: 317,
    percent: '31.2%',
  }, {
    amount: 84,
    percent: '13.9%',
  }, {
    amount: 58,
    percent: '52.8%',
  }, {
    amount: 138,
    percent: '40.2%',
  }], // 合计
},
otherFee: { //其他费用和占比
  amount: 12,
  percent: '1.1%',
},
// '净佣金（万元）', '路演次数（次）', '路演效率（万元）'，需要去年和今年两年的数据
roadShow: {
  '富国': [787.6, 350.0, 129, 60, 6.1, 5.8],
  '天治': [516.5, 250.0, 132, 65, 3.9, 3.8],
  '中银': [228.3, 130.0,  38, 20, 5.9, 6.5],
  '富安达': [49.3, 20.0, 44, 22, 1.1, 0.9],
},
// 近三年的数据
marketShareData: {
  '富国': [
    ['3.00', '2.55', '2.00', '毛佣金市占率'],
    ['2.47', '1.98', '2.00', '净佣金市占率']
  ],
  '中银': [
    ['6.80', '5.99', '6.00', '毛佣金市占率'],
    ['6.42', '5.14', '5.00', '净佣金市占率']
  ],
  '天治': [
    ['14.00', '12.00', '10.00', '毛佣金市占率'],
    ['12.1', '8.02', '7.00', '净佣金市占率']
  ],
  '富安达': [
    ['6.5', '6.4', '5.0', '毛佣金市占率'],
    ['4.5', '2.8', '3.2', '净佣金市占率'],
  ],
},
// 今年的目标
marketShareGoal: {
  '富国': ['2.10', '94%'],
  '中银': ['5.14', '94%'],
  '天治': ['8.02', '100%'],
  '富安达': ['3.03', '100%'],
},

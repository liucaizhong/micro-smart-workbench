#   m i c r o - s m a r t - w o r k b e n c h  
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

// 多语言 en zh zhl
const fs = require('fs');
const xlsx = require('node-xlsx')
// excel数据
const excelData = xlsx.parse('./excel/local.xlsx');
// 最终数据
let finalArr = [
	[],
	[],
	[],
];

function handelExcel(languageIndex) {
  // excel的第一个sheet
  const excelSheet = excelData[0].data;
  // 表头
  const columns = excelSheet[0];
  console.log(columns)
  // 表头对应的key
  const columnsObj = {
    key: '字段',
    l1: '中国简体',
    l2: '中國繁體',
    l3: '英文'
  }
  let JSONKey = []
  // 设置JSON key值
  columns.forEach(item => {
    for (key in columnsObj) {
      const itemKey = columnsObj[key];
      itemKey === item ? JSONKey.push(key) : ''
    }
  })
  console.log(JSONKey)
  
  // 表内容
  const jsonData = excelSheet.slice(1);
  // console.log('表内容')
  // console.log(jsonData)
  let arrItem = {}
  jsonData.forEach(lineItem => {
	// 剔除空行
	if (lineItem && lineItem.length) {
		lineItem.forEach((item, index) => {
			arrItem = {...arrItem, ...{[lineItem[0]]: lineItem[languageIndex + 1] }}
		})
	}
  })
  finalArr[languageIndex].push(arrItem);
};

// 根据语言包创建文件
['zh-CN', 'zh-TW', 'en'].forEach((item, index) => {
	handelExcel(index);
	generatJSON(`./data/${item}.json`, JSON.stringify(finalArr[index][0], null , '\t'))
})
// generatJSON('./data/data.json', JSON.stringify(finalArr, null , '\t'))


/**
 * 生成JSON文件
 * @param {*} fileName 
 * @param {*} data 
 */
function generatJSON(fileName, data) {
  fs.writeFile(fileName, data, 'utf-8', function (err) {
    if (err) {
      console.log('errr');
    } else {
      console.log('success');
    }
  })
}
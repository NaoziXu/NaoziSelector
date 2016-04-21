1.Introduction
NaoziSelector is a JavaScript plugin based on jQuery fundation framework. The reason why to develop this plugin is because the author was in the coding which is related to a kind of business needs to select something from a lot of options. After drawing lessons from the national train system of his country and a well-known family bucket combo webset of a well-known internet company, the author himself made this makeshift wheel. Anyway, he gains a lot during that coding.
NaoziSelector is a webpage based script plugin. When a coder is in need of sieving a data collection of same structure to different groups, NaoziSelector will be a nice choice. Coders can filter their data to any group sieving in any way according to any character or string property of any collection of any objects based on the premise of not out of the width of the form. They can also display any property value at will and the result options can connect to any callback function they need.

2.Service conditions
NaoziSelector is jQuery fundation based. Coders need to inject jQuery as dependency in their web pages which version should not lower than 1.8.0.

3.Use method
NaoziSelector has a good encapsulation so that coders will not worry about conflict between variables or functions. What they need is just to inject naoziSelector.js or the minimum version in their web pages and then init NaoziSelector to html elements in scripts. They can also inject naoziSelector.css themselves by any order with other css files to prevent style conflicts if they want to change an appearance to NaoziSelector. For more details please learn and see sample in the source code of naoziSelectorDemo.html.

4.Initialization parameters
The following parameters should be provided when coder initializing a NaoziSelector:
nesessary parameters:
    (1)data: {dataArray:[{displayProperty:String,...},...],displayProperty:String}
    data should at least contains two properties of dataArray and displayProperty. dataArray is the collection of data objects and displayProperty is the name of property whose value is used to display on options. dataArray should contains a property which name is the value of displayProperty.
    (2)tabs: {tabDataArray:[{tabDispalyProperty:String,...},...],tabDispalyProperty:String}
    tabs should at least contains two properties of tabDataArray and tabDisplayProperty. tabDataArray is the collection of tab objects and tabDisplayProperty is the name of the property whose value is used to display on tab options. tabDataArray should contains a property which name is the value of tabDisplayProperty.
    (3)sievingRules:function(tabObject,dataObject){return logicExpression:boolean;}
    sievingRules is the filter function which paramaters are tabObject and dataObject. It returns the value of a logic expression. Coders should return a boolean to NaoziSelector which is the result of logic operation between a tab object and a data object. The return value determines wheather to add the option of data object to the option list which is related to the tab object.
unnesessary parameters:
    (1)extraElementPropertys:[{dataProperty:String,elementProperty:String,...}...]
    extraElementPropertys is the collection of the html element property objects. The object should at least contains two propertise of dataProperty and elementProperty. The value of dataProperty is the name of a data object property which value will be set as the value of a html element property of the data options. elementProperty is the name of a html element property which will be set to a data option element. Default:new Array()
    (2)changeInputValue:boolean
    changeInputValue is the identification of wheather to change the value of the host element. true for change and false for not. Default:true
    (3)inputMemoryOn:boolean
    inputMemoryOn is the identification of wheather to set memory of the value of the host element. When the host element changed and the user not choose a new option, the host will roll back to the last option value if inputMemoryOn is true, not if false.Default:true
    (4)hideScroll:boolean
    hideScroll is the identification of wheather to hide the scroll of the option list. true for hide and false for not. Default: false
    (5)lowerHeightIfNotMax:boolean
    lowerHeightIfNotMax is the identification of wheather to make the height of the option list shorter if options cannot full fill it. true for shorter the list and false for not. Default:true
    (6)dataSearch:{isOn:boolean,dataSearchRules:function(dataObject,inputString){return logicExpression:boolean;}
    dataSearch should at least contains two properties of isOn and dataSearchRulse. isOn is the identification of wheather to add the function of searching data options related to the input value. true for add and false for not. dataSearchRulse is a function which paramaters are dataObject and inputString. It returns the value of a logic expression. Coders should return a boolean to NaoziSelector which is the result of logic operation between a data object and the input String. The return value determines wheather to add the option of data object to the search result option list. Default:{false,function(a,b){return false;}}
    (7)parentElement:HtmlElement
    parentElement is the parent html element of NaoziSelector. It will become the direct parent node of NaoziSelector. Default: document.body
    (8)mainContentWidth:number
    mainContentWidth is the width of the main list of NaoziSelector. Default: 400
    (9)searchContentWidth:number
    searchContentWidth is the width of the search list of NaoziSelector. Default: 200
    (10)mainContentMaxHeight:number
    mainContentMaxHeight is the max-height of the main list of NaoziSelector. Default: 265
    (11)searchContentMaxHeight:number
    searchContentMaxHeight is the max-height of the search list of NaoziSelector. Default: 265
    (12)mainContentColumn:number
    mainContentColumn is the number of columns of the main list options. Default: 5
    (13)searchContentColumn:number
    searchContentColumn is the number of columns of the search list options. Default: 2
    (14)mainContentMargin:{marginX:number,marginY:number}
    mainContentMargin is the object of the option margin percentage of the main list. Default:{marginX:1.8,marginY:1.8}
    (15)searchContentMargin:{marginX:number,marginY:number}
    searchContentMargin is the object of the option margin percentage of the search list. Default:{marginX:3.5,marginY:3}
    (16)mainTabsFontSize:number
    mainTabsFontSize is the font size of tab options. Default: 13
    (17)mainContentFontSize:number
    mainContentFontSize is the font size of options in main list. Default: 13
    (18)searchContentFontSize:number
    searchContentFontSize is the font size of options in search list. Default: 13
    (19)position:{offsetX:number,offsetY:number}
    position is the offset between NaoziSelector and the host element. Default: {offsetX:0,offsetY:0}
    (20)callBackFunction:function(dataOptionObject){}
    callBackFunction is the function after the user selected an option which paramater is dataOptionObject. dataOptionObject is the html element of the option which the user selected. Default: function(obj){}

Additions:Code Sample
$("#naoziSelectorInput").naoziSelector({
	//nesessary parameters
	data: {
		dataArray: cityDataList,
		displayProperty: "name"
	},
	tabs: {
		tabDataArray: [{key:0,value:"abcde",title:"ABCDE"},
			{key:1,value:"fghif",title:"FGHIJ"},
			{key:2,value:"klmno",title:"KLMNO"},
			{key:3,value:"pqrst",title:"PQRST"},
			{key:4,value:"uvwxyz",title:"UVWXYZ"}],
		tabDispalyProperty: "title"
	},
	sievingRules: function(tabObject,dataObject){
		if(dataObject.pinyin != null){
			var pinyinFirst = dataObject.pinyin.charAt(0);
			if(tabObject.value.indexOf(pinyinFirst) > -1){
				return true;
			}
		}
		return false;
	},
	//unnesessary paramaters
	extraElementPropertys: [{dataProperty:"code",elementProperty:"city-code"},
		{dataProperty:"pinyin",elementProperty:"city-pinyin"},
		{dataProperty:"x",elementProperty:"city-x"},
		{dataProperty:"y",elementProperty:"city-y"},
		{dataProperty:"name",elementProperty:"title"}],
	changeInputValue: true,
	inputMemoryOn: true,
	hideScroll: false,
	lowerHeightIfNotMax: true,
	dataSearch: {
		isOn:true,
		dataSearchRules:function(dataObject,inputString){
			var searchInputInData = function(index,input,data){
				for(var i=0;i<data.length;i++){
					if(input.charAt(index)==data.charAt(i)){
						if((index+1) < input.length){
							index++;
							continue;
						}
						else
							return true;
					}
				}
				return false;
			}
			var hasAllChar = searchInputInData(0,inputString,dataObject.pinyin);
			return hasAllChar;
		}
	},
	parentElement: $(document.body),
	mainContentWidth: 500,
	searchContentWidth: 200,
	mainContentMaxHeight: 300,
	searchContentMaxHeight: 300,
	mainContentColumn: 6,
	searchContentColumn: 3,
	mainContentMargin: {marginX:2,marginY:2},
	searchContentMargin: {marginX:3.8,marginY:3.2},
	mainTabsFontSize: 15,
	mainContentFontSize: 14,
	searchContentFontSize: 14,
	position: {offsetX:5,offsetY:15},
	callBackFunction: function(clickDataItem){
		alert("CallBack Alert now!You clicked "+clickDataItem.title);
	}
});


1.简介
脑子选择器是一款基于jQuery框架的JavaScript页面插件。之所以开发这款插件是因为作者在编码相关的工作中有相关的业务需求，在借鉴了某国列车系统和某全家桶公司知名团购应用的相关控件后，作者便自己制造了这个适用性还可以的轮子。
脑子选择器是基于网络页面的脚本插件，当使用者在需要对某一相同类型对象集合进行分组筛选时，脑子选择器是一个不错的选择。使用者可以依据任意集合对象的任意字符或字符串属性将数据在总长度不超过表格宽度的前提下以任意方式筛选为任意组，并根据任意属性展示，筛选结果列表的任意选项可以根据使用者的想法进行任何脚本绑定。

2.使用条件
脑子选择器基于jQuery框架，使用者需要在网页中注入不低于jQuery1.8.0的依赖文件。


3.使用方法
脑子选择器有很好的封装性，使用者们不必担心方法或变量冲突。只需在页面中引入脑子选择器的js文件或它的压缩版本后，在脚本中对页面元素对象调用初始化方法即可。如果使用者们想要改变脑子选择器的外观样式，为防止样式冲突，他们也可以通过任何顺序自行给页面加载脑子选择器的css样式表。更多细节见naoziSelectorDemo.html的页面源码。


4.初始化参数
使用者在初始化脑子选择器时需提供以下内容：
必要参数：
    (1)data: {dataArray:[{displayProperty:String,...},...],displayProperty:String}
    为列表数据对象，对象中应至少包含dataArray和displayProperty属性。dataArray为数据对象集合，displayProperty为展示属性名，列表项以displayProperty的值作为选项内容，dataArray应至少包含displayProperty属性。
    (2)tabs: {tabDataArray:[{tabDispalyProperty:String,...},...],tabDispalyProperty:String}
    为列表头对象，对象中应至少包括tabDataArray和tabDispalyProperty属性。tabDataArray为表头数据对象集合，tabDispalyProperty为表头展示属性名，表头项以tabDispalyProperty的值作为表头项内容，tabDataArray应至少包含tabDispalyProperty属性。
    (3)sievingRules:function(tabObject,dataObject){return logicExpression:boolean;}
    为筛选规则方法，参数为tabObject和dataObject，返回值为逻辑表达式的布尔值。使用者以表头对象和数据对象的逻辑运算值作为结果返回脑子选择器，决定是否将数据项筛入表头项对应的列表。
可选参数：
    (1)extraElementPropertys:[{dataProperty:String,elementProperty:String,...}...]
    为额外元素属性对象集合，对象中包括dataProperty和elementProperty属性。dataProperty为数据对象属性名，其值作为属性显示在页面数据项元素的标签中。elementProperty为页面元素属性，其值作为显示在数据项元素标签的属性名。默认: new Array()
    (2)changeInputValue:boolean
    为改变宿主内容标识，true选择后改变宿主内容,false不改变。默认：true
    (3)inputMemoryOn:boolean
    为开启选项记忆标识，true在选择数据项后记忆选择的数据项内容，当宿主内容改变后用户没有选择新的数据项时恢复宿主的内容，false不恢复。默认：true
    (4)hideScroll:boolean
    为隐藏滚动条标识，true隐藏列表滚动条，false不隐藏。默认：false
    (5)lowerHeightIfNotMax:boolean
    为列表高度不满自动缩短标识，true当数据项填充不满列表高度时自动缩短列表，false不缩短。默认：true
    (6)dataSearch:{isOn:boolean,dataSearchRules:function(dataObject,inputString){return logicExpression:boolean;}
    为数据搜索设置对象，对象中应至少包括isOn和dataSearchRules属性。isOn为开启数据搜索标识，true开启搜索功能，false不开启。dataSearchRules为搜索匹配方法，参数为dataObject和inputString，返回值为逻辑表达式的布尔值。使用者以数据对象和键入字符串的逻辑运算作为结果返回脑子选择器，决定是否将数据项筛入搜索结果。
    (7)parentElement:HtmlElement
    为父级元素对象，用于生成选择器页面内容。默认：document.body
    (8)mainContentWidth:number
    为主列表宽度，控制主列表横向尺寸。默认：400
    (9)searchContentWidth:number
    为搜索列表宽度，控制搜索列表横向尺寸。默认：200
    (10)mainContentMaxHeight:number
    为主列表内容最大高度，控制主列表纵向尺寸。默认：265
    (11)searchContentMaxHeight:number
    为搜索列表内容最大高度，控制搜索列表纵向尺寸。默认：265
    (12)mainContentColumn:number
    为主列表内容列数。默认：5
    (13)searchContentColumn:number
    为搜索列表内容列数。默认：2
    (14)mainContentMargin:{marginX:number,marginY:number}
    为主列表数据项间距百分数。默认：{marginX:1.8,marginY:1.8}
    (15)searchContentMargin:{marginX:number,marginY:number}
    为搜索列表数据项间距百分数。默认：{marginX:3.5,marginY:3}
    (16)mainTabsFontSize:number
    为主列表表头选项卡字体大小。默认：13
    (17)mainContentFontSize:number
    为主列表数据项内容字体大小。默认：13
    (18)searchContentFontSize:number
    为搜索列表数据项内容字体大小。默认：13
    (19)position:{offsetX:number,offsetY:number}
    为位置偏移量对象，用于相对宿主位置在页面定位选择器。默认：{offsetX:0,offsetY:0}
    (20)callBackFunction:function(dataOptionObject){}
    为点击数据项回调方法，参数为dataOptionObject，dataOptionObject是选择的数据项元素对象。默认：function(obj){}

示例见Additions中的代码。
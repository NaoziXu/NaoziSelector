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


1.���
����ѡ������һ�����jQuery��ܵ�JavaScriptҳ������֮���Կ������������Ϊ�����ڱ�����صĹ���������ص�ҵ�������ڽ����ĳ���г�ϵͳ��ĳȫ��Ͱ��˾֪���Ź�Ӧ�õ���ؿؼ������߱��Լ���������������Ի����Ե����ӡ�
����ѡ�����ǻ�������ҳ��Ľű��������ʹ��������Ҫ��ĳһ��ͬ���Ͷ��󼯺Ͻ��з���ɸѡʱ������ѡ������һ�������ѡ��ʹ���߿����������⼯�϶���������ַ����ַ������Խ��������ܳ��Ȳ���������ȵ�ǰ���������ⷽʽɸѡΪ�����飬��������������չʾ��ɸѡ����б������ѡ����Ը���ʹ���ߵ��뷨�����κνű��󶨡�

2.ʹ������
����ѡ��������jQuery��ܣ�ʹ������Ҫ����ҳ��ע�벻����jQuery1.8.0�������ļ���


3.ʹ�÷���
����ѡ�����кܺõķ�װ�ԣ�ʹ�����ǲ��ص��ķ����������ͻ��ֻ����ҳ������������ѡ������js�ļ�������ѹ���汾���ڽű��ж�ҳ��Ԫ�ض�����ó�ʼ���������ɡ����ʹ��������Ҫ�ı�����ѡ�����������ʽ��Ϊ��ֹ��ʽ��ͻ������Ҳ����ͨ���κ�˳�����и�ҳ���������ѡ������css��ʽ������ϸ�ڼ�naoziSelectorDemo.html��ҳ��Դ�롣


4.��ʼ������
ʹ�����ڳ�ʼ������ѡ����ʱ���ṩ�������ݣ�
��Ҫ������
    (1)data: {dataArray:[{displayProperty:String,...},...],displayProperty:String}
    Ϊ�б����ݶ��󣬶�����Ӧ���ٰ���dataArray��displayProperty���ԡ�dataArrayΪ���ݶ��󼯺ϣ�displayPropertyΪչʾ���������б�����displayProperty��ֵ��Ϊѡ�����ݣ�dataArrayӦ���ٰ���displayProperty���ԡ�
    (2)tabs: {tabDataArray:[{tabDispalyProperty:String,...},...],tabDispalyProperty:String}
    Ϊ�б�ͷ���󣬶�����Ӧ���ٰ���tabDataArray��tabDispalyProperty���ԡ�tabDataArrayΪ��ͷ���ݶ��󼯺ϣ�tabDispalyPropertyΪ��ͷչʾ����������ͷ����tabDispalyProperty��ֵ��Ϊ��ͷ�����ݣ�tabDataArrayӦ���ٰ���tabDispalyProperty���ԡ�
    (3)sievingRules:function(tabObject,dataObject){return logicExpression:boolean;}
    Ϊɸѡ���򷽷�������ΪtabObject��dataObject������ֵΪ�߼����ʽ�Ĳ���ֵ��ʹ�����Ա�ͷ��������ݶ�����߼�����ֵ��Ϊ�����������ѡ�����������Ƿ�������ɸ���ͷ���Ӧ���б�
��ѡ������
    (1)extraElementPropertys:[{dataProperty:String,elementProperty:String,...}...]
    Ϊ����Ԫ�����Զ��󼯺ϣ������а���dataProperty��elementProperty���ԡ�dataPropertyΪ���ݶ�������������ֵ��Ϊ������ʾ��ҳ��������Ԫ�صı�ǩ�С�elementPropertyΪҳ��Ԫ�����ԣ���ֵ��Ϊ��ʾ��������Ԫ�ر�ǩ����������Ĭ��: new Array()
    (2)changeInputValue:boolean
    Ϊ�ı��������ݱ�ʶ��trueѡ���ı���������,false���ı䡣Ĭ�ϣ�true
    (3)inputMemoryOn:boolean
    Ϊ����ѡ������ʶ��true��ѡ������������ѡ������������ݣ����������ݸı���û�û��ѡ���µ�������ʱ�ָ����������ݣ�false���ָ���Ĭ�ϣ�true
    (4)hideScroll:boolean
    Ϊ���ع�������ʶ��true�����б��������false�����ء�Ĭ�ϣ�false
    (5)lowerHeightIfNotMax:boolean
    Ϊ�б�߶Ȳ����Զ����̱�ʶ��true����������䲻���б�߶�ʱ�Զ������б�false�����̡�Ĭ�ϣ�true
    (6)dataSearch:{isOn:boolean,dataSearchRules:function(dataObject,inputString){return logicExpression:boolean;}
    Ϊ�����������ö��󣬶�����Ӧ���ٰ���isOn��dataSearchRules���ԡ�isOnΪ��������������ʶ��true�����������ܣ�false��������dataSearchRulesΪ����ƥ�䷽��������ΪdataObject��inputString������ֵΪ�߼����ʽ�Ĳ���ֵ��ʹ���������ݶ���ͼ����ַ������߼�������Ϊ�����������ѡ�����������Ƿ�������ɸ�����������
    (7)parentElement:HtmlElement
    Ϊ����Ԫ�ض�����������ѡ����ҳ�����ݡ�Ĭ�ϣ�document.body
    (8)mainContentWidth:number
    Ϊ���б��ȣ��������б����ߴ硣Ĭ�ϣ�400
    (9)searchContentWidth:number
    Ϊ�����б��ȣ����������б����ߴ硣Ĭ�ϣ�200
    (10)mainContentMaxHeight:number
    Ϊ���б��������߶ȣ��������б�����ߴ硣Ĭ�ϣ�265
    (11)searchContentMaxHeight:number
    Ϊ�����б��������߶ȣ����������б�����ߴ硣Ĭ�ϣ�265
    (12)mainContentColumn:number
    Ϊ���б�����������Ĭ�ϣ�5
    (13)searchContentColumn:number
    Ϊ�����б�����������Ĭ�ϣ�2
    (14)mainContentMargin:{marginX:number,marginY:number}
    Ϊ���б���������ٷ�����Ĭ�ϣ�{marginX:1.8,marginY:1.8}
    (15)searchContentMargin:{marginX:number,marginY:number}
    Ϊ�����б���������ٷ�����Ĭ�ϣ�{marginX:3.5,marginY:3}
    (16)mainTabsFontSize:number
    Ϊ���б��ͷѡ������С��Ĭ�ϣ�13
    (17)mainContentFontSize:number
    Ϊ���б����������������С��Ĭ�ϣ�13
    (18)searchContentFontSize:number
    Ϊ�����б����������������С��Ĭ�ϣ�13
    (19)position:{offsetX:number,offsetY:number}
    Ϊλ��ƫ�������������������λ����ҳ�涨λѡ������Ĭ�ϣ�{offsetX:0,offsetY:0}
    (20)callBackFunction:function(dataOptionObject){}
    Ϊ���������ص�����������ΪdataOptionObject��dataOptionObject��ѡ���������Ԫ�ض���Ĭ�ϣ�function(obj){}

ʾ����Additions�еĴ��롣
(function($){
	//inject css if not existed 自动引入样式表
	var jsFiles = document.scripts;
	var jsFilePath;
	for(var i=0;i<jsFiles.length;i++){
		if(jsFiles[i].src.indexOf("naoziSelector.js") > -1 || jsFiles[i].src.indexOf("naoziSelector.min.js") > -1){
			jsFilePath = jsFiles[i].src.substring(0,jsFiles[i].src.lastIndexOf("/") + 1);
			break;
		}
	}
	var cssFilePath = jsFilePath.substring(0,jsFilePath.length-3) + "css/naoziSelector.css";
	var cssFiles = document.getElementsByTagName("link");
	var cssExisted = false;
	for(var i=0;i<cssFiles.length;i++){
		if(cssFiles[i].href.indexOf("naoziSelector.css") > -1){
			cssExisted = true;
			break;
		}
	}
	if(!cssExisted){
		$("<link>").attr({
			rel: "stylesheet",
			type: "text/css",
			href: cssFilePath
		}).appendTo("head");
	}
	//default selector settings 默认设置
	var defaultOptions = {
		data: {dataArray: new Array(),displayProperty:""},
		tabs: {tabDataArray: new Array(),tabDispalyProperty:""},
		sievingRules:function(tabObject,dataObject){return false;},
		extraElementPropertys: new Array(),
		changeInputValue: true,
		inputMemoryOn: true,
		hideScroll: false,
		lowerHeightIfNotMax: true,
		dataSearch: {isOn:false,dataSearchRules:function(dataObject,inputString){return false;}},
		parentElement: $(document.body),
		position: {offsetX:0,offsetY:0},
		mainContentWidth: 400,
		searchContentWidth: 200,
		mainContentHeight: 265,
		searchContentHeight: 265,
		mainContentColumn: 5,
		searchContentColumn: 2,
		mainContentMargin: {marginX:1.8,marginY:1.8},
		searchContentMargin: {marginX:3.5,marginY:3},
		mainTabsFontSize: 13,
		mainContentFontSize: 13,
		searchContentFontSize: 13,
		callBackFunction: function(selectedElement){}
	};
	//load current data list 加载当前列表
	var loadCurrentDataGroup = function(ulElement,dataGroup,lastHostValue,options){
		//remove current data list 清空当前列表
		ulElement.find("li").remove();
		//add new datas 添加对应新列表内容
		for(var i=0;i<dataGroup.length;i++){
			var currentData = dataGroup[i];
			//add data to list生成列表项
			addCurrentData(ulElement,currentData,options);
			//select last option 选中对应项
			if(currentData[options.data.displayProperty] === lastHostValue){
				ulElement.find("li").eq(i).addClass("open");
			}
		}
		setDataListStyle(ulElement,"main",options);
	}
	//set data list style 设置列表样式
	var setDataListStyle = function(ulElement,contentType,options){
		if(contentType=="main"){
			ulElement.find("li").css({
				"width": (100-(options.mainContentColumn+1)*options.mainContentMargin.marginX)/options.mainContentColumn+"%",
				"margin-left": options.mainContentMargin.marginX+"%",
				"margin-bottom": options.mainContentMargin.marginY+"%",
				"font-size": options.mainContentFontSize
			});
		}
		else{
			ulElement.find("li").css({
				"width": (100-(options.searchContentColumn+1)*options.searchContentMargin.marginX)/options.searchContentColumn+"%",
				"margin-left": options.searchContentMargin.marginX+"%",
				"margin-bottom": options.searchContentMargin.marginY+"%",
				"font-size": options.searchContentFontSize
			});
		}
	}
	//add data to list 添加列表项
	var addCurrentData = function(parentElement,currentData,options){
		var currentDataStr = "<li class='naoziSelectorContentItem'";
		for(var j=0;j<options.extraElementPropertys.length;j++){
			currentDataStr += (options.extraElementPropertys[j].elementProperty+"='"+currentData[options.extraElementPropertys[j].dataProperty]+"'");
		}
		currentDataStr += ">"+currentData[options.data.displayProperty]+"</li>";
		parentElement.append(currentDataStr);
	}
	//set option click function 列表项点击事件
	var setContentDataOnclick = function(clickElement,options){
		clickElement.bind("click",function(){
			clickElement.removeClass("open");
			$(this).addClass("open");
			//replace new value to host 替换名称
			if(options.changeInputValue){
				options.hostElement.val($(this).text());
			}
			//callback operators 执行回调函数
			options.callBackFunction(this);
		});
	}
	//show or hide content with animation 动画显示或隐藏列表
	var contentShowHide = function(contentElement,displayType){
		if(displayType=="show"){
			contentElement.slideDown(100);
		}
		else{
			contentElement.slideUp(100);
		}
	}
	//judge and then hide scroll 判断并隐藏滚动条
	var hideContentScroll = function(contentElement,contentType,options){
		if(options.hideScroll && contentElement[0].scrollHeight > contentElement[0].clientHeight){
			if(contentType=="main"){
				contentElement.css({
					"max-width": options.mainContentWidth + scrollWidth
				});
			}
			else{
				contentElement.css({
					"max-width": options.searchContentWidth + scrollWidth
				});
			}
		}
		else{
			if(contentType=="main"){
				contentElement.css({
					"max-width": options.mainContentWidth
				});
			}
			else{
				contentElement.css({
					"max-width": options.searchContentWidth
				});
			}
		}
	}
	var scrollWidth = getWidthOfScroll();
	function getWidthOfScroll(){
		var noScroll, scroll, oDiv = document.createElement("DIV");
		oDiv.style.cssText = "position:absolute; top:-1000px; width:100px; height:100px; overflow:hidden;";
		noScroll = document.body.appendChild(oDiv).clientWidth;
		oDiv.style.overflowY = "scroll";
		scroll = oDiv.clientWidth;
		document.body.removeChild(oDiv);
		return noScroll-scroll;
	}
    $.fn.extend({
        "naoziSelector": function(customOptions){
			var lastHostElementValue = "";
			//add plugin settings 配置插件选项
        	var options = $.extend({}, defaultOptions, customOptions);
			options.hostElement = $(this);
			//set data to different tabs 将数据源根据指定筛选属性按照表头分组
			var dataGroup = new Array();
			if(options.tabs.tabDataArray.length == 0){
				dataGroup.push(options.data.dataArray);
			}
			else{
				for(var i=0;i<options.tabs.tabDataArray.length;i++){
					var group = new Array();
					for(var j=0;j<options.data.dataArray.length;j++){
						if(options.sievingRules(options.tabs.tabDataArray[i],options.data.dataArray[j])){
							group.push(options.data.dataArray[j]);
						}
					}
					dataGroup.push(group);
				}
			}
			
 		 	//init data list 初始化主列表
        	var main = $("<div class='naoziSelectorMain' style='display:none'></div>");
			//init data list content 初始化主列表内容
			$(options.parentElement).append(main);
        	$(main).append('<div class="main"><div class="top"><ul></ul></div><div class="close"></div><div class="content"></div></div>');
			if(options.tabs.tabDataArray.length == 0){
				$(main).find(".main .close").addClass("naoziSelectorDisplayNone");
				$(main).find(".main .content").append("<ul index='0'></ul>");
				loadCurrentDataGroup($(main).find(".main .content ul").eq(0),dataGroup[0],lastHostElementValue,options);
				$(main).find(".main .content").css({"border-top":0});
			}
			else{
				for(var i=0;i<options.tabs.tabDataArray.length;i++){
					$(main).find(".main .content").append("<ul index='"+i+"'></ul>");
					loadCurrentDataGroup($(main).find(".main .content ul").eq(i),dataGroup[i],lastHostElementValue,options);
					if(i > 0){
						 $(main).find(".main .content ul").eq(i).addClass("naoziSelectorDisplayNone");
					}
				}
			}
			//set init data click function 初始化主列表内容点击事件
			setContentDataOnclick($(main).find(".main .content ul li"),options);
			//add memory of current data 记忆选择项
			$(main).find(".main .content ul li").bind("click",function(){
				lastHostElementValue = options.hostElement.val();
			});
			//init list style 初始化主列表样式
			$(main).css({
				"max-width":options.mainContentWidth,
				"left":options.hostElement.offset().left + options.position.offsetX,
				"top":(options.hostElement.offset().top + options.hostElement.height() + 10 + options.position.offsetY)
			});
			setDataListStyle($(main).find(".main .content"),"main",options);
			//init scroll 初始化内容隐藏滚动条
			hideContentScroll($(main).find(".main .content"),"main",options);
			if(options.lowerHeightIfNotMax){
				$(main).find(".main .content").css({
					"max-height":options.mainContentHeight
				});
			}
			else{
				$(main).find(".main .content").css({
					"height":options.mainContentHeight
				});
			}
			if(options.tabs.tabDataArray.length == 0){
				$(main).find(".main .content ul").css({
					"padding-top":"0px"
				});
			}
			else{
				$(main).find(".main .content ul").css({
					"padding-top":options.mainContentMargin.marginY+"%"
				});				
			}
			//init data list tabs 初始化表头内容
			for(var i=0;i<options.tabs.tabDataArray.length;i++){
				$(main).find(".main .top ul").append("<li class='naoziSelectorTopItem' index='"+i+"'>"+options.tabs.tabDataArray[i][options.tabs.tabDispalyProperty]+"</li>");
        		if(i == 0){
        			$(main).find(".main .top ul li").addClass("open");
        		}
        	}
        	//init tabs click function 初始化表头点击事件
        	$(main).find(".main .top ul li").bind("click",function(){
				//focus on current tab 标题选中
				$(this).addClass("open").siblings().removeClass("open");
				//add data list 加载列表项
				$(main).find(".main .content ul").eq($(this).attr("index")).removeClass("naoziSelectorDisplayNone").siblings().addClass("naoziSelectorDisplayNone");
				//set scroll show or hide 判断隐藏滚动条
				hideContentScroll($(main).find(".main .content"),"main",options);
			});
			//init tabs style 初始化表头样式
			$(main).find(".main .top ul").css({
				"max-width":$(main).width() - 20
			});
			$(main).find(".main .top ul li").css({
				"font-size": options.mainTabsFontSize
			});
			
			//switch on data search 开启数据搜索
			var searchElementMain = $("");
			if(options.dataSearch.isOn){
				//init search list style 初始化内容搜索样式
				searchElementMain = $("<div class='naoziSelectorSearch' style='display:none'></div>");
				$(searchElementMain).css({
					"max-width":options.searchContentWidth,
					"left":options.hostElement.offset().left + options.position.offsetX,
					"top":(options.hostElement.offset().top + options.hostElement.height() + 10 + options.position.offsetY)
				});
				//init search list content 初始化搜索列表
				$(options.parentElement).append(searchElementMain);
				$(searchElementMain).append('<div class="main"><div class="content"><ul></ul></div></div>');
				if(options.lowerHeightIfNotMax){
					$(searchElementMain).find(".main .content").css({
						"max-height":options.searchContentHeight
					});
				}
				else{
					$(searchElementMain).find(".main .content").css({
						"height":options.searchContentHeight
					});
				}
				$(searchElementMain).find(".main .content ul").css({
					"padding-top":options.searchContentMargin.marginY+"%"
				});

				//keyup function 键入事件
				options.hostElement.keyup(function(){
					var inputStr = options.hostElement.val();
					if(inputStr == ""){
						contentShowHide($(searchElementMain),"hide");
						contentShowHide($(main),"show");
						return;
					}
					//set search list style 设置样式
					$(searchElementMain).find(".main .content ul li").remove();
					//add search result 添加结果
					var searchResultDataGroup = new Array();
					for(var i=0;i<dataGroup.length;i++){
						var currentGroup = dataGroup[i];
						for(var j=0;j<currentGroup.length;j++){
							var currentData = currentGroup[j];
							//match host value and datas 宿主键入信息匹配数据项
							if(options.dataSearch.dataSearchRules(currentData,inputStr)==true){
								addCurrentData($(searchElementMain).find(".main .content ul"),currentData,options);
								searchResultDataGroup.push(currentData);								
								//focus last data option 选中对应项
								if(currentData[options.data.displayProperty] === lastHostElementValue){
									$(searchElementMain).find(".main .content ul li").eq(searchResultDataGroup.length).addClass("open");
								}
							}
						}
					}
					//judge and hide scroll 判断并隐藏搜索滚动条
					hideContentScroll($(searchElementMain).find(".main .content"),"search",options);
					//init list style 初始化搜索列表数据项样式
					setDataListStyle($(searchElementMain).find(".main .content"),"search",options);
					//show main and hide search 展示搜索隐藏主列表
					if(inputStr != ""){
						contentShowHide($(main),"hide");
						contentShowHide($(searchElementMain),"show");
					}
					//set data click function 搜索结果内容选中
					setContentDataOnclick($(searchElementMain).find(".main .content ul li"),options);
					//add memory of current data 记忆选择项
					$(searchElementMain).find(".main .content ul li").bind("click",function(){
						lastHostElementValue = options.hostElement.val();
						firstTimeTurnOnMain = true;
					});
					$(searchElementMain).find(".main .content ul li").bind("click",function(){
						//focus data list option 将主列表对应项选中
						$(main).find(".main .top ul li").removeClass("open");
						var selectedData;
						for(var i=0;i<searchResultDataGroup.length;i++){
							if($(this).text() == searchResultDataGroup[i][options.data.displayProperty]){
								selectedData = searchResultDataGroup[i];
								break;
							}
						}
						if(options.tabs.tabDataArray.length == 0){
							hideContentScroll($(main).find(".main .content"),"main",options);
							$(main).find(".main .content ul li").removeClass("open");
							for(var j=0;j<dataGroup[0].length;j++){
								if(dataGroup[0][j][options.data.displayProperty] == $(this).text()){
									$(main).find(".main .content ul").eq(0).find("li").eq(j).addClass("open");
									break;
								}
							}							
						}
						else{
							for(var i=0;i<options.tabs.tabDataArray.length;i++){
								if(options.sievingRules(options.tabs.tabDataArray[i],selectedData) == true){
									//focus on current tab 标题选中
									$(main).find(".main .top ul li").eq(i).addClass("open").siblings().removeClass("open");
									//add data list 加载列表项
									$(main).find(".main .content ul").eq(i).removeClass("naoziSelectorDisplayNone").siblings().addClass("naoziSelectorDisplayNone");
									//set scroll show or hide 判断隐藏滚动条
									hideContentScroll($(main).find(".main .content"),"main",options);
									$(main).find(".main .content ul li").removeClass("open");
									for(var j=0;j<dataGroup[i].length;j++){
										if(dataGroup[i][j][options.data.displayProperty] == $(this).text()){
											$(main).find(".main .content ul").eq(i).find("li").eq(j).addClass("open");
											break;
										}
									}
									break;
								}
							}
						}
					});
				});
			}

 		 	//set click lisener 界面点击事件
			var lastFocusElement = null;
			var firstTimeTurnOnMain = true;
 		 	$(document).click(function(event){
				var currentFocusElement = $(event.target);
				//set memory to host 恢复记忆内容
				if((options.inputMemoryOn && currentFocusElement.closest($(main)).length <= 0 && currentFocusElement.closest($(searchElementMain)).length <= 0)
				|| currentFocusElement.closest($(main).find(".main .close")).length > 0){
					options.hostElement.val(lastHostElementValue);
				}
				//select hostElement value 选中宿主元素内容
				if((currentFocusElement.closest($(main)).length > 0 && currentFocusElement.closest($(main).find(".main .close")).length <= 0 && (!currentFocusElement.hasClass("naoziSelectorContentItem")))
				|| currentFocusElement.closest(options.hostElement).length > 0){
					options.hostElement.select();
				}
				//show main data list 展示主列表
				if((currentFocusElement.closest($(main)).length > 0 && currentFocusElement.closest($(main).find(".main .close")).length <= 0 && (!currentFocusElement.hasClass("naoziSelectorContentItem")))
				|| currentFocusElement.closest(options.hostElement).length > 0){
					contentShowHide($(main),"show");
					if(firstTimeTurnOnMain){
						hideContentScroll($(main).find(".main .content"),"main",options);
						firstTimeTurnOnMain = false;
					}						
 		 	    }
 		 	    else{
					contentShowHide($(main),"hide");
 		 	    }
				//show search list 展示搜索列表
				if(currentFocusElement.closest($(searchElementMain)).length > 0 && (!currentFocusElement.hasClass("naoziSelectorContentItem"))){
					contentShowHide($(searchElementMain),"show");					
				}
				else{					
					contentShowHide($(searchElementMain),"hide");					
				}
			});

			//set browser resize lisener 浏览器大小变化事件
			$(window).resize(function(){
				$(main).css({
					"left":options.hostElement.offset().left + options.position.offsetX,
					"top":(options.hostElement.offset().top + options.hostElement.height() + 10 + options.position.offsetY)
				});
				$(searchElementMain).css({
					"left":options.hostElement.offset().left + options.position.offsetX,
					"top":(options.hostElement.offset().top + options.hostElement.height() + 10 + options.position.offsetY)
				});
				$(main).find(".main .top ul").css({
					"max-width":$(main).width() - 20
				});
			});
        }
    });
})(jQuery);
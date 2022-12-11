
var totalNbrGames=1;
if(window.location.href.indexOf("bigboxcollection")>0)
	totalNbrGames=711;
var imageChunkSize=2000;
var postID=0;
var boxcontent=0;
var contentzoom=1;
var contentDetailsPanel=0;
var details=0;
var detailsStyle="float";
var massacre=0;
var camera;
var scene;
var renderer;
var canvasBox;
var mesh;
var meshLeft;
var meshRight;
var fighterLeft=0;
var fighterRight=1;
var showFightInfo=0;
var ratioCorr=1;
var currentBox=0;
var quality=1;
var webp="";
var fullscreen=0;
var qualityOld=3;
var size=120;	
var targetCRotation=0;
var zoom=1.5;
var today = new Date();
var pathCollection="cover";	
var widthVar=4;
var heightVar=5;
var BBCollection;
var maxpoints=0;
var lastChanged="";
var price="";
var points=0;
var score=0;
var won=0;
var lost=0;
var total=0;
var rank=0;
var lastValue="";
var dateAdded=0;
var autoloadBlogs;
var webGL=false;
var nbrRounds=0;
var nbrwins=0;
var lastwinner="";
var nextopponent="";
/*
if(window.location.href.indexOf("bigboxcollection")>0)
	qualityOld=0;
*/
var SiteTitle="Big Box Collection";
var qualityFolder= ["1kvlow","1klow","1kmed","1khi","2kmed","2khi","05klow"];
var nbrBG=4;
var BGset=1;
var boxTitle="";
var targetPositionLeft = targetPositionRight=0;
var targetPositionZLeft=targetPositionZRight=0;
var targetXRotation=0;
var targetYPosition=0;
var targetZPosition=0;
var targetXPosition=0;
var targetXRotationRight=targetXRotationLeft=targetYRotationLeft=targetYRotationRight=0;
var targetPositionXLeft=targetPositionXRight=0;
var tartetCRotation=0;
var fightongoing=0;
var frontface=1;
var boxfight=0;
var showPage="Overview";
var TexturesLoaded=0;
var texture;
var material;
var BoxFocused=-1;
var filterby="";
var orderFiltered=[];
var nbrAttributs=19;
var nbrBoxes=boxes.length/nbrAttributs;
var nbrWishlist;
var nbrQueue;
var nbrLeftovers;
var biggestBox=0;
var smallestBox=0;
var secondBiggestBox=0;
var windowHalfX = window.innerWidth / 3;
var windowHalfY = window.innerHeight / 3;
var QuickFightOpponent=-1;
var MassacreFighter=-1;
var nbrOpenFights=0;
var CurrentViewName="";
var CurrentView="collection";
var LastView="";
var formatGal;
var everythingLoaded;
var countBoxesLoaded=0;

var geometry = new THREE.CubeGeometry( boxes[3], boxes[4], boxes[5]); 

var targetRotation = 1.2;
var targetRotationOnMouseDown = 0;

var mouseX = 0;
var mouseXOnMouseDown = 0;

var mouseY = 0;
var mouseYOnMouseDown = 0;
var mouseYOnMouseThreshold = 0;
var zoomDefault=240;
var zoomMin=40;
var zoomMax=600;
if(window.location.href.indexOf("bigboxcollection")>0){
	zoomDefault=800;
	zoomMin=240;
	zoomMax=1200;
}
var zooming=0;
var showMenu=0;
var showSearch=0;
var showRanking=0;

var GalView="cover"; // cover spine
var GalRatio="adjusted"; // adjusted original
var GalOrder="name"; // name height color release dateadded ranking price lastupdate

var byId = function( id ) { return document.getElementById( id ); };

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
function changeQuality(x){
	qualityOld=x;
	quality=x;
	if(showPage=='Collection'){
		changeBox(currentBox);
	}	
}
function setBusy(){
	hidePage();
	byId('greyout').style.display='block';
	byId('greyout').style.opacity=0.9;
	byId('idle').style.zIndex=9;
	byId('idle').style.display='block';
	byId('idle').style.opacity=1;
}
function hidePage(){
	// hide Menus + Fightinfo
	if(byId('search'))
		byId('search').style.left="-340em";
	if(byId('FightInfo'))
		byId('FightInfo').style.top='-340em';
	if(byId('LoadingFight'))
		byId('LoadingFight').style.display="none";
	if(byId('greyout')){
		byId('greyout').style.display='none';
		byId('greyout').style.opacity=0;
		byId('greyout').style.zIndex=0;
	}
	if(byId('BoxView'))
		byId('BoxView').style.display="none";
	if(byId('leftBox'))
		byId('leftBox').style.display="none";
	if(byId('rightBox'))
		byId('rightBox').style.display="none";
	if(byId('back2Overview'))
		byId('back2Overview').style.display="none";
	if(byId('bg'))
		byId('bg').style.opacity=0;

	if(byId('bgFight'))
		byId('bgFight').style.opacity=0;
	if(byId('bgFightCover'))
		byId('bgFightCover').style.opacity=0;		
		
	if(byId('rankedBoxes')){
		byId('rankedBoxes').style.opacity=0;
		byId('Ranking').style.zIndex=0;
	}
	if(byId('idle')){
		byId('idle').style.display="none";
		byId('idle').style.opacity=0;
	}
	
	if(showPage=="Overview"){
		if(byId('bg'))
			byId('bg').style.opacity=0;
		if(byId('BoxDown'))
			byId('BoxDown').style.display="none";
		if(byId('BoxUp'))
			byId('BoxUp').style.display="none";
		if(byId('box')){
			byId('box').style.opacity=0;
			byId('box').style.display="none";
		}
		if(byId('boxName'))
			byId('boxName').style.display="none";
		if(byId('LoadingLeftBox'))
			byId('LoadingLeftBox').style.display="none";
		if(byId('LoadingRightBox'))
			byId('LoadingRightBox').style.display="none";
		if(byId('gallery')){
			byId('gallery').style.opacity=0;
		}
		if(byId('menu')){
			byId('menu').style.opacity=0;
			byId('menu').style.zIndex=0;
		}
		if(byId('GameDetails')){
			byId('GameDetails').style.display="none";
		}
		if(byId('mDetails')){
			byId('mDetails').style.display="none";
		}
		if(byId('share3DBox')){
			byId('share3DBox').style.display="none";
		}
		if(byId('download')){
			byId('download').style.display="none";
		}
		if(byId('export')){
			byId('export').style.display="none";
		}
		if(byId('embed')){
			byId('embed').style.display="none";
		}
		scene.remove(mesh);		
	}
	if(showPage=="Collection"){
		if(byId('bg'))
			byId('bg').style.opacity=0;
		scene.remove(mesh);	
		if(byId('BoxDown'))
			byId('BoxDown').style.display="none";
		if(byId('BoxUp'))
			byId('BoxUp').style.display="none";
		if(byId('box')){
			byId('box').style.opacity=0;
			byId('box').style.display="none";
		}
		if(byId('boxName'))
			byId('boxName').style.display="none";
		if(byId('LoadingLeftBox'))
			byId('LoadingLeftBox').style.display="none";
		if(byId('LoadingRightBox'))
			byId('LoadingRightBox').style.display="none";
	}
	if(showPage=="BoxFight"){
		if(byId('LoadingFight'))
			byId('LoadingFight').style.opacity=0;
		byId('bgFight').style.opacity=0;
		byId('bgFightCover').style.opacity=0;
		if(mesh)
			scene.remove(mesh);
		if(meshRight)
			scene.remove(meshRight);
		if(meshLeft)
			scene.remove(meshLeft);
			
		for(var i=0;i<scene.children.length;i++){
			if(scene.children[i].type=="Mesh")
				scene.remove(scene.children[i]);
		}
		if(byId('box'))
			byId('box').style.display="none";
		if(byId('boxName'))
			byId('boxName').style.display="none";
	}
	if(showPage=="Ranking"){
		if(byId('Ranking')){
			byId('rankedBoxes').style.opacity=0;
		}
		if(byId('LoadingLeftBox'))
			byId('LoadingLeftBox').style.display="none";
		if(byId('LoadingRightBox'))
			byId('LoadingRightBox').style.display="none";
	}
}

function toggleOverview(){
	if(details==1){
		camera.rotation.y=0;
		toggleDetails();
		details=1;
	}
	if(showPage=="BoxFight"){
		hidePage();	
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
			GalOrder="ranking2";
		else
			GalOrder='ranking';
		
		initCollection();
		changeView('collection');
	}
	
	showPage="Overview";
	hidePage();	
	byId('box').style.boxShadow="0 0 80px 45px #000 inset";
	byId('box').style.backgroundImage="url('images/bg/bg7.png')";
	
	byId('bg').style.opacity=1;
	byId('gallery').style.opacity=1;
	byId('gallery').style.zIndex=2;
	if(byId('menu')){
		byId('menu').style.opacity=1;
		byId('menu').style.zIndex=2;
	}	
	byId('header').style.display="block";
	byId('mainMenu').style.display="inline";
	
	byId('BackToOverview').innerHTML="Back to Collection";
	byId('gallery').style.display="block";
	if(byId('box'+BoxFocused))
		byId('box'+BoxFocused).focus();
	changeView(CurrentView);
}

function toggleSearch(){
	if(byId('BoxView'))
		byId('BoxView').style.display="none";
	
	if(showSearch==1){
		byId('search').style.right="-34em";
		byId('greyout').style.zIndex=0;
		byId('greyout').style.opacity=0;
		setTimeout("byId('greyout').style.display='none';",300);
		showSearch=0;
	}
	else{
		byId('search').style.right="0em";
		byId('greyout').style.display="block";
		byId('greyout').style.opacity=0.8;
		byId('greyout').style.zIndex=4;
		showSearch=1;
	}
}
function changeView(view){
	if(view!="contact"){
		byId('contact_box').style.opacity=0;
		setTimeout("byId('contact_box').style.display='none';",250);
		byId('contact_MenuItem').className = "";
	}
	if(view!="settings"){
		byId('settings_box').style.opacity=0;
		setTimeout("byId('settings_box').style.display='none';",250);
		byId('settings_MenuItem').className = "";
	}
	if(view!="blog"){
		byId('blog_box').style.opacity=0;
		setTimeout("byId('blog_box').style.display='none';",250);
		byId('blog_MenuItem').className = "";		
	}
	if(view!="ThreeDBB"){
		byId('ThreeDBB_box').style.opacity=0;
		setTimeout("byId('ThreeDBB_box').style.display='none';",250);
		byId('ThreeDBB_MenuItem').className = "";
	}
	if(view!="tipjar"){
		byId('tipjar_box').style.opacity=0;
		setTimeout("byId('tipjar_box').style.display='none';",250);
		byId('tipjar_MenuItem').className = "";
	}
	if(view!="collection"){
		byId('collection_box').style.opacity=0;
		setTimeout("byId('collection_box').style.display='none';",250);
		byId('collection_MenuItem').className = "";
	}
	if(view!="queue"){
		byId('queue_box').style.opacity=0;
		setTimeout("byId('queue_box').style.display='none';",250);
		byId('queue_MenuItem').className = "";
	}
	if(view!="wishlist"){
		byId('wishlist_box').style.opacity=0;
		setTimeout("byId('wishlist_box').style.display='none';",250);
		byId('wishlist_MenuItem').className = "";
	}
	if(view!="leftovers"){
		byId('leftovers_box').style.opacity=0;
		setTimeout("byId('leftovers_box').style.display='none';",250);
		byId('leftovers_MenuItem').className = "";
	}
	if(view!="settings"){
		byId('settings_box').style.opacity=0;
		setTimeout("byId('settings_box').style.display='none';",250);
		byId('settings_MenuItem').className = "";
	}
	if(view!=LastView)
		setTimeout("byId('gallery').scrollTop = 0",200);
	if(byId(view+'_box'))
		byId(view+'_box').style.display='block';
	if(view=="blog"){
		window.location="#Blog";
		history.replaceState(null, null, '#Blog');
		document.title=SiteTitle+": Blog";
		CurrentViewName="Big Box Blog";
		CurrentView="blog";
		setTimeout("byId('blog_box').style.opacity=1;",250);
		loadBlog(postID,0);		
		autoloadBlogs=byId('gallery').addEventListener('scroll', LazyLoadBlogs, false);
	}
	else if(view=="collection"){
		if(filterby!=""){
			window.location="#CollectionOverview>"+encodeURIComponent(filterby);
		} else {
			window.location="#CollectionOverview";
			history.replaceState(null, null, '#CollectionOverview');
		}
		document.title=SiteTitle+": Collection";
		CurrentViewName="Big Box Collection";
		CurrentView="collection";
		setTimeout("byId('collection_box').style.opacity=1;",250);		
	}
	else if(view=="queue"){
		window.location="#CollectionUpcoming";
		history.replaceState(null, null, '#CollectionUpcoming');
		CurrentViewName="Big Box Collection | Upcoming";
		document.title=SiteTitle+": Upcoming";
		CurrentView="queue";
		setTimeout("byId('queue_box').style.opacity=1;",250);
	}
	else if(view=="wishlist"){
		window.location="#CollectionWishlist";
		history.replaceState(null, null, '#CollectionWishlist');
		document.title=SiteTitle+": Wishlist";
		CurrentViewName="Big Box Collection | Wishlist";
		CurrentView="wishlist";
		setTimeout("byId('wishlist_box').style.opacity=1;",250);
	}
	else if(view=="leftovers"){
		window.location="#CollectionMarket";
		history.replaceState(null, null, '#CollectionMarket');
		document.title=SiteTitle+": For Sale";
		CurrentViewName="Big Box Collection | For Sale";
		CurrentView="leftovers";
		setTimeout("byId('leftovers_box').style.opacity=1;",250);
	}
	else if(view=="settings"){
		window.location="#Settings";
		history.replaceState(null, null, '#Settings');
		document.title=SiteTitle+": Settings";
		CurrentViewName="Settings";
		CurrentView="settings";		
		setTimeout("byId('settings_box').style.opacity=1;",250);
	}
	else if(view=="contact"){
		window.location="#AboutMe";
		history.replaceState(null, null, '#AboutMe');
		document.title=SiteTitle+": About Me";
		CurrentViewName="About Me";
		CurrentView="contact";
		setTimeout("byId('contact_box').style.opacity=1;",250);
	}
	else if(view=="tipjar"){
		window.location="#TipJar";
		history.replaceState(null, null, '#TipJar');
		document.title=SiteTitle+": Tip Jar";
		CurrentViewName="Tip Jar";
		CurrentView="tipjar";
		setTimeout("byId('tipjar_box').style.opacity=1;",250);
	}
	else if(view=="ThreeDBB"){
		window.location="#ThreeDBB";
		history.replaceState(null, null, '#ThreeDBB');
		document.title=SiteTitle+": 3DBB.zip";
		CurrentViewName="3DBB.zip";
		CurrentView="ThreeDBB";
		setTimeout("byId('ThreeDBB_box').style.opacity=1;",250);
	}
	LastView=CurrentView;
	byId('CurrentViewName').innerHTML=CurrentViewName;
	byId(view+'_MenuItem').className = "selected";
	if(CurrentView=="collection" || CurrentView=="queue" || CurrentView=="wishlist" || CurrentView=="leftovers")
		setTimeout("formatShelf()", 500);
	if(byId('bg').offsetWidth<800 && showMenu==1){
		toggleMenu();
	}
}
function toggleMenu(){
	if(byId('BoxView'))
		byId('BoxView').style.display="none";
	if(showMenu==1){
		byId('menu').style.left="-34em";
		
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
			byId('gallery').style.paddingLeft="1em";
		else		
			byId('gallery').style.paddingLeft="2em";
		byId('greyout').style.opacity=0;
		byId('gallery').style.zIndex=1;
		setTimeout("byId('greyout').style.display='none';",300);
		setTimeout("byId('greyout').style.zIndex=0;",300);
		showMenu=0;
	}
	else{
		byId('menu').style.left="0em";
		byId('greyout').style.display="block";		
		if(byId('bg').offsetWidth<800){
			byId('gallery').style.zIndex=0;
			byId('greyout').style.zIndex=1;
			byId('greyout').style.top="5em";
			byId('menu').style.zIndex=2;
			byId('menu').style.top="5em";
			byId('menubox').style.background="#f5f5f5";
			byId('openMenu').style.display="inline";
			byId('fixedMenu').style.display="none";
			setTimeout("byId('greyout').style.opacity=0.8;",100);
		}
		else{
			byId('gallery').style.paddingLeft="16em";	
			byId('greyout').style.zIndex=0;
			byId('gallery').style.zIndex=1;
			byId('greyout').style.opacity=0;	
			byId('menu').style.zIndex=2;		
			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
			} else {
				byId('openMenu').style.display="none";
				byId('fixedMenu').style.display="inline";
			}
		}
		if(byId('settingsicon'))
			byId('settingsicon').style.transform="rotate(-720deg)";
		showMenu=1;
	}
}
function toggleCollection(x){	
	if(showPage=="Collection"){
		if(byId('BoxView'))
			byId('BoxView').style.display="none";
		return;
	}
	hidePage();
	showPage="Collection";
	byId('bg').style.opacity=1;
	byId('header').style.display="none";
	byId('mainMenu').style.display="none";
	byId('back2Overview').style.display="block";
	byId('BoxDown').style.display="block";
	byId('BoxUp').style.display="block";
	byId('box').style.display="block";
	byId('boxName').style.display="block";
	byId('boxName').style.bottom="1.2em";
	byId('box').style.opacity=0;

	var qualBox='quality'+qualityFolder[qualityOld];
	if(byId(qualBox))
		byId(qualBox+webp).checked = true;
	quality=qualityOld;
	
	if(byId('GameDetails')){
		byId('GameDetails').style.display="inline";
	}
	if(byId('mDetails')){
		byId('mDetails').style.display="inline";
	}
	if(byId('share3DBox')){
		byId('share3DBox').style.display="inline";
	}
	if(byId('download')){
		byId('download').style.display="inline";
	}
	if(byId('export')){
		byId('export').style.display="inline";
	}
	/*
	if(byId('embed')){
		byId('embed').style.display="inline";
	}
	*/
	changeBox(x);
}
function getEmbedURL(){	
	if(showPage!="Collection"){
		return;
	}	
	var url="3DBBEmbed/?h="+boxes[currentBox*nbrAttributs+5]+"&w="+boxes[currentBox*nbrAttributs+4]+"&d="+boxes[currentBox*nbrAttributs+3]+"&t="+boxes[currentBox*nbrAttributs+2];		
	window.open(url, '_blank');
}
function exportBigBox(){	
	if(showPage!="Collection"){
		return;
	}	
	var url="3DBBExport/?h="+boxes[currentBox*nbrAttributs+5]+"&w="+boxes[currentBox*nbrAttributs+4]+"&d="+boxes[currentBox*nbrAttributs+3]+"&t="+boxes[currentBox*nbrAttributs+2];		
	window.open(url, '_blank');
}
function downloadPaperCraft(){	
	if(showPage!="Collection"){
		return;
	}
	var url="papercraft_"+boxes[currentBox*nbrAttributs+2]+".html";
	var url=""+boxes[currentBox*nbrAttributs+2]+".paperbox";
	window.open(url, '_blank');
}
function toggleShareInfo(){
	if(byId('share3DBoxContainer').style.top!="-84em"){
		byId('share3DBoxContainer').style.top="-84em";
		byId('share3DBoxContainerBox').style.boxShadow="none";
		byId('greyout').style.display="none";
		byId('greyout').style.zIndex=4;		
	}else{
		byId('shareLink3DBox').value="https://bigboxcollection.com/"+boxes[currentBox*nbrAttributs+2]+".3DBox";
		byId('share3DBoxContainer').style.top="calc(50% - 50px)";
		byId('share3DBoxContainer').style.left="calc(50% - 200px)";
		byId('share3DBoxContainer').style.left="0";
		byId('share3DBoxContainer').style.right="0";		
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
			byId('share3DBoxContainerBox').style.width="auto";
		byId('share3DBoxContainerBox').style.margin="auto";
		byId('share3DBoxContainerBox').style.boxShadow="0 0 0 1000em rgba(0,0,0,0.7)";
		byId('greyout').style.display="block";
		byId('greyout').style.zIndex=4;
	}
}
function toggleFightInfo(x){

	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){
		if(screen.width<screen.height){
			alert("You might wanna turn your phone sideways and activate full screen mode.");
		}
		byId('fightInfoKeyboard').style.display="none";
		byId('FightInfobox').style.width="90%";
	}
	if(showPage=="BoxFight"){
		if(byId('BoxView'))
			byId('BoxView').style.display="none";
		return;
	}
	window.location="#BoxFight";
	nbrRounds=0;
	BGset=0;
	BGset=Math.ceil(Math.random()*nbrBG);
	byId('bgFight').style.backgroundImage="url(images/fight/BG"+BGset+".gif)";
	byId('LoadingFight').style.backgroundSize="20em";
	byId('nbrFights').innerHTML=nbrFights();
	if(byId('BoxView'))
		byId('BoxView').style.display="none";
	byId('FightInfo').style.top="calc(50% - 200px)";
	byId('FightInfo').style.left="calc(50% - 200px)";
	byId('FightInfo').style.left="0";
	byId('FightInfo').style.right="0";
	byId('FightInfobox').style.margin="auto";
	byId('FightInfobox').style.boxShadow="0 0 0 1000em rgba(0,0,0,0.7)";
	byId('greyout').style.display="block";
	byId('greyout').style.zIndex=4;
	byId('BackToOverview').innerHTML="Show Results";
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		byId('LoadingFight').style.backgroundSize="15em";
		byId('fightstats').style.top="calc(10% + 2.5em)";
		byId('FightInfo').style.top="10%";
	}
	setTimeout("byId('greyout').style.opacity=0.8;",100);
}
function toggleFullScreen(){
	if ((document.fullScreenElement && document.fullScreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
		if (document.documentElement.requestFullScreen) {  
			document.documentElement.requestFullScreen();  
		} else if (document.documentElement.mozRequestFullScreen) {  
			document.documentElement.mozRequestFullScreen();  
		} else if (document.documentElement.webkitRequestFullScreen) {  
			document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  
		}  
		fullscreen=1;
		byId('fullscreen').src="images/ui/ic_fullscreen_exit_white_24dp.png";	
	} else {  
		if (document.cancelFullScreen) {  
			document.cancelFullScreen();  
		} else if (document.mozCancelFullScreen) {  
			document.mozCancelFullScreen();  
		} else if (document.webkitCancelFullScreen) {  
			document.webkitCancelFullScreen();  
		}  
		fullscreen=0;
		byId('fullscreen').src="images/ui/ic_fullscreen_white_24dp.png";
	}
	onWindowResize();
}
function nbrFights(){
	var fights=(nbrBoxes*(nbrBoxes-1))/2;
	return fights.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function showNextPrev(x){
	var gID=0;
	if(filterby==""){
		gID=order.lastIndexOf(boxes[currentBox*nbrAttributs+2]);
		if( (gID+x) >= 0 && (gID+x) <order.length){
			currentBox=(boxes.lastIndexOf(order[gID+x])-2)/nbrAttributs;
			changeBox(currentBox);
		}
	} else {
		gID=orderFiltered.lastIndexOf(boxes[currentBox*nbrAttributs+2]);
		if( (gID+x) >= 0 && (gID+x) <orderFiltered.length){
			currentBox=(boxes.lastIndexOf(orderFiltered[gID+x])-2)/nbrAttributs;
			changeBox(currentBox);
		}
	}
}

function toggleMassacre(){
	if(showPage!="Collection")
		return;
		
	if(details){
		toggleDetails();
	}
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
		if(massacre==0){
			massacre=1;
			byId('boxName').style.opacity=0;
			byId('boxName').style.zIndex=0;
			byId('massacre').style.opacity=1;
			byId('massacre').style.right="0em";
			byId('massacre').style.top="4em";
			byId('massacre').style.bottom="5em";
			byId('massacre').style.width="90%";
			byId('massacre').style.padding="0em 5%";
			byId('massacreBox').style.background="#222";
			fightAll();
		}
		else{
			massacre=0;
			byId('massacre').style.opacity=0;
			byId('massacre').style.right="-100%";
			byId('massacreBox').style.background="#222";
		}
	}
	else{
		if(massacre==0){
			massacre=1;
			byId('boxName').style.opacity=0;
			byId('boxName').style.zIndex=0;
			byId('massacre').style.opacity=1;
			byId('massacre').style.right="0em";
			byId('idle').style.left="25%";
			fightAll();
		}
		else{
			massacre=0;
			byId('boxName').style.opacity=1;
			byId('boxName').style.zIndex=3;
			byId('massacre').style.opacity=0;
			byId('massacre').style.right="-60%";
			byId('idle').style.left="50%";
		}
	}
	onWindowResize();
}

function fightAll(){
	var theurl="getFights.php?box="+boxes[currentBox*nbrAttributs+2];
	var xmlhttp13 = new XMLHttpRequest();
	xmlhttp13.onreadystatechange = function() {
		if (xmlhttp13.readyState == 4 && xmlhttp13.status == 200) {
			var FightResults = xmlhttp13.responseText;
			if(!IsJsonString(FightResults)){
				alert ("ERROR! Couldn't load Data :-/ ("+FightResults+")");
			}
			FightResults = JSON.parse(FightResults);
			var Boxring="";
			var prefScore=999;
			for (var i=0;i<(Object.keys(FightResults.games).length);i++){
				var score=FightResults.games[i]["score"];
				var game=(boxes.lastIndexOf(FightResults.games[i]["game"])-2)/nbrAttributs;
				if(game==currentBox)
					continue;
				if(score==0){
					if(prefScore!=score){
						Boxring+="<hr/><h2>Fights Won</h2><p style='text-align:justify !important'>";
						prefScore=score;
					}
					Boxring+="<div class='";
					Boxring+="won' onClick='updateFight("+currentBox+","+game+");'><img src='images/coverM/"+boxes[game*nbrAttributs+2]+".jpg'></div> ";
				}
				else if (score==1){
					if(prefScore!=score){
						Boxring+="<hr/><h2>Fights Lost</h2><p style='text-align:justify !important'>";
						prefScore=score;
					}
					Boxring+="<div class='";
					Boxring+="lost' onClick='updateFight("+game+","+currentBox+");'><img src='images/coverM/"+boxes[game*nbrAttributs+2]+".jpg'></div> ";
				}
				else{
					if(prefScore!=score){
						Boxring+="<hr/><h2>Fights not fought yet</h2>";
						prefScore=score;
						
						QuickFightOpponent=game;
						var width=byId('massacreBoxes').offsetWidth*0.60;
						var margin=(byId('massacreBoxes').offsetWidth-width)/2*0.7;
						var height=(boxes[game*nbrAttributs+5]*width/boxes[game*nbrAttributs+4]);
						Boxring+="<p><div class='open' style='margin:0 "+margin+"px;'><div style='width:"+(width/2)+"px;' class='";
						Boxring+="openL' onClick='saveFight("+currentBox+","+game+");'><img src='images/cover/"+boxes[game*nbrAttributs+2]+".jpg' style='height:"+height+"px !important;'></div><div style='width:"+(width/2)+"px' class='";
						Boxring+="openR' onClick='saveFight("+game+","+currentBox+");'><img src='images/cover/"+boxes[game*nbrAttributs+2]+".jpg' style='height:"+height+"px !important;margin-left:-"+(width/2)+"px;'></div></div></p><p style='text-align:justify !important'>";
					}
					else {
						var width=(boxes[game*nbrAttributs+4]*150/boxes[game*nbrAttributs+5]);
						Boxring+="<div class='open'><div style='width:"+(width/2)+"px;' class='";
						Boxring+="openL' onClick='saveFight("+currentBox+","+game+");'><img src='images/coverM/"+boxes[game*nbrAttributs+2]+".jpg'></div><div style='width:"+(width/2)+"px' class='";
						Boxring+="openR' onClick='saveFight("+game+","+currentBox+");'><img src='images/coverM/"+boxes[game*nbrAttributs+2]+".jpg' style=';margin-left:-"+(width/2)+"px;'></div></div> ";
					}
				}
			}
			Boxring+="</p>";
			if(byId('massacreBoxes')){
				byId('massacreBoxes').innerHTML=Boxring;
			}
		}
	}
	xmlhttp13.open( "GET", theurl, true);
	xmlhttp13.send( null );	
}
function saveFight(winner,loser){
	var theurl="";
	if(winner<loser)
		theurl="saveFight.php?fighter1="+boxes[winner*nbrAttributs+2]+"&fighter2="+boxes[loser*nbrAttributs+2]+"&score1=1&score2=0";
	else
		theurl="saveFight.php?fighter1="+boxes[loser*nbrAttributs+2]+"&fighter2="+boxes[winner*nbrAttributs+2]+"&score1=0&score2=1";
	var xmlHttp14 = new XMLHttpRequest();
	xmlHttp14.onreadystatechange = function() {
		if (xmlHttp14.readyState == 4 && xmlHttp14.status == 200) {
			fightAll()
		}
	}
	xmlHttp14.open( "GET", theurl, true );
	xmlHttp14.send( null );
}
function updateFight(winner,loser){
	var theurl="saveMassacre.php?winner="+boxes[winner*nbrAttributs+2]+"&fighter2="+boxes[loser*nbrAttributs+2];
	alert(theurl);
	/*
	var xmlHttp14 = new XMLHttpRequest();
	xmlHttp14.onreadystatechange = function() {
		if (xmlHttp14.readyState == 4 && xmlHttp14.status == 200) {
			fightAll()
		}
	}
	xmlHttp14.open( "GET", theurl, true );
	xmlHttp14.send( null );
	*/
}
function changeFighter(id,side){
	if(side==0){
		renderer.clear();	
		renderer.dispose();	
		if ( webglAvailable() ) {
			webGL=true;
			renderer = new THREE.WebGLRenderer({ antialias: true, stencil: true, alpha: true });
			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))	
				renderer.setPixelRatio( window.devicePixelRatio/3 );
			else{
				renderer.setPixelRatio( (1920/window.innerWidth) );
			}
			renderer.setSize( window.innerWidth, window.innerHeight );
			byId('box').innerHTML="";
			byId('box').insertBefore(renderer.domElement, byId('box').childNodes[0]);
		} else {
			alert("Sorry, no WebGL detected and therefore sadly no 3D boxes :-/");
			renderer = new THREE.CanvasRenderer({ alpha: true,antialias: true });
			renderer.setSize( window.innerWidth*0.8, window.innerHeight*0.8 );
			byId('box').innerHTML="";
			byId('box').insertBefore(renderer.domElement, byId('box').childNodes[0]);
		}
	}
	//console.log(renderer.info.memory);
	if( (id) < 0 && (id) > nbrBoxes)
		return;	
	currentBox=id;
		
	byId('box').style.display="block";
	byId('box').style.opacity=0;
	if(side==0)
		byId('LoadingLeftBox').innerHTML=boxes[currentBox*nbrAttributs];
	else
		byId('LoadingRightBox').innerHTML=boxes[currentBox*nbrAttributs];
	
	var theurl="getRanking.php?box="+boxes[currentBox*nbrAttributs+2];
	var xmlhttp1 = new XMLHttpRequest();	
	xmlhttp1.onreadystatechange = function() {
		if (xmlhttp1.readyState == 4 && xmlhttp1.status == 200) {
			var FightResults = xmlhttp1.responseText;
			FightResults = JSON.parse(FightResults);
			var scoreRatio=0;
			if( (Number(FightResults["won"])+Number(FightResults["lost"]))>0)
				scoreRatio=(FightResults["won"] / (Number(FightResults["won"])+Number(FightResults["lost"])) )*100;
			if(side==0){				
				if(byId('score0'))
					byId('score0').style.width=scoreRatio+"%";
				if(byId('scoreBox0'))
					byId('scoreBox0').title=FightResults["won"]+" out of "+(Number(FightResults["won"])+Number(FightResults["lost"]))+" fights won.";
			}
			else {
				if(byId('score1'))
					byId('score1').style.width=scoreRatio+"%";
				if(byId('scoreBox1'))
					byId('scoreBox1').title=FightResults["won"]+" out of "+(Number(FightResults["won"])+Number(FightResults["lost"]))+" fights won.";
			}
		}
	}
	xmlhttp1.open( "GET", theurl, true);
	xmlhttp1.send( null );	
	if(side==0){	
		boxTitle="<table style='margin-left:auto;margin-right:auto;max-width:54em;border-collapse:collapse;'><tr style='height:28px;'>";
		
		boxTitle+="<td style='width:45%;max-width:22em;height:0.7em;text-align:right;font-size:0.8em;color:#fff;font-weight:normal;padding:0em 0.2em;'>"+boxes[id*nbrAttributs]+" ("+boxes[id*nbrAttributs+1];
		if(boxes[id*nbrAttributs+8]!=""){
			boxTitle+=", "+boxes[id*nbrAttributs+8];
		}
		boxTitle+=")</td>";
		boxTitle+="<td rowspan=2 style='width:10em;vertical-align:middle;'><img src='images/vs.png' onClick='FightWinner(\"draw\");' style='vertical-align:middle;width:4em;'/></td>";
	}
	if(side==1){
		boxTitle+="<td style='width:45%;max-width:22em;height:0.7em;text-align:left;font-size:0.8em;color:#fff;font-weight:normal;padding:0em 0.2em;'>"+boxes[id*nbrAttributs]+" ("+boxes[id*nbrAttributs+1];
		if(boxes[id*nbrAttributs+8]!=""){
			boxTitle+=", "+boxes[id*nbrAttributs+8];
		}
		boxTitle+=")</td>";
		boxTitle+="</tr>";
		
		boxTitle+="<td style='width:45%;max-width:22em;height:1.9em;vertical-align:top;'><div id='scoreBox0'><div id='score0'></div></div></td>";
		boxTitle+="<td style='width:45%;max-width:22em;height:1.9em;vertical-align:top;'><div id='scoreBox1'><div id='score1'></div></div></td>";
		boxTitle+="</tr>";
		
		boxTitle+="</table>";
		byId('boxName').innerHTML=boxTitle;
		byId('boxName').style.opacity=1;
	}
	camera.position.y = -20;
	camera.position.x = 0;
	
	
	if(side==0){	
		for(var i=0;i<scene.children.length;i++){
			//if(scene.children[i].type=="Mesh")
				scene.remove(scene.children[i]);
		}
		for(var i=0;i<scene.children.length;i++){
			//if(scene.children[i].type=="Mesh")
				scene.remove(scene.children[i]);
		}
		scene.remove( meshLeft );
	}
	else
		scene.remove( meshRight );


	var ratio=1;	
	if(ratioCorr){
		var ratioHeight = boxes[biggestBox*nbrAttributs+5]/boxes[id*nbrAttributs+5];
		var ratioWidth = boxes[biggestBox*nbrAttributs+4]/boxes[id*nbrAttributs+4];
		if(ratioHeight>ratioWidth)
			ratio=ratioHeight;
		else
			ratio=ratioWidth*0.72;
		if(ratio<1)
			ratio=1;
		ratio=ratio*0.85;
		
		
		if(boxes[id*nbrAttributs+2]=="OmikronUS"){
			var shape = new THREE.Shape();
			shape.moveTo( 0,0 );
			shape.lineTo( (255*ratio), 0 );
			shape.lineTo( (205*ratio), (255*ratio));
			shape.lineTo( (50*ratio), (255*ratio) );
			shape.lineTo( 0, 0 );			
			var extrudeSettings = { amount: (46*ratio), bevelEnabled: false, steps: 1 };
			geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
		}
		else if(boxes[id*nbrAttributs+2]=="PrinceOfPersia"){
			var shape = new THREE.Shape();
			shape.moveTo( 0,0 );
			shape.lineTo( 34*ratio, 65*ratio );
			shape.lineTo( 0, 255*ratio );
			shape.lineTo( 225*ratio, 255*ratio );
			shape.lineTo( 191*ratio, 65*ratio );
			shape.lineTo( 225*ratio, 0 );	
			shape.lineTo( 0, 0 );
			var extrudeSettings = { amount: 40*ratio, bevelEnabled: false, steps: 1 };
			geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
		}
		else if(boxes[id*nbrAttributs+2]=="PrinceOfPersia2"){
			var shape = new THREE.Shape();
			shape.moveTo( 0,0 );
			shape.lineTo( 34*ratio, 190*ratio );
			shape.lineTo( 0, 255*ratio );
			shape.lineTo( 225*ratio, 255*ratio );
			shape.lineTo( 191*ratio, 190*ratio );
			shape.lineTo( 225*ratio, 0 );	
			shape.lineTo( 0, 0 );
			var extrudeSettings = { amount: 40*ratio, bevelEnabled: false, steps: 1 };
			geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
		}
		else{
			geometry = new THREE.CubeGeometry( (boxes[id*nbrAttributs+4]*ratio), (boxes[id*nbrAttributs+5]*ratio), (boxes[id*nbrAttributs+3]*ratio)); 
		}
	}
	else{
		if(boxes[gID*nbrAttributs+2]=="OmikronUS"){
			var shape = new THREE.Shape();
			shape.moveTo( 0,0 );
			shape.lineTo( 255, 0 );
			shape.lineTo( 205, 255 );
			shape.lineTo( 50, 255 );
			shape.lineTo( 0, 0 );			
			var extrudeSettings = { amount: 46, bevelEnabled: false, steps: 1 };
			geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
		}
		else if(boxes[gID*nbrAttributs+2]=="PrinceOfPersia"){
			var shape = new THREE.Shape();
			shape.moveTo( 0,0 );
			shape.lineTo( 34, 65 );
			shape.lineTo( 0, 255 );
			shape.lineTo( 225, 255 );
			shape.lineTo( 191, 65 );
			shape.lineTo( 225, 0 );	
			shape.lineTo( 0, 0 );
			var extrudeSettings = { amount: 40, bevelEnabled: false, steps: 1 };
			geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
		}
		else if(boxes[gID*nbrAttributs+2]=="PrinceOfPersia2"){
			var shape = new THREE.Shape();
			shape.moveTo( 0,0 );
			shape.lineTo( 34, 190 );
			shape.lineTo( 0, 255 );
			shape.lineTo( 225, 255 );
			shape.lineTo( 191, 190 );
			shape.lineTo( 225, 0 );	
			shape.lineTo( 0, 0 );
			var extrudeSettings = { amount: 40, bevelEnabled: false, steps: 1 };
			geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
		}
		else
			geometry = new THREE.CubeGeometry( boxes[id*nbrAttributs+4], boxes[id*nbrAttributs+5], boxes[id*nbrAttributs+3]); 
	}
    //var material = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('images/'+qualityFolder[6]+'/'+boxes[id*nbrAttributs+2]+'.jpg', new THREE.UVMapping(), function() {
	//////////////////
	
	
	var covertexture="images/05fightclub";
	
	if(webp=="")
		covertexture+="/"+boxes[id*nbrAttributs+2]+".jpg";
	else
		covertexture+="/webp/"+boxes[id*nbrAttributs+2]+".webp";
	
	/*
	if(boxes[id*nbrAttributs+2]=="Prey"){	
		covertexture+=".png";
	}else
		covertexture+=".jpg";
	*/
	texture = new THREE.TextureLoader().load(covertexture, function(){
	
	/*
		byId('box').style.opacity=1;byId('idle').style.opacity=0;byId('bg').style.backgroundImage="url(images/bg/"+boxes[id*nbrAttributs+2]+".jpg)";
		if(!webGL){
			var boxCover="url('images/cover/"+boxes[id*nbrAttributs+2];
				
			if(boxes[id*nbrAttributs+2]=="Prey" || boxes[id*nbrAttributs+2]=="MorrowindInteractivePreview" || boxes[id*nbrAttributs+2]=="OmikronUS" || boxes[id*nbrAttributs+2]=="PrinceOfPersia" || boxes[id*nbrAttributs+2]=="PrinceOfPersia2")
				boxCover+=".png";
			else
				boxCover+=".jpg";
			document.getElementsByTagName('canvas')[0].style.transition="all 0.2s ease";
			
			document.getElementsByTagName('canvas')[0].style.marginLeft=(window.innerWidth*0.1)+"px";
			document.getElementsByTagName('canvas')[0].style.marginTop=(window.innerHeight*0.1)+"px";
			
			document.getElementsByTagName('canvas')[0].style.backgroundImage=boxCover+"')";
			document.getElementsByTagName('canvas')[0].style.backgroundSize="contain";
			document.getElementsByTagName('canvas')[0].style.backgroundPosition="50% 50%";
			document.getElementsByTagName('canvas')[0].style.backgroundRepeat="no-repeat";
		}
	*/
	
		if(side==0){
			TexturesLoaded++;
			byId('idleLeft').style.opacity=0;
		}else{
			TexturesLoaded++;
			byId('idleRight').style.opacity=0;
		}
		if(TexturesLoaded==2 && showPage=="BoxFight"){
			byId('box').style.opacity=1;
			if(byId('LoadingFight')){
				byId('LoadingFight').style.opacity=0;
				byId('LoadingFight').style.display="block";
			}
			byId('leftBox').style.display="block";
			byId('rightBox').style.display="block"
		}
		if(showPage!="BoxFight"){
			if(byId('LoadingFight')){
				byId('LoadingFight').style.opacity=0;
				byId('LoadingFight').style.display="none";
			}
			byId('bgFight').style.opacity=0;
			byId('bgFightCover').style.opacity=0;
			/*
			if(meshRight)
				scene.remove(meshRight);
			if(meshLeft)
				scene.remove(meshLeft);
			*/
			if(byId('box'))
				byId('box').style.display="none";
			if(byId('boxName'))
				byId('boxName').style.display="none";
		}	
	});
	material = new THREE.MeshBasicMaterial( { map: texture,transparent: true} );
	
	texture.magFilter  = THREE.LinearFilter;
	texture.minFilter = THREE.LinearFilter;
	
	/*
	var maxAnisotropy;		
	if ( webGL && !renderer.extensions.get('WEBGL_depth_texture') ) {
		texture.minFilter = THREE.LinearFilter;
	}else{
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))	
			texture.minFilter = THREE.LinearFilter;
		else{
			if(webGL){
				var maxAnisotropy = renderer.getMaxAnisotropy();
				texture.anisotropy = maxAnisotropy;				
			}
		}
	}
	*/
	
	
	
	var front;
	var back;
	var right;
	var left;
	var front2;
	var back2;
	var right2;
	var left2;
	if(boxes[id*nbrAttributs+2]=="SkyrimCE" || boxes[id*nbrAttributs+2]=="STVEliteForceCE"){
		front = [new THREE.Vector2(0, 0), new THREE.Vector2(.25, 0), new THREE.Vector2(.25, 1), new THREE.Vector2(0, 1)];
		back = [new THREE.Vector2(.25, 0), new THREE.Vector2(.5, 0), new THREE.Vector2(.5, 1), new THREE.Vector2(.25, 1)];
		
		right = [new THREE.Vector2(1, 1), new THREE.Vector2(.75, 1), new THREE.Vector2(.75, 0), new THREE.Vector2(1, 0)];
		left = [new THREE.Vector2(.75, 1), new THREE.Vector2(.5, 1), new THREE.Vector2(.5, 0), new THREE.Vector2(.75, 0)];
	}
	else if(boxes[id*nbrAttributs+2]=="OmikronUS"){
		front = [new THREE.Vector2(0, 0), new THREE.Vector2(.4, 0), new THREE.Vector2(.3, 1), new THREE.Vector2(.1, 1)];
		back = [new THREE.Vector2(.4, 0), new THREE.Vector2(.8, 0), new THREE.Vector2(.7, 1), new THREE.Vector2(.5, 1)];
		
		right = [new THREE.Vector2(.9, 0), new THREE.Vector2(.9, 1), new THREE.Vector2(.8, 1), new THREE.Vector2(.8, 0)];
		left = [new THREE.Vector2(.9, 1), new THREE.Vector2(.9, 0), new THREE.Vector2(1, 0), new THREE.Vector2(1, 1)];
	}
	else if(boxes[id*nbrAttributs+2]=="PrinceOfPersia"){
		front = [new THREE.Vector2(0.06, 0.2), new THREE.Vector2(.34, 0.2), new THREE.Vector2(.4, 1), new THREE.Vector2(0, 1)];
		back = [new THREE.Vector2(.46, 0.2), new THREE.Vector2(.74, 0.2), new THREE.Vector2(.8, 1), new THREE.Vector2(.4, 1)];	
		front2 = [new THREE.Vector2(0, 0), new THREE.Vector2(.4, 0), new THREE.Vector2(.34, 0.2), new THREE.Vector2(0.06, 0.2)];
		back2 = [new THREE.Vector2(.4, 0), new THREE.Vector2(.8, 0), new THREE.Vector2(.74, 0.2), new THREE.Vector2(.46, 0.2)];		
		left = [new THREE.Vector2(.9, 0.2), new THREE.Vector2(.9, 1), new THREE.Vector2(.8, 1), new THREE.Vector2(.8, 0.2)];
		right = [new THREE.Vector2(1, 0.2), new THREE.Vector2(1, 1), new THREE.Vector2(0.9, 1), new THREE.Vector2(0.9, 0.2)];		
		left2 = [new THREE.Vector2(.9, 0), new THREE.Vector2(.9, 0.2), new THREE.Vector2(.8, 0.2), new THREE.Vector2(.8, 0)];
		right2 = [new THREE.Vector2(1, 0), new THREE.Vector2(1, 0.2), new THREE.Vector2(0.9, 0.2), new THREE.Vector2(0.9, 0)];
	}
	else if(boxes[id*nbrAttributs+2]=="PrinceOfPersia2"){
		front2 = [new THREE.Vector2(0, 0.2), new THREE.Vector2(.4, 0.2), new THREE.Vector2(.34, 1), new THREE.Vector2(0.06, 1)];
		back2 = [new THREE.Vector2(.4, 0.2), new THREE.Vector2(.8, 0.2), new THREE.Vector2(.74, 1), new THREE.Vector2(.46, 1)];	
		front = [new THREE.Vector2(0.06, 0), new THREE.Vector2(.34, 0), new THREE.Vector2(.4, 0.2), new THREE.Vector2(0, 0.2)];
		back = [new THREE.Vector2(.46, 0), new THREE.Vector2(.74, 0), new THREE.Vector2(.8, 0.2), new THREE.Vector2(.4, 0.2)];		
		left2 = [new THREE.Vector2(.9, 0.2), new THREE.Vector2(.9, 1), new THREE.Vector2(.8, 1), new THREE.Vector2(.8, 0.2)];
		right2 = [new THREE.Vector2(1, 0.2), new THREE.Vector2(1, 1), new THREE.Vector2(0.9, 1), new THREE.Vector2(0.9, 0.2)];		
		left = [new THREE.Vector2(.9, 0), new THREE.Vector2(.9, 0.2), new THREE.Vector2(.8, 0.2), new THREE.Vector2(.8, 0)];
		right = [new THREE.Vector2(1, 0), new THREE.Vector2(1, 0.2), new THREE.Vector2(0.9, 0.2), new THREE.Vector2(0.9, 0)];
	}
	else{
		front = [new THREE.Vector2(0, 0), new THREE.Vector2(.4, 0), new THREE.Vector2(.4, 1), new THREE.Vector2(0, 1)];
		back = [new THREE.Vector2(.4, 0), new THREE.Vector2(.8, 0), new THREE.Vector2(.8, 1), new THREE.Vector2(.4, 1)];
		
		right = [new THREE.Vector2(1, 1), new THREE.Vector2(.9, 1), new THREE.Vector2(.9, 0), new THREE.Vector2(1, 0)];
		left = [new THREE.Vector2(.9, 1), new THREE.Vector2(.8, 1), new THREE.Vector2(.8, 0), new THREE.Vector2(.9, 0)];
	}
	geometry.faceVertexUvs[0] = [];
	
	if(boxes[id*nbrAttributs+2]=="OmikronUS"){
		geometry.faceVertexUvs[0][0] = [ back[3], back[0], back[1] ]; //back
		geometry.faceVertexUvs[0][1] = [ back[1], back[2], back[3] ]; //back
		geometry.faceVertexUvs[0][2] = [ front[0], front[1], front[2] ]; // front
		geometry.faceVertexUvs[0][3] = [ front[2], front[3], front[0] ]; // front		
		geometry.faceVertexUvs[0][4] = [ left[0], left[1], left[3] ]; // left side
		geometry.faceVertexUvs[0][5] = [ left[1], left[2], left[3] ]; // left side		
		geometry.faceVertexUvs[0][6] = [ front[0], front[0], front[1] ];
		geometry.faceVertexUvs[0][7] = [ front[0], front[0], front[1] ];				
		geometry.faceVertexUvs[0][10] = [ front[0], front[0], front[1] ];
		geometry.faceVertexUvs[0][11] = [ front[0], front[0], front[1] ]; 
		geometry.faceVertexUvs[0][8] = [ right[0], right[1], right[3] ]; // right side
		geometry.faceVertexUvs[0][9] = [ right[1], right[2], right[3] ]; // right side
		THREE.GeometryUtils.center(geometry);
	}
	else if(boxes[id*nbrAttributs+2]=="PrinceOfPersia"){
		geometry.faceVertexUvs[0][0] = [ back2[3], back2[0], back2[1] ]; //back bottom bottom-left
		geometry.faceVertexUvs[0][1] = [ back[2], back[3], back[0] ]; //back top top-left
		geometry.faceVertexUvs[0][2] = [ back2[3], back2[1], back2[2] ]; // back bottom top-right
		geometry.faceVertexUvs[0][3] = [ back[1], back[2], back[0] ]; // back top bottom-right		
		geometry.faceVertexUvs[0][4] = [ front2[0], front2[1], front2[2] ]; // front bottom bottom-right
		geometry.faceVertexUvs[0][5] = [ front[1], front[2], front[3] ]; // front top top-right
		geometry.faceVertexUvs[0][6] = [ front2[3], front2[0], front2[2] ]; // front bottom top-left
		geometry.faceVertexUvs[0][7] = [ front[1], front[3], front[0] ]; // front top bottom-left		
		geometry.faceVertexUvs[0][8] = [ right2[2], right2[3], right2[1] ]; // right bottom bottom-right
		geometry.faceVertexUvs[0][9] = [ right2[3], right2[0], right2[1] ]; // right bottom top-left
		geometry.faceVertexUvs[0][10] = [ right[2], right[3], right[1] ]; // right top bottom-right
		geometry.faceVertexUvs[0][11] = [ right[3], right[0], right[1] ]; // right top top-left		
		geometry.faceVertexUvs[0][12] = [ right[0], right[0], right[0] ]; // nothing
		geometry.faceVertexUvs[0][13] = [ right[0], right[0], right[0] ]; // nothing		
		geometry.faceVertexUvs[0][14] = [ left[0], left[1], left[3] ]; // left top top-left
		geometry.faceVertexUvs[0][15] = [ left[1], left[2], left[3] ]; // left top bottom-right
		geometry.faceVertexUvs[0][16] = [ left2[0], left2[1], left2[3] ]; // left bottom top-left
		geometry.faceVertexUvs[0][17] = [ left2[1], left2[2], left2[3] ]; // left bottom bottom-right
		THREE.GeometryUtils.center(geometry);
	}
	else if(boxes[id*nbrAttributs+2]=="PrinceOfPersia2"){
		geometry.faceVertexUvs[0][0] = [ back2[3], back2[0], back2[1] ]; //back bottom bottom-left
		geometry.faceVertexUvs[0][1] = [ back[2], back[3], back[0] ]; //back top top-left
		geometry.faceVertexUvs[0][2] = [ back2[3], back2[1], back2[2] ]; // back bottom top-right
		geometry.faceVertexUvs[0][3] = [ back[1], back[2], back[0] ]; // back top bottom-right
		geometry.faceVertexUvs[0][4] = [ front2[0], front2[1], front2[2] ]; // front bottom bottom-right
		geometry.faceVertexUvs[0][5] = [ front[1], front[2], front[3] ]; // front top top-right
		geometry.faceVertexUvs[0][6] = [ front2[3], front2[0], front2[2] ]; // front bottom top-left
		geometry.faceVertexUvs[0][7] = [ front[1], front[3], front[0] ]; // front top bottom-left
		geometry.faceVertexUvs[0][8] = [ right2[2], right2[3], right2[1] ]; // right bottom bottom-right
		geometry.faceVertexUvs[0][9] = [ right2[3], right2[0], right2[1] ]; // right bottom top-left
		geometry.faceVertexUvs[0][10] = [ right[2], right[3], right[1] ]; // right top bottom-right
		geometry.faceVertexUvs[0][11] = [ right[3], right[0], right[1] ]; // right top top-left
		geometry.faceVertexUvs[0][12] = [ right[0], right[0], right[0] ]; // nothing
		geometry.faceVertexUvs[0][13] = [ right[0], right[0], right[0] ]; // nothing
		geometry.faceVertexUvs[0][14] = [ left[0], left[1], left[3] ]; // left top top-left
		geometry.faceVertexUvs[0][15] = [ left[1], left[2], left[3] ]; // left top bottom-right
		geometry.faceVertexUvs[0][16] = [ left2[0], left2[1], left2[3] ]; // left bottom top-left
		geometry.faceVertexUvs[0][17] = [ left2[1], left2[2], left2[3] ]; // left bottom bottom-right
		THREE.GeometryUtils.center(geometry);
	}
	else {
		geometry.faceVertexUvs[0][0] = [ right[3], right[0], right[2] ]; // right
		geometry.faceVertexUvs[0][1] = [ right[0], right[1], right[2] ]; // right
		geometry.faceVertexUvs[0][2] = [ left[3], left[0], left[2] ]; // left
		geometry.faceVertexUvs[0][3] = [ left[0], left[1], left[2] ]; // left
		geometry.faceVertexUvs[0][4] = [ front[0], front[0], front[0] ];
		geometry.faceVertexUvs[0][5] = [ front[0], front[0], front[0] ];
		geometry.faceVertexUvs[0][6] = [ front[0], front[0], front[0] ];
		geometry.faceVertexUvs[0][7] = [ front[0], front[0], front[0] ];
		geometry.faceVertexUvs[0][8] = [ front[3], front[0], front[2] ]; // front
		geometry.faceVertexUvs[0][9] = [ front[0], front[1], front[2] ]; // front
		geometry.faceVertexUvs[0][10] = [ back[3], back[0], back[2] ]; // back
		geometry.faceVertexUvs[0][11] = [ back[0], back[1], back[2] ]; // back
	}
	
	if(side==0){
		meshLeft = new THREE.Mesh(geometry,  material);
		meshLeft.material.side = THREE.DoubleSide;
		scene.add( meshLeft );
		
		meshLeft.castShadow = true;
		meshLeft.position.z = -(boxes[id*nbrAttributs+4]*ratio/2);
		targetPositionXLeft = -(boxes[id*nbrAttributs+4]*ratio/2*1.25);
		meshLeft.position.x = targetPositionXLeft - 300;
		meshLeft.overdraw = true;
		meshLeft.rotation.y = 1.6;
		meshLeft.rotation.z = 0;
	}
	else{
		meshRight = new THREE.Mesh(geometry,  material);
		meshRight.material.side = THREE.DoubleSide;
		meshRight.castShadow = true;
		scene.add( meshRight );
		meshRight.position.z = -60;
		meshRight.position.z = -(boxes[id*nbrAttributs+4]*ratio/2);
		targetPositionXRight = (boxes[id*nbrAttributs+4]*ratio/2*1.25);
		meshRight.position.x = targetPositionXRight + 300;
		meshRight.overdraw = true;
		meshRight.rotation.y = -1.6;
		meshRight.rotation.z = 0;
	}
	targetXRotationRight=targetXRotationLeft=0.3;
	targetYRotationLeft=targetYRotationRight=0;
	targetPositionLeft = targetPositionRight=0;
	targetPositionZLeft=targetPositionZRight=0;
	targetRotation = 0.3;
}


function loadBlog(post, start){

	autoloadBlogs=byId('gallery').removeEventListener( 'scroll', LazyLoadBlogs, false);
	var xmlhttp18 = new XMLHttpRequest();
	var theurl="blog.php?";
	if(post>0)
		theurl+= 'b='+post;
	else 
		theurl+= 'start='+start;
	var blogposts="";
	if(byId('moreblogposts'))
		byId('moreblogposts').innerHTML="<img src='images/idleNew.gif' style='height:4em;opacity:0.8;'/>";
		
	xmlhttp18.onreadystatechange = function() {		
		if (xmlhttp18.readyState == 4 && xmlhttp18.status == 200) {
			blogposts= xmlhttp18.responseText;			
			if(post>0 || start==0)
				byId('blogposts').innerHTML=blogposts;
			else {
				byId('moreblogposts').parentElement.removeChild(byId('moreblogposts'));
				byId('blogposts').innerHTML+=blogposts;				
				autoloadBlogs=byId('gallery').addEventListener('scroll', LazyLoadBlogs, false);
			}
			if(post>0){
				window.location="#Blogpost:%20"+encodeURIComponent(byId('blogpostTitle').innerHTML);
				postID=0;
			}
		}
		else{
		}
	};
	xmlhttp18.open( "GET", theurl, true);
	xmlhttp18.send( null );
}
function loadDetails(){
	var gID=currentBox;
	var DetailsContent=""
	var xmlhttp3 = new XMLHttpRequest();	
	var theurl= 'details.php?game='+boxes[gID*nbrAttributs+2];
	xmlhttp3.onreadystatechange = function() {
		if (xmlhttp3.readyState == 4 && xmlhttp3.status == 200) {
			DetailsContent= xmlhttp3.responseText;			
			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
				DetailsContent=DetailsContent.replace(new RegExp("%%%path%%%", 'g'), "images-mobile");
			else
				DetailsContent=DetailsContent.replace(new RegExp("%%%path%%%", 'g'), "images");
			byId('DetailsContent').innerHTML=DetailsContent;
		}
		else if (xmlhttp3.readyState == 4 && xmlhttp3.status == 404) {
			DetailsContent="<h2>About</h2>";
			DetailsContent+="<p style='color:red'>Sry, there are no further details available yet, but I'm working on it ;-)</p>";
			byId('DetailsContent').innerHTML=DetailsContent;
		}
	};
	xmlhttp3.open( "GET", theurl, true);
	xmlhttp3.send( null );
}

function changeBox(id){
	if(showPage!="Collection"){
		hidePage();
		toggleCollection(id);
		return;
	}
	// console.log(renderer.info.memory);
	renderer.clear();
	renderer.dispose();
	if ( webglAvailable() ) {
		webGL=true;
		renderer = new THREE.WebGLRenderer({ antialias: true, stencil: true, alpha: true });
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))	
			renderer.setPixelRatio( window.devicePixelRatio );			
		else{
			/*
			console.log("PixelRatio: "+window.devicePixelRatio);
			console.log("innerWidth: "+window.innerWidth);
			console.log("innerWidth/FullHD: 1920/"+window.innerWidth+""+"="+(1920/window.innerWidth));
			renderer.setPixelRatio( 1 );
			*/
			/*
			renderer.setPixelRatio( (1920/window.innerWidth) );
			*/
		}
		renderer.setSize( window.innerWidth, window.innerHeight);
		byId('box').innerHTML="";
		byId('box').insertBefore(renderer.domElement, byId('box').childNodes[0]);
	} else {
		alert("Sorry, no WebGL detected and therefore sadly no 3D boxes :-/");
		renderer = new THREE.CanvasRenderer({ alpha: true,antialias: true });
		renderer.setSize( window.innerWidth*0.8, window.innerHeight*0.8 );
		byId('box').innerHTML="";
		byId('box').insertBefore(renderer.domElement, byId('box').childNodes[0]);
	}
	currentBox=id;
	if(details){
		details=0;
		toggleDetails();
	}
	
	byId('idle').style.display="block";
	byId('idle').style.opacity=1;
	byId('box').style.display="block";
	byId('box').style.opacity=0;

	if( (id) < 0 && (id) > nbrBoxes)
		return;	
	
	var gID=0;
	if(filterby=="")
		gID=order.lastIndexOf(boxes[currentBox*nbrAttributs+2]);
	else
		gID=orderFiltered.lastIndexOf(boxes[currentBox*nbrAttributs+2]);
	BoxFocused=gID;
	if((gID)==0)
		byId('BoxDown').style.display="none";
	else
		byId('BoxDown').style.display="block";
		
	if(filterby==""){
		if((gID)<(order.length-1))
			byId('BoxUp').style.display="block";
		else
			byId('BoxUp').style.display="none";	
	} else {	
		if((gID)<(orderFiltered.length-1))
			byId('BoxUp').style.display="block";
		else
			byId('BoxUp').style.display="none";	
	}
	
	gID=currentBox;
	byId('bg').style.backgroundImage="url(images/bg/none.jpg)";
	
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		byId('BoxUp').style.bottom='1em';
		byId('BoxDown').style.bottom='1em';
		byId('boxName').style.bottom='0em';
		byId('boxName').style.marginLeft='3em';
		byId('boxName').style.marginRight='3em';
		byId('export').style.display="none";
		byId('share3DBox').style.margin="0.2em 0";
		byId('download').style.margin="0.2em 0";
		byId('fullscreen').style.margin="0.2em 0";
		byId('GameDetails').style.margin="0.2em 0";
	}
	
	var boxTitle="";
	boxTitle="<span style='color:#fff;'>"+boxes[gID*nbrAttributs]+"</span><br/> <span class='note'>("+boxes[gID*nbrAttributs+6]+", "+boxes[gID*nbrAttributs+7]+", "+boxes[gID*nbrAttributs+1];
	if(boxes[gID*nbrAttributs+8]!=""){
		boxTitle+=", "+boxes[gID*nbrAttributs+8];
	}
	boxTitle+=")</span>";
	if(boxes[gID*nbrAttributs+15]=="1"){
		boxTitle+="<br><span id='takeAPeek' onClick='openBox()'>Take a peek inside!</span>";
		boxTitle+="<span id='stopPeeking' onClick='closeContentBox()'>Back to the 3D box</span>";
	} else {
		boxTitle+="<br><span>&nbsp;</span>";
	}


			
	byId('boxName').innerHTML=boxTitle;	
	
	// Write Details Data
	
	var DetailsData="<h2>Details</h2>";
	var DetailsData="";
		
	var gID=currentBox;
	DetailsData+="<div style='padding:2em 0em 1.2em 0em;display:block;'>";
	
	DetailsData+="<table style='border-collapse:collapse;' class='note'><tr><td rowspan=7 style='padding:0em 1.2em 0em 2em;'><img src='images/coverM/"+boxes[gID*nbrAttributs+2]+".";
	if(boxes[gID*nbrAttributs+2]=="Prey" || boxes[gID*nbrAttributs+2]=="MorrowindInteractivePreview" || boxes[gID*nbrAttributs+2]=="OmikronUS" || boxes[gID*nbrAttributs+2]=="PrinceOfPersia" || boxes[gID*nbrAttributs+2]=="PrinceOfPersia2")
		DetailsData+="png";
	else
		DetailsData+="jpg";
	DetailsData+="' style='height:10em;border-radius:2px;border-width:0em !important;'/></td><td style='width:6.4em;'><b>Game</b></td><td style='color:#444;'>"+boxes[gID*nbrAttributs]+"</td></tr>";
	
	DetailsData+="<tr><td style='padding-top:0.6em;'><b>Release</b></td><td style='color:#444;padding-top:0.6em;'>"+boxes[gID*nbrAttributs+6]+", "+boxes[gID*nbrAttributs+7]+", "+boxes[gID*nbrAttributs+1]+"</td></tr>";
	DetailsData+="<tr><td><b>Publisher</b></td><td style='color:#444;'>";
	if(boxes[gID*nbrAttributs+17]=="x" || boxes[gID*nbrAttributs+17]=="")
		DetailsData+="&mdash;";
	else
		DetailsData+=boxes[gID*nbrAttributs+17];
	DetailsData+="</td></tr>";
	DetailsData+="<tr><td><b>Developer</b></td><td style='color:#444;'>";
	if(boxes[gID*nbrAttributs+18]=="x" || boxes[gID*nbrAttributs+18]=="")
		DetailsData+="&mdash;";
	else
		DetailsData+=boxes[gID*nbrAttributs+18];
	DetailsData+="</td></tr>";
	
	DetailsData+="<tr style='padding-top:0.6em;'><td style='padding-top:0.6em;'><b>Date added</b></td><td style='color:#444;padding-top:0.6em;'>";
	if(boxes[gID*nbrAttributs+9]!="" && boxes[gID*nbrAttributs+9].substr(5, 2)=="01" && boxes[gID*nbrAttributs+9].substr(8, 2)=="01")
		DetailsData+=boxes[gID*nbrAttributs+9].substr(0, 4)+"-ish";
	else
		DetailsData+=boxes[gID*nbrAttributs+9].substr(8, 2)+"."+boxes[gID*nbrAttributs+9].substr(5, 2)+"."+boxes[gID*nbrAttributs+9].substr(0, 4);
	DetailsData+="</td></tr>";
	
	DetailsData+="<tr><td><b>Measures</b></td><td style='color:#444;'>"+boxes[gID*nbrAttributs+5]+"x"+boxes[gID*nbrAttributs+4]+"x"+boxes[gID*nbrAttributs+3]+"mm</td></tr>";
	
	
	if(boxes[gID*nbrAttributs+10]+boxes[gID*nbrAttributs+11]+boxes[gID*nbrAttributs+12]+boxes[gID*nbrAttributs+13]!=""){
		DetailsData+="<tr><td style='padding-top:0.6em;'><b>Links</b></td><td style='color:#444;padding-top:0.6em;'>";
		var detailLinks="";
		if(boxes[gID*nbrAttributs+10]!="x" && boxes[gID*nbrAttributs+10]!="")
			detailLinks+="<a href='"+boxes[gID*nbrAttributs+10]+"' target='_blank'>MobyGames</a>";
		if(boxes[gID*nbrAttributs+11]!="x" && boxes[gID*nbrAttributs+11]!=""){
			if(detailLinks!="")
				detailLinks+=" | ";
			detailLinks+="<a href='"+boxes[gID*nbrAttributs+11]+"' target='_blank'>Wikipedia</a>";
		}
		if(boxes[gID*nbrAttributs+12]!="x" && boxes[gID*nbrAttributs+12]!=""){
			if(detailLinks!="")
				detailLinks+=" | ";
			detailLinks+="<a href='"+boxes[gID*nbrAttributs+12]+"' target='_blank'>GOG.com</a>";
		}
		if(boxes[gID*nbrAttributs+13]!="x" && boxes[gID*nbrAttributs+13]!=""){
			if(detailLinks!="")
				detailLinks+=" | ";
			detailLinks+="<a href='"+boxes[gID*nbrAttributs+13]+"' target='_blank'>Steam</a>";
		}		
		DetailsData+=detailLinks;
		DetailsData+="</td></tr>";
	}
	else
		DetailsData+="<tr><td style='padding-top:0.6em;'>&nbsp;</td><td style='color:#eee;padding-top:0.6em;'>&nbsp;</td></tr>";
	DetailsData+="</table></div>";
	
	DetailsData+="<hr/>";
	
	var imageURL="/images/content/";
	if(webp=="" || (webp!="" && (quality!=5 && quality!=3))){
		imageURL+=boxes[currentBox*nbrAttributs+2]+".jpg";
	} else{
		imageURL+="webp/"+boxes[currentBox*nbrAttributs+2]+".webp";
	}	
	
	if(boxes[currentBox*nbrAttributs+15]=="1"){
		DetailsData+="<h2>What's inside</h2>";
		DetailsData+="<p><img onClick='openBox();' class='ContentPixDetails' src='"+imageURL+"' style='width:100%;'/></p>";
		DetailsData+="<hr/>";
	}

	if(boxes[currentBox*nbrAttributs+16]!="0"){
		DetailsData+="<h2>Title Screen</h2>";
		DetailsData+="<p><a href='/images/titlescreen/"+boxes[currentBox*nbrAttributs+2]+"."+boxes[currentBox*nbrAttributs+16]+"' target='_blank'><img class='ContentPixDetails' src='/images/titlescreen/"+boxes[currentBox*nbrAttributs+2]+"."+boxes[currentBox*nbrAttributs+16]+"' style='width:100%;'/></a></p>";
		DetailsData+="<hr/>";
	}

	byId('DetailsData').innerHTML=DetailsData;
	
	// Get Details Content
	loadDetails();
	
	if(showSearch==1)
		toggleSearch();
	
	window.location="#"+boxes[gID*nbrAttributs+2];
	history.replaceState(null, null, "#"+boxes[gID*nbrAttributs+2]);
	
	camera.position.y = 0;
	camera.position.x = 0;
    scene.remove( mesh );	
	geometry.dispose();	
	//if(ratioCorr){
	if(true){
		var ratioHeight = boxes[biggestBox*nbrAttributs+5]/boxes[gID*nbrAttributs+5];
		var ratioWidth = boxes[biggestBox*nbrAttributs+4]/boxes[gID*nbrAttributs+4];
		var ratio=1;
		if(ratioHeight>ratioWidth)
			ratio=ratioHeight;
		else
			ratio=ratioWidth*0.72;
		if(ratio<1)
			ratio=1;
			
		if(boxes[gID*nbrAttributs+2]=="OmikronUS"){
			var shape = new THREE.Shape();
			shape.moveTo( 0,0 );
			shape.lineTo( (255*ratio), 0 );
			shape.lineTo( (205*ratio), (255*ratio));
			shape.lineTo( (50*ratio), (255*ratio) );
			shape.lineTo( 0, 0 );			
			var extrudeSettings = { amount: (46*ratio), bevelEnabled: false, steps: 1 };
			geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
		}
		else if(boxes[gID*nbrAttributs+2]=="PrinceOfPersia"){
			var shape = new THREE.Shape();
			shape.moveTo( 0,0 );
			shape.lineTo( 34*ratio, 65*ratio );
			shape.lineTo( 0, 255*ratio );
			shape.lineTo( 225*ratio, 255*ratio );
			shape.lineTo( 191*ratio, 65*ratio );
			shape.lineTo( 225*ratio, 0 );	
			shape.lineTo( 0, 0 );
			var extrudeSettings = { amount: 40*ratio, bevelEnabled: false, steps: 1 };
			geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
		}
		else if(boxes[gID*nbrAttributs+2]=="PrinceOfPersia2"){
			var shape = new THREE.Shape();
			shape.moveTo( 0,0 );
			shape.lineTo( 34*ratio, 190*ratio );
			shape.lineTo( 0, 255*ratio );
			shape.lineTo( 225*ratio, 255*ratio );
			shape.lineTo( 191*ratio, 190*ratio );
			shape.lineTo( 225*ratio, 0 );	
			shape.lineTo( 0, 0 );
			var extrudeSettings = { amount: 40*ratio, bevelEnabled: false, steps: 1 };
			geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
		}
		else{
			geometry = new THREE.CubeGeometry( (boxes[gID*nbrAttributs+4]*ratio), (boxes[gID*nbrAttributs+5]*ratio), (boxes[gID*nbrAttributs+3]*ratio)); 
		}
	}
	else{
		if(boxes[gID*nbrAttributs+2]=="OmikronUS"){
			var shape = new THREE.Shape();
			shape.moveTo( 0,0 );
			shape.lineTo( 255, 0 );
			shape.lineTo( 205, 255 );
			shape.lineTo( 50, 255 );
			shape.lineTo( 0, 0 );			
			var extrudeSettings = { amount: 46, bevelEnabled: false, steps: 1 };
			geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
		}
		else if(boxes[gID*nbrAttributs+2]=="PrinceOfPersia"){
			var shape = new THREE.Shape();
			shape.moveTo( 0,0 );
			shape.lineTo( 34, 65 );
			shape.lineTo( 0, 255 );
			shape.lineTo( 225, 255 );
			shape.lineTo( 191, 65 );
			shape.lineTo( 225, 0 );	
			shape.lineTo( 0, 0 );
			var extrudeSettings = { amount: 40, bevelEnabled: false, steps: 1 };
			geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
		}
		else if(boxes[gID*nbrAttributs+2]=="PrinceOfPersia2"){
			var shape = new THREE.Shape();
			shape.moveTo( 0,0 );
			shape.lineTo( 34, 190 );
			shape.lineTo( 0, 255 );
			shape.lineTo( 225, 255 );
			shape.lineTo( 191, 190 );
			shape.lineTo( 225, 0 );	
			shape.lineTo( 0, 0 );
			var extrudeSettings = { amount: 40, bevelEnabled: false, steps: 1 };
			geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
		}
		else
			geometry = new THREE.CubeGeometry( boxes[gID*nbrAttributs+4], boxes[gID*nbrAttributs+5], boxes[gID*nbrAttributs+3]); 
	}
	var covertexture="images/"+qualityFolder[quality]+webp+"/"+boxes[gID*nbrAttributs+2];
	if(webp=="" || (webp!="" && (quality!=5 && quality!=3))){
		if(boxes[currentBox*nbrAttributs+2]=="Prey" || boxes[currentBox*nbrAttributs+2]=="MorrowindInteractivePreview" || boxes[currentBox*nbrAttributs+2]=="TerminatorFutureShockIP" || boxes[currentBox*nbrAttributs+2]=="DaggerfallInteractivePreview" || boxes[currentBox*nbrAttributs+2]=="Daggerfall25Anniversary" || boxes[currentBox*nbrAttributs+2]=="Daggerfall25Anniversary" || boxes[currentBox*nbrAttributs+2]=="X3ReunionCE"){	
			covertexture+=".png";
		}else{
			covertexture+=".jpg";
		}
	} else{
		covertexture+=".webp";
	}
	//console.log(renderer.info.memory);
	
	const texture = new THREE.TextureLoader().load(covertexture, function(){	
		byId('box').style.opacity=1;byId('idle').style.opacity=0;byId('bg').style.backgroundImage="url(images/bg/"+boxes[currentBox*nbrAttributs+2]+".jpg)";
		if(!webGL){
			var boxCover="url('images/cover/"+boxes[currentBox*nbrAttributs+2];
				
			if(boxes[currentBox*nbrAttributs+2]=="Prey" || boxes[currentBox*nbrAttributs+2]=="MorrowindInteractivePreview" || boxes[currentBox*nbrAttributs+2]=="OmikronUS" || boxes[currentBox*nbrAttributs+2]=="PrinceOfPersia" || boxes[currentBox*nbrAttributs+2]=="PrinceOfPersia2")
				boxCover+=".png";
			else
				boxCover+=".jpg";
			document.getElementsByTagName('canvas')[0].style.transition="all 0.2s ease";
			
			document.getElementsByTagName('canvas')[0].style.marginLeft=(window.innerWidth*0.1)+"px";
			document.getElementsByTagName('canvas')[0].style.marginTop=(window.innerHeight*0.1)+"px";
			
			document.getElementsByTagName('canvas')[0].style.backgroundImage=boxCover+"')";
			document.getElementsByTagName('canvas')[0].style.backgroundSize="contain";
			document.getElementsByTagName('canvas')[0].style.backgroundPosition="50% 50%";
			document.getElementsByTagName('canvas')[0].style.backgroundRepeat="no-repeat";
		}
	});
	
	
	material = new THREE.MeshBasicMaterial( { map: texture,transparent: true} );	
	
	//texture.magFilter  = THREE.LinearFilter;
	//texture.minFilter = THREE.LinearFilter;
	
	var maxAnisotropy;	
	if ( webGL && !renderer.extensions.get('WEBGL_depth_texture') ) {
		texture.minFilter = THREE.LinearFilter;
	}else{
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))	
			texture.minFilter = THREE.LinearFilter;
		else{
			if(webGL){
				var maxAnisotropy = renderer.getMaxAnisotropy();
				texture.anisotropy = (maxAnisotropy/2/2);
			}
		}
	}
	
	
	var front;
	var back;
	var right;
	var left;
	var front2;
	var back2;
	var right2;
	var left2;
	if(boxes[gID*nbrAttributs+2]=="SkyrimCE" || boxes[gID*nbrAttributs+2]=="STVEliteForceCE"){
		front = [new THREE.Vector2(0, 0), new THREE.Vector2(.25, 0), new THREE.Vector2(.25, 1), new THREE.Vector2(0, 1)];
		back = [new THREE.Vector2(.25, 0), new THREE.Vector2(.5, 0), new THREE.Vector2(.5, 1), new THREE.Vector2(.25, 1)];
		
		right = [new THREE.Vector2(1, 1), new THREE.Vector2(.75, 1), new THREE.Vector2(.75, 0), new THREE.Vector2(1, 0)];
		left = [new THREE.Vector2(.75, 1), new THREE.Vector2(.5, 1), new THREE.Vector2(.5, 0), new THREE.Vector2(.75, 0)];
	}
	else if(boxes[gID*nbrAttributs+2]=="OmikronUS"){
		front = [new THREE.Vector2(0, 0), new THREE.Vector2(.4, 0), new THREE.Vector2(.3, 1), new THREE.Vector2(.1, 1)];
		back = [new THREE.Vector2(.4, 0), new THREE.Vector2(.8, 0), new THREE.Vector2(.7, 1), new THREE.Vector2(.5, 1)];
		
		right = [new THREE.Vector2(.9, 0), new THREE.Vector2(.9, 1), new THREE.Vector2(.8, 1), new THREE.Vector2(.8, 0)];
		left = [new THREE.Vector2(.9, 1), new THREE.Vector2(.9, 0), new THREE.Vector2(1, 0), new THREE.Vector2(1, 1)];
	}
	else if(boxes[gID*nbrAttributs+2]=="PrinceOfPersia"){
		front = [new THREE.Vector2(0.06, 0.2), new THREE.Vector2(.34, 0.2), new THREE.Vector2(.4, 1), new THREE.Vector2(0, 1)];
		back = [new THREE.Vector2(.46, 0.2), new THREE.Vector2(.74, 0.2), new THREE.Vector2(.8, 1), new THREE.Vector2(.4, 1)];	
		front2 = [new THREE.Vector2(0, 0), new THREE.Vector2(.4, 0), new THREE.Vector2(.34, 0.2), new THREE.Vector2(0.06, 0.2)];
		back2 = [new THREE.Vector2(.4, 0), new THREE.Vector2(.8, 0), new THREE.Vector2(.74, 0.2), new THREE.Vector2(.46, 0.2)];		
		left = [new THREE.Vector2(.9, 0.2), new THREE.Vector2(.9, 1), new THREE.Vector2(.8, 1), new THREE.Vector2(.8, 0.2)];
		right = [new THREE.Vector2(1, 0.2), new THREE.Vector2(1, 1), new THREE.Vector2(0.9, 1), new THREE.Vector2(0.9, 0.2)];		
		left2 = [new THREE.Vector2(.9, 0), new THREE.Vector2(.9, 0.2), new THREE.Vector2(.8, 0.2), new THREE.Vector2(.8, 0)];
		right2 = [new THREE.Vector2(1, 0), new THREE.Vector2(1, 0.2), new THREE.Vector2(0.9, 0.2), new THREE.Vector2(0.9, 0)];
	}
	else if(boxes[gID*nbrAttributs+2]=="PrinceOfPersia2"){
		front2 = [new THREE.Vector2(0, 0.2), new THREE.Vector2(.4, 0.2), new THREE.Vector2(.34, 1), new THREE.Vector2(0.06, 1)];
		back2 = [new THREE.Vector2(.4, 0.2), new THREE.Vector2(.8, 0.2), new THREE.Vector2(.74, 1), new THREE.Vector2(.46, 1)];	
		front = [new THREE.Vector2(0.06, 0), new THREE.Vector2(.34, 0), new THREE.Vector2(.4, 0.2), new THREE.Vector2(0, 0.2)];
		back = [new THREE.Vector2(.46, 0), new THREE.Vector2(.74, 0), new THREE.Vector2(.8, 0.2), new THREE.Vector2(.4, 0.2)];		
		left2 = [new THREE.Vector2(.9, 0.2), new THREE.Vector2(.9, 1), new THREE.Vector2(.8, 1), new THREE.Vector2(.8, 0.2)];
		right2 = [new THREE.Vector2(1, 0.2), new THREE.Vector2(1, 1), new THREE.Vector2(0.9, 1), new THREE.Vector2(0.9, 0.2)];		
		left = [new THREE.Vector2(.9, 0), new THREE.Vector2(.9, 0.2), new THREE.Vector2(.8, 0.2), new THREE.Vector2(.8, 0)];
		right = [new THREE.Vector2(1, 0), new THREE.Vector2(1, 0.2), new THREE.Vector2(0.9, 0.2), new THREE.Vector2(0.9, 0)];
	}
	else{
		front = [new THREE.Vector2(0, 0), new THREE.Vector2(.4, 0), new THREE.Vector2(.4, 1), new THREE.Vector2(0, 1)];
		back = [new THREE.Vector2(.4, 0), new THREE.Vector2(.8, 0), new THREE.Vector2(.8, 1), new THREE.Vector2(.4, 1)];
		
		right = [new THREE.Vector2(1, 1), new THREE.Vector2(.9, 1), new THREE.Vector2(.9, 0), new THREE.Vector2(1, 0)];
		left = [new THREE.Vector2(.9, 1), new THREE.Vector2(.8, 1), new THREE.Vector2(.8, 0), new THREE.Vector2(.9, 0)];
	}
	geometry.faceVertexUvs[0] = [];
	
	if(boxes[gID*nbrAttributs+2]=="OmikronUS"){
		geometry.faceVertexUvs[0][0] = [ back[3], back[0], back[1] ]; //back
		geometry.faceVertexUvs[0][1] = [ back[1], back[2], back[3] ]; //back
		geometry.faceVertexUvs[0][2] = [ front[0], front[1], front[2] ]; // front
		geometry.faceVertexUvs[0][3] = [ front[2], front[3], front[0] ]; // front		
		geometry.faceVertexUvs[0][4] = [ left[0], left[1], left[3] ]; // left side
		geometry.faceVertexUvs[0][5] = [ left[1], left[2], left[3] ]; // left side		
		geometry.faceVertexUvs[0][6] = [ front[0], front[0], front[1] ];
		geometry.faceVertexUvs[0][7] = [ front[0], front[0], front[1] ];				
		geometry.faceVertexUvs[0][10] = [ front[0], front[0], front[1] ];
		geometry.faceVertexUvs[0][11] = [ front[0], front[0], front[1] ]; 
		geometry.faceVertexUvs[0][8] = [ right[0], right[1], right[3] ]; // right side
		geometry.faceVertexUvs[0][9] = [ right[1], right[2], right[3] ]; // right side
		THREE.GeometryUtils.center(geometry);
	}
	else if(boxes[gID*nbrAttributs+2]=="PrinceOfPersia"){
		geometry.faceVertexUvs[0][0] = [ back2[3], back2[0], back2[1] ]; //back bottom bottom-left
		geometry.faceVertexUvs[0][1] = [ back[2], back[3], back[0] ]; //back top top-left
		geometry.faceVertexUvs[0][2] = [ back2[3], back2[1], back2[2] ]; // back bottom top-right
		geometry.faceVertexUvs[0][3] = [ back[1], back[2], back[0] ]; // back top bottom-right		
		geometry.faceVertexUvs[0][4] = [ front2[0], front2[1], front2[2] ]; // front bottom bottom-right
		geometry.faceVertexUvs[0][5] = [ front[1], front[2], front[3] ]; // front top top-right
		geometry.faceVertexUvs[0][6] = [ front2[3], front2[0], front2[2] ]; // front bottom top-left
		geometry.faceVertexUvs[0][7] = [ front[1], front[3], front[0] ]; // front top bottom-left		
		geometry.faceVertexUvs[0][8] = [ right2[2], right2[3], right2[1] ]; // right bottom bottom-right
		geometry.faceVertexUvs[0][9] = [ right2[3], right2[0], right2[1] ]; // right bottom top-left
		geometry.faceVertexUvs[0][10] = [ right[2], right[3], right[1] ]; // right top bottom-right
		geometry.faceVertexUvs[0][11] = [ right[3], right[0], right[1] ]; // right top top-left		
		geometry.faceVertexUvs[0][12] = [ right[0], right[0], right[0] ]; // nothing
		geometry.faceVertexUvs[0][13] = [ right[0], right[0], right[0] ]; // nothing		
		geometry.faceVertexUvs[0][14] = [ left[0], left[1], left[3] ]; // left top top-left
		geometry.faceVertexUvs[0][15] = [ left[1], left[2], left[3] ]; // left top bottom-right
		geometry.faceVertexUvs[0][16] = [ left2[0], left2[1], left2[3] ]; // left bottom top-left
		geometry.faceVertexUvs[0][17] = [ left2[1], left2[2], left2[3] ]; // left bottom bottom-right
		THREE.GeometryUtils.center(geometry);
	}
	else if(boxes[gID*nbrAttributs+2]=="PrinceOfPersia2"){
		geometry.faceVertexUvs[0][0] = [ back2[3], back2[0], back2[1] ]; //back bottom bottom-left
		geometry.faceVertexUvs[0][1] = [ back[2], back[3], back[0] ]; //back top top-left
		geometry.faceVertexUvs[0][2] = [ back2[3], back2[1], back2[2] ]; // back bottom top-right
		geometry.faceVertexUvs[0][3] = [ back[1], back[2], back[0] ]; // back top bottom-right
		geometry.faceVertexUvs[0][4] = [ front2[0], front2[1], front2[2] ]; // front bottom bottom-right
		geometry.faceVertexUvs[0][5] = [ front[1], front[2], front[3] ]; // front top top-right
		geometry.faceVertexUvs[0][6] = [ front2[3], front2[0], front2[2] ]; // front bottom top-left
		geometry.faceVertexUvs[0][7] = [ front[1], front[3], front[0] ]; // front top bottom-left
		geometry.faceVertexUvs[0][8] = [ right2[2], right2[3], right2[1] ]; // right bottom bottom-right
		geometry.faceVertexUvs[0][9] = [ right2[3], right2[0], right2[1] ]; // right bottom top-left
		geometry.faceVertexUvs[0][10] = [ right[2], right[3], right[1] ]; // right top bottom-right
		geometry.faceVertexUvs[0][11] = [ right[3], right[0], right[1] ]; // right top top-left
		geometry.faceVertexUvs[0][12] = [ right[0], right[0], right[0] ]; // nothing
		geometry.faceVertexUvs[0][13] = [ right[0], right[0], right[0] ]; // nothing
		geometry.faceVertexUvs[0][14] = [ left[0], left[1], left[3] ]; // left top top-left
		geometry.faceVertexUvs[0][15] = [ left[1], left[2], left[3] ]; // left top bottom-right
		geometry.faceVertexUvs[0][16] = [ left2[0], left2[1], left2[3] ]; // left bottom top-left
		geometry.faceVertexUvs[0][17] = [ left2[1], left2[2], left2[3] ]; // left bottom bottom-right
		THREE.GeometryUtils.center(geometry);
	}
	else {
		geometry.faceVertexUvs[0][0] = [ right[3], right[0], right[2] ]; // right
		geometry.faceVertexUvs[0][1] = [ right[0], right[1], right[2] ]; // right
		geometry.faceVertexUvs[0][2] = [ left[3], left[0], left[2] ]; // left
		geometry.faceVertexUvs[0][3] = [ left[0], left[1], left[2] ]; // left
		geometry.faceVertexUvs[0][4] = [ front[0], front[0], front[0] ];
		geometry.faceVertexUvs[0][5] = [ front[0], front[0], front[0] ];
		geometry.faceVertexUvs[0][6] = [ front[0], front[0], front[0] ];
		geometry.faceVertexUvs[0][7] = [ front[0], front[0], front[0] ];
		geometry.faceVertexUvs[0][8] = [ front[3], front[0], front[2] ]; // front
		geometry.faceVertexUvs[0][9] = [ front[0], front[1], front[2] ]; // front
		geometry.faceVertexUvs[0][10] = [ back[3], back[0], back[2] ]; // back
		geometry.faceVertexUvs[0][11] = [ back[0], back[1], back[2] ]; // back
	}
    mesh = new THREE.Mesh(geometry,  material);	
	
		for(var i=0;i<scene.children.length;i++){
			if(scene.children[i].type=="Mesh")
				scene.remove(scene.children[i]);
		}
		for(var i=0;i<scene.children.length;i++){
			if(scene.children[i].type=="Mesh")
				scene.remove(scene.children[i]);				
		}
		for(var i=0;i<scene.children.length;i++){
			if(scene.children[i].type=="Mesh")
				scene.remove(scene.children[i]);				
		}
		for(var i=0;i<scene.children.length;i++){
			if(scene.children[i].type=="Mesh")
				scene.remove(scene.children[i]);				
		}
		for(var i=0;i<scene.children.length;i++){
			if(scene.children[i].type=="Mesh")
				scene.remove(scene.children[i]);				
		}
		for(var i=0;i<scene.children.length;i++){
			if(scene.children[i].type=="Mesh")
				scene.remove(scene.children[i]);				
		}
		for(var i=0;i<scene.children.length;i++){
			if(scene.children[i].type=="Mesh")
				scene.remove(scene.children[i]);				
		}
	if(boxes[gID*nbrAttributs+2]=="Daggerfall25Anniversary"){
		var ratio=1;
		//if(ratioCorr){
		if(true){
			var ratioHeight = boxes[biggestBox*nbrAttributs+5]/boxes[gID*nbrAttributs+5];
			var ratioWidth = boxes[biggestBox*nbrAttributs+4]/boxes[gID*nbrAttributs+4];
			if(ratioHeight>ratioWidth)
				ratio=ratioHeight;
			else
				ratio=ratioWidth*0.72;
			if(ratio<1)
				ratio=1;
		}
		for(var x=0;x<3;x++){
			var textureinlay, material, plane;
			var cutouttexture=["left","middle","right"];
			textureinlay = THREE.ImageUtils.loadTexture( "images/cutout/Daggerfall25Anniversary_"+cutouttexture[x]+".jpg" );
			
			material = new THREE.MeshLambertMaterial({ map : textureinlay });
			plane = new THREE.Mesh(new THREE.PlaneGeometry((boxes[gID*nbrAttributs+4]/3.2*ratio),boxes[gID*nbrAttributs+5]*ratio), material);
			var posx=[8,0,-8]
			plane.position.x = (boxes[gID*nbrAttributs+4]*ratio/-2)+((boxes[gID*nbrAttributs+4]*ratio/3.1)*x)+(boxes[gID*nbrAttributs+4]*ratio/3.1/2)+posx[x];
			plane.position.y = 0;
			var posz=[44,24,44]
			plane.position.z = posz[x]-(boxes[gID*nbrAttributs+3]*ratio/2);
			var innercover=[0.45,0,-0.45]
			plane.rotation.y = innercover[x];
			scene.add(plane);
		}
	} else if(boxes[gID*nbrAttributs+2]=="DaggerfallInteractivePreview"){
		var ratio=1;
		//if(ratioCorr){
		if(true){
			var ratioHeight = boxes[biggestBox*nbrAttributs+5]/boxes[gID*nbrAttributs+5];
			var ratioWidth = boxes[biggestBox*nbrAttributs+4]/boxes[gID*nbrAttributs+4];
			if(ratioHeight>ratioWidth)
				ratio=ratioHeight;
			else
				ratio=ratioWidth*0.72;
			if(ratio<1)
				ratio=1;
		}
		for(var x=0;x<3;x++){
			var textureinlay, material, plane;
			var cutouttexture=["left","middle","right"];
			textureinlay = THREE.ImageUtils.loadTexture( "images/cutout/DaggerfallInteractivePreview_"+cutouttexture[x]+".jpg" );
			
			material = new THREE.MeshLambertMaterial({ map : textureinlay });
			plane = new THREE.Mesh(new THREE.PlaneGeometry((boxes[gID*nbrAttributs+4]/3.2*ratio),boxes[gID*nbrAttributs+5]*ratio), material);
			var posx=[8,0,-8]
			plane.position.x = (boxes[gID*nbrAttributs+4]*ratio/-2)+((boxes[gID*nbrAttributs+4]*ratio/3.1)*x)+(boxes[gID*nbrAttributs+4]*ratio/3.1/2)+posx[x];
			plane.position.y = 0;
			var posz=[29,9,29]
			plane.position.z = posz[x]-(boxes[gID*nbrAttributs+3]*ratio/2);
			var innercover=[0.45,0,-0.45]
			plane.rotation.y = innercover[x];
			scene.add(plane);
		}
	} else if(boxes[gID*nbrAttributs+2]=="TerminatorFutureShockIP"){
		var ratio=1;
		//if(ratioCorr){
		if(true){
			var ratioHeight = boxes[biggestBox*nbrAttributs+5]/boxes[gID*nbrAttributs+5];
			var ratioWidth = boxes[biggestBox*nbrAttributs+4]/boxes[gID*nbrAttributs+4];
			if(ratioHeight>ratioWidth)
				ratio=ratioHeight;
			else
				ratio=ratioWidth*0.72;
			if(ratio<1)
				ratio=1;
		}
		for(var x=0;x<3;x++){
			var textureinlay, material, plane;
			var cutouttexture=["left","middle","right"];
			textureinlay = THREE.ImageUtils.loadTexture( "images/cutout/TerminatorFutureShockIP_"+cutouttexture[x]+".jpg" );
			
			material = new THREE.MeshLambertMaterial({ map : textureinlay });
			plane = new THREE.Mesh(new THREE.PlaneGeometry((boxes[gID*nbrAttributs+4]/3.1*ratio),boxes[gID*nbrAttributs+5]*ratio), material);
			var posx=[8,0,-8]
			plane.position.x = (boxes[gID*nbrAttributs+4]*ratio/-2)+((boxes[gID*nbrAttributs+4]*ratio/3.1)*x)+(boxes[gID*nbrAttributs+4]*ratio/3.1/2)+posx[x];
			plane.position.y = 0;
			var posz=[29,9,29]
			plane.position.z = posz[x]-(boxes[gID*nbrAttributs+3]*ratio/2);
			var innercover=[0.45,0,-0.45]
			plane.rotation.y = innercover[x];
			scene.add(plane);
		}
	} else if(boxes[gID*nbrAttributs+2]=="X3ReunionCE"){
			var textureinlay, material, plane;
			textureinlay = THREE.ImageUtils.loadTexture( "images/cutout/X3ReunionCE.jpg" );
			
			material = new THREE.MeshLambertMaterial({ map : textureinlay });
			plane = new THREE.Mesh(new THREE.PlaneGeometry((boxes[gID*nbrAttributs+4]*ratio),boxes[gID*nbrAttributs+5]*ratio), material);			
			plane.position.x = 0;
			plane.position.y = 0;
			plane.position.z = boxes[gID*nbrAttributs+3]/2*0.8*ratio;
			plane.rotation.y = 0;
			scene.add(plane);
	} else if(boxes[gID*nbrAttributs+2]=="MorrowindInteractivePreview"){
		var depth=boxes[gID*nbrAttributs+3]*ratio-2;
		var height=depth*0.66;
		var width=depth;		
		//Bottom left
		let positionY=[width, width/2, 0+(height*0.25)];
		let positionX=[0+(height*0.25), width/2, width];
		let rotation=[0.3926991,0.785398,1.178097,1.5708];		
		for(var y=0;y<3;y++){
			const geometry = new THREE.CubeGeometry( 1, height,width); 			
			const texture = new THREE.TextureLoader().load( "images/cutout/MorrowindInteractivePreview.jpg" );
			//const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
			const material = new THREE.MeshBasicMaterial( { map: texture } );
			const plane = new THREE.Mesh( geometry, material ) ;
			
			scene.add( plane );
			plane.position.x = -(boxes[gID*nbrAttributs+4]*ratio/2)+positionX[y];
			plane.position.y = -(boxes[gID*nbrAttributs+5]*ratio/2)+positionY[y];	
			plane.position.z = 0;
			plane.rotation.z = rotation[y];
			plane.rotation.y = 0;
			plane.rotation.x = 0;
		}
		//Bottom right
		positionY=[width, width/2, 0+(height*0.25)];
		positionX=[0+(height*0.25), width/2, width];
		rotation=[0.3926991,0.785398,1.178097,1.5708];		
		for(var y=0;y<3;y++){			
			const geometry = new THREE.CubeGeometry( 1, height,width); 			
			const texture = new THREE.TextureLoader().load( "images/cutout/MorrowindInteractivePreview.jpg" );
			//const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
			const material = new THREE.MeshBasicMaterial( { map: texture } );
			const plane = new THREE.Mesh( geometry, material ) ;
			
			scene.add( plane );
			plane.position.x = (boxes[gID*nbrAttributs+4]*ratio/2)-positionX[y];
			plane.position.y = -(boxes[gID*nbrAttributs+5]*ratio/2)+positionY[y];	
			plane.position.z = 0;
			plane.rotation.z = rotation[y];
			plane.rotation.y = 0;
			plane.rotation.x = 3.14159;
		}
		//Top left
		positionY=[width, width/2, 0+(height*0.25)];
		positionX=[0+(height*0.25), width/2, width];
		rotation=[0.3926991,0.785398,1.178097,1.5708];		
		for(var y=0;y<3;y++){			
			const geometry = new THREE.CubeGeometry( 1, height,width); 			
			const texture = new THREE.TextureLoader().load( "images/cutout/MorrowindInteractivePreview.jpg" );
			//const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
			const material = new THREE.MeshBasicMaterial( { map: texture } );
			const plane = new THREE.Mesh( geometry, material ) ;
			
			scene.add( plane );
			plane.position.x = -(boxes[gID*nbrAttributs+4]*ratio/2)+positionX[y];
			plane.position.y = (boxes[gID*nbrAttributs+5]*ratio/2)-positionY[y];	
			plane.position.z = 0;
			plane.rotation.z = -rotation[y];
			plane.rotation.y = 0;
			plane.rotation.x = 0;
		}
		//Top right
		positionY=[width, width/2, 0+(height*0.25)];
		positionX=[0+(height*0.25), width/2, width];
		rotation=[0.3926991,0.785398,1.178097,1.5708];		
		for(var y=0;y<3;y++){			
			const geometry = new THREE.CubeGeometry( 1, height,width); 			
			const texture = new THREE.TextureLoader().load( "images/cutout/MorrowindInteractivePreview.jpg" );
			//const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
			const material = new THREE.MeshBasicMaterial( { map: texture } );
			const plane = new THREE.Mesh( geometry, material ) ;
			
			scene.add( plane );
			plane.position.x = (boxes[gID*nbrAttributs+4]*ratio/2)-positionX[y];
			plane.position.y = (boxes[gID*nbrAttributs+5]*ratio/2)-positionY[y];	
			plane.position.z = 0;
			plane.rotation.z = -rotation[y];
			plane.rotation.y = 0;
			plane.rotation.x = 3.14159;
		}
		//Box left
		if(1){
			const geometry = new THREE.CubeGeometry( width, boxes[gID*nbrAttributs+4]*ratio-(width*4.13),width);
			const texture = new THREE.TextureLoader().load( "images/cutout/MorrowindInteractivePreview.jpg" );
			//const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
			const material = new THREE.MeshBasicMaterial( { map: texture } );
			const plane = new THREE.Mesh( geometry, material ) ;
			
			scene.add( plane );
			plane.position.x = -(boxes[gID*nbrAttributs+4]*ratio/2)+(width/2);
			plane.position.y = 0;	
			plane.position.z = 0;
		}
		//Box right
		if(1){
			const geometry = new THREE.CubeGeometry( width, boxes[gID*nbrAttributs+4]*ratio-(width*4.13),width);
			const texture = new THREE.TextureLoader().load( "images/cutout/MorrowindInteractivePreview.jpg" );
			//const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
			const material = new THREE.MeshBasicMaterial( { map: texture } );
			const plane = new THREE.Mesh( geometry, material ) ;
			
			scene.add( plane );
			plane.position.x = (boxes[gID*nbrAttributs+4]*ratio/2)-(width/2);
			plane.position.y = 0;	
			plane.position.z = 0;
			plane.rotation.x = 3.14159;
		}
	} 
	else if(boxes[gID*nbrAttributs+2]=="Prey"){
		var depth=(boxes[gID*nbrAttributs+3]*ratio);
		var height=(depth*0.66);
		var width=depth;		
		//Bottom left
		let positionY=[height/4.6, height/9, (height/9/2)];
		let positionX=[(height/12/2), height/7.6, height/4.8];
		let rotation=[0.3926991,0.785398,1.178097,1.5708];		
		for(var y=0;y<3;y++){			
			const geometry = new THREE.CubeGeometry( 1, height/8.5,width); 			
			const texture = new THREE.TextureLoader().load( "images/cutout/PreyLB"+(y+1)+".jpg" );
			//const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
			const material = new THREE.MeshBasicMaterial( { map: texture } );
			const plane = new THREE.Mesh( geometry, material ) ;
			
			scene.add( plane );
			plane.position.x = -(boxes[gID*nbrAttributs+4]*ratio/2)+(positionX[y]);
			plane.position.y = -(boxes[gID*nbrAttributs+5]*ratio/2)+(positionY[y]);	
			plane.position.z = 0;
			plane.rotation.z = rotation[y];
			plane.rotation.y = 0;
			plane.rotation.x = 0;
		}
		//Bottom right
		positionY=[height/4.6, height/9, (height/9/2)];
		positionX=[(height/12/2), height/7.6, height/4.8];
		
		rotation=[0.3926991,0.785398,1.178097,1.5708];		
		for(var y=0;y<3;y++){			
			const geometry = new THREE.CubeGeometry( 1, height/8.5,width); 			
			const texture = new THREE.TextureLoader().load( "images/cutout/PreyRB"+(y+1)+".jpg" );
			//const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
			const material = new THREE.MeshBasicMaterial( { map: texture } );
			const plane = new THREE.Mesh( geometry, material ) ;
			
			scene.add( plane );
			plane.position.x = (boxes[gID*nbrAttributs+4]*ratio/2)-positionX[y];
			plane.position.y = -(boxes[gID*nbrAttributs+5]*ratio/2)+positionY[y];	
			plane.position.z = 0;
			plane.rotation.z = rotation[y];
			plane.rotation.y = 0;
			plane.rotation.x = 3.14159;
		}
		//Top left
		positionY=[height/4.6, height/9, (height/9/2)];
		positionX=[(height/12/2), height/7.6, height/4.8];
		rotation=[0.3926991,0.785398,1.178097,1.5708];		
		for(var y=0;y<3;y++){			
			const geometry = new THREE.CubeGeometry( 1, height/8.5,width); 			
			const texture = new THREE.TextureLoader().load( "images/cutout/PreyLT"+(3-y)+".jpg" );
			//const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
			const material = new THREE.MeshBasicMaterial( { map: texture } );
			const plane = new THREE.Mesh( geometry, material ) ;
			
			scene.add( plane );
			plane.position.x = -(boxes[gID*nbrAttributs+4]*ratio/2)+positionX[y];
			plane.position.y = (boxes[gID*nbrAttributs+5]*ratio/2)-positionY[y];	
			plane.position.z = 0;
			plane.rotation.z = -rotation[y];
			plane.rotation.y = 0;
			plane.rotation.x = 0;
		}
		//Top right
		positionY=[height/4.6, height/9, (height/9/2)];
		positionX=[(height/12/2), height/7.6, height/4.8];
		rotation=[0.3926991,0.785398,1.178097,1.5708];		
		for(var y=0;y<3;y++){			
			const geometry = new THREE.CubeGeometry( 1, height/8.5,width); 			
			const texture = new THREE.TextureLoader().load( "images/cutout/PreyLR"+(y+1)+".jpg" );
			//const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
			const material = new THREE.MeshBasicMaterial( { map: texture } );
			const plane = new THREE.Mesh( geometry, material ) ;
			
			scene.add( plane );
			plane.position.x = (boxes[gID*nbrAttributs+4]*ratio/2)-positionX[y];
			plane.position.y = (boxes[gID*nbrAttributs+5]*ratio/2)-positionY[y];	
			plane.position.z = 0;
			plane.rotation.z = -rotation[y];
			plane.rotation.y = 0;
			plane.rotation.x = 3.14159;
		}
	} else {
	}
	mesh.material.side = THREE.DoubleSide;
    scene.add( mesh );
	mesh.castShadow = true;
    mesh.position.z = 0;
	mesh.overdraw = true;
    scene.rotation.y =0;
    scene.rotation.z =0;
	targetRotation = -0.45;
    render();
	document.title = SiteTitle+": "+boxes[currentBox*nbrAttributs]+" ("+boxes[currentBox*nbrAttributs+1]+")";
	
	var gID=order.lastIndexOf(boxes[currentBox*nbrAttributs+2]);
	if( (gID-1) >= 0){	
		var covertexture="images/"+qualityFolder[quality]+webp+"/"+order[gID-1];
		if(webp=="" || (webp!="" && (quality!=5 && quality!=3))){
			if(order[gID-1]=="DaggerfallInteractivePreview" || order[gID-1]=="Daggerfall25Anniversary")
				covertexture+=".png";
			else
				covertexture+=".jpg";
		} else {
			covertexture+=".webp";
		}
		loadImage(covertexture);
		/*		
		covertexture="images/bg/"+order[gID-1]+".jpg";
		loadImage(covertexture);
		*/
		/*
		var ntex = new THREE.TextureLoader().load(covertexture);
		covertexture="images/bg/"+order[gID-1]+".jpg";
		ntex = new THREE.TextureLoader().load(covertexture);
		*/
		
	}
	if( (gID+1) <order.length){
		var covertexture="images/"+qualityFolder[quality]+webp+"/"+order[gID+1];
		if(webp=="" || (webp!="" && (quality!=5 && quality!=3))){
			if(order[gID+1]=="DaggerfallInteractivePreview" || order[gID+1]=="Daggerfall25Anniversary")
				covertexture+=".png";
			else
				covertexture+=".jpg";
		} else {
			covertexture+=".webp";
		}
		loadImage(covertexture);
		/*
		covertexture="images/bg/"+order[gID+1]+".jpg";
		loadImage(covertexture);
		*/
		/*
		var ntex = new THREE.TextureLoader().load(covertexture);
		covertexture="images/bg/"+order[gID+1]+".jpg";
		ntex = new THREE.TextureLoader().load(covertexture);
		*/
	}
	document.getElementsByTagName('canvas')[0].style.filter="drop-shadow(-10px "+(82-Math.ceil(camera.position.z/20))+"px "+(70-Math.ceil(camera.position.z/20))+"px black";
	
}

function webglAvailable() {
	try {
		var canvas = document.createElement( 'canvas' );
		return !!( window.WebGLRenderingContext && (
			canvas.getContext( 'webgl' ) ||
			canvas.getContext( 'experimental-webgl' ) )
		);
	} catch ( e ) {
		return false;
	}
}

function filterBoxList(){
	setLazy();
	lazyLoad();
	orderFiltered=[];
	if(byId('filter').value==""){
		byId('Clearfilter').style.display="none";
		filterby="";
		orderFiltered=[];
		for (var i=0;i<nbrBoxes;i++){
			byId("filter"+i).style.display="inline-block";	
			if(byId("sep"+i))
				byId("sep"+i).style.display="inline-block";
		}
		window.location="#CollectionOverview";
		formatShelf();
		return;
	}
	var filterstr=byId('filter').value;
	if(filterstr.indexOf("GenPoster")==0){
		var aspectX=16;
		var aspectY=9;
		if(filterstr.length==9){
			aspectX=16;
			aspectY=9;
		}
		else if(filterstr.length==14){
			aspectX=filterstr.substr(9,2);
			aspectY=filterstr.substr(12,2);
			//console.log("Aspekt: "+aspectX+":"+aspectY);
		}
		else
			return;
		for (var i=0;i<nbrBoxes;i++){
			byId("filter"+i).style.display="inline-block";
			
			byId("box"+i).style.overflow="visible";
			byId("box"+i).style.transition="none";
			if(GalView=="spine")
				byId("box"+i).style.margin="0 0 15px 0px";
			else
				byId("box"+i).style.margin="0 0 10px 10px";
			//byId("boxCover"+i).style.filter="drop-shadow(rgba(0, 0, 0, 0.9) 0px 4px 3px)";
			byId("boxCover"+i).style.transition="none";
			
			if(byId("sep"+i))
				byId("sep"+i).style.display="none";
		}
		var PosterWidth=7500;
		var PosterHeight=0;
		var nbrRows=0;
		
		byId("boxAllFiltered").style.display="none";
		byId("mainMenu").style.display="none";
		byId("menu").style.display="none";
		byId("header").style.display="none";
		byId("options").style.display="none";
		byId("greyout").style.display="none";
		byId("bg").style.display="none";
		byId("bgFight").style.display="none";
		byId("bgFightCover").style.display="none";
		byId("collection_intro").style.display="none";
		byId("collection").style.background="lime";
		
		document.getElementsByTagName("body")[0].style.width=PosterWidth+"px";
		document.getElementsByTagName("body")[0].style.overflow="scroll";
		byId("gallery").style.width="100%";
		byId("gallery").style.position="relative";
		byId("gallery").style.padding="0";
		byId("gallery").style.top="0";
		byId("gallery").style.transformOrigin="0 0";
		byId("gallery").style.transform="scale(2)";
			
			
		for (var i=0;i<20;i++){
			PosterWidth=byId("gallery").offsetWidth;
			PosterHeight=byId("gallery").offsetHeight;
			if(PosterWidth/aspectX < PosterHeight/aspectY)
				PosterWidth*=1.1;
			else
				PosterWidth*=0.9;
			document.getElementsByTagName("body")[0].style.width=PosterWidth+"px";
			//onWindowResize();
			nbrRows=formatShelf();
		}
		//console.log("After Ratio: "+nbrRows);
		while(nbrRows==formatShelf()){
			var OldWidth=PosterWidth;
			PosterWidth*=0.995;	
			//console.log(nbrRows+" > "+PosterWidth+"px");
			document.getElementsByTagName("body")[0].style.width=PosterWidth+"px";
			if(nbrRows<formatShelf()){
				PosterWidth=OldWidth;	
				//console.log(nbrRows+" > "+PosterWidth+"px");
				document.getElementsByTagName("body")[0].style.width=PosterWidth+"px";
				formatShelf();
				break;
			}
		}
			
		
		//onWindowResize();
		
		//formatShelf();
		filterby=byId('filter').value;
		return;
	}
	var orderindex=0;
	filterby=byId('filter').value;
	if(filterby!="")
		window.location="#CollectionOverview>"+encodeURIComponent(filterby);
	else
		window.location="#CollectionOverview";
	var nbrhidden=0;	
	for (i=0;i<nbrBoxes;i++){	
		if(
		boxes[(boxes.lastIndexOf(order[i]))-2].toLowerCase().includes(byId('filter').value.toLowerCase()) || 
		boxes[(boxes.lastIndexOf(order[i]))+5].toLowerCase().includes(byId('filter').value.toLowerCase()) || 
		boxes[(boxes.lastIndexOf(order[i]))+6].toLowerCase().includes(byId('filter').value.toLowerCase()) || 
		boxes[(boxes.lastIndexOf(order[i]))+15].toLowerCase().includes(byId('filter').value.toLowerCase()) || 
		boxes[(boxes.lastIndexOf(order[i]))+16].toLowerCase().includes(byId('filter').value.toLowerCase()) || 
		boxes[(boxes.lastIndexOf(order[i]))+4] == byId('filter').value){	
			byId("filter"+i).style.display="inline-block";	
			orderFiltered[orderindex]=order[i];
			orderindex++;
		} else {
			byId("filter"+i).style.display="none";
			nbrhidden++;
		}
		if(byId("sep"+i))
			byId("sep"+i).style.display="none";
	}
	if(nbrhidden==nbrBoxes){
		byId('boxAllFiltered').style.display="inline-block";
	}
	else
		byId('boxAllFiltered').style.display="none";
	byId('Clearfilter').style.display="block";
	formatShelf();
}
function clearfilter(){
	byId('Clearfilter').style.display="none";
	byId('filter').value="Filter...";
	filterby="";
	orderFiltered=[];
	for (var i=0;i<nbrBoxes;i++){
		byId("filter"+i).style.display="inline-block";
		if(byId("sep"+i))
			byId("sep"+i).style.display="inline-block";
	}
	byId('boxAllFiltered').style.display="none";
	if(filterby!="")
		window.location="#CollectionOverview>"+encodeURIComponent(filterby);
	else
		window.location="#CollectionOverview";
	formatShelf();
}
function init() {
	
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 1600);
	
	camera.position.z = zoomDefault;
	camera.position.y = 0;
	camera.position.x = 0;
	
	// add subtle ambient lighting
	var ambientLight = new THREE.AmbientLight(0xffffff);
	scene.add(ambientLight);

	// directional lighting
	var directionalLight = new THREE.DirectionalLight(0xffffff,0.8);
	directionalLight.position.set(0, 1, 1.0).normalize();
	scene.add(directionalLight);
	
	for (var i=1;i<nbrBoxes;i++){
		if(boxes[(biggestBox)*nbrAttributs+5]<boxes[i*nbrAttributs+5]){
			secondBiggestBox=biggestBox;
			biggestBox=i;
		}
		if(boxes[(smallestBox)*nbrAttributs+4]>boxes[i*nbrAttributs+4]){
			smallestBox=i;
		}
	}
	
	if(byId('tnb'))
		byId('tnb').innerHTML=totalNbrGames;
	if(byId('boxesVirtualized'))
		byId('boxesVirtualized').innerHTML=Math.floor(nbrBoxes/totalNbrGames*100);
	
	if ( webglAvailable() ) {
		webGL=true;
		renderer = new THREE.WebGLRenderer({ antialias: true, stencil: true, alpha: true });
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))	
			renderer.setPixelRatio( window.devicePixelRatio );			
		else
			renderer.setPixelRatio( (1920/window.innerWidth) );		
		//console.log("devicePixelRatio: "+window.devicePixelRatio);
		renderer.setSize( window.innerWidth, window.innerHeight );
		byId('box').innerHTML="";
		byId('box').insertBefore(renderer.domElement, byId('box').childNodes[0]);
	} else {
		alert("Sorry, no WebGL detected and therefore sadly no 3D boxes :-/");
		renderer = new THREE.CanvasRenderer({ alpha: true,antialias: true });
		renderer.setSize( window.innerWidth*0.8, window.innerHeight*0.8 );
		byId('box').innerHTML="";
		byId('box').insertBefore(renderer.domElement, byId('box').childNodes[0]);
	}
			
    window.addEventListener( 'resize', onWindowResize, false );	
	window.addEventListener( 'hashchange', changeContent, false );
	
	byId('menuPanel').style.height=(byId('menu').offsetHeight - byId('menuHeader').offsetHeight)+"px";
	
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
		byId('menu').style.overflowY="auto";
		if(byId('addNewBlogPost')){
			byId('addNewBlogPost').style.right="1.5em";
			byId('addNewBlogPost').style.bottom="1.5em";
		}
	}
	/*
	var spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 100, 1000, 100 );

spotLight.castShadow = true;

spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;

spotLight.shadow.camera.near = 500;
spotLight.shadow.camera.far = 4000;
spotLight.shadow.camera.fov = 30;

scene.add( spotLight );
	*/
	
}
function jumpTo(targetBox){
	if(targetBox!="" && boxes.lastIndexOf(targetBox)>0 ){
		changeBox((boxes.lastIndexOf(targetBox)-2)/nbrAttributs);
	}
	else{
		toggleOverview();
	}
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	if(webGL)
		renderer.setSize( window.innerWidth, window.innerHeight );
	else{
		if(details==1 && detailsStyle!="float")
			renderer.setSize( (window.innerWidth*0.4), window.innerHeight*0.8 );
		else
			renderer.setSize( window.innerWidth*0.8, window.innerHeight*0.8 );		
			
			document.getElementsByTagName('canvas')[0].style.marginLeft=(window.innerWidth*0.1)+"px";
			document.getElementsByTagName('canvas')[0].style.marginTop=(window.innerHeight*0.1)+"px";
	}
	
	if(showFightInfo==1){
		byId('FightInfo').style.top=(window.innerHeight/2-byId('FightInfobox').offsetHeight/2)+"px";
		byId('FightInfo').style.left=(window.innerWidth/2-byId('FightInfobox').offsetWidth/2)+"px";
	}
	if(details==0 && massacre==0){
		targetCRotation=0;
	}
	else{		
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
		}
		else{
			targetCRotation=0.142*(window.innerWidth / window.innerHeight);
		}
	}
	if(byId('bg').offsetWidth<800 && showMenu==1){
		toggleMenu();
		byId('openMenu').style.display="inline";
		byId('fixedMenu').style.display="none";
	}
	if(byId('bg').offsetWidth>800 && showMenu==0){
		toggleMenu();
	}
	if(byId('bg').offsetWidth<800 && detailsStyle=="sidebar" && details==1){
		toggleDetails();
		setTimeout("toggleDetails()",300);
	}
	if(byId('bg').offsetWidth>800 && detailsStyle=="float" && details==1){
		toggleDetails();
		setTimeout("toggleDetails()",300);
	}
	
	byId('menuPanel').style.height=(byId('menu').offsetHeight - byId('menuHeader').offsetHeight)+"px";
	
	if(showPage=="Overview" && (CurrentView=="collection" || CurrentView=="queue" || CurrentView=="wishlist" || CurrentView=="leftovers")){
		clearTimeout(formatGal);
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
			formatGal = setTimeout("formatShelf()", 500);
		else
			formatGal = setTimeout("formatShelf()", 100);
		if(CurrentView!="collection")
			formatShelf();
		
		setLazy();
		lazyLoad();
	}
	if(boxcontent==1){
		var img = new Image();
		img.src = byId("boxcontentpix").src;
		
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
		
			if(window.innerWidth<800)
				contentzoom=3;
			else if (window.innerWidth<1200)
				contentzoom=2;
			else
				contentzoom=1;
			
			if((byId("boxcontent").offsetHeight/byId("boxcontent").offsetWidth)<(img.height/img.width)){
				byId("boxcontentpix").style.width="auto";
				byId("boxcontentpix").style.height=(byId("boxcontent").offsetHeight*contentzoom)+"px";
				byId("innerBox").style.width=(byId("boxcontentpix").width)+"px";
				byId("innerBox").style.height=(byId("boxcontent").offsetHeight*contentzoom)+"px";
				//byId("boxcontent").scrollLeft = (byId("boxcontentpix").width - byId("boxcontent").offsetWidth) / 2;
				byId("boxcontent").scrollTo( ((byId("boxcontentpix").width - byId("boxcontent").offsetWidth) / 2), ((byId("boxcontentpix").height - byId("boxcontent").offsetHeight) / 2));
			} else {
				byId("boxcontentpix").style.width=(byId("boxcontent").offsetWidth*contentzoom)+"px";
				byId("boxcontentpix").style.height="auto";
				byId("innerBox").style.width=(byId("boxcontent").offsetWidth*contentzoom)+"px";
				byId("innerBox").style.height=(byId("boxcontentpix").offsetHeight)+"px";
				//byId("boxcontent").scrollLeft = (byId("boxcontentpix").width - byId("boxcontent").offsetWidth) / 2;
				byId("boxcontent").scrollTo( ((byId("boxcontentpix").width - byId("boxcontent").offsetWidth) / 2), ((byId("boxcontentpix").height - byId("boxcontent").offsetHeight) / 2));
			}
		} else {
			if((byId("boxcontent").offsetHeight/byId("boxcontent").offsetWidth)<(img.height/img.width)){
				byId("boxcontentpix").style.width="auto";
				byId("boxcontentpix").style.height=(byId("boxcontent").offsetHeight)+"px";
				byId("innerBox").style.width=(byId("boxcontentpix").width)+"px";
				byId("innerBox").style.height=(byId("boxcontent").offsetHeight)+"px";
			} else {
				byId("boxcontentpix").style.width=(byId("boxcontent").offsetWidth)+"px";
				byId("boxcontentpix").style.height="auto";
				byId("innerBox").style.width=(byId("boxcontent").offsetWidth)+"px";
				byId("innerBox").style.height=(byId("boxcontentpix").height)+"px";
			}

		}
	}
}

byId('box').addEventListener( 'mousedown', onDocumentMouseDown, false );
byId('box').addEventListener( 'touchstart', onDocumentTouchStart, false );
byId('box').addEventListener("wheel", onMouseWheel, false);
byId('detailsHeader').addEventListener( 'click', toggleDetails, false );
document.body.addEventListener( 'keyup', onDocumentKeyUp, false);
document.body.addEventListener( 'keydown', onDocumentKeyDown, false);

 
function animate() {
	if(webGL){
		requestAnimationFrame( animate );
		render();
	}
}

function render() {
	if(showPage=="BoxFight"){			
		if(meshLeft && meshRight){
		
			meshLeft.rotation.y += ( targetXRotationLeft - meshLeft.rotation.y ) * 0.05;
			meshRight.rotation.y -= ( (targetXRotationRight) + meshRight.rotation.y ) * 0.05;	
			
			meshLeft.rotation.z += ( targetYRotationLeft - meshLeft.rotation.z ) * 0.05;
			meshRight.rotation.z += ( targetYRotationRight - meshRight.rotation.z ) * 0.05;
			
			if(fightongoing==0){
			if(meshLeft.position.y>-2000)
				meshLeft.position.y -= ( targetPositionLeft - meshLeft.position.y ) * 0.10;
			if(meshRight.position.y>-2000)
				meshRight.position.y -= ( targetPositionRight - meshRight.position.y ) * 0.10;
			}
			meshLeft.position.z += ( targetPositionZLeft - meshLeft.position.z ) * 0.05;
			meshRight.position.z += ( targetPositionZRight - meshRight.position.z ) * 0.05;
			
			meshLeft.position.x += ( targetPositionXLeft - meshLeft.position.x ) * 0.05;
			meshRight.position.x += ( targetPositionXRight - meshRight.position.x ) * 0.05;
		} else {		
			//console.log("meshLeft + meshRight not yet ready for Render()");
		}
		
		camera.position.z = zoomDefault;
		camera.position.y = 0;
		camera.position.x = 0;		
		scene.rotation.y =0;
		scene.rotation.z =0;
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			if(screen.width<screen.height)
				camera.position.z = 1200;
			else
				camera.position.z = 800;
		}
		
		renderer.render( scene, camera );
	}
	if(showPage=="Collection") {
		if(webGL){
			scene.rotation.y -= ( targetRotation + scene.rotation.y ) * 0.1;
			camera.rotation.y -= (targetCRotation + camera.rotation.y ) *0.1;
			scene.rotation.x-= ( targetXRotation + scene.rotation.x ) * 0.1;
			if(mesh.position.y>targetYPosition)
				mesh.position.y-=5;
			else if(mesh.position.y<targetYPosition)
				mesh.position.y+=5;
			else
				mesh.position.y=targetYPosition;

			if(mesh.position.z>targetZPosition)
				mesh.position.z-=5;
			else if(mesh.position.z<targetZPosition)
				mesh.position.z+=5;
			else
				mesh.position.z=targetZPosition;
				
			if(mesh.position.x>targetXPosition)
				mesh.position.x-=5;
			else if(mesh.position.x<targetXPosition)
				mesh.position.x+=5;
			else
				mesh.position.x=targetXPosition;
			
			renderer.render( scene, camera );
		}
	}
}
function startFight(){
	if(showPage=="BoxFight")
		return;
	hidePage();
	showPage="BoxFight";
	
	byId('FightInfobox').style.boxShadow="none";
	byId('box').style.boxShadow="none";	
	byId('box').style.backgroundImage="none";
	
	byId('LoadingFight').style.display="block";
	byId('LoadingFight').style.opacity=1;
		
	byId('bgFight').style.opacity=1;
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		//byId('bgFight').style.opacity=0;
	}
	byId('bgFightCover').style.opacity=1;
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		/*
		byId('bgFightCover').style.opacity=1;
		byId('LoadingFight').style.opacity=0.4;
		byId('bgFightCover').style.backgroundImage="";
		byId('bgFightCover').style.background="#000000";
		*/
	}
	/*
	var theurl="FightCache.php";
	var xmlhttp12 = new XMLHttpRequest();
	xmlhttp12.onreadystatechange = function() {
		if (xmlhttp12.readyState == 4 && xmlhttp12.status == 200) {
			byId('CacheFight').innerHTML=xmlhttp12.responseText;
		}
	}
	xmlhttp12.open( "GET", theurl, true);
	xmlhttp12.send( null );	
	*/
	
	byId('FightInfo').style.left='-340em';
	window.location="#BoxFight";
	document.title = SiteTitle+": Box Fight!";
	if(byId('BoxView'))
		byId('BoxView').style.display="none";
	byId('box').style.display="block";
	byId('boxName').style.display="block";
	
	byId('header').style.display="none";
	byId('mainMenu').style.display="none";
	byId('back2Overview').style.display="block";
	
	byId('boxName').style.marginLeft='0.5em';
	byId('boxName').style.marginRight='0.5em';
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {		
		byId('idleRight').style.marginLeft='-108px';
		byId('idleLeft').style.marginLeft='55px';
		byId('boxName').style.bottom="0.4em";
	}
	
	if(showFightInfo==1)
		toggleFightInfo();
	boxfight=1;
	fight();
	onWindowResize();
	
	byId('quality05kvlow'+webp).checked = true;
	
	qualityOld=quality;
	quality=6;
}
function fight(){
	TexturesLoaded=0;
	var theurl="getFight.php";
	if(lastwinner!=""){
		theurl+="?w="+lastwinner;
		if(nextopponent!="")
			theurl+="&n="+nextopponent;
	}	
	byId('idleLeft').style.display="block";
	byId('idleLeft').style.opacity=1;
	byId('idleRight').style.display="block";
	byId('idleRight').style.opacity=1;
	var xmlhttp4 = new XMLHttpRequest();
	xmlhttp4.onreadystatechange = function() {
		if (xmlhttp4.readyState == 4 && xmlhttp4.status == 200) {
			var nextFight= xmlhttp4.responseText;
			if(nextFight=="Error"){
				alert("Nope, no public fights right now :-/");
				//toggleCollection(0);
				window.location="#CollectionOverview";
				location.reload();
				return;
			}
			else {
				if(!JSON.parse(nextFight)){
					lastwinner="";
					fight();
					return;
				}
				
				var nextFight = JSON.parse(nextFight);
				if(nextFight["fighter1"]=="" || nextFight["fighter2"]==""){
					lastwinner="";
					fight();
					return;
				}				
				fighterLeft=(boxes.lastIndexOf(nextFight["fighter1"])-2)/nbrAttributs;
				fighterRight=(boxes.lastIndexOf(nextFight["fighter2"])-2)/nbrAttributs;
				nextopponent=nextFight["nextFighter"];
			}
			document.title = SiteTitle+": Fight# "+nextFight["nbrFights"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+" of "+nbrFights()+" ("+Math.round(Number(nextFight["nbrFights"])/((nbrBoxes*(nbrBoxes+1))/2)*10000)/100+"%)";
			byId('fightstats').innerHTML="Fight "+nextFight["nbrFights"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+" of "+nbrFights()+" ("+Math.round(Number(nextFight["nbrFights"])/((nbrBoxes*(nbrBoxes+1))/2)*10000)/100+"%)";
			
			changeFighter(fighterLeft,0);
			changeFighter(fighterRight,1);
			nbrRounds++;
			fightongoing=1;
			frontface=0;
			byId('LoadingFight').style.opacity=1;
			
			//var covertexture="images/"+qualityFolder[quality]+web+"/"+nextopponent;
			
			var covertexture="images/05fightclub";
			
			if(webp=="")
				covertexture+="/"+nextopponent+".jpg";
			else
				covertexture+="/webp/"+nextopponent+".webp";
			
			
			
			/*
			if(webp=="" || (webp!="" && (quality!=5 && quality!=3))){
				if(nextopponent=="Prey" || nextopponent=="MorrowindInteractivePreview" || nextopponent=="TerminatorFutureShockIP" || nextopponent=="DaggerfallInteractivePreview" || nextopponent=="X3ReunionCE")
					covertexture+=".png";
				else
					covertexture+=".jpg";
			}else{
				covertexture+=".webp";
			}
			*/
			var ntex = new THREE.TextureLoader().load(covertexture);
		}
	}
	xmlhttp4.open( "GET", theurl, true);
	xmlhttp4.send( null );	
	
}
function FightWinner(box){
	if(fightongoing==0)
		return;	
	byId('leftBox').style.display="none";
	byId('rightBox').style.display="none";
	byId('boxName').style.opacity=0;
	var score1=0;
	var score2=0;
	if(box=='right'){
		if(lastwinner==boxes[fighterRight*nbrAttributs+2])
			nbrwins++;
		else
			nbrwins=0;
		if(nbrwins>=3){
			nbrwins=0;
			lastwinner=nextopponent;
			nextopponent="";
		} else {
			lastwinner=boxes[fighterRight*nbrAttributs+2];
		}
		//if(Math.random()>0.995)
		//	byId('WilhelmScream').play();
		fightongoing=0;
		targetPositionZLeft=-500;
		targetPositionZRight=40;
		targetPositionLeft=5;
		targetPositionRight=0;
		targetYRotationLeft=(Math.random() *2+1);
		targetRotation=0;
		var showoff=Math.random();
		if(showoff>0.85 && showoff <0.90)
			targetRotation+=6.28318;
		if(showoff>0.90 && showoff <0.95)
			targetYRotationRight+=6.28318;
		if(showoff>0.95){
			targetRotation+=6.28318;
			targetYRotationRight+=6.28318;
		}
		targetRotation=0;
		targetXRotationRight=targetRotation;
		targetXRotationLeft=(Math.random() *2);
		targetPositionXRight=0;
		targetPositionXLeft-=300;
		render();
		var fighters=[boxes[fighterLeft*nbrAttributs+2],boxes[fighterRight*nbrAttributs+2]];
		fighters.sort();
		score1=0;
		score2=1;
		setTimeout(fight,1000);
		setTimeout("byId('box').style.opacity=0",500);
		setTimeout("byId('LoadingFight').style.opacity=1",500);
	}
	else if(box=='left'){
		if(lastwinner==boxes[fighterLeft*nbrAttributs+2])
			nbrwins++;
		else
			nbrwins=0;
		if(nbrwins>=3){
			nbrwins=0;
			lastwinner=nextopponent;
			nextopponent="";
		} else {
			lastwinner=boxes[fighterLeft*nbrAttributs+2];
		}
		fightongoing=0;
		targetPositionZRight=-500;
		targetPositionZLeft=40;
		targetPositionLeft=0;
		targetPositionRight=5;
		targetYRotationRight=0-(Math.random()*2-1);
		targetRotation=0;
		//targetYRotationRight+=1;
		if(showoff>0.85 && showoff <0.90)
			targetRotation+=6.28318;
		if(showoff>0.90 && showoff <0.95)
			targetYRotationLeft+=6.28318;
		if(showoff>0.95){
			targetRotation+=6.28318;
			targetYRotationLeft+=6.28318;
		}
		targetRotation=0;
		targetXRotationLeft=targetRotation;
		targetXRotationRight=(Math.random()*2);
		targetPositionXLeft=0;
		targetPositionXRight+=300;
		render();
		var fighters=[boxes[fighterLeft*nbrAttributs+2],boxes[fighterRight*nbrAttributs+2]];
		fighters.sort();
		score1=1;
		score2=0;
		setTimeout(fight,1500);
		setTimeout("byId('box').style.opacity=0",500);
		setTimeout("byId('LoadingFight').style.opacity=1",500);
	}
	else if(box=='draw'){
		lastwinner="";
		fightongoing=0;
		targetPositionZRight=-500;
		targetPositionZLeft=-500;
		targetPositionRight=5;
		targetPositionLeft=5;
		setTimeout(fight,1500);
		setTimeout("byId('box').style.opacity=0",500);
		setTimeout("byId('LoadingFight').style.opacity=1",500);
	}
	if(score1+score2>0){
		var theurl="saveFight.php?fighter1="+boxes[fighterLeft*nbrAttributs+2]+"&fighter2="+boxes[fighterRight*nbrAttributs+2]+"&score1="+score1+"&score2="+score2;
		var xmlHttp5 = new XMLHttpRequest();
		xmlHttp5.open( "GET", theurl, true );
		xmlHttp5.send( null );
	}
}


function generateCollection(){
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		zoom=1;
		bgimage="images/shelf_small.jpg";
		colpadding="1.5em";
	}
	// view: cover, spine => pure JS
	
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
			if(webp!="")
				pathCollection="coverM/webp";
			else
				pathCollection="coverM";
		else
			if(webp!="")
				pathCollection="cover/webp";
			else
				pathCollection="cover";
	if(GalView == "cover"){
		widthVar=4;
		heightVar=5;
	}
	else if(GalView == "spine"){
		widthVar=3;
		heightVar=5;
		if(webp!="")
			pathCollection="spine/webp";
		else
			pathCollection="spine";
	}
	
	// order: gallery[name, release, height, color, ranking, updates, price];
	theurl="getGallery.php";
	if(GalOrder == "name"){
		theurl+="?order=name";
		byId('OrderDescription').innerHTML="<span class=\"txt\">The games below are currently ordered by title. Plain and simple. In order to group games from the same series, a couple of tweaks were needed though. Also, it's all based upon the games' English titles, so don't get fooled by the names on the front cover.</span>";
	} else if(GalOrder == "release"){
		theurl+="?order=release";
		byId('OrderDescription').innerHTML="<span class=\"txt\">The games below are currently ordered by year of the games' releases.</span>";
	} else if(GalOrder == "height"){
		theurl+="?order=height";
		byId('OrderDescription').innerHTML="<span class=\"txt\">The games below are ordered by how big the games' boxes are. Make sure to toggle &quot;Original size&quot; to see the differences here in the overview as well as in the 3D views of the games.</span>";
	} else if(GalOrder == "color"){
		theurl+="?order=color";
		byId('OrderDescription').innerHTML="<span class=\"txt\">The games below are currently ordered by color? Jup, thanks to some mathematical wizardry, for each game a single color value &mdash; based on the games front cover only &mdash; was calculated. Please mind, it's not color spectrum but values ranging from light to dark.</span>";
	} else if(GalOrder == "dateadded"){
		theurl+="?order=dateadded";
		byId('OrderDescription').innerHTML="<span class=\"txt\">The games below are currently ordered by date that I've added them to my collection. I was able to track down the exact dates of almost all games except the early offline purchases dating back to the 80s, 90s and early 00s. The various dates are shown in the info boxes to the single games.</span>";
	} else if(GalOrder == "updates"){
		theurl+="?order=updates";
		byId('OrderDescription').innerHTML="<span class=\"txt\">The games below are currently ordered by date of their latest update. Here, in addition to the date the game was added as well as the game's latest update of its description are considered.</span>";
	} else if(GalOrder == "price"){
		theurl+="?order=price";
		byId('OrderDescription').innerHTML="<span class=\"txt\">The games below are currently ordered by their price tag aka how much I've paid for each of them. Please mind that some games have been day-one-purchases, some have been found in the bargain bin and many have been hunted down via eBay or classifieds. Further, inflation is taken into account, meaning that the price tag attached gets lower with every year the game is my collection.</span>";
	} else if (GalOrder == "ranking" || GalOrder == "ranking2"){
		theurl="getRanking.php";
		byId('OrderDescription').innerHTML="<span class=\"txt\">The games below are currently ordered by ranking of the games' box art. This ranking is created by via <a href='JavaScript:toggleFightInfo(2);'>Fight Club</a>, a face-off of each and every single cover against all the others.</span>";
	}
	
	today = new Date();
	var dd = today.getDate()+1;
	var mm = today.getMonth()+1;
	var yyyy = today.getFullYear();
	if(dd<10) {
		dd='0'+dd
	} 
	if(mm<10) {
		mm='0'+mm
	} 
	today = mm+'/'+dd+'/'+yyyy;
	
	var xmlhttp6 = new XMLHttpRequest();	
	xmlhttp6.onreadystatechange = function() {
		if (xmlhttp6.readyState == 4 && xmlhttp6.status == 200) {
			var RankingData = xmlhttp6.responseText;
			if(!IsJsonString(RankingData)){
				alert ("ERROR! Couldn't load Data :-/ ("+RankingData+")");
			}
			BBCollection = JSON.parse(RankingData);
			GenGallery(0);
		}
	}
	xmlhttp6.open( "GET", theurl, true);
	xmlhttp6.send( null );	
}

function GenGallery(start){
	var sep=0;
	if(start==0){
		dateAdded=0;
		lastValue="";
		order=[];
		maxpoints=0;
		lastChanged="";
		price="";
		points=0;
		score=0;
		won=0;
		lost=0;
		total=0;
		rank=0;
	}
	var	BoxShelf="";
	if(start>0){
		BoxShelf=byId('BoxParade').innerHTML;
		BoxShelf=BoxShelf.replace(/boxLoaded\(\)\;/g, "");
		byId('BoxParade').innerHTML=BoxShelf;
	}
	var block=start+imageChunkSize;
	if(block > Object.keys(BBCollection.games).length){
		block=Object.keys(BBCollection.games).length;
	}
	for (var i=start;i<block;i++){		
		order[i]=BBCollection.games[i]["game"];
		lastChanged=BBCollection.games[i]["lastChanged"];
		price=BBCollection.games[i]["price"];
		points=BBCollection.games[i]["points"];
		won=BBCollection.games[i]["won"];
		lost=BBCollection.games[i]["lost"];
		rank=BBCollection.games[i]["rank"];
		total=Number(won)+Number(lost);
		if(i==0)
			maxpoints=points;
		score=Math.floor(points/maxpoints*100);
		var gID=(boxes.lastIndexOf(BBCollection.games[i]["game"])-2)/nbrAttributs;
		
		if(GalOrder == "ranking" || GalOrder == "ranking2"){
				BoxShelf+="<div id='filter"+i+"' style='display:inline-block;'>";
			if(GalView=="spine"){
				byId('collection').style.paddingLeft="20px";
				if(zoom==1)
					BoxShelf+="<div id='box"+(i)+"' tabindex=0 class='OverviewBox' style='margin:0px 0px 10px 10px;overflow:hidden;'>";
				else
					BoxShelf+="<div id='box"+(i)+"' tabindex=0 class='OverviewBox' style='margin:0px 0px 10px 0px;overflow:hidden;'>";
			} else {
				byId('collection').style.paddingLeft="10px";
				if(zoom==1)
					BoxShelf+="<div id='box"+(i)+"' tabindex=0 class='OverviewBox' style='margin:0px 0px 10px 10px;overflow:hidden;'>";
				else
					BoxShelf+="<div id='box"+(i)+"' tabindex=0 class='OverviewBox' style='margin:0px 0px 10px 10px;overflow:hidden;'>";
			}
		}
		if(GalView=="cover"){
			if(GalOrder == "name" ){						
				if(lastValue!=boxes[gID*nbrAttributs+14]){
					lastValue=boxes[gID*nbrAttributs+14];
					sep=1;
					if(zoom==1){
						//BoxShelf+="<div id='sep"+i+"' class='separator' style='margin:11px -5.5em -5px -0.5em;overflow:hidden;font-size:0.7em;'>"+lastValue+"</div>";
					}
					else{
						BoxShelf+="<div id='sep"+i+"' class='separator' style='height:"+size*zoom+"px;overflow:hidden;'><div class='septext'>";
						for (var j=0; j<700;j++)
							BoxShelf+=lastValue;
						BoxShelf+="</div></div>";
					}
				}
			}
			else if(GalOrder == "release"){
				if(lastValue!=boxes[gID*nbrAttributs+6]){
					lastValue=boxes[gID*nbrAttributs+6];
					sep=1;
					if(zoom==1){
						//BoxShelf+="<div class='separator' style='margin:11px -5.5em -5px -0.5em;overflow:hidden;font-size:0.7em;'>"+lastValue+"</div>";
					}
					else{								
						BoxShelf+="<div id='sep"+i+"' class='separator' style='height:"+size*zoom+"px;overflow:hidden;'><div class='septext'>";
						for (var j=0; j<300;j++)
							BoxShelf+="&#8729;"+String(lastValue).substr(0,4);
						BoxShelf+="</div></div>";								
					}
				}
			}
			else if(GalOrder == "dateadded"){
				if(lastValue!=String(boxes[gID*nbrAttributs+9]).substr(0,4)){
					lastValue=String(boxes[gID*nbrAttributs+9]).substr(0,4);
					sep=1;
					if(zoom==1){
						//BoxShelf+="<div class='separator' style='margin:11px -5.5em -5px -0.5em;overflow:hidden;font-size:0.7em;'>"+lastValue+"</div>";
					}
					else{								
						BoxShelf+="<div id='sep"+i+"' class='separator' style='height:"+size*zoom+"px;overflow:hidden;'><div class='septext'>";
						for (var j=0; j<300;j++)
							BoxShelf+="&#8729;"+String(lastValue).substr(0,4);
						BoxShelf+="</div></div>";								
					}
				}
			}
			else if(GalOrder == "price"){
				if(lastValue!=String(price)){
					lastValue=String(price);
					sep=1;
					if(zoom==1){
						//BoxShelf+="<div id='sep"+i+"'class='separator' style='margin:11px -5.5em -5px -0.5em;overflow:hidden;font-size:0.7em;'>"+lastValue+"</div>";
					}
					else{								
						BoxShelf+="<div id='sep"+i+"' class='separator' style='height:"+size*zoom+"px;overflow:hidden;'><div class='septext'>";
						for (var j=0; j<300;j++)
							BoxShelf+="&#8729;"+lastValue;
						BoxShelf+="</div></div>";								
					}
				}
			}
			else if(GalOrder == "ranking"){
				sep=1;
				var ScoreWidth=0;
				if(boxes[gID*nbrAttributs+2]=="SkyrimCE" || boxes[gID*nbrAttributs+2]=="STVEliteForceCE")
					ScoreWidth=Math.floor(boxes[gID*nbrAttributs+4]*(size*zoom)/boxes[gID*nbrAttributs+5]);
				else{	
					var BoxHeight=(size*zoom);
					var BoxWidth=Math.floor(boxes[gID*nbrAttributs+widthVar]*(size*zoom)/boxes[gID*nbrAttributs+heightVar]);
					
					if(GalRatio=="original"){
						BoxWidth=Math.floor(boxes[gID*nbrAttributs+widthVar]*((size*zoom)/boxes[biggestBox*nbrAttributs+heightVar]));
					}
					ScoreWidth=BoxWidth;
				}
				if(zoom!=1){
					if(rank!="NotRanked"){
						BoxShelf+="<div id='rankscore"+i+"' class='separatorRanking'><div class='scoreBox' title='"+Math.round(points*100)/100+" points with "+won+" out of "+total+" fights won'>";
						//BoxShelf+="<div id='score' style='width:"+(score)+"%;'></div>";
						if(lost!=(nbrBoxes-1)){
							if(won==(nbrBoxes-1))
								BoxShelf+="<div class='ScoreWon' style='width:100%;'></div>";
							else{
								BoxShelf+="<div class='ScoreWon' style='width:"+Math.floor(won*100/(nbrBoxes-1))+"%;'></div>";
								if(total<(nbrBoxes-1))
									BoxShelf+="<div class='ScoreLost' style='width:"+(100-Math.floor(won*100/(nbrBoxes-1))-Math.floor(lost*100/(nbrBoxes-1)))+"%;'></div>";
							}
						}
						BoxShelf+="</div></div>";
					}
					else{
						BoxShelf+="<div id='rankscore"+i+"' class='separatorRanking'><div class='scoreBox' title='No fights yet' style='background:#ccc;'></div></div>";
					}
				} 
			}
			else if(GalOrder == "ranking2"){
				sep=1;
				var ScoreWidth=0;
				if(boxes[gID*nbrAttributs+2]=="SkyrimCE" || boxes[gID*nbrAttributs+2]=="STVEliteForceCE")
					ScoreWidth=Math.floor(boxes[gID*nbrAttributs+4]*(size*zoom)/boxes[gID*nbrAttributs+5]);
				else{	
					var BoxHeight=(size*zoom);
					var BoxWidth=Math.floor(boxes[gID*nbrAttributs+widthVar]*(size*zoom)/boxes[gID*nbrAttributs+heightVar]);
					
					if(GalRatio=="original"){
						BoxWidth=Math.floor(boxes[gID*nbrAttributs+widthVar]*((size*zoom)/boxes[biggestBox*nbrAttributs+heightVar]));
					}
					ScoreWidth=BoxWidth;
				}
				var fontsize=0.6;
				if(zoom!=1)
					fontsize=1;
				if(rank!="NotRanked"){
					BoxShelf+="<div id='rankscore"+i+"' style='font-size:"+fontsize+"em; text-align:center;word-spacing:0;line-height:1em;'>"+Math.round(points*100)/100+" points</span><br/>"+won+" won | "+lost+" lost<br/>"+Math.round((won+lost)/(nbrBoxes-1)*100)/100+"% fights done</div>";
				}
				else{
					BoxShelf+="<div id='rankscore"+i+"' style='font-size:"+fontsize+"em; text-align:center;word-spacing:0;line-height:1em;'>No fights yet</div>";
				}
				
			}
		}
		if(GalOrder != "ranking" && GalOrder != "ranking2"){
				BoxShelf+="<div id='filter"+i+"' style='display:inline-block;'>";
			if(GalView=="spine"){
				byId('collection').style.paddingLeft="20px";
				if(zoom==1){
					//BoxShelf+="<div id='box"+(i)+"' tabindex=0 class='OverviewBox' style='margin:0px 0px 10px 10px;overflow:hidden;'>";
				}
				else
					BoxShelf+="<div id='box"+(i)+"' tabindex=0 class='OverviewBox' style='margin:0px 0px 10px 0px;overflow:hidden;'>";
			} else {
				byId('collection').style.paddingLeft="10px";
				if(zoom==1)
					BoxShelf+="<div id='box"+(i)+"' tabindex=0 class='OverviewBox' style='margin:0px 0px 10px 10px;overflow:hidden;'>";
				else
					BoxShelf+="<div id='box"+(i)+"' tabindex=0 class='OverviewBox' style='margin:0px 0px 10px 10px;overflow:hidden;'>";
			}
		}
		
		dateAdded=Math.floor(( Date.parse(today) - Date.parse(lastChanged) ) / 86400000);
		if(dateAdded<14){
			BoxShelf+="<div class='newOverview' title='Updated ";
			if(dateAdded==0)
				BoxShelf+="today!";
			else if(dateAdded==1)
				BoxShelf+="yesterday";
			else if(dateAdded>6)
				BoxShelf+="a week ago";
			else
				BoxShelf+=dateAdded+" days ago";
			BoxShelf+="'>NEW!</div>";
		}
		
		BoxShelf+="<img id='boxCover"+(i)+"' ";
		BoxShelf+="onload='boxLoaded();' ";
		BoxShelf+="onClick=\"BoxFocused="+(i)+";getElementById('box"+(i)+"').focus();changeBox("+gID+");\" ";
		BoxShelf+="src=' ";
		if(i>30){
			BoxShelf+="images/idle.gif' class='lazy' ";
			BoxShelf+="data-src='";
		}
		BoxShelf+="images/"+pathCollection+"/"+boxes[gID*nbrAttributs+2];		
		if(GalView == "cover")
			if((boxes[gID*nbrAttributs+2]=="Prey" || boxes[gID*nbrAttributs+2]=="MorrowindInteractivePreview" || boxes[gID*nbrAttributs+2]=="OmikronUS" || boxes[gID*nbrAttributs+2]=="PrinceOfPersia" || boxes[gID*nbrAttributs+2]=="PrinceOfPersia2"))
				BoxShelf+=".png";
			else if(webp!="")
				BoxShelf+=".webp";
			else
				BoxShelf+=".jpg";
				
		if(GalView == "spine")
			if(webp!="")
				BoxShelf+=".webp";
			else
				BoxShelf+=".jpg";
			
		
		BoxShelf+="' ";
		BoxShelf+="style='padding:0em;";
		
		if(GalView=="spine")
			BoxShelf+="border-right:1px solid transparent;";
			
		if(boxes[gID*nbrAttributs+2]=="SkyrimCE" || boxes[gID*nbrAttributs+2]=="STVEliteForceCE"){
			BoxShelf+="height:"+(size*zoom)+"px;";
			BoxShelf+="width:"+Math.floor(boxes[gID*nbrAttributs+4]*(size*zoom)/boxes[gID*nbrAttributs+5])+"px";					
		}
		else{	
			var BoxHeight=(size*zoom);
			var BoxWidth=Math.floor(boxes[gID*nbrAttributs+widthVar]*(size*zoom)/boxes[gID*nbrAttributs+heightVar]);
			
			if(GalRatio=="original"){
				BoxHeight=Math.floor(boxes[gID*nbrAttributs+heightVar]*((size*zoom)/boxes[biggestBox*nbrAttributs+heightVar]));
				BoxWidth=Math.floor(boxes[gID*nbrAttributs+widthVar]*((size*zoom)/boxes[biggestBox*nbrAttributs+heightVar]));
			}					
			BoxShelf+="padding-top:"+(size*zoom-BoxHeight)+"px;";
			BoxShelf+="height:"+BoxHeight+"px;";
			BoxShelf+="width:"+BoxWidth+"px";
		}
		BoxShelf+=";margin:0em 0px 0em 0em;'";
		BoxShelf+=" title=\""+boxes[gID*nbrAttributs];
		BoxShelf+=" ("+boxes[gID*nbrAttributs+6]+", "+boxes[gID*nbrAttributs+7]+", "+boxes[gID*nbrAttributs+1];
		if(boxes[gID*nbrAttributs+8]!=""){
			BoxShelf+=", "+boxes[gID*nbrAttributs+8];
		}
		BoxShelf+=")";
		BoxShelf+="\"/></DIV>";
		
		if(GalView=="spine")
			BoxShelf+="</div> ";
		else {
			BoxShelf+="</div> ";
		}
	}
	
	if(zoom==1)
		BoxShelf+="<div id='boxAllFiltered' class='OverviewBoxText' style='display:none;'>";
	else
		BoxShelf+="<div id='boxAllFiltered' class='OverviewBoxText' style='display:none;'>";
	BoxShelf+="<p><b>Huh?!</b></p><p>The box you're looking for is not in my collection?<br/>You could change that by either selling/trading/donating me a copy of said game or by adding <a href='http://paypal.me/benjaminwimmer' target='_blank_' title='Here&#039;s my PayPal site'>a buck or two</a> to my <i>buy-all-the-gaaaaames</i> piggy bank.</p><p>Being patient might work too but who's got time for that...</p>";
	BoxShelf+="</div>";
	
	byId('BoxParade').innerHTML=BoxShelf;
	
	if((start+imageChunkSize) > Object.keys(BBCollection.games).length){
		if(filterby!=""){
			byId('filter').value=filterby;
			filterBoxList();
		}
	}
}

function boxLoaded(){
	if(countBoxesLoaded==0)
		onWindowResize();
	countBoxesLoaded++;	
	if(countBoxesLoaded<nbrBoxes && countBoxesLoaded%imageChunkSize==0){
		formatShelf();
		GenGallery(Math.floor(countBoxesLoaded/imageChunkSize)*imageChunkSize);
		return;
	}
	if(countBoxesLoaded>=nbrBoxes){	
		byId('BoxParade').style.display='block';
		formatShelf();
		setLazy();
		lazyLoad();
	}
}
function generateWishlist(){
	var size=120;	
	var zoom=1.5;
	var bgimage="images/shelfWishlist.jpg";
	var colpadding="36px";
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		zoom=1;
		bgimage="images/shelfWishlist_small.jpg";
		colpadding="1.5em";
	}
	var widthVar=4;
	var heightVar=5;
	var path="wanted";
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
		path="wantedM";
	else
		path="wanted";
	theurl="getWishlist.php";
	
	var	BoxShelf="";
	var xmlhttp15 = new XMLHttpRequest();	
	xmlhttp15.onreadystatechange = function() {
		if (xmlhttp15.readyState == 4 && xmlhttp15.status == 200) {
			var RankingData = xmlhttp15.responseText;
			
			if(!IsJsonString(RankingData)){
				alert ("ERROR! Couldn't load Data :-/ ("+RankingData+")");
				return;
			}
			var wishlist="<div id='WishlistParade' style=''><div style='display:inline-block;width:100%;text-align:center;";
			if(zoom==1)
				wishlist+="margin:10px 0px 0px 0px;";
			else
				wishlist+="margin:14px 0px 19px 0px;";
			wishlist+="height:"+(zoom*size)+"px;'><img style='padding-top:"+((zoom*size/2)-50)+"px;' src='images/idleNew.gif'></div></div>";
			document.getElementById('wishlist').innerHTML=wishlist;
			RankingData = JSON.parse(RankingData);
			nbrWishlist=(Object.keys(RankingData.games).length);
			for (var i=0;i<(Object.keys(RankingData.games).length);i++){
				byId('queue').style.paddingLeft="10px";
				if(zoom==1)
					BoxShelf+="<div id='box"+(i)+"' class='OverviewBox' style='margin:0px 0px 10px 10px;overflow:hidden;'>";
				else
					BoxShelf+="<div id='box"+(i)+"' class='OverviewBox' style='margin:0px 0px 10px 10px;overflow:hidden;'>";
				
				BoxHeight=size*zoom;
				BoxShelf+="<div style='background-image:url(images/"+path+"_bw/"+RankingData.games[i]["file"]+");background-size:100% 100%;'>";
				BoxShelf+="<img id='wishlistCover"+(i)+"' onClick=\"\" src='images/"+path+"/"+RankingData.games[i]["file"];
				BoxShelf+="' style='padding:0em;";
				BoxShelf+="height:"+BoxHeight+"px;";			
				
				BoxShelf+=";margin:0em 0px 0em 0em;'";
				BoxShelf+=" title=\""+RankingData.games[i]["game"];
				var details="";
				
				if(RankingData.games[i]["release"]>0){
					if(details!="")
						details+=", ";
					details+=RankingData.games[i]["release"];
				}
				if(RankingData.games[i]["system"]!=""){
					if(details!="")
						details+=", ";
					details+=RankingData.games[i]["system"];
				}
				if(RankingData.games[i]["region"]!=""){
					if(details!="")
						details+=", ";
					details+=RankingData.games[i]["region"];
				}
				if(RankingData.games[i]["edition"]!=""){
					if(details!="")
						details+=", ";
					details+=RankingData.games[i]["edition"];
				}
				if(details!="")
					BoxShelf+=" ("+details+")";
				BoxShelf+="\"/>";
				BoxShelf+="</DIV>";		
				BoxShelf+="</DIV>";				
				BoxShelf+="</div> ";
			}
			BoxShelf+="</div>";
			byId('WishlistParade').innerHTML=BoxShelf;
			
			var everythingLoaded = setInterval(function() {
			  if (/loaded|complete/.test(document.readyState)) {
				clearInterval(everythingLoaded);
				onWindowResize(); // this is the function that gets called when everything is loaded
			  }
			}, 10);
		}
	}
	xmlhttp15.open( "GET", theurl, true);
	xmlhttp15.send( null );

}

function generateLeftovers(){
	var size=120;	
	var zoom=1.5;
	var bgimage="images/shelfLeftovers.jpg";
	var colpadding="36px";
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		zoom=1;
		bgimage="images/shelfLeftovers_small.jpg";
		colpadding="1.5em";
	}
	var widthVar=4;
	var heightVar=5;
	var path="sale";
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
		path="saleM";
	else
		path="sale";
	theurl="getLeftovers.php";
	
	var	BoxShelf="";
	var xmlhttp16 = new XMLHttpRequest();	
	xmlhttp16.onreadystatechange = function() {
		if (xmlhttp16.readyState == 4 && xmlhttp16.status == 200) {
			var RankingData = xmlhttp16.responseText;
			
			if(!IsJsonString(RankingData)){
				alert ("ERROR! Couldn't load Data :-/ ("+RankingData+")");
				return;
			}
			var wishlist="<div id='LeftoversParade'><div style='display:inline-block;width:100%;text-align:center;";
			if(zoom==1)
				wishlist+="margin:10px 0px 6px 0px;";
			else
				wishlist+="margin:14px 0px 19px 0px;";
			wishlist+="height:"+(zoom*size)+"px;'><img style='padding-top:"+((zoom*size/2)-50)+"px;' src='images/idleNew.gif'></div></div>";
			document.getElementById('leftovers').innerHTML=wishlist;
			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				byId('leftovers').style.backgroundSize="580px 144px";
			}
			
			RankingData = JSON.parse(RankingData);
			nbrLeftover=(Object.keys(RankingData.games).length);
			for (var i=0;i<(Object.keys(RankingData.games).length);i++){
				if(zoom==1)
					BoxShelf+="<div id='box"+(i)+"' class='OverviewBox' style='margin:0px 0px 10px 10px;overflow:hidden;'>";
				else
					BoxShelf+="<div id='box"+(i)+"' class='OverviewBox' style='margin:0px 0px 10px 10px;overflow:hidden;'>";
				
				BoxHeight=size*zoom;
				BoxShelf+="<img id='leftoverCover"+i+"' onClick=\"\" src='images/"+path+"/"+RankingData.games[i]["file"];
				BoxShelf+="' style='padding:0em;";
				BoxShelf+="height:"+BoxHeight+"px;";		
				
				BoxShelf+=";margin:0em 0px 0em 0em;'";
				BoxShelf+=" title=\""+RankingData.games[i]["game"];
				var details="";
				
				if(RankingData.games[i]["release"]>0){
					if(details!="")
						details+=", ";
					details+=RankingData.games[i]["release"];
				}
				if(RankingData.games[i]["system"]!=""){
					if(details!="")
						details+=", ";
					details+=RankingData.games[i]["system"];
				}
				if(RankingData.games[i]["region"]!=""){
					if(details!="")
						details+=", ";
					details+=RankingData.games[i]["region"];
				}
				if(RankingData.games[i]["edition"]!=""){
					if(details!="")
						details+=", ";
					details+=RankingData.games[i]["edition"];
				}
				if(details!="")
					BoxShelf+=" ("+details+")";
				BoxShelf+="\"/></DIV>";		
				
				BoxShelf+="</div> ";
			}
			BoxShelf+="</div>";
			byId('LeftoversParade').innerHTML=BoxShelf;
			var everythingLoaded = setInterval(function() {
			  if (/loaded|complete/.test(document.readyState)) {
				clearInterval(everythingLoaded);
				onWindowResize(); // this is the function that gets called when everything is loaded
			  }
			}, 10);
		}
	}
	xmlhttp16.open( "GET", theurl, true);
	xmlhttp16.send( null );

}

function generateQueue(){
	var size=120;	
	var zoom=1.5;
	var bgimage="images/shelfQueue.jpg";
	var colpadding="36px";
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		zoom=1;
		bgimage="images/shelfQueue_small.jpg";
		colpadding="1.5em";
	}
	var widthVar=4;
	var heightVar=5;
	var path="sale";
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
		path="upcomingM";
	else
		path="upcoming";
	theurl="getQueue.php";
	
	var	BoxShelf="";
	var xmlhttp17 = new XMLHttpRequest();	
	xmlhttp17.onreadystatechange = function() {
		if (xmlhttp17.readyState == 4 && xmlhttp17.status == 200) {
			var RankingData = xmlhttp17.responseText;
			
			if(!IsJsonString(RankingData)){
				alert ("ERROR! Couldn't load Data :-/ ("+RankingData+")");
				return;
			}
			var wishlist="<div id='QueueParade' style=''><div style='display:inline-block;width:100%;text-align:center;";
			if(zoom==1)
				wishlist+="margin:10px 0px 6px 0px;";
			else
				wishlist+="margin:14px 0px 19px 0px;";
			wishlist+="height:"+(zoom*size)+"px;'><img style='padding-top:"+((zoom*size/2)-50)+"px;' src='images/idleNew.gif'></div></div>";
			document.getElementById('queue').innerHTML=wishlist;
			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				byId('queue').style.backgroundSize="580px 144px";
			}
			
			RankingData = JSON.parse(RankingData);
			nbrQueue=(Object.keys(RankingData.games).length);
			for (var i=0;i<(Object.keys(RankingData.games).length);i++){
				if(zoom==1)
					BoxShelf+="<div id='box"+(i)+"' class='OverviewBox' style='margin:0px 0px 10px 10px;overflow:hidden;'>";
				else
					BoxShelf+="<div id='box"+(i)+"' class='OverviewBox' style='margin:0px 0px 10px 10px;overflow:hidden;'>";
				
				BoxHeight=size*zoom;
				BoxShelf+="<div style='background-image:url(images/"+path+"/_parcel.jpg);background-size:100% 100%;'>";
				
				BoxShelf+="<img id='queueCover"+i+"' class='parcel' onClick=\"\" src='images/"+path+"/"+RankingData.games[i]["file"];
				BoxShelf+="' style='background-color:#fff;padding:0em;";
				BoxShelf+="height:"+BoxHeight+"px;";		
				
				BoxShelf+=";margin:0em 0px 0em 0em;'";
				BoxShelf+=" title=\""+RankingData.games[i]["game"];
				var details="";
				
				if(RankingData.games[i]["release"]>0){
					if(details!="")
						details+=", ";
					details+=RankingData.games[i]["release"];
				}
				if(RankingData.games[i]["system"]!=""){
					if(details!="")
						details+=", ";
					details+=RankingData.games[i]["system"];
				}
				if(RankingData.games[i]["region"]!=""){
					if(details!="")
						details+=", ";
					details+=RankingData.games[i]["region"];
				}
				if(RankingData.games[i]["edition"]!=""){
					if(details!="")
						details+=", ";
					details+=RankingData.games[i]["edition"];
				}
				if(details!="")
					BoxShelf+=" ("+details+")";
				BoxShelf+="\"/>";
				BoxShelf+="</div>";
				BoxShelf+="</div>";
				BoxShelf+="</div> ";
			}
			if(Object.keys(RankingData.games).length==0){
				BoxShelf+="<p style=''><b>Waaaait... what!?</b></p><p>Not a single box sitting on this shelf? Well, this means I'm either busy or lazy or that there's in fact nothing on eBay and Co within my price range.<br/>For the latter, feel free to help me out by <a href='http://paypal.me/benjaminwimmer' target='_blank_' title='Here&#039;s my PayPal site'>throwing some coins</a> my way :-)";
				
			}
			byId('QueueParade').innerHTML=BoxShelf;
			var everythingLoaded = setInterval(function() {
			  if (/loaded|complete/.test(document.readyState)) {
				clearInterval(everythingLoaded);
				onWindowResize(); // this is the function that gets called when everything is loaded
			  }
			}, 10);
		}
	}
	xmlhttp17.open( "GET", theurl, true);
	xmlhttp17.send( null );

}

function writeComment(){
	document.body.removeEventListener( 'keyup', onDocumentKeyUp, false);
	document.body.removeEventListener( 'keydown', onDocumentKeyDown, false);
	
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
		if(fullscreen){			
			byId('details').style.top="1.6em";
			byId('details').style.bottom="55%";
		} else {
			byId('details').style.top="1em";
			byId('details').style.bottom="1em";
		}
		byId('details').style.zIndex="999";
	}
}
function leaveComment(){
	document.body.addEventListener( 'keyup', onDocumentKeyUp, false);
	document.body.addEventListener( 'keydown', onDocumentKeyDown, false);	
	
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
		byId('details').style.top="5em";
		byId('details').style.bottom="5em";
		byId('details').style.zIndex="3";
	}
}
function initCollection(){
	countBoxesLoaded=0;
	var size=120;	
	var zoom=1.5;
	var colpadding="36px";
	var bgimage="images/shelf.jpg";
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		zoom=1;
		bgimage="images/shelf_small.jpg";
		colpadding="1.5em";
		byId('gallery').style.paddingLeft="1em";
		byId('gallery').style.paddingRight="1em";
		byId('collection').style.marginTop="6em";
	}
	else{
		byId('collection').style.marginTop="5em";
	}
	var gallery="";
	gallery="<div id=\"CollectionHeader\">";	
	gallery+="<div style='width:15em;height:4em;margin-right:2em;display:inline-block;'><p><input id=\"filter\" type=\"text\" value=\"Filter...\" onfocus=\"writeComment();if(this.value=='Filter...'){this.value='';}\" onblur=\"leaveComment();onWindowResize();if(this.value==''){clearfilter();this.value='Filter...';}\"></p><p id=\"Clearfilter\" style=\"display:none;margin:-3.05em -0.4em 0.2em 1em;text-align:right;\"><span onClick=\"clearfilter();\" style=\"cursor:pointer;\"><img src=\"images/ui/ic_cancel_black_24dp.png\" style=\"width:1.4em;margin:0.4em 0em -0.4em 0em;opacity:0.5;\" alt=\"Clear Search\"/></span></p></div>";
	gallery+="<div id='CurrentCollectionView' style='height:4em;display:inline-block;'><p onclick=\"getElementById('BoxCollectionView').style.display='block';\" style=\"-webkit-border-radius:100px;\"><img src='images/ui/ic_sort_by_alpha_black_24dp.png' style='vertical-align:middle;width:1.4em;'></p></div><div id='BoxCollectionView'>";
	gallery+="<p style='margin:0em -2em -2.4em 0em;text-align:right;'><span onClick=\"getElementById('BoxCollectionView').style.display='none';\" style='cursor:pointer;'><img src='images/ui/ic_close_black_24dp.png' style='opacity:0.5;width:1.4em;padding:0em;' alt='Close Search'/></span></p>";
	gallery+="<p style='color:#bbb;'>Switch box view to</p>";
	if(GalView=="spine")
		gallery+="<p class='Option' onClick=\"GalView='cover';initCollection();\"><span>Front</span></p>";
	else
		gallery+="<p class='Option' onClick=\"GalView='spine';initCollection();\"><span>Spine</span></p>";
	if(GalRatio=="original")
		gallery+="<p class='Option' onClick=\"ratioCorr=1;GalRatio='adjusted';initCollection();\"><span>Adjusted size</span></p>";
	else
		gallery+="<p class='Option' onClick=\"ratioCorr=0;GalRatio='original';initCollection();\"><span>Original size</span></p>";
	gallery+="<hr/>";
	gallery+="<p style='color:#bbb;'>Order by attribute</p>";
	if(GalOrder=="name")
		gallery+="<p class='selected'><span>Title</span></p>";
	else
		gallery+="<p class='Option' onClick=\"GalOrder='name';initCollection();\"><span>Title</span></p>";
	if(GalOrder=="updates")
		gallery+="<p class='selected'><span>Last Update</span></p>";
	else
		gallery+="<p class='Option' onClick=\"GalOrder='updates';initCollection();\"><span>Last Update</span></p>";
	if(GalOrder=="dateadded")
		gallery+="<p class='selected'><span>Date added</span></p>";
	else
		gallery+="<p class='Option' onClick=\"GalOrder='dateadded';initCollection();\"><span>Date added</span></p>";
	if(GalOrder=="release")
		gallery+="<p class='selected'><span>Release Year</span></p>";
	else
		gallery+="<p class='Option' onClick=\"GalOrder='release';initCollection();\"><span>Release Year</span></p>";
	if(GalOrder=="price")
		gallery+="<p class='selected'><span>Money spent</span></p>";
	else
		gallery+="<p class='Option' onClick=\"GalOrder='price';initCollection();\"><span>Money spent</span></p>";
	if(GalOrder=="height")
		gallery+="<p class='selected'><span>Box Size</span></p>";
	else
		gallery+="<p class='Option' onClick=\"GalOrder='height';initCollection();\"><span>Box size</span></p>";
	if(GalOrder=="color")
		gallery+="<p class='selected'><span>Color</span></p>";
	else
		gallery+="<p class='Option' onClick=\"GalOrder='color';initCollection();\"><span>Color</span></p>";
	gallery+="<hr/>";
	gallery+="<p style='color:#bbb;'>Order by rankings</p>";	
	if(GalOrder=="ranking")
		gallery+="<p class='Option selected' onClick=\"GalOrder='ranking';initCollection();\"><span>Fight Club Ranking</span></p>";
	else
		gallery+="<p class='Option' onClick=\"GalOrder='ranking';initCollection();\"><span>Fight Club Ranking</span></p>";
		
	if( 1 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
		if(GalOrder=="ranking2")
			gallery+="<p class='Option selected' onClick=\"GalOrder='ranking2';initCollection();\"><span>Fight Club Ranking (Stats)</span></p>";
		else
			gallery+="<p class='Option' onClick=\"GalOrder='ranking2';initCollection();\"><span>Fight Club Ranking (Stats)</span></p>";
	
	gallery+="</div></div><div id='nbrloaded' style='border-radius:2px;transition:all 0.4s ease;background:#795548;width:0%;box-shadow:0px 2px 5px 0px rgba(0,0,0,0.4);";	
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
		gallery+="margin-top:-1.5em;margin-left:-0.7em;height:0em;";		
	else
		gallery+="margin-top:-2.8em;margin-left:-0.8em;height:0em;";
	gallery+="position:absolute;'></div><div id='BoxParade' style='margin-top:"+(-8*zoom)+"px;'></div></div>";
	
	document.getElementById('collection').innerHTML=gallery;
	generateCollection();
	//generateQueue();
	//generateWishlist();
	//generateLeftovers();
	if(byId('filter'))
		byId('filter').addEventListener( 'keyup', filterBoxList, false);
	if(byId('nbrFightsAbout'))
		byId('nbrFightsAbout').innerHTML=nbrFights();
	byId('BoxCollectionView').style.display='none';
	byId('collection').style.paddingTop=colpadding;	
}

function imageExists(image_url){
    var http = new XMLHttpRequest();
    http.open('HEAD', image_url, false);
    http.send();
    return http.status != 404;
}
function loadImage(image_url){
	/*
    var http = new XMLHttpRequest();
    http.open('GET', image_url, false);	
	http.send();
    return http.status != 404;
	*/
	const xhr = new XMLHttpRequest();
	xhr.open("GET", image_url, true);
	xhr.onload = (e) => {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				//console.log(xhr.responseText);
			} else {
				//console.error(xhr.statusText);
			}
		}
	};
	xhr.onerror = (e) => {
		//console.error(xhr.statusText);
	};
	xhr.send(null);	  
}
function openBox(){
	// Check if content photo is available	
	if(boxes[currentBox*nbrAttributs+15]!="1")
		return;

	var imageURL="/images/content/";
	if(webp=="" || (webp!="" && (quality!=5 && quality!=3))){
		imageURL+=boxes[currentBox*nbrAttributs+2]+".jpg";
	} else{
		imageURL+="webp/"+boxes[currentBox*nbrAttributs+2]+".webp";
	}	
	
	boxcontent=1;
	contentDetailsPanel=details;
	if(details==1)
		toggleDetails();

	byId('boxcontentpix').src=imageURL;
	byId('boxcontentcontainer').style.display="block";
	byId('takeAPeek').style.display="none";
	byId('stopPeeking').style.display="inline-block";
	
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
		byId("boxcontent").style.margin="0 0 6em 0";
		byId("boxcontent").style.width="100%";
		byId("boxcontent").style.height="calc(100% - 6em)";		
		byId("boxcontent").style.overflow="auto";
		byId("innerBox").style.top=0;
		byId("innerBox").style.left=0;
		byId("innerBox").style.transform="unset";
		byId("boxcontentpix").style.top=0
		byId("boxcontentpix").style.left=0;
		byId("boxcontentpix").style.transform="unset";
	}
	var img = new Image();
	img.onload = function() {
		byId('boxcontentpix').style.display="block";	
		onWindowResize(); 
	}
	img.src = imageURL;
}
function closeContentBox(){
	boxcontent=0;
	if(contentDetailsPanel==1 && details==0)
		toggleDetails();
	contentDetails=0;
	byId('boxcontentcontainer').style.display="none";
	byId('boxcontentpix').style.display="none";		
	byId('takeAPeek').style.display="inline-block";
	byId('stopPeeking').style.display="none";
	onWindowResize();
}
function onDocumentKeyUp ( event ) {
	var keyCode = event.keyCode;
	/*
	if(keyCode==219) // ?
		byId('shortcuts').style.display='inline';
	*/
	if(boxcontent==1){		
		if(keyCode==27 || keyCode==67){ // ESC or C
			closeContentBox();			
		}
		return;
	}
	if(showPage=="BoxFight"){
		if(showSearch==0){
			if(fightongoing==1){
				if(keyCode==40){ // Arrow down
					FightWinner('draw');
				}
				if(keyCode==38){ // Arrow up
					if(frontface==0)
						frontface=1;
					else
						frontface=0;
					//targetRotation+=3.14159;
					if(targetXRotationLeft==0.3){
						targetXRotationLeft+=3.14159;
						targetXRotationRight+=3.14159;
					} else {
						targetXRotationLeft=0.3;
						targetXRotationRight=0.3;
					}
				}
				if(keyCode==37){ // Arrow left  || keyCode==74
					FightWinner('left');
				}
				if(keyCode==39){ // Arrow right  || keyCode==75
					FightWinner('right');
				}
				if(keyCode==66){ // B
					if(BGset<nbrBG)
						BGset++;
					else
						BGset=1;
					byId('bgFight').style.opacity=0;
					setTimeout("byId('bgFight').style.backgroundImage='url(images/fight/BG"+BGset+".gif)'",1000);
					setTimeout("byId('bgFight').style.opacity=1",1000);
				}
			}
		}
	}
	else if(showPage=="Overview" && CurrentView=="collection"){
		if(keyCode==76){ // L
			if(filterby=="")
				changeBox((boxes.lastIndexOf(order[BoxFocused])-2)/nbrAttributs);
			else
				changeBox((boxes.lastIndexOf(orderFiltered[BoxFocused])-2)/nbrAttributs);
		}
	}
	else if(showPage=="Collection"){	
		if(showSearch==0){
			if(keyCode==37 || keyCode==74){ // Arrow left OR J
				if(BoxFocused==-1)
					BoxFocused=0;
				else if(BoxFocused<(order.length-1))
					BoxFocused++;
				showNextPrev(-1);				
			}
		if(keyCode==39 || keyCode==75){ // Arrow right OR K
				if(BoxFocused==-1)
					BoxFocused=0;
				else if(BoxFocused>0)
					BoxFocused--;
				showNextPrev(1);
			}
			if(keyCode==76){ // L
				toggleOverview();
			}
			if(keyCode==69){ // E rotate
				targetRotation+=3.14159;
			}
			if(keyCode==82){ // R switch view
				targetRotation=3.14159+0.45;					
			}
			if(keyCode==87){ // W  reset view
				targetRotation=-0.45;
			}
			if(keyCode==73){ // I  toggle Info
				toggleDetails();
			}
			if(keyCode==67){ // C open Box (if possible)
				openBox();
			}
		}
	}
}

function onDocumentKeyDown ( event ) {
	var keyCode = event.keyCode;
	
	if(boxcontent==1){		
		if(keyCode==27){ // ESC
			closeContentBox();			
		}
		return;
	}
	if(keyCode==27){ // ESC
	
		if(byId('BoxView'))
			byId('BoxView').style.display="none";
		if(byId('BoxRanking'))
			byId('BoxRanking').style.display="none";
		if(showSearch==1)
			toggleSearch();
		if(byId('bg').offsetWidth<800 && showMenu==1)
			toggleMenu();
		if(showPage=="Collection"){
			if(details==1)
				toggleDetails();
			else
				toggleOverview();
		}
	}
	/*
	if(showPage=="BoxFight"){
		if(showSearch==0){
			if(fightongoing==1){
				if(keyCode==65){ // A Zoom out
					camera.position.z*=1.05;
					if(camera.position.z>zoomMax)
						camera.position.z=zoomMax;
				}
				if(keyCode==81){ // Q Zoom in
					camera.position.z*=0.95;
					if(camera.position.z<zoomMin)
						camera.position.z=zoomMin;
				}
			}
		}
	}
	*/
	if(showPage=="Overview" && CurrentView=="collection"){
		if(keyCode==39 || keyCode==75){ // Arrow right OR K
			if(BoxFocused==-1)
				BoxFocused=0;
			else if(BoxFocused<(order.length-1))
				BoxFocused++;
			byId('box'+BoxFocused).focus();
		}
		if(keyCode==37 || keyCode==74){ // Arrow left OR J
			if(BoxFocused==-1)
				BoxFocused=0;
			else if(BoxFocused>0)
				BoxFocused--;
			byId('box'+BoxFocused).focus();
		}
	}
	else if(showPage=="Collection"){
		if(showSearch==0){
			if(keyCode==33){ // Page up
				targetRotation-=0.1;
			}
			if(keyCode==34){ // Page down
				targetRotation+=0.1;
			}
			if(keyCode==65){ // A Zoom out
				camera.position.z*=1.05;
				if(camera.position.z>zoomMax)
					camera.position.z=zoomMax;
				document.getElementsByTagName('canvas')[0].style.filter="drop-shadow(-10px "+(82-Math.ceil(camera.position.z/20))+"px "+(70-Math.ceil(camera.position.z/20))+"px black";
			}
			if(keyCode==81){ // Q Zoom in
				camera.position.z*=0.95;
				if(camera.position.z<zoomMin)
					camera.position.z=zoomMin;
				document.getElementsByTagName('canvas')[0].style.filter="drop-shadow(-10px "+(82-Math.ceil(camera.position.z/20))+"px "+(70-Math.ceil(camera.position.z/20))+"px black";
			}
		}
	}
}
function onDocumentMouseDown( event ) {
	if(byId('BoxView'))
		byId('BoxView').style.display="none";
	event.preventDefault();
	byId('box').addEventListener( 'mousemove', onDocumentMouseMove, false );
	byId('box').addEventListener( 'mouseup', onDocumentMouseUp, false );
	byId('box').addEventListener( 'mouseout', onDocumentMouseOut, false );
	mouseXOnMouseDown = event.clientX - windowHalfX;
	mouseYOnMouseThreshold = event.clientY;
	targetRotationOnMouseDown = targetRotation;
}
function onMouseWheel(event){
	if(byId('BoxView')){
	}
	else {
		if(event.deltaY<0){
			camera.position.z*=0.8;
		}
		else{
			camera.position.z*=1.2;
		}
		if(camera.position.z<zoomMin)
			camera.position.z=zoomMin;
		if(camera.position.z>zoomMax)
			camera.position.z=zoomMax;	
		document.getElementsByTagName('canvas')[0].style.filter="drop-shadow(-10px "+(82-Math.ceil(camera.position.z/20))+"px "+(70-Math.ceil(camera.position.z/20))+"px black";
	}
}
function onDocumentMouseMove( event ) {
	byId('box').style.cursor="-webkit-grabbing";
	mouseX = event.clientX - windowHalfX;
	targetRotation = targetRotationOnMouseDown - ( mouseX - mouseXOnMouseDown ) * 0.01;

	if(zooming == 1 || (mouseYOnMouseDown/mouseYOnMouseThreshold<0.8 || mouseYOnMouseDown/mouseYOnMouseThreshold>1.2)){
		zooming=1;
		if(mouseYOnMouseDown<event.clientY){
			camera.position.z*=0.98;
		}
		else{
			camera.position.z*=1.02;
		}
		if(camera.position.z<zoomMin)
			camera.position.z=zoomMin;
		if(camera.position.z>zoomMax)
			camera.position.z=zoomMax;
		document.getElementsByTagName('canvas')[0].style.filter="drop-shadow(-10px "+(82-Math.ceil(camera.position.z/20))+"px "+(70-Math.ceil(camera.position.z/20))+"px black";
	}
	mouseYOnMouseDown = event.clientY;
}
function onDocumentMouseUp( event ) {
	zooming=0;
	byId('box').removeEventListener( 'mousemove', onDocumentMouseMove, false );
	byId('box').removeEventListener( 'mouseup', onDocumentMouseUp, false );
	byId('box').removeEventListener( 'mouseout', onDocumentMouseOut, false );
	byId('box').style.cursor="-webkit-grab";
}
function onDocumentMouseOut( event ) {
	zooming=0;
	byId('box').removeEventListener( 'mousemove', onDocumentMouseMove, false );
	byId('box').removeEventListener( 'mouseup', onDocumentMouseUp, false );
	byId('box').removeEventListener( 'mouseout', onDocumentMouseOut, false );
	byId('box').style.cursor="-webkit-grab";
}
function onDocumentTouchStart( event ) {
	if(byId('BoxView'))
		byId('BoxView').style.display="none";
	event.preventDefault();
	byId('box').addEventListener( 'touchmove', onDocumentTouchMove, false );
	byId('box').addEventListener( 'touchend', onDocumentTouchEnd, false );
	mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
	mouseYOnMouseThreshold=mouseYOnMouseDown = event.touches[ 0 ].pageY;
	targetRotationOnMouseDown = targetRotation;
}
function onDocumentTouchMove( event ) {
	event.preventDefault();
	mouseX = event.touches[ 0 ].pageX - windowHalfX;
	targetRotation = targetRotationOnMouseDown - ( mouseX - mouseXOnMouseDown ) * 0.02;
	if(zooming == 1 || (mouseYOnMouseDown/mouseYOnMouseThreshold<0.8 || mouseYOnMouseDown/mouseYOnMouseThreshold>1.2)){
		zooming=1;
		if(mouseYOnMouseDown<event.touches[ 0 ].pageY){
			camera.position.z*=0.98;
		}
		else{
			camera.position.z*=1.02;
		}
		if(camera.position.z<zoomMin)
			camera.position.z=zoomMin;
		if(camera.position.z>zoomMax)
			camera.position.z=zoomMax;
	}
	mouseYOnMouseDown = event.touches[ 0 ].pageY;
}
function onDocumentTouchEnd( event ) {
	zooming=0;
	byId('box').removeEventListener( 'touchmove', onDocumentTouchMove, false );
	byId('box').removeEventListener( 'touchend', onDocumentTouchEnd, false );
}

function toggleDetails(){
	if(showPage!="Collection")
		return;
	
	if(details==0){
		// Einblenden
		if(byId('bg').offsetWidth<800){
			detailsStyle="float";
			details=1;
			byId('boxName').style.opacity=1;
			byId('details').style.opacity=1;
			byId('details').style.right="0em";
			byId('details').style.top="5em";
			byId('details').style.bottom="5em";
			byId('details').style.width="90%";
			byId('details').style.padding="0em 5%";
			byId('BoxUp').style.bottom='1em';
			byId('BoxDown').style.bottom='1em';
			byId('boxName').style.marginLeft='3em';
			byId('boxName').style.marginRight='3em';
		}
		else {
			detailsStyle="sidebar";
			details=1;
			byId('GameDetails').style.display="none";
			byId('boxName').style.opacity=0;
			byId('details').style.opacity=1;
			byId('details').style.right="0em";
			byId('details').style.top="0em";
			byId('details').style.bottom="0em";
			byId('details').style.width="40%";
			byId('details').style.padding="";
			byId('idle').style.left="33%";
			byId('options').style.right="40%";
			byId('options').style.paddingRight="1em";
			byId('BoxUp').style.right="40%";
			byId('BoxUp').style.marginRight="1em";
			byId('BoxUp').style.bottom='55%';
			byId('BoxDown').style.bottom='55%';
			byId('boxName').style.marginLeft='3em';
			byId('boxName').style.marginRight='3em';
		}
	}
	else {
		// Ausblenden
		if(detailsStyle=="float"){
			details=0;
			detailsStyle="";
			byId('boxName').style.opacity=1;
			byId('details').style.opacity=0;
			byId('details').style.right="-100%";
		}
		else{
			details=0;
			detailsStyle="";
			byId('GameDetails').style.display="inline";
			byId('boxName').style.opacity=1;
			byId('details').style.opacity=0;
			byId('details').style.right="-60%";
			byId('idle').style.left="50%";
			byId('options').style.right="1em";
			byId('options').style.paddingRight="0em";
			byId('BoxUp').style.right="1em";
			byId('BoxUp').style.marginRight="0em";
		}
	}
	onWindowResize();
}

function formatShelf(){
	var DIVParade="";
	var BDIV="";
	var BNbr=0;
	if(CurrentView=="collection"){
		DIVParade="BoxParade";
		BDIV="boxCover";
		BNbr=nbrBoxes;
	}
	if(CurrentView=="wishlist"){
		DIVParade="WishlistParade";
		BDIV="wishlistCover";
		BNbr=nbrWishlist;
	}
	if(CurrentView=="leftovers"){
		DIVParade="LeftoversParade";
		BDIV="leftoverCover";
		BNbr=nbrLeftover;
	}
	if(CurrentView=="queue"){
		DIVParade="QueueParade";
		BDIV="queueCover";
		BNbr=nbrQueue;
	}
	if(BNbr==0 || (CurrentView=="collection" && (GalRatio=="original" || GalView=="spine")))
		return;
	if(DIVParade!="")
		var width=byId(DIVParade).offsetWidth-10;
	
	var height=200;
	
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		if(width<600)
			height=80;
		else if(width<800)
			height=120;
		else
			height=160;
			
	} else {
		if(width<600)
			height=100;
		else if(width<1000)
			height=140;
		else if(width<1400)
			height=180;
		else if(width<2000){
			height=220;
		}
	}
			
	var start=0;
	var nbr=0;
	var nbrRows=0;
	var line=0;
	
	if(CurrentView=="collection"){
		byId('BoxParade').style.display="none";
	}
	for(var i=0;i<(BNbr-1);i++){
		var cBoxWidth=0;
		var nBoxWidth=0;
		if(CurrentView=="collection"){
			cBoxWidth=Math.floor(boxes[(boxes.lastIndexOf(order[i])+2)]*height/boxes[(boxes.lastIndexOf(order[i])+3)]);
			nBoxWidth=Math.floor(boxes[(boxes.lastIndexOf(order[i+1])+2)]*height/boxes[(boxes.lastIndexOf(order[i+1])+3)]);
		}
		else{
			byId(BDIV+i).style.height=height+"px";
			byId(BDIV+i).style.width="auto";
			cBoxWidth=byId(BDIV+(i)).offsetWidth;
			nBoxWidth=byId(BDIV+(i+1)).offsetWidth;
		}
		if(CurrentView=="collection"){
			if(!byId('filter'+i))
				return;
			else if(byId('filter'+i).style.display=="none")
				continue;
		}
		line+=cBoxWidth+10;
		if(filterby=="" && byId('sep'+i)){
			line+=50;
		}
		nbr++;
		var nextsep=0;
		if(filterby=="" && byId('sep'+(i+1)))
			nextsep=70+nBoxWidth+10;
		if( (line+cBoxWidth+10+nextsep) > width){
			var nbrSep=0;
			for(var y=start;y<=i;y++){
				if(filterby=="" && byId('sep'+y))
					nbrSep++;
			}			
			var linewidth=width-(10*(nbr+1))-(70*nbrSep);
			var boxwidth=0;
			for(var y=start;y<=i;y++){
				if(CurrentView=="collection" && byId('filter'+y).style.display=="none")
					continue;					
				if(CurrentView=="collection")
					boxwidth+=Math.floor(boxes[(boxes.lastIndexOf(order[y])+2)]*height/boxes[(boxes.lastIndexOf(order[y])+3)]);
				else
					boxwidth+=byId(BDIV+y).offsetWidth;
			}
			var scaling=linewidth/boxwidth;
			var widthused=0;
			var x=0;
			for(var y=start;y<=i;y++){
				if(CurrentView=="collection" && byId('filter'+y).style.display=="none")
					continue;					
				if(CurrentView=="collection"){
					byId(BDIV+y).style.width=Math.floor(boxes[(boxes.lastIndexOf(order[y])+2)]*height/boxes[(boxes.lastIndexOf(order[y])+3)]*(scaling))+"px";
					byId(BDIV+y).style.height=Math.floor(height*(scaling))+"px";
				}
				else{
					byId(BDIV+y).style.width=Math.floor(byId(BDIV+y).offsetWidth*(scaling))+"px";
					byId(BDIV+y).style.height="auto";
				}
				if(CurrentView=="collection"){
					byId('BoxParade').style.display="block";
				}
				if(filterby=="" && byId('sep'+y)){								
					if(CurrentView=="collection")
						byId('sep'+y).style.height=(Math.floor(height*(scaling))-2)+"px";
					else
						byId('sep'+y).style.height=(byId('filter'+y).offsetHeight-15)+"px";
				}

			}
			start=i+1;
			nbrRows++;
			nbr=0;
			line=0;
		}
	}
	
	if(CurrentView=="collection"){
		byId('BoxParade').style.display="block";
	}
	for (var i=start;i<BNbr;i++){
		if(filterby=="" && byId('sep'+i)){
			byId('sep'+i).style.height=(byId('filter'+i).offsetHeight-15)+"px";
		}
	}
		
	if(byId(BDIV+(BNbr-1)))
		if(byId(BDIV+(BNbr-1)).style.height!="auto"){
			byId(BDIV+(BNbr-1)).style.width="auto";
			byId(BDIV+(BNbr-1)).style.height=height+"px";
		}
	return (nbrRows);	
}
function share(id){
	if(id=="3DBox"){
		return;
	}
	if(byId('shareLink'+id).value=="Link copied to clipboard")
		return;
	if(byId('share'+id).offsetHeight>0){
		byId('sharebutton'+id).style.visibility="visible";
		byId('sharebutton'+id).style.opacity=0.4;
		byId('share'+id).style.height="0px";
	}
	else{
		byId('sharebutton'+id).style.opacity=0;
		setTimeout("byId('sharebutton"+id+"').style.visibility='hidden'",200);
		byId('share'+id).style.height="4em";
	}
}
function copyShareLink(id){
	var range=byId('shareLink'+id).setSelectionRange(0, byId('shareLink'+id).value.length);
	document.execCommand('copy');
	byId('shareLink'+id).blur();
	byId('shareLink'+id).value="Link copied to clipboard";
	setTimeout("resetShare('"+id+"')",1300);	
}
function resetShare(id){
	if(id=="3DBox")
		toggleShareInfo();
	else {
		byId('shareLink'+id).value="https://bigboxcollection.com/"+id+".blog";
		share(id);
	}
}
function changeContent(){
	if(CurrentView==LastView)
		return;
	var getBox=window.location.hash.substring(1);
	if(getBox=="OverallRanking"){
		toggleRanking(-1);
	}
	else if(getBox!="" && boxes.lastIndexOf(getBox)>0 ){
		changeBox((boxes.lastIndexOf(getBox)-2)/nbrAttributs);
	}
	else{	
		if(getBox.split(">").length>1){
			var filter=getBox.split(">");
			filterby=decodeURIComponent(filter[1]);
			changeView('collection');
		}
		else if(getBox.split("_").length>1){
			var filter=getBox.split("_");
			filterby=decodeURIComponent(filter[1]);
			changeView('collection');
		}
		else if(getBox.split("Blogpost").length>1){
			var getpostID=getBox.split("Blogpost");
			postID=getpostID[1];
			changeView('blog');
		}
		else if(getBox=="ThreeDBB"){
			changeView('ThreeDBB');
		}
		else if(getBox=="TipJar"){
			changeView('tipjar');
		}
		else if(getBox=="AboutMe"){
			changeView('contact');
		}
		else if(getBox=="Settings"){
			changeView('settings');
		}
		else if(getBox=="Blog"){
			changeView('blog');
		}
		else if(getBox=="CollectionWishlist"){
			changeView('wishlist');
		}
		else if(getBox=="CollectionMarket"){
			changeView('leftovers');
		}
		else if(getBox=="CollectionUpcoming"){
			changeView('queue');
		}
		else if(getBox=="BoxFight"){
			
			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){
				GalOrder="ranking2";
				changeView('collection');
				GalOrder="ranking2";
				toggleOverview();
				GalOrder="ranking2";
				toggleFightInfo();
				return;
			} else {
				GalOrder="ranking";
				changeView('collection');
				GalOrder="ranking";
				toggleOverview();
				GalOrder="ranking";
				toggleFightInfo();
				return;
			}
		}
		else{
			changeView('collection');
		}
		toggleOverview();	
	}
}
if(showPage=="Overview"){
	init();
	initCollection();	
	animate();
}

var lazy = [];
var lazycheck=0;
var lazyLoadEvent=byId('gallery').addEventListener('scroll',lazyLoad,false);

function setLazy(){
    lazy = document.getElementsByClassName('lazy');
    //console.log('Found ' + lazy.length + ' lazy images');
} 

function lazyLoad(){
	if(lazycheck)
		return;
	lazycheck=1;
    for(var i=0; i<lazy.length; i++){
        if(isInViewport(lazy[i])){
            if (lazy[i].getAttribute('data-src')){
				lazy[i].setAttribute('src', lazy[i].getAttribute('data-src'));
				lazy[i].setAttribute('onLoad',"byId('"+lazy[i].getAttribute('id')+"').removeAttribute('data-src')");
            }
        }
    }
    cleanLazy();
	lazycheck=0;
}

function cleanLazy(){
    lazy = Array.prototype.filter.call(lazy, function(l){ return l.getAttribute('data-src');});
}

function isInViewport(el){
	if(!byId("collection_box").style.display || byId("collection_box").style.display=="none")
		return false;
    var rect = el.getBoundingClientRect();
    return (
        (rect.top-200) <= (window.innerHeight || document.documentElement.clientHeight)
     );
}

function LazyLoadBlogs(){
	if (byId('moreblogposts') && isInViewport(byId('moreblogposts'))) {
		loadBlog(0,byId('moreblogposts').getAttribute('data'));
	}
}

function registerListener(event, func) {
    if (window.addEventListener) {
        window.addEventListener(event, func)
    } else {
        window.attachEvent('on' + event, func)
    }
}
window.addEventListener('popstate', function (event) {
	//location.reload();
});

// check_webp_feature:
//   'feature' can be one of 'lossy', 'lossless', 'alpha' or 'animation'.
//   'callback(feature, result)' will be passed back the detection result (in an asynchronous way!)
function check_webp_feature(feature, callback) {
    var kTestImages = {
        lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
        lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
        alpha: "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
        animation: "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
    };
    var img = new Image();
    img.onload = function () {
        var result = (img.width > 0) && (img.height > 0);
        callback(feature, result);
    };
    img.onerror = function () {
        callback(feature, false);
    };
    img.src = "data:image/webp;base64," + kTestImages[feature];
}
check_webp_feature('lossy', function (feature, isSupported) {
    if (isSupported) {
		webp="/webp";
		byId('nowebp').style.display="none";
		byId('webp').style.display="block";
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){
			pathCollection="coverM/webp";
			quality=3;
		} else {
			pathCollection="cover/webp";
			changeQuality(3);
		}
    }
});
check_webp_feature('alpha', function (feature, isSupported) {
    if (isSupported) {
		webp="/webp";
		byId('nowebp').style.display="none";
		byId('webp').style.display="block";
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){
			pathCollection="coverM/webp";
			quality=3;
		} else {
			pathCollection="cover/webp";
			changeQuality(3);
		}
//console.log(quality);
    }
});
//console.log(quality);

changeContent();
// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: teal; icon-glyph: magic;
const apiUrl = "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/country_data/England.csv"





const widget = await createWidget();

if (!config.runsInWidget) {
  await widget.presentSmall();
}

Script.setWidget(widget);
Script.complete();

async function createWidget() {

const data = await new Request(apiUrl).loadString();

var csv=data;

var lines=csv.split("\n");

  var result = [];

  var headers=lines[0].split(",");

  for(var i=1;i<lines.length;i++){

	  var obj = {};
	  var currentline=lines[i].split(",");

	  for(var j=0;j<headers.length;j++){
		  obj[headers[j]] = currentline[j];
	  }

	  result.push(obj);

  }
  
  csv=JSON.stringify(result); 
  
  var datacsv = JSON.parse(csv);

const list = new ListWidget()
  
  if(Device.isUsingDarkAppearance()){
    const gradient = new LinearGradient()
    gradient.locations = [0, 1]
    gradient.colors = [
      new Color("111111"),
      new Color("222222")
    ]
    list.backgroundGradient = gradient
  }
  
  const header = list.addText("💉 Vaccinations".toUpperCase())
  header.font = Font.mediumSystemFont(12)
  header.textColor = Device.isUsingDarkAppearance() ? Color.white() : Color.black();
  
  const header2 = list.addText("        England".toUpperCase())
  header2.font = Font.mediumSystemFont(15)
  header2.textColor = Device.isUsingDarkAppearance() ? Color.white() : Color.black();

  list.addSpacer();

	var impfGes=datacsv[datacsv.length-2].total_vaccinations;
  
	var impfGes_dsp=impfGes.toLocaleString()
	
  
var impfGes_pro = impfGes/55980000*100;
  impfGes_pro=impfGes_pro.toFixed(2);
  
  label = list.addText("" + impfGes_dsp);
  label.font = Font.boldSystemFont(15.8);

  label.textColor = Color.green();

list.addSpacer();

label = list.addText("" + impfGes_pro + "%");
  label.font = Font.boldSystemFont(15.8);

  label.textColor = Color.green(); 

list.addSpacer();
  
  label = list.addText("Date: " + datacsv[datacsv.length-2].date);
  label.font = Font.boldSystemFont(11);
  label.textColor = Device.isUsingDarkAppearance() ? Color.white() : Color.black();  
  
 
 return list;
}

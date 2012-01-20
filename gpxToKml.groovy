def gpxFile = new File("C:\\Documents and Settings\\ethan.shepherd\\workspace\\gmaps-pedometer.gpx")
def gpx = new XmlSlurper().parse(gpxFile)

//println gpx

def points = gpx.rte.rtept

points.each{
	println it.@lon.text() +","+ it.@lat.text() +","+ "0.000000" 
}
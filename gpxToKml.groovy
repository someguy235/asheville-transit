def routeNum=170
def routeDesc="Warren Wilson/Black Mountain"
def rtColor="#FAB482"

def gpxColor = rtColor[5..6] + rtColor[3..4] + rtColor[1..2]
def gpxFile = new File("C:\\Users\\ems\\workspace\\gmaps-pedometer.gpx")
def kmlFile = new File("C:\\Users\\ems\\workspace\\r${routeNum}.week.day.kml")
def gpx = new XmlSlurper().parse(gpxFile)

//println gpx
kmlFile.delete()
def points = gpx.rte.rtept
kmlFile.append("""<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://earth.google.com/kml/2.2">
<Document>
  <name>Route ${routeNum} (${routeDesc}) Mon.-Sat. Daytime</name>
  <description><![CDATA[]]></description>
  <Style id="style4">
    <IconStyle>
      <Icon>
        <href>http://maps.gstatic.com/mapfiles/ms2/micons/blue-dot.png</href>
      </Icon>
    </IconStyle>
  </Style>
  <Style id="style2">
    <LineStyle>
      <color>85${gpxColor}</color>
      <width>5</width>
    </LineStyle>
  </Style>
  <Style id="style1">
    <IconStyle>
      <Icon>
        <href>http://maps.gstatic.com/mapfiles/ms2/micons/green-dot.png</href>
      </Icon>
    </IconStyle>
  </Style>
  <Placemark>
    <name>Route ${routeNum} (${routeDesc}) Mon.-Sat. Daytime</name>
    <Snippet></Snippet>
    <description><![CDATA[]]></description>
    <styleUrl>#style2</styleUrl>
    <LineString>
      <tessellate>1</tessellate>
      <coordinates>
""")
points.each{
	kmlFile.append "        "+ it.@lon.text() +","+ it.@lat.text() +","+ "0.000000\n"
}

kmlFile.append("""      </coordinates>
    </LineString>
  </Placemark>
</Document>
</kml>""")
def gpxFile = new File("C:\\Users\\ems\\workspace\\gmaps-pedometer.gpx")
def gpx = new XmlSlurper().parse(gpxFile)

//println gpx

def points = gpx.rte.rtept
println('''<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://earth.google.com/kml/2.2">
<Document>
  <name>Route # Week Day</name>
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
      <color>8527B8FD</color>
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
    <name>Asheville Transit Center</name>
    <Snippet></Snippet>
    <description><![CDATA[]]></description>
    <styleUrl>#style4</styleUrl>
    <Point>
      <coordinates>-82.555710,35.592793,0.000000</coordinates>
    </Point>
  </Placemark>
  <Placemark>
    <name>Route 2</name>
    <Snippet></Snippet>
    <description><![CDATA[]]></description>
    <styleUrl>#style2</styleUrl>
    <LineString>
      <tessellate>1</tessellate>
      <coordinates>''')
points.each{
	println "        "+ it.@lon.text() +","+ it.@lat.text() +","+ "0.000000"
}

println('''      </coordinates>
    </LineString>
  </Placemark>
</Document>
</kml>''')
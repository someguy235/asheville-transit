routeNum=2
routeDesc="Merrimon Avenue/UNCA"
stopDesc=""
stopTimes=""
stopNotes=""

pmFile = new File("C:\\Users\\ems\\workspace\\placemarks.txt")
pmFile.delete()
def inputFile = new File("C:\\Users\\ems\\workspace\\placemarkInput.txt")

index = 1
inputFile.eachLine{
  println index
  switch(index){
    case 1:
      stopDesc=it
      break
    case 2:
      stopTimes=it
      break
    case 3:
      stopNotes=it
      break
    case 4:
      stopLatLon=it.split(",")
      stopLat=stopLatLon[0]
      stopLon=stopLatLon[1]
      outputPlacemark()
      index=0
      break
  }
  println it
  index++
}

def outputPlacemark(){
  println stopLat
  pmFile.append("""<Placemark>
    <name>Route ${routeNum}: ${stopDesc}</name>
    <description><![CDATA[<div dir="ltr">${stopTimes}<br><br>${stopNotes}</div>]]></description>
    <styleUrl>#style1</styleUrl>
    <Point>
      <coordinates>${stopLon},${stopLat},0.000000</coordinates>
    </Point>
  </Placemark>
  """)



}

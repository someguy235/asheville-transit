
def input = new File("C:\\Documents and Settings\\ethan.shepherd\\workspace\\routeInput.txt")
section = 1
println("<div class='schedule'>")
input.eachLine{
	if(it == ""){
		section++
		switch(section){
			case 2:
				println("  <table class='schedule-table'>")
				println("    <tr>")
			break
			case 3:
				println("    </tr>")
			break
			case 4:
				println("  </table>")
				println("  <p>")
			break
			default:
				println("  </p>")
				println("  <p>")
		}
	}
	else{
		switch(section){
			case 1:
				println("  <h3>${it}</h3>")
			break
			case 2:
				println("      <th>${it}</th>")
			break
			case 3:
				print("    <tr>")
				it.split().each{time->
					print("<td>${time}</td>")
				}
				println("</tr>")
			break	
			default:
				if(it == "Route Traveled"){
					println("    <b>${it}:</b><br>")
				}else{
					println("    ${it}")
				}
				break
		}
	}	
}
println("  </p>")
println("</div>")
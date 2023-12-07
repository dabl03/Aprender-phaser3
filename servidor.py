from flask import Flask, request, Blueprint;
app = Flask(__name__);

root_program="./";
#Registramos una nueva url
media_pt=Blueprint("media", __name__, static_folder=root_program+"/media", static_url_path="/media");
app.register_blueprint(media_pt);
app.register_blueprint(
	Blueprint("utils", __name__, static_folder=root_program+"/utils", static_url_path="/utils")
);

@app.route("/")
def game():
	with open(root_program+"/index.html",'r') as html:
		return html.read();
	return "Error: Page no fount";
@app.route("/game_platform-1.js")
def game_js():
	with open(root_program+"/game_platform-1.js",'r') as html:
		return html.read();
	return "Error: Page no fount";
@app.route("/primer-example.html")
def game_primer():
	with open(root_program+"/primer-example.html",'r') as html:
		return html.read();
	return "Error: Page no fount";
@app.route("/platform-1.html")
def game_platform_1():
	with open(root_program+"/platform-1.html",'r') as html:
		return html.read();
	return "Error: Page no fount";
	

if __name__=="__main__":
	app.run(host="daniel.com", port=8080, debug=True)
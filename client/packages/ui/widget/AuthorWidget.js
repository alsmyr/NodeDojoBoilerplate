define(["dojo/_base/declare","dijit/_WidgetBase", "dijit/_TemplatedMixin", "dojo/text!./templates/AuthorWidget.html", "dojo/dom-style", "dojo/_base/fx", "dojo/_base/lang"],
    function(declare, _WidgetBase, _TemplatedMixin, template, domStyle, baseFx, lang){
        return declare([_WidgetBase, _TemplatedMixin], {
            // Some default values for our author
            // These typically map to whatever you're passing to the constructor
            name: "No Name",
            // Using require.toUrl, we can get a path to our AuthorWidget's space
            // and we want to have a default avatar, just in case
            avatar: require.toUrl("./images/defaultAvatar.png"),
            bio: "",
 
            // Our template - important!
            templateString: template,
 
            // A class to be applied to the root node in our template
            baseClass: "authorWidget",
 
            // A reference to our background animation
            mouseAnim: null,
 
            // Colors for our background animation
            baseBackgroundColor: "#fff",
            mouseBackgroundColor: "#def",
	    
	    postCreate: function(){
		// Get a DOM node reference for the root of our widget
		var domNode = this.domNode;
	     
		// Run any parent postCreate processes - can be done at any point
		this.inherited(arguments);
	     
		// Set our DOM node's background color to white -
		// smoothes out the mouseenter/leave event animations
		domStyle.set(domNode, "backgroundColor", this.baseBackgroundColor);
		
		
		// Set up our mouseenter/leave events
		// Using dijit/Destroyable's "own" method ensures that event handlers are unregistered when the widget is destroyed
		// Using dojo/mouse normalizes the non-standard mouseenter/leave events across browsers
		// Passing a third parameter to lang.hitch allows us to specify not only the context,
		// but also the first parameter passed to _changeBackground
		this.own(
		    //on(domNode, mouse.enter, lang.hitch(this, "_changeBackground", this.mouseBackgroundColor)),
		    //on(domNode, mouse.leave, lang.hitch(this, "_changeBackground", this.baseBackgroundColor))
		);
	    },
	    
	    _changeBackground: function(newColor) {
		// If we have an animation, stop it
		if (this.mouseAnim) {
		    this.mouseAnim.stop();
		}
	     
		// Set up the new animation
		this.mouseAnim = baseFx.animateProperty({
		    node: this.domNode,
		    properties: {
			backgroundColor: newColor
		    },
		    onEnd: lang.hitch(this, function() {
			// Clean up our mouseAnim property
			this.mouseAnim = null;
		    })
		}).play();
	    },
	    
	    _setAvatarAttr: function(imagePath) {
		// We only want to set it if it's a non-empty string
		if (imagePath != "") {
		    // Save it on our widget instance - note that
		    // we're using _set, to support anyone using
		    // our widget's Watch functionality, to watch values change
		    this._set("avatar", imagePath);
	     
		    // Using our avatarNode attach point, set its src value
		    this.avatarNode.src = imagePath;
		}
	    }
        });
});
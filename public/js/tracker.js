/**
 * Module which creates a tracker object for pushing data to analytics platform
 * Defines a javascript prototype class which needs to be instantiated 
 * while pushing data to server.
 */

/**
 * Main class which define constructor for creating a PEL event object
 * 
 * object : Entity on which event is performed (eg: doctor)
 * action: 
 */

var validatorSchema = {
	requried: {
		object: {
			requried: {
				name: 'string',
				id: 'string'
			}
		},
		action: {
			required: {
				name: 'string'
			}
		},
		actor: {
			requried: {
				name: 'string',
				id: 'string'
			}
		},
		platform: {
			required: {
				name: 'string',
				version: 'string'
			}
		}
	}
}

function Event(object, action, actor, platform, objectContext, actionContext, actorContext, platformContext) {
	//TODO move this validator out and user the validatorSchema
	if (!object || !action || !actor || !platform) {
		var missing = [];
		if (!object) {
			missing.push('object');
		}
		if (!action) {
			missing.push('action');
		}
		if (!actor) {
			missing.push('actor');
		}
		if (!platform) {
			missing.push('platform');
		}
		var err = missing.length > 1 ? missing.join(',') + ' are required to log events' :
			missing[0] + ' is requried to log events';
		return new Error(missing.join(','))
	}
	this.object = object;
	this.action = action;
	this.actor = actor;
	this.platform = platform;
	this.objectContext = objectContext;
	this.actionContext = actionContext;
	this.actorContext = actorContext;
	this.platformContext = platformContext;
}

Event.prototype.getObject = function() {
	return this.object;
}

Event.prototype.getAction = function() {
	return this.action;
}

Event.prototype.getActor = function() {
	return this.actor;
}

Event.prototype.getPlatform = function() {
	return this.platform;
}

Event.prototype.setObject = function(object) {
	if (object) {
		this.object = object;
	}
}

Event.prototype.setAction = function(action) {
	if (action) {
		this.action = action;
	}
}

Event.prototype.setActor = function(actor) {
	if (actor) {
		this.actor = actor;
	}
}

Event.prototype.setPlatform = function(platform) {
	if (platform) {
		this.platform = platform;
	}
}


Event.prototype.setContexts = function(contexts) {
	this.objectContext = contexts.object;
	this.actionContext = contexts.action;
	this.actorContext = contexts.actor;
	this.platformContext = contexts.platform;
}

Event.prototype.getJSON = function() {
	var eventJSON = {};

	eventJSON['object'] = this.object;
	eventJSON['action'] = this.action;
	eventJSON['actor'] = this.actor;
	eventJSON['platform'] = this.platform;
	eventJSON['objectContext'] = this.objectContext;
	eventJSON['actionContext'] = this.actionContext;
	eventJSON['actorContext'] = this.actorContext;
	eventJSON['platformContext'] = this.platformContext;

	return eventJSON;
};
Event.prototype.logEvent = function(callback) {
	var xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/json");
	xobj.open('POST', '/event', true);
	xobj.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xobj.send(JSON.stringify(this.getJSON()));
	xobj.onreadystatechange = function() {
		if (xobj.readyState == 4 && xobj.status == "200") {
			return callback(xobj.responseText);
		}
	};
};

/**
 * Class defining tracker which pushes event to the analytics tools
 * Config is object can be used to configure keys for undelying services
 * On production, config will be ignored
 **/
function Tracker(config) {
	//TODO Set tracking channels here
}

Tracker.prototype.createEvent = function(object, action, actor, platform) {
	return new Event(object, action, actor, platform);
};

Tracker.prototype.logEvent = function(object, action, actor, platform) {
	var sweepEvent = new Event(object, action, actor, platform);
	sweepEvent.logEvent();
};

//module.export = Tracker;

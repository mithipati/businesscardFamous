/*globals define*/
define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var ImageSurface = require('famous/surfaces/ImageSurface');

    /*
     * @name CardView
     * @constructor
     * @description
     */

    function CardView() {
        View.apply(this, arguments);

        this.sizeModifier = new StateModifier({
            size: [600, 400],
            origin: [0.5, 0.5]
        });

        this.mainNode = this.add(this.sizeModifier);

        _createBackground.call(this);
        _createLogoSpace.call(this);
        _createLeftText.call(this);
        _createContactInfo.call(this);
    }

    CardView.prototype = Object.create(View.prototype);
    CardView.prototype.constructor = CardView;

    CardView.DEFAULT_OPTIONS = {
    };

    // Background Business Card
    function _createBackground() {
        var background = new Surface({
            properties: {
                backgroundColor: 'rgb(26,50,72)',
                boxShadow: '0 10px 10px -1px rgba(0, 0, 0, 0.5)',
                borderRadius: '2rem'
            },
            classes: ['mainCard']
        });

        this.mainNode.add(background);
    }

    // Company Logo
    function _createLogoSpace() {
        var logo = new ImageSurface({
            size: [200, 200],
            content: '/content/images/famous_logo.png',
            classes: ['logo']
        });

        var rightFlap = new StateModifier({
            origin: [1,0]
        });

        logo.on('click', function () {
            window.location = 'http://famo.us'
        });

        this.mainNode.add(rightFlap).add(logo);
    }

    // Name and title information
    function _createLeftText() {
        var subtext = new Surface({
            size: [350, undefined],
            content: '<h1>FirstName LastName</h1>\n<h2><em>Title</em></h2>',
            properties: {
                // backgroundColor: 'rgb(26,50,72)',
                color: 'white',
            },
            classes: ['leftText']
        });

        var leftFlap = new StateModifier({
            origin: [0,1]
        });

        this.mainNode.add(leftFlap).add(subtext);
    }

    // Social Icons
    function _createContactInfo() {
        var contactInfo = new Surface({
            size: [250, 200],
            content: '<a target="_blank" href="mailto:neil.mithipati@gmail.com?subject=Let\'s Talk"<h3>e: example@email.com</h3></a>\n' +
            '<h3>m: (555)-555-5555</h3>\n' +
            '<a target="_blank" href="https://twitter.com/"><h3>t: @twitter</h3></a>',
            properties: {
                zIndex: 1,
                color: 'white',
                fontFamily: 'sans-serif'
            },
            classes: ['contactInfo']
        });

        var contactMod = new StateModifier({
            origin: [1,1]
        });

        this.mainNode.add(contactMod).add(contactInfo);
    }

    module.exports = CardView;
});

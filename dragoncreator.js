//Creator for D&D 5e (official Content) Dragons
//made by Julexar (https://app.roll20.net/users/9989180/julexar)

//API Commands
//!creator - displays the Creator Menu for the GM
//!create - creates a Dragon

// Red Colour: #7E2D40

var Dragoncreator = Dragoncreator || (function() {
    'use strict';
    
    var version = '1.0',
    
    setDefaults = function() {
        state.dragon = {
            now: {
                name: 'Test',
                gender: 'Male',
                terrain: 'Desert',
                type: 'Blue',
                size: 'Ancient',
                personality: 'Test',
                ideal: 'Test',
                connection: 'Test',
                hoard: 'Test',
            },
        };
    },
    
    handleInput = function(msg) {
        var args = msg.content.split(",");
        
        if (msg.type !== "api") {
			return;
		}
		if(playerIsGM(msg.playerid)){
		    switch(args[0]) {
		        case '!creator':
		            creatormenu();
		            break;
		        case '!create':
		            create(args[1],args[2],args[3]);
		            break;
		        case '!setname':
		            setname(args[1]);
		            creatormenu();
		            break;
		        case '!setage':
		            if (String(args[1]).includes('1')||String(args[1]).includes('2')||String(args[1]).includes('3')||String(args[1]).includes('4')||String(args[1]).includes('5')||String(args[1]).includes('6')||String(args[1]).includes('7')||String(args[1]).includes('8')||String(args[1]).includes('9')) {
		                setage(args[1]);
		            } else {
		                sendChat('Dragon Creator','/w gm Age must be a number larger than 0!');
		            }
		            creatormenu();
		            break;
		        case '!setgender':
		            if (String(args[1])=="Random") {
		                var rand=randomInteger(2);
		                var gender;
		                if (rand==1) {
		                    gender="Male";
		                } else {
		                    gender="Female";
		                }
		            } else {
		                gender=args[1]
		            }
		            state.dragon.now.gender=gender;
		            creatormenu();
		            break;
		        case '!settypesize':
		            settype(args[1]);
		            setsize(args[2]);
		            creatormenu();
		            break;
		        case '!setterrain':
		            var terrain;
		            if (String(args[1])=="Random") {
		                var rand=randomInteger(6);
		                if (rand==1) {
		                    terrain="Desert";
		                } else if (rand==2) {
		                    terrain="Arctic";
		                } else if (rand==3) {
		                    terrain="Mountain";
		                } else if (rand==4) {
		                    terrain="Forest";
		                } else if (rand==5) {
		                    terrain="Swamp";
		                } else if (rand==6) {
		                    terrain="Plains";
		                }
		            } else {
		                terrain=args[1];
		            }
		            state.dragon.now.terrain=terrain;
		            creatormenu();
		            break;
		        case '!setlist':
		            setlist();
		            break;
		        case '!settype':
		            settype(args[1]);
		            break;
		        case '!setsize':
		            setsize(args[1]);
		            setname();
		            creatormenu();
		            break;
		        case '!setpersonality':
		            setpersonality(args[1],args[2],args[3],args[4],args[5]);
		            creatormenu();
		            break;
		        case '!showdragon':
		            showdragon();
		            break;
		        case '!sethoard':
		            sethoard();
		            creatormenu();
		            break;
		    }
		}
    },
    
    creatormenu = function() {
        var divstyle = 'style="width: 220px; border: 1px solid black; background-color: #ffffff; padding: 5px;"';
        var astyle1 = 'style="text-align:center; border: 1px solid black; margin: 1px; background-color: #7E2D40; border-radius: 4px;  box-shadow: 1px 1px 1px #707070; width: 100px;';
        var astyle2 = 'style="text-align:center; border: 1px solid black; margin: 1px; background-color: #7E2D40; border-radius: 4px;  box-shadow: 1px 1px 1px #707070; width: 150px;';
        var tablestyle = 'style="text-align:center;"';
        var arrowstyle = 'style="border: none; border-top: 3px solid transparent; border-bottom: 3px solid transparent; border-left: 195px solid rgb(126, 45, 64); margin-bottom: 2px; margin-top: 2px;"';
        var headstyle = 'style="color: rgb(126, 45, 64); font-size: 18px; text-align: left; font-variant: small-caps; font-family: Times, serif;"';
        var substyle = 'style="font-size: 11px; line-height: 13px; margin-top: -3px; font-style: italic;"';
        sendChat('Dragon Creator', '/w gm <div ' + divstyle + '>' + //--
            '<div ' + headstyle + '>Dragon Creator</div>' + //--
            '<div ' + substyle + '>Menu</div>' + //--
            '<div ' + arrowstyle + '></div>' + //--
            '<table>' + //--
            '<div style="text-align:center;">Current Dragon</div>' + //--
            '<tr><td>Name: </td><td><a ' + astyle1 + '" href="!setname,?{Name?|New Name}">' + state.dragon.now.name + '</a></td></tr>' + //--
            '<tr><td>Gender: </td><td><a ' + astyle1 + '" href="!setgender,?{Gender?|Male|Female|Random},' + state.dragon.now.gender + '">' + state.dragon.now.gender + '</a></td></tr>' + //--
            '<tr><td>Type & Size: </td><td><a ' + astyle1 + '" href="!settypesize,?{Type?|Amethyst|Black|Blue|Brass|Bronze|Copper|Crystal|Emerald|Gold|Green|Red|Sapphire|Silver|Topaz|White|Random},?{Size?|Wyrmling|Young|Adult|Ancient|Greatwyrm|Random},' + '">' + state.dragon.now.size + ' ' + state.dragon.now.type + ' Dragon' + '</a></td></tr>' + //--
            '<tr><td>Terrain: </td><td><a ' + astyle1 + '" href="!setterrain,?{Terrain?|Desert|Arctic|Mountain|Forest|Swamp|Plains|Random},' + state.dragon.now.terrain + '">' + state.dragon.now.terrain + '</a></td></tr>' + //--
            '</table>' + //--
            '<br>' + //--
            '<br><tr><td>Personality: </td><td><br>' + state.dragon.now.personality + '</td></tr>' + //--
            '<br><br><tr><td>Ideals: </td><td><br>' + state.dragon.now.ideal + '</td></tr>' + //--
            '<br><br><tr><td>Connections: </td><td><br>' + state.dragon.now.connection + '</td></tr><br>' + //--
            '<br><tr><td>Hoard: </td><td><br>' + state.dragon.now.hoard + '</td></tr><br>' + //--
            '<div style="text-align:center;"><a ' + astyle2 + '" href="!create,?{Terrain?|Desert|Arctic|Mountain|Forest|Swamp|Plains|Random}">Create a Dragon</a></div>' + //--
            '<div style="text-align:center;"><a ' + astyle2 + '" href="!setlist">Roll Personality</a></div>' + //--
            '<div style="text-align:center;"><a ' + astyle2 + '" href="!setname">Generate Name</a></div>' + //--
            '<div style="text-align:center;"><a ' + astyle2 + '" href="!sethoard">Generate Hoard</a></div>' + //--
            '<br>' + //--
            '<div style="text-align:center;"><a ' + astyle2 + '" href="!showdragon">Show Dragon</a></div>' + //--
            '</div>'
        );
    },
    
    showdragon = function() {
        var divstyle = 'style="width: 220px; border: 1px solid black; background-color: #ffffff; padding: 5px;"'
        var tablestyle = 'style="text-align:center;"';
        var arrowstyle = 'style="border: none; border-top: 3px solid transparent; border-bottom: 3px solid transparent; border-left: 220px solid rgb(126, 45, 64); margin-bottom: 2px; margin-top: 2px;"';
        var headstyle = 'style="color: rgb(126, 45, 64); font-size: 18px; text-align: left; font-variant: small-caps; font-family: Times, serif;"';
        var substyle = 'style="font-size: 11px; line-height: 13px; margin-top: -3px; font-style: italic;"';
        sendChat("Dragon Creator", "/w gm " + '<div ' + divstyle + '>' + //--
            '<div ' + headstyle + '>' + state.dragon.now.name + '</div>' + //--
            '<div ' + substyle + '>Pretty View</div>' + //--
            '<div ' + arrowstyle + '></div>' + //--
            '<br>Gender: ' + state.dragon.now.gender + //--
            '<br><br>Type & Size: ' + state.dragon.now.size + ' ' + state.dragon.now.type + ' Dragon' + //--
            '<br><br>Terrain: ' + state.dragon.now.terrain + //--
            '<br><br>Personality:<br>' + //--
            '' + state.dragon.now.personality + //--
            '<br><br>Ideals:<br>' + //--
            '' + state.dragon.now.ideal + //--
            '<br><br>Connections:<br>' + //--
            '' + state.dragon.now.connection + //--
            '<br><br>Hoard:<br>' + //--
            '' + state.dragon.now.hoard
        );
    },
    
    create = function(terrain) {
        var divstyle = 'style="width: 189px; border: 1px solid black; background-color: #ffffff; padding: 5px;"';
        var astyle1 = 'style="text-align:center; border: 1px solid black; margin: 1px; background-color: #7E2D40; border-radius: 4px;  box-shadow: 1px 1px 1px #707070; width: 100px;';
        var astyle2 = 'style="text-align:center; border: 1px solid black; margin: 1px; background-color: #7E2D40; border-radius: 4px;  box-shadow: 1px 1px 1px #707070; width: 150px;';
        var tablestyle = 'style="text-align:center;"';
        var arrowstyle = 'style="border: none; border-top: 3px solid transparent; border-bottom: 3px solid transparent; border-left: 195px solid rgb(126, 45, 64); margin-bottom: 2px; margin-top: 2px;"';
        var headstyle = 'style="color: rgb(126, 45, 64); font-size: 18px; text-align: left; font-variant: small-caps; font-family: Times, serif;"';
        var substyle = 'style="font-size: 11px; line-height: 13px; margin-top: -3px; font-style: italic;"';
        if (String(terrain)=="Random") {
            var rand=randomInteger(6);
            if (rand==1) {
                terrain="Desert";
            } else if (rand==2) {
                terrain="Arctic";
            } else if (rand==3) {
                terrain="Mountain";
            } else if (rand==4) {
                terrain="Swamp";
            } else if (rand==5) {
                terrain="Forest";
            } else if (rand==6) {
                terrain="Plains";
            }
        }
        switch (terrain) {
            case 'Desert':
                sendChat('Dragon Creator', '/w gm <div ' + divstyle + '>' + //--
                    '<div ' + headstyle + '>Dragon Creator</div>' + //--
                    '<div ' + substyle + '>Menu</div>' + //--
                    '<div ' + arrowstyle + '></div>' + //--
                    '<table>' + //--
                    '<div style="text-align:center;"><a ' + astyle2 + '" href="!settype,?{Type?|Blue|Brass|Copper|Gold|Red|Sapphire}">Set Type</a></div>' + //--
                    '</div>'
                );
                break;
            case 'Arctic':
                sendChat('Dragon Creator', '/w gm <div ' + divstyle + '>' + //--
                    '<div ' + headstyle + '>Dragon Creator</div>' + //--
                    '<div ' + substyle + '>Menu</div>' + //--
                    '<div ' + arrowstyle + '></div>' + //--
                    '<table>' + //--
                    '<div style="text-align:center;"><a ' + astyle2 + '" href="!settype,?{Type?|Crystal|Sapphire|Topaz|White}">Set Type</a></div>' + //--
                    '</div>'
                );
                break;
            case 'Mountain':
                sendChat('Dragon Creator', '/w gm <div ' + divstyle + '>' + //--
                    '<div ' + headstyle + '>Dragon Creator</div>' + //--
                    '<div ' + substyle + '>Menu</div>' + //--
                    '<div ' + arrowstyle + '></div>' + //--
                    '<table>' + //--
                    '<div style="text-align:center;"><a ' + astyle2 + '" href="!settype,?{Type?|Red|White|Amethyst|Emerald|Sapphire|Crystal|Topaz|Bronze|Silver}">Set Type</a></div>' + //--
                    '</div>'
                );
                break;
            case 'Forest':
                sendChat('Dragon Creator', '/w gm <div ' + divstyle + '>' + //--
                    '<div ' + headstyle + '>Dragon Creator</div>' + //--
                    '<div ' + substyle + '>Menu</div>' + //--
                    '<div ' + arrowstyle + '></div>' + //--
                    '<table>' + //--
                    '<div style="text-align:center;"><a ' + astyle2 + '" href="!settype,?{Type?|Green|Sapphire|Topaz|Amethyst|Bronze|Copper|Silver}">Set Type</a></div>' + //--
                    '</div>'
                );
                break;
            case 'Swamp':
                sendChat('Dragon Creator', '/w gm <div ' + divstyle + '>' + //--
                    '<div ' + headstyle + '>Dragon Creator</div>' + //--
                    '<div ' + substyle + '>Menu</div>' + //--
                    '<div ' + arrowstyle + '></div>' + //--
                    '<table>' + //--
                    '<div style="text-align:center;"><a ' + astyle2 + '" href="!settype,?{Type?|Black|Sapphire|Topaz|Amethyst}">Set Type</a></div>' + //--
                    '</div>'
                );
                break;
            case 'Plains':
                sendChat('Dragon Creator', '/w gm <div ' + divstyle + '>' + //--
                    '<div ' + headstyle + '>Dragon Creator</div>' + //--
                    '<div ' + substyle + '>Menu</div>' + //--
                    '<div ' + arrowstyle + '></div>' + //--
                    '<table>' + //--
                    '<div style="text-align:center;"><a ' + astyle2 + '" href="!settype,?{Type?|Gold|Copper|Bronze|Sapphire|Topaz|Amethyst|Silver}">Set Type</a></div>' + //--
                    '</div>'
                );
                break;
        }
        state.dragon.now.terrain=terrain;
    },
    
    settype = function(type) {
        state.dragon.now.type=type;
        var divstyle = 'style="width: 189px; border: 1px solid black; background-color: #ffffff; padding: 5px;"';
        var astyle1 = 'style="text-align:center; border: 1px solid black; margin: 1px; background-color: #7E2D40; border-radius: 4px;  box-shadow: 1px 1px 1px #707070; width: 100px;';
        var astyle2 = 'style="text-align:center; border: 1px solid black; margin: 1px; background-color: #7E2D40; border-radius: 4px;  box-shadow: 1px 1px 1px #707070; width: 150px;';
        var tablestyle = 'style="text-align:center;"';
        var arrowstyle = 'style="border: none; border-top: 3px solid transparent; border-bottom: 3px solid transparent; border-left: 195px solid rgb(126, 45, 64); margin-bottom: 2px; margin-top: 2px;"';
        var headstyle = 'style="color: rgb(126, 45, 64); font-size: 18px; text-align: left; font-variant: small-caps; font-family: Times, serif;"';
        var substyle = 'style="font-size: 11px; line-height: 13px; margin-top: -3px; font-style: italic;"';
        sendChat('Dragon Creator', '/w gm <div ' + divstyle + '>' + //--
            '<div ' + headstyle + '>Dragon Creator</div>' + //--
            '<div ' + substyle + '>Menu</div>' + //--
            '<div ' + arrowstyle + '></div>' + //--
            '<table>' + //--
            '<div style="text-align:center;"><a ' + astyle2 + '" href="!setsize,?{Type?|Wyrmling|Young|Adult|Ancient|Random}">Set Size</a></div>' + //--
            '</div>'
        );
    },
    
    setsize = function(size) {
        if (String(size)=="Random") {
            var rand=randomInteger(4);
            if (rand==1) {
                size="Wyrmling";
            } else if (rand==2) {
                size="Young";
            } else if (rand==3) {
                size="Adult";
            } else if (rand==4) {
                size="Ancient";
            }
        }
        state.dragon.now.size=size;
    },
    
    setname = function(name) {
        if (!name) {
            var gender=state.dragon.now.gender;
            var firstnamelist="Aero,Alae,Andusk,Arauth,Aryz,Auntyr,Ciym,Eir,Endar,Ethar,Fel,Gaul,Guth,Ix,Kerin,Malae,Marun,Mere,Nur,Nym,Raali,Rith,Ser,Skad,Surr,Thal,Thoth,Thriin,Tratain,Umer,Uxin,Vaer,Vala,Voar,Zyreph";
            var lastnamelist;
            if (String(gender)=="Male") {
                firstnamelist+=",Tilrat,Golbin,Baldroit,Korgo,Nakass,Xeoldreoss,Tildrer,Gramri,Mennot,Thralan,Cheznol,Azellaf,Throlandraf,Grenstarg,Fezos,Fastorgath,Meradrath,Alistax,Caspadan,Thonungarg,Fastangrok,Astel,Omnimovux,Renos,Fanorg,Thilindrios,Narzarg,Thrargellaex,Sozir,Naklorvalar,Zanstitran,Fanak,Lartarg,Thrasperg,Thanstok,Vorlgangrog,Ferdin,Ostox,Vorzos,Chiralgrin,Kardin,Nathnar,Figrastogus,Chanorg,Gaurath,Senux,Zonarvax,Vaurden,Daluf,Solorg,Irguth,Raznerg,Olex,Shilan,Ronel,Fargur,Gaklon,Vorgin,Forladal,Voner,Doklonsir,Thergodor,Aredir,Nerdax,Cenoth,Alerg";
                lastnamelist="The Wild,The Butcher,The Cursed,The Enormous,The Aggressor,The Immortal,The Ancient,The Dark,Blackwing,Shadowwing,Frostwing,The Eternal,The Razor,The Great,The Enigma,The Calm,The Seducer,The Corruptor,The Charming,The Vengeful,The Cunning,Wildfangs,Stormtooth,Dawnroar,The Vicious,Grimback,Mindripper,Greatclaw,The Hunter,The Butcher,Mooncutter,Thunderback,Silvertooth,Sunbreaker,The Silent,Nightforger,Sunroar,The Destroyer,Stormspeaker";
            } else {
                firstnamelist+=",Cisa,Chinsi,Ezmi,Irne,Ynis,Cama,Muzna,Emi,Skirmi,Ryna,Rirna,Asa,Rusra,Zuna,Cirwi,Skala,Cymis,Kara,Tara,Zyri,Zirma,Ulaka,Celis,Mysa,Iri,Irmara,Ruma,Kirna,Izna,Scira,Scyma,Rami,Masrora,Thumi,Ysra,Tusra,Tulis,Ceni,Tysre,Kurila,Nemala,Skynar,Chisa,Ami,Atsemi,Casra,Cira,Nyladi,Cyrella,Tami,Rasri,Kina,Vyrna";
                lastnamelist="The Wild,The Bewitching,The Immortal,The Dark,The Charming,Lady of the Lake,Lady of the Desert,Lady of the Skies,Lady of the Water,The Proud,Blackwing,Shadowwing,Frostwing,The Seducing,The Cunning,Wildfangs,Stormfang,Stormtooth,Dawnroar,Mindripper,Greatclaw,Mooncutter,Thunderback,Stormback,Sunbreaker";
            }
            var firstlist=firstnamelist.split(',');
            var lastlist=lastnamelist.split(',');
            var firstrand=randomInteger(firstlist.length+1);
            var lastrand=randomInteger(lastlist.length+1);
            var firstname=firstlist[firstrand-1];
            var lastname=lastlist[lastrand-1];
            state.dragon.now.name=firstname+' '+lastname;
        } else {
            state.dragon.now.name=name;
        }
    },
    
    setgender = function(gender) {
        if (String(gender)=="Random") {
            var rand=randomInteger(2);
            if (rand==1) {
                gender="Male";
            } else if (rand==2) {
                gender="Female";
            }
        }
        state.dragon.now.gender=gender;
    },
    
    setlist = function() {
        var type=state.dragon.now.type;
        var size=state.dragon.now.size;
        var traitlist;
        var ideallist;
        var connectionlist;
        switch (type) {
            case 'Amethyst':
                traitlist="I am never so content as when contemplating the beauty and wonders of the multiverse.;I am a sworn protector against the depredations of the Far Realm, and I will root out its corruption wherever it may arise.;What use is vast knowledge or insight if it is not shared with those who can appreciate it?;Although some are fascinated by words, I think numbers are the true foundations of creation.;To experience a thing is to truly understand it. Direct and personal experience is the most valuable form of knowledge.;I see a far more kaleidoscopic reality than you do … or than any of your selves do, really.;It is not my place to interfere. I merely seek to observe, learn, and understand.;With a true understanding of metaphysics, anything is possible—including the creation of a more orderly and perfect cosmos than this one.";
                ideallist="Balance. Everything is a complex interaction of forces that must be kept in a delicate and carefully maintained balance. (Neutral);Knowledge. We are the whole of creation, seeking to understand itself. (Any);Self-Improvement. I am a complex gem, and I constantly polish and refine my many facets to make the whole that much more perfect. (Any);Responsibility. Having knowledge and power gives one a responsibility to those who have less of either. (Lawful);Noble Obligation. My superior experience, intellect, and insight give me a duty to mediate disputes when I can. (Good);Power. Knowledge is power, power must be used, and I use it. Your concerns are irrelevant. (Evil)";
                if (size=="Wyrmling") {
                    connectionlist="An amethyst dragon wyrmling is in the care of a cloistered religious order of scribes.;A half-amethyst dragon cares for an amethyst dragon wyrmling sibling after the disappearance of their dragon parent.;A violet faerie dragon is the playmate and guardian of an amethyst dragon wyrmling.;An amethyst dragon wyrmling lives alone in a lair, cared for by a cadre of animated objects.;A cloister of flumphs protects an amethyst dragon wyrmling while feeding on the wyrmling\’s excess psionic energy.;A circle of druids looks after an amethyst dragon wyrmling lairing in the circle’s mountain tarn.";
                } else if (size=="Young") {
                    connectionlist="A myconid community dwells in tunnels near a young amethyst dragon\’s lair, and its members telepathically commune with the dragon and any visitors in the lair from time to time.;A young amethyst dragon and a githzerai zerth travel together, learning about the multiverse.;A young amethyst dragon wants to take over the cavern lair of a hydra.;A deep pool in a young amethyst dragon\’s lair leads to the underground domain of an aboleth the dragon has been seeking to eliminate.;A young amethyst dragon and a cloud giant regularly host each other to play strategy games.;Pegasi nesting in the mountain heights are under the protection of a young amethyst dragon.";
                } else if (size=="Adult") {
                    connectionlist="Merfolk dwelling near an adult amethyst dragon\’s lair are under threat from sahuagin raiders.;Clusters of shriekers serve as a warning system in the tunnels of an adult amethyst dragon\’s lair.;The Enlightened Dragon Master of an isolated monastery is, in fact, an adult amethyst dragon.;An adult amethyst dragon is at war with a beholder that has moved into the dragon’s domain.;Xorn serve as lookouts and spies for an adult amethyst dragon who rewards them with gems.;To repay a favor long owed to a monastery of githzerai warrior-monks, an adult amethyst dragon sends them aid against a mind flayer colony.;An apostate community of githyanki follows the tutelage of an adult amethyst dragon, who safeguards their creche on the Material Plane.;The crystal-infused clay near an adult amethyst dragon\’s lair is ideal for the creation of clay golems, and the dragon can perceive everything those golems do.";
                } else if (size=="Ancient") {
                    connectionlist="A yuan-ti cult known as the Serpents of the Dreaming City draws power from an ancient amethyst dragon, which the cultists keep in eternal slumber with braziers of enchanted smoke.;A rogue purple worm swallowed a large portion of an amethyst dragon’s hoard before burrowing back into the deep Underdark. The dragon has a magic crystal that can trace the worm’s movement.;An ancient amethyst dragon is able to awaken psionic potential in others, and many of the greatest psi warriors in history were the dragon’s students.;After centuries guarding the world against incursions from the Far Realm, an ancient amethyst dragon has been corrupted by aberrant influences and now leads a cult the dragon once opposed.";
                }
                break;
            case 'Black':
                traitlist="I demonstrate my brilliance through the cruel subtlety of my actions.;Watching the works of lesser beings crumble and fall into ruin fills me with joy.;I never confront a threat directly when deceit and skulduggery are available options.;Subjugating others is preferable to destroying them. Thralls make life so much more pleasant.;I will go to great lengths to obtain deadly new magical knowledge.;Nothing lasts forever. But I promise to outlast you.;I have witnessed the rise and fall of civilizations. What consideration does a creature as pitiful and short-lived as you deserve?;Collecting antiquities and learning why lost cultures vanished are my reasons for existing. If you can help me in that, I\’ll let you live.";
                ideallist="Envy. If the achievements of others cannot be eclipsed, they can always be torn down. (Evil);Acquisitiveness. Possessing what others covet is immensely satisfying. (Any);Cunning. Destroying your foes without exposing yourself to danger is an art. (Evil);Adaptability. It is not the most powerful, but the most flexible who survive. (Chaotic);Patience. There\’s no need to rush a poorly constructed plan when time is on your side. (Any);Serenity. Observing a culture sliding into oblivion along the trek of time puts life in perspective. (Any)";
                if (size=="Wyrmling") {
                    connectionlist="After breaking free from captivity at the hands of a cocky mage, a cunning black dragon wyrmling claimed the mage\’s amulet—and the suits of animated armor the amulet controls.;A band of troglodytes is cowed into serving a black dragon wyrmling as bodyguards.;The recent appearance of a black dragon wyrmling has altered the local ecosystem, allowing various types of blights to spread prodigiously and upset nature\’s balance.;A black dragon wyrmling is setting cunning traps along local roadways, hoping to injure horses and draft animals for easy butchering.;Kobolds dwelling under a tropical city serve as safecrackers and tunneling burglars to amass treasure for their beloved black dragon wyrmling master.;A gnome relic hunter looting a long-abandoned city strikes up an unlikely partnership with a black dragon wyrmling to plunder an archaeological dig.";
                } else if (size=="Young") {
                    connectionlist="A young black dragon with a talent for alchemy has weaponized the spores of a myconid colony.;A merrow war band has negotiated an alliance with a young black dragon to sack a nearby trading port.;A pack of ghouls infesting a necropolis serve as a young black dragon\’s bodyguards and enforcers.;A young black dragon has cultivated an awakened carnivorous plant (use the awakened tree stat block) as a lair guardian and has been abducting travelers to feed the plant creature.;Lizardfolk worshiping a young black dragon have been raiding a local fishing community.;A young black dragon has struck up a mutual assistance pact with a roper that haunts the ruins outside the dragon’s lair.";
                } else if (size=="Adult") {
                    connectionlist="An adult black dragon has learned to domesticate swamp-bred chimeras as guardians and has sold a few of the creatures to local warlords.;A cult of assassins worships an adult black dragon as an avatar of their deity. The dragon now uses the cult to destabilize the local sovereign\’s rule.;Ruins rumored to hold the treasury of a lost empire are guarded by an elaborate network of ooze-based traps designed by a restless adult black dragon.;The appearance of a spirit naga in the domain of an adult black dragon encourages the dragon to study necromancy.;An adult black dragon has hidden a cache of gems in a dismal topiary maze filled with shambling mounds, traps, and noxious plant life, all for the amusement of testing adventurers.;An adult black dragon has bound water elementals to the task of bringing food to the dragon\’s lair.;A bullywug community seeks help to defeat an adult black dragon who has been feasting on the bullywugs\’ domesticated giant frogs.;Two nations—one led by an adult black dragon and the other by a yuan-ti abomination—are on the brink of joining forces to destroy a third nation. The threatened nation is recruiting adventurers to defend it.";
                } else if (size=="Ancient") {
                    connectionlist="An ancient black dragon, after studying blasphemous texts dedicated to alien gods, issues a warning that a corrupted planetar will soon fall to earth like a meteor in the fens outside a great city\’s walls.;An illithid community has spent nearly a millennium raising and preparing a black dragon to become an elder brain dragon (described in chapter 6), so the elder brain can wreak ruin upon its rivals.;The decades-long machinations of an ancient black dragon and an evil archmage are nearing fruition. If their pact succeeds, they will unleash devastation on a continental scale.;An ancient black dragon rules a vast, decadent city built on artificial islands within a polluted lake. The site is threatened with destruction by an enraged archdruid—but destroying the city means thousands of innocents will die.";
                }
                break;
            case 'Blue':
                traitlist="I enforce order and social hierarchies because I believe this is how strong societies are built.;Why waste time and energy murdering weaker creatures when I can make them entertain me instead?;My children, whether born to me or chosen by me, are treasures.;Nothing is funnier than tricking a thirsty traveler into drinking a mouthful of sand.;I have standards for my hoard. Not just any gem or trinket will do.;I\’m so pleased with myself and my own good fortune that I can\’t stop laughing or chuckling.;I would rather destroy my lair and lose my hoard than allow anyone to steal from me.;I am sometimes secretly impressed by what other peoples can accomplish with the proper guidance.";
                ideallist="Order. Life is best when everyone is part of a hierarchy and rules are clear and consistent. (Lawful);Humor. Lesser beings exist to be my playthings, and I excel at finding ways to toy with them. (Evil);Taste. I value my possessions for more than just their beauty and consider gauche displays of wealth a sign of inferiority. (Any);Family. Blood ties are irrevocable, and even if one doesn\’t particularly like one\’s family members, they come before anyone else. (Lawful);Display. One should never take risks or waste resources by using power if one can achieve the same results merely by the threat of power. (Any);Loyalty. I don\’t form bonds with those outside my kindred often. But when I do, I am an unshakable and powerful ally. (Good)";
                if (size=="Wyrmling") {
                    connectionlist="A recently hatched brood of blue dragon wyrmlings has adopted a wounded pseudodragon as a sibling.;A blue dragon wyrmling frequently wanders off to a nearby city, where the residents treat the wyrmling as royalty.;A clan of druids has taken in an orphaned blue dragon wyrmling, and its members are trying to teach the creature the value of compassion.;A family of gnolls is holding a blue dragon wyrmling hostage in an attempt to force the wyrmling’s parents to leave the gnolls\’ hunting grounds.;Because of the friendship between a bandit leader\’s child and a blue dragon wyrmling, the wyrmling\’s parents are considering allowing the bandits to move into the dragons\’ territory.;The accidental death of a blue dragon wyrmling has caused a sibling to seek revenge.";
                } else if (size=="Young") {
                    connectionlist="A young blue dragon\’s family was killed, and the dragon is building a whole realm as a base for exterminating those responsible.;A young blue dragon claims the rule of a fast-growing city to impress the dragon\’s family.;A young blue dragon running a protection racket has run afoul of an efreeti, who has decided the area would be better off without dragons.;A tough but fair young blue dragon leads a fanatically loyal mercenary squad.;A young blue dragon schemes to take over a guardian naga\’s ancient temple.;A mummy lord keeps a young blue dragon bodyguard as a sign of power.";
                } else if (size=="Adult") {
                    connectionlist="An adult blue dragon rules a city and applies exacting standards of aesthetic perfection to everything and everyone in it, swiftly disposing of anyone who fails to meet those standards.;An adult blue dragon and an efreeti have formed a friendship over the decades. They now share a territory and assist one another in protecting it.;Feeling unappreciated and disrespected in one family, an adult blue dragon offers allegiance to a rival dragon family, setting off a blood feud.;A pair of adult blue dragons has decided to take over a thriving, wealthy city, whose governor is desperate to buy them off.;Decades ago, a gynosphinx insulted an adult blue dragon, earning the lasting enmity of a whole dragon family.;An adult blue dragon has adopted a half-blue dragon as an heir and is setting this heir up to be a puppet ruler.;An adult blue dragon plans to present a loyal bandit clan to a bronze dragon as a courting gift.;An adult blue dragon is obsessed with getting at the treasure guarded by a medusa.";
                } else if (size=="Ancient") {
                    connectionlist="An ancient blue dragon is worried that no members of the younger generation are strong enough to inherit the ancient dragon\’s territory, and this elder is trying to start a war to test the younger dragons and determine, which, if any might be a worthy heir.;An ancient blue dragon without offspring has adopted wyrmlings of various colors—including a number stolen from the wyrmlings\’ parents.;An ancient blue dragon is training an androsphinx as heir to the region the dragon rules and searching for magic items that will allow the sphinx to control the weather as the dragon does.;Under the pretense of helping an ancient blue dragon become a dracolich, an archmage is actually hoping to claim the dragon\’s vast hoard.";
                }
                break;
            case 'Brass':
                traitlist="I don\’t ask for much in a conversation partner—just smile, occasionally nod, and stay awake!;I\’m skilled at making others feel that I’m interested in the details of their tiny, meaningless lives.;Every word I say is worth hearing, so I speak loudly and eloquently to make sure I get my point across.;I don\’t care about the opinions of creatures that are less intelligent than I am. But I\’m fascinated by creatures that are significantly more intelligent.;Hoarding knowledge is no fun. It\’s best when you can trade knowledge away for treasure.;I\’m fascinated by intelligence with no brain—talking swords, sapient Constructs, and the like.;I love hearing stories and songs and sharing them with others to bring comfort and calm.;I have no patience for people who imagine their lives are the least bit important.";
                ideallist="Curiosity. The best way to show you value others is to learn as much as you can about them. (Good);Perspective. Everyone sees things differently, so if you want to know about the world, gather as many different points of view as you can. (Any);Knowledge. What\’s the point of living for centuries if you don’t learn all there is to know? (Any);Self-Determination. All creatures have the right to make their own decisions about their lives and ultimate destinies. (Chaotic);Compassion. Sharing each other\’s pain and loss brings us all closer to peace and unity. (Good);Cruelty. The most hilarious thing about lesser creatures who think they\’re important is how outraged they get when I hurt them. (Evil)";
                if (size=="Wyrmling") {
                    connectionlist="Captured by a band of gnolls, a brass dragon wyrmling is patiently trying to teach the gnolls to speak Draconic.;Grieved by the fate of a former friend, a brass dragon wyrmling guards a tomb haunted by a wight.;Yuan-ti have captured a brass dragon wyrmling and are picking up the dragon\’s twisted sense of humor.;A party of bandits stole a brass dragon egg, and now the hatched wyrmling is manipulating the bandits to do the dragon\’s whimsical bidding.;A lost brass dragon wyrmling was raised by hyenas and now leads the pack.;A druid who tends a desert oasis has been keeping watch over several brass dragon wyrmlings since adventurers killed the wyrmlings\’ parents.";
                } else if (size=="Young") {
                    connectionlist="A young brass dragon and a young blue dragon fight over territory.;A young brass dragon frequently visits a couatl who is charged with guarding an ancient temple, sharing stories to help the couatl pass the years.;A lamia and a young brass dragon lair in the same desert ruin, mostly leaving each other alone—but the lamia hopes to corrupt the dragon.;A young brass dragon\’s lair occasionally spawns air elementals that roam around the area for a while, causing havoc before eventually dissipating.;A young brass dragon and a weretiger have become close friends as they try to keep a region safe from a growing horde of malicious gnolls.;A young brass dragon allowed a group of cyclopes to shelter in the dragon\’s lair when they were harassed by a blue dragon. Now the cyclopes won\’t leave, so the dragon is trying to educate them.";
                } else if (size=="Adult") {
                    connectionlist="An adult brass dragon enjoys trading riddles with a gynosphinx.;Long ago, an adult brass dragon swore service to a human priest, expecting to outlive the priest. But now the priest is a mummy lord, and the dragon remains bound to serve.;An efreeti wants to claim an adult brass dragon\’s palatial lair and fabulous hoard.;A pair of rocs have nested too close to an adult brass dragon\’s lair, and they harass the dragon whenever they can.;A guardian naga charged with protecting an ancient artifact has decided that the artifact—as well as the naga—would be safer in an adult brass dragon\’s hoard than left alone in some crumbling ruin.;A half-brass dragon yuan-ti abomination leads other yuan-ti in worshiping an adult brass dragon as a serpent god, much to the dragon’s amusement.;Two adult brass dragons are rearing a clutch of wyrmlings together, and they allow the infant dragons to wreak innocent havoc on nearby settlements.;A solitary adult brass dragon has adopted a blue dragon wyrmling found starving in the desert.";
                } else if (size=="Ancient") {
                    connectionlist="An ancient brass dragon once ruled a temple-state through a puppet sovereign, who is now a mummy lord ruling a city of ghouls that owe the dragon fealty.;An ancient brass dragon believes that a local androsphinx is an insufferable know-it-all with no sense of humor and enjoys playing pranks on the sphinx.;An ancient brass dragon and an ancient blue dragon have a centuries-old rivalry, and each dragon manipulates adventurers into harassing the other.;An ancient brass dragon rules a mighty city whose folk have erected massive stone monuments to honor the dragon over the centuries.";
                }
                break;
            case 'Bronze':
                traitlist="The weakest creatures sometimes display the greatest courage. I respect all beings who risk their lives in defense of something greater than themselves.;My payment is a matter of principle. Requiring even a small fee for my service allows those I help to preserve their dignity. It\’s really for your benefit.;I have no time for chitchat or insinuation. I get to the point and expect others to do the same.;I respect law and order, but it’s no excuse for tyranny. Those who abuse power must be stripped of it, and soldiers have a responsibility to refuse immoral orders.;I strive to treat foes honorably, but not at the expense of strategy. A quick death in combat is its own kind of courtesy.;I trust my gut. I\’d rather act on incomplete information than be hamstrung by indecision.;I\’m fascinated by other species\’ military technology, especially magic armaments and siege engines—the bigger, the better!;Conflict drives evolution. By sparking wars between nations, I contribute to the advancement of their civilizations. (And they pay me for it, too!)";
                ideallist="Action. Passivity is shameful. We owe it to the world and ourselves to try to improve things, even if we can’t guarantee success. (Any);Analysis. When possible, dig into the root of a conflict before committing to end it, to ensure you aren\’t fighting for the wrong side. (Any);Honor. I never lie outright, though I choose my words carefully. I will fight to the death rather than break my word or abandon a comrade. (Lawful);Discipline. Disorganization breeds defeat. I demand self-control from both myself and those who fight beside me. (Lawful);Guardianship. It’s the duty of the strong to protect the weak. (Good);Dominance. Anyone who opposes my will is either an underling to be punished or an enemy to be vanquished. (Evil)";
                if (size=="Wyrmling") {
                    connectionlist="A flight of pseudodragons has raised an orphaned bronze dragon wyrmling, who is quickly growing too large for the group\’s usual activities.;A knight rescued a bronze dragon wyrmling from sacrifice at the hands of a cult, and the two now travel together in search of wrongs to right.;A bronze dragon wyrmling\’s murdered tutor rose as a revenant, and the dragon seeks anyone who can help obtain justice.;A bronze dragon wyrmling has chosen a lair filled with poisonous snakes, admiring the elegance with which they slither through the flooded tunnels.;A bronze dragon wyrmling has been captured by sahuagin raiders and manipulated into serving as the band\’s icon and war leader.;A group of merrow stole a bronze dragon wyrmling\’s hoard, and the wyrmling is training a plesiosaurus to help attack the merrow\’s stronghold.";
                } else if (size=="Young") {
                    connectionlist="A guardian naga and a young bronze dragon each defend half of an artifact called the Sundered Crown.;A young bronze dragon and a medusa have been enemies for so long that they\’ve developed mutual respect, communicating by way of a magical book that teleports back and forth between them.;A young bronze dragon seeks to turn a band of cyclopes into a disciplined army, with little success.;A young bronze dragon has been magically bound to the service of a marid, and the dragon is unable to take direct action to get free of the genie.;A young bronze dragon runs a prestigious military academy, training paladins of smaller species to fight for justice beneath the dragon\’s banner.;Dragonborn pirates bribe a young bronze dragon into helping them steal ship cargoes for a sizable cut of the profits.";
                } else if (size=="Adult") {
                    connectionlist="A rakshasa disguised as a pirate lord seeks revenge on the adult bronze dragon who has killed the Fiend three times so far.;An adult bronze dragon regularly consults a storm giant whose prophecies give hints as to which conflicts the dragon should seek out and engage in.;An adult bronze dragon keeps a roc as a beloved pet and views the creature\’s predations on local settlements as simply part of the natural order.;An adult bronze dragon swore an oath to a comrade who later became a vampire. The dragon reluctantly continues to protect the vampire, all the while searching for a way to reverse the transformation.;An adult bronze dragon sends regular tributes of treasure to an adult topaz dragon, not wanting the topaz dragon’s enmity to become a threat to coastal communities under the bronze dragon\’s protection.;An archmage and an adult bronze dragon who have been friends since they fought together in the mage\’s youth often visit each other to share stories.;An adult bronze dragon attempting to raise a clutch of wyrmlings alone is in desperate need of tutors and babysitters who can survive the assignment.;An obsessed shadow dragon plots to trap an adult bronze dragon in the Shadowfell until the bronze dragon too is transformed.";
                } else if (size=="Ancient") {
                    connectionlist="An ancient bronze dragon is locked in a centuries-old conflict with a kraken that destroyed a settlement under the bronze dragon\’s protection.;Two ancient dragons, one bronze and one silver, support different nations locked in a war, each believing that their side has the moral high ground.;An ancient bronze dragon controls a network of privateers who prey on pirates and accept government commissions if the dragon deems a cause worthy.;An ancient bronze dragon guards a merfolk monastery that’s risen mysteriously from the depths, prompting attacks by greedy coastal nations even as the monks warn of a coming apocalypse";
                }
                break;
            case 'Copper':
                traitlist="I am generous with my time, my words, and my considerable wisdom—but my treasure is mine.;I love music. It is truly the universal language, able to express ideas far better than mere words alone.;I find the notion of trade and barter fascinating, and sometimes even find ways to participate in them.;There is no sound I love more than laughter, a powerful balm for hearts and minds.;I enjoy games of all kinds, especially challenges of wit and intellect—and those I can decisively win.;I admire how brightly short-lived creatures shine before their lights go out.;Nothing is more satisfying than deflating the egos of the high-and-mighty with a well-placed jibe.;When I\’m bored, stirring up a settlement and watching its people scurry about amuses me.";
                ideallist="Beauty. The ability to create, appreciate, and sustain beauty is the true measure of a creature or civilization. (Good);Curiosity. The world holds so much to experience. I value different perspectives and insights. (Any);Creativity. Our purpose is to create something new and clever, and I admire those who do so. (Any);Change. The only constant is change, and we must change with the world. (Chaotic);Fairness. Life is often unfair, and it is up to us to rebalance its scales from time to time. (Good);Cruelty. Existence is a cruel joke. You can either be in on the joke, or be made a fool by it. (Evil)";
                if (size=="Wyrmling") {
                    connectionlist="A flock of aarakocra shelters a copper dragon wyrmling from gargoyles hunting in the mountains.;A copper dragon wyrmling guards a hidden pass that leads into a sylvan valley populated by centaurs, pixies, and satyrs.;A copper dragon wyrmling has killed a number of domestic animals. A group of druids wants the wyrmling captured and relocated, rather than killed.;A ruined manor house being reclaimed by a newly titled noble is the lair of a copper dragon wyrmling.;A copper dragon wyrmling follows a wizard everywhere, fascinated by prestidigitation tricks.;An ettin is trying to keep a captured copper dragon wyrmling as a pet.";
                } else if (size=="Young") {
                    connectionlist="A young copper dragon has enticed a band of kobolds to undertake activities for the dragon\’s amusement—and to rein in the band\’s more chaotic tendencies.;The head of a local thieves\’ guild is a young copper dragon who delights in tales of daring thefts and skims the best stolen art objects as tribute.A young copper dragon needs aid to root out a behir that has claimed the dragon\’s lair.;A band of raiders tithes treasure and tales to a young copper dragon, in exchange for using the canyons around the dragon\’s lair as a haven.;A dryad dwelling in the woods near a young copper dragon\’s lair helps to ward off intruders.;A child\’s imaginary friend is a very real young copper dragon who can cast invisibility.";
                } else if (size=="Adult") {
                    connectionlist="An adult copper dragon befriended a djinni after granting the genie freedom. Now the two meet yearly to talk and exchange news.;Centaur communities in the foothills surrounding an adult copper dragon\’s lair gather yearly to offer tribute to the dragon, who settles disputes and dispenses advice for them.;A galeb duhr acts as the guardian of an adult copper dragon\’s hoard.;An adult copper dragon regularly visits the treants of the nearby forest to help protect their woods from encroachment.;A band of fomorians believe they have allied with a red dragon to burn a Feywild grove, but an adult copper dragon has deceived them.;An adult copper dragon serves as the patron of a community of gnome tinkerers, who present their best ideas to the dragon in hopes of being funded.;A community of stone giants believes an adult copper dragon is a key figure in a prophecy—and the dragon has decided to play along for fun.;An adult copper dragon sends agents into a goristro demon\’s labyrinth to steal a lost soul, as part of a centuries-long game.";
                } else if (size=="Ancient") {
                    connectionlist="An ancient copper dragon and an ancient red dragon have been playing a complex game of strategy for centuries, using whole communities as their pawns and nations as their game board.;An ancient copper dragon guards the sealed entrance to a ruined temple filled with devils.;A renowned gnome trickster, now deceased, so impressed an ancient copper dragon that the dragon assumes the gnome\’s form from time to time to help keep their legend alive.;The ancient copper dragon progenitor of a lineage of dragon-blooded sorcerers likes to check in on these descendants from time to time.";
                }
                break;
            case 'Crystal':
                traitlist="If you\’re not a thief or a frost giant, let\’s talk!;Are you comfortable? Can I tell your future for you? Just let me know what I can do for you, okay?;Jokes are as valuable as any gemstone and more fun to share.;My empathy is a bottomless well. I can\’t help but lose myself in the emotions of others.;The stars have much to tell us, and folk need me to interpret what the stars say.;All play and no work—those are the words I live by.;I am always the first to offer a compliment.;Get off my snowfield, you immature bipeds! When I was a wyrmling, people respected their elders!";
                ideallist="Exploration. Yesterday is already known. Today is for something new. (Chaotic);Empathy. It\’s a gift to share in another\’s joy, even if sometimes you must bear their pain, too. (Good);Hospitality. We all live beautiful lives—it would be a shame not to share our lives with others. (Neutral);Determinism. Our destinies may already be written, but the way we achieve them still matters. (Any);Fun and Games. Play is learning, but without the boredom. (Chaotic);Control. Everyone is welcome, as long as they follow my rules. (Lawful)";
                if (size=="Wyrmling") {
                    connectionlist="A crystal dragon wyrmling rides a sled pulled by a trained pack of wolves and frets about outgrowing this favorite pastime.;A crystal dragon wyrmling has foreseen an untimely end for the bandits who raided the wyrmling\’s lair and follows the bandits to keep them safe.;A crystal dragon wyrmling has befriended a white dragon wyrmling. The wyrmlings\’ parents, who are ancient rivals, regard the relationship with concern.;A crystal dragon wyrmling encourages nearby farmers to go on dangerous excursions so they\’ll return with interesting stories to tell the dragon.;A crystal dragon wyrmling finds ice mephits to be the perfect household servants—if only they would stop trying to kill the dragon\’s guests.;A crystal dragon wyrmling is placed in a monastery to learn the teachings of the monks before returning home in three years. The monks don\’t appreciate the wyrmling\’s pranks.";
                } else if (size=="Young") {
                    connectionlist="A young crystal dragon tries to protect a local population of rare snowy owlbears from poachers and hunters.;A young crystal dragon has adopted a group of kobolds and is trying to teach them the value of a good practical joke.;A young crystal dragon has captured a pack of winter wolves loyal to a frost giant, intent on convincing the wolves to change their evil ways.;A lonely werebear enjoys long conversations with a young crystal dragon but doesn\’t always appreciate the dragon\’s sense of humor.;A young crystal dragon finds some manticores\’ bluster hilarious and befriends them despite their fear. But the dragon is having trouble overcoming the manticores\’ predatory nature.;A young crystal dragon uses dancing lights and hypnotic pattern to give an air of authenticity to a charlatan fortuneteller\’s act, in exchange for a portion of the take from the charlatan\’s clients.";
                } else if (size=="Adult") {
                    connectionlist="An adult crystal dragon convinces a druid to cast the awaken spell on creatures around the dragon\’s lair, so the dragon will never want for conversation.;A family of yetis seized an adult crystal dragon\’s lair and hoard, and the dragon seeks help to drive the yetis out.;An adult crystal dragon and an elf archmage have been friends for centuries and often go stargazing together on the peaks of their favorite mountains, but the dragon is grieving as the elf approaches the end of life.;A pair of adult crystal dragons lairing on neighboring mountaintops have enjoyed a decades-long snowball war, but their antics sometimes cause avalanches that threaten nearby villages.;An adult crystal dragon enjoys shaping the ice and snow near a den of trolls into a labyrinth and watching the trolls try to make their way through it.;Remorhazes infest the glacier beneath an adult crystal dragon\’s lair, posing an imminent threat to the dragon\’s home and hoard.;A revenant persuades an adult crystal dragon to help get revenge on the frost giants who murdered her.;An adult crystal dragon teaches astronomy to students of a renowned university, but the students must travel to the dragon\’s mountain lair for class.";
                } else if (size=="Ancient") {
                    connectionlist="A clan of dwarves has discovered a self-renewing vein of quartz near an ancient crystal dragon\’s lair. The dwarves mine the area aggressively, unaware that the dragon is spying on them—and intends to demand recompense at some point in the future.;An ancient crystal dragon is stalked by a villainous ranger who has already claimed a dozen draconic trophies.;An ancient crystal dragon follows a pod of whales from one sea to another, having grown fond of the valuable ambergris they leave in their wake. Now whalers are scheming to kill the dragon.;A community of seal hunters reveres an ancient crystal dragon as the spirit of their glacier home. Such worship amuses and flatters the dragon, who keeps the hunters safe and leads them to locations where seals are plentiful.";
                }
                break;
            case 'Emerald':
                traitlist="I repeat what others have said back to them to make sure I have remembered it correctly.;I might not like you, but I will endeavor to treat you with respect, if not kindness.;I like to impress visitors by reciting epic poetry.;The only people I\’m interested in are those who know history and those who make history.;I like to adopt the personas of characters from legend.;I studiously mimic the mannerisms of my guests.;I prefer to get others talking, then fade into the background. Sometimes literally.;I seek out audiences and like to be the center of attention.";
                ideallist="Seclusion. It\’s safer if others don\’t know I\’m here—safer for me and safer for them. (Any);Observation. People lie. Histories lie. Even dragons lie. But actions always ring true. (Lawful);Storytelling. There is a magic in the retelling of stories. Each new teller adds a bit of themself to the spell. (Any);Nurture. Rearing a child is our best chance to make sure our own stories are passed on. (Any);Inquisitiveness. Even the smallest village contains myriad stories of love, loss, triumph, and betrayal. There is always more to learn about people. (Any);Espionage. Once I get paid for the information I glean, I don\’t care what others do with it. (Evil)";
                if (size=="Wyrmling") {
                    connectionlist="Blood hawks routinely accost an emerald dragon wyrmling who lairs near the hawks\’ nest.;An emerald dragon wyrmling is being hunted by a fire giant\’s pet hell hound.;An emerald dragon wyrmling follows a berserker to observe the berserker\’s life. The berserker believes the dragon is a spirit companion.;A flattering orog plies an emerald dragon wyrmling with gems in exchange for information about a settlement the wyrmling has been observing.;An emerald dragon wyrmling keeps trying to play with a pair of newly hatched fire snakes.;An emerald dragon wyrmling has been captured by scheming duergar, who plan to use the wyrmling as bait to lure the wyrmling\’s parents out of their lair.";
                } else if (size=="Young") {
                    connectionlist="A young emerald dragon has befriended a stone giant, who is teaching the dragon giant folklore.;A young emerald dragon lairs in abandoned bandit caverns also occupied by a friendly earth elemental, which hunts for buried coins for the dragon\’s hoard.;A galeb duhr acts as a door guard to a young emerald dragon\’s lair.;A young emerald dragon invites repeated visits from a drow mage who corrects what the dragon has learned about the history of the elven schism.;A young emerald dragon attempts to drive off a clan of cyclopes who have taken up residence in a nearby cave, attacking the clan\’s herd of giant goats.;An assassin and a young emerald dragon train together to master the art of stealth.";
                } else if (size=="Adult") {
                    connectionlist="An adult emerald dragon wages a constant battle against deep gnome miners, who scour the tunnels of the dragon\’s lair in search of emeralds.;An adult silver dragon tries to befriend and draw out a reclusive adult emerald dragon.;An adult emerald dragon unwillingly serves a fire giant tribe holding the dragon\’s egg hostage.;An adult emerald dragon is fascinated by the intrigues of a rakshasa disguised as a human merchant prince.;An adult emerald dragon shows an emerald dragon wyrmling how to safely observe Humanoids without being detected.;An adult emerald dragon keeps a wary eye on the efreet who have built a tower near the dragon\’s lair, and indirectly aids any who oppose the efreet.;An iron golem ferries visitors across the lava moat surrounding an adult emerald dragon\’s lair.An adult emerald dragon spies on the adult red dragon who killed the emerald dragon\’s mate, looking for weaknesses.";
                } else if (size=="Ancient") {
                    connectionlist="An ancient emerald dragon bargains with a pit fiend to buy back the soul of a legendary hero.;A group of adult red and silver dragons set aside their differences to learn wisdom from an ancient emerald dragon.;Two balors act as jailers for an ancient emerald dragon imprisoned by a long-dead enemy.;An ancient emerald dragon works to summon a solar to get a firsthand account for a history of the gods the dragon is compiling.";
                }
                break;
            case 'Gold':
                traitlist="I prefer to parley before combat. If villains can be reformed without violence, all the better.;Shorter-lived species often have difficulty perceiving the full scope of time\’s tapestry and lack the patience for my appropriately thorough explanations.;Others might find me cold and dispassionate, but such is the price of perspective. Few creatures enjoy confronting the relative smallness of their lives.;Disguises allow me to bestow small kindnesses and experience the simple pleasures of companionship without constantly being petitioned. I\’m proud of my acting ability and never break character.;The future is writ large in the patterns of history. I enjoy conversing with others who think critically about history and society.;I enjoy gifts but find attempts to hire or bribe me deeply offensive.;My reclusiveness is a filter. If someone lacks the motivation to overcome my barriers, then their matter is unworthy of my attention.;On a long enough timescale, all actions are meaningless. So why should I deny myself anything?";
                ideallist="Foresight. Righteous action requires carefully weighing potential consequences to ensure the cure is not worse than the disease. (Lawful);Restraint. I cannot right every wrong. I encourage others to solve their own problems, and I save my strength for tribulations only I can address. (Any);Stewardship. I do not serve individuals, but rather history. By acting strategically, I tip the ultimate balance toward justice and virtue. (Good);Objectivity. I remain impartial in my judgments and refuse to let personal feelings get in the way of what’s fair or necessary. (Lawful);Isolation. Every interaction has ramifications that stretch on into infinity. I curate my impact on the world by remaining aloof and self-reliant. (Any);Sovereignty. Other creatures lack my wisdom and must be controlled to prevent wrongdoing. (Evil)";
                if (size=="Wyrmling") {
                    connectionlist="A gold dragon wyrmling bonded with a xorn over their shared love of gems and seeks to help the creature back to the Elemental Plane of Earth.;A gold dragon wyrmling yearns to imitate a couatl mentor and is searching for a magical location worth guarding.;A gold dragon wyrmling is venerated by a tribe of lizardfolk—much to the consternation of the priest who used to rule the tribe.;A band of centaurs makes pilgrimages to a gold dragon wyrmling\’s lair, bringing gifts of gems and knowledge.;A gold dragon wyrmling is fascinated by modrons\’ clockwork determinism and has tracked down and befriended a rogue pentadrone.;A gold dragon wyrmling has befriended a group of githzerai monks and visits them regularly to conduct elaborate thought experiments.";
                } else if (size=="Young") {
                    connectionlist="A young gold dragon enjoys the company of treants, who share the dragon\’s long view of history and methodical conversational style.;A young gold dragon lives in a cluster of stone spires and has secured the service of the galeb duhr who watch over the site.;An arcanaloth has secured a contract requiring a young gold dragon to serve the Fiend once every five years. It can\’t make the dragon do evil acts, but the jobs often have unforeseen consequences.;A young gold dragon maintains a lair in a flying cloud giant citadel, winning the continued right to dwell there in repeated gambling games.;A young gold dragon and an archmage are uneasy companions, bound to defend each other by the dying wish of a heroic warrior they both loved.;After a young gold dragon freed a djinni from servitude, the djinni installed a portal linking the dragon\’s lair to the djinni\’s citadel on the Elemental Plane of Air.";
                } else if (size=="Adult") {
                    connectionlist="An adult gold dragon has sworn to destroy the balor who killed the dragon\’s mate.;An adult gold dragon feels responsible for a paladin\’s fall from grace and sends minions across the world in search of the paladin—now a death knight—so they both might be redeemed.;An adult green dragon and an adult gold dragon skirmish over control of the vine-choked ruins of a floating mausoleum and its library of talking skulls.;An adult gold dragon enjoys playing strategy games with an androsphinx, one of the few creatures able to successfully bluff the dragon.;An adult gold dragon living in a desert temple helps some elf oracles interpret visions bestowed by an artifact called the Siren\’s Lens.;An imprisoned mummy lord has convinced its adult gold dragon jailer that the mummy\’s plans for domination will be for the best in the long run.;An adult gold dragon crafted an iron golem to defend the dragon\’s lair and talks to it as if it were a person.;An adult gold dragon hunts the adult blue dracolich who stole the legendary Crown of Endings from the gold dragon\’s hoard.";
                } else if (size=="Ancient") {
                    connectionlist="A solar who admires an ancient gold dragon campaigns to recruit the dragon into the service of the solar\’s god.;An ancient gold dragon is infatuated with an oblivious empyrean, drawn in by the empyrean\’s carefree nature and larger-than-life emotions.;An ancient gold dragon and a lich have vied to bend history to their respective wills. The two have reluctantly come to understand and empathize with each other.;An ancient gold dragon takes little interest in the day-to-day governance of a powerful empire. But the dragon expects to be obeyed completely when deigning to address the populace.";
                }
                break;
            case 'Green':
                traitlist="You\’re either with me or you\’re against me. Just kidding—you\’re lunch either way!;I hate how much people think they matter in a world that was old before their kind even learned the idea of names.;The more the merrier as far as I\’m concerned: more to control, more to torture, more to feast upon when I\’m finally bored.;Bipedal life is too ugly and ignorant to merit even a scrap of compassion.;I like seeing life through the eyes of a lesser being—before forcing that creature to gouge their eyes out.;The wilds are mine and mine alone, and anyone who thinks they can enter my territory had best hope I have other distractions that day.;I allow others to dwell in my forest—if they act as my eyes, ears, and occasional playthings in return.;I harbor no animosity toward anyone. Let me grow ancient with my forest, and I\’ll leave you in peace";
                ideallist="Isolation. Territories can be properly established only when all parties respect the borders of their neighbors. (Lawful);Control. All lesser beings should bare their throats to their betters. (Evil);Respect. Fear is amusing, but reverence is delicious. (Any);Intrigue. The world is so much more entertaining when no one trusts anyone. (Evil);Imagination. Nothing is more gauche than repeating the same activities day after day. (Any);Tolerance. The impermanence of intelligent life is bittersweet and should be honored as such. (Good)";
                if (size=="Wyrmling") {
                    connectionlist="A green dragon wyrmling is the centerpiece of a traveling circus but might not be a prisoner after all.;A green dragon wyrmling was raised by a cluster of pseudodragons, whom the wyrmling now protects.;Hobgoblin raiders have captured several green dragon wyrmlings, hoping to use them as the vanguards of their war parties.;A green dragon wyrmling exacerbates the chaotic tendencies of a group of satyrs, driving them to greater acts of mischief with the promise of rich rewards.;A green dragon wyrmling tricks a village of lizardfolk into believing the dragon is an incarnation of a lizardfolk god.;An ancient couatl attempts to shape the moral outlook of a green dragon wyrmling, so the dragon might inherit the duty of guarding the couatl\’s treasures.";
                } else if (size=="Young") {
                    connectionlist="A young green dragon and a treant vie for influence over a woodland region.;A young green dragon forces a group of dryads to collect treasures for the dragon\’s hoard, threatening to destroy their trees if they refuse.;An infestation of twig blights has taken over the lair of a young green dragon, and the dragon will do anything to reclaim it.;Green hags compete to gain an alliance with a young green dragon, turning a village into a staging ground for their games of deceit.;A young green dragon directs a conclave of yuan-ti under the command of a yuan-ti abomination, ordering the serpentfolk to search the forgotten tunnels of a city for the ancient treasures buried there.;An oni and a young green dragon work together to terrorize a village, taking a victim every night and leaving the rest too frightened to flee.";
                } else if (size=="Adult") {
                    connectionlist="A ruler controlled by an adult green dragon plunders the realm\’s populace to fill the dragon\’s hoard.;Several adult green dragons fight to claim a treasure hoard hidden under a woodland city.;An adult green dragon is bound to the service of a guardian naga and baits other creatures to kill the dragon\’s naga captor.;Giant apes raised from birth by an adult green dragon now serve as the dragon\’s hunting party.;Mind-controlled clerics lead unsuspecting worshipers to the lair of an adult green dragon.;An adult green dragon works to corrupt a young gold dragon trapped in the green dragon\’s woods.;Wood elves flagellate themselves to earn the favor of a god suddenly turned cruel, not knowing they\’ve been misled by an adult green dragon.;An adult green dragon turns treants against the druids who once guarded the treants\’ grove.";
                } else if (size=="Ancient") {
                    connectionlist="An ancient green dragon returns to the same sylvan forest every year to feed upon a herd of unicorns.;An ancient green dragon prevents would-be rescuers from reaching a cursed realm whose people are magically asleep and hidden behind a forest of thorns.;A once-peaceful land has become warlike, thanks to the ancient green dragon controlling its elf monarchs.;An ancient green dragon is the guardian of a lich\’s phylactery and extorts favors from the lich.";
                }
                break;
            case 'Red':
                traitlist="The thrill of the hunt and of battle makes my blood burn and stokes the fire in my heart. A pity there are so few foes and so little prey worthy of me.;The worship of smaller creatures pleases me, though their weakness is pathetic—how can they do other than adore me?;Nothing is better than to sleep and dream upon my hoard with the warmth of a full belly. Let those who would disturb me beware!;Ah, if these foolish creatures only knew they were but pawns in the games I play to amuse myself.;I know that others seek to steal my treasures, my beautiful baubles, won through strength and cunning. But they are mine. Mine!;All that I survey, I could easily destroy. From time to time, it is important to remind these small creatures of the true extent of my power.;Although my power and life span are vast, they have merely whetted my appetite for immortality.;Heroes need foes to test them. Not all teachers can afford to be kind, and some lessons must be harsh.";
                ideallist="Cruelty. Pain and fear are the most powerful tools. With them, any creature\’s will can be broken. (Evil);Might. Only the strongest survive and prosper, so I must be the strongest of all. (Any);Greed. If I desire a thing, then it must be mine and mine alone. (Evil);Respect. All that I have achieved must be acknowledged and treated with the utmost respect. (Any);No Limits. I do whatever I please, whenever it pleases me to do so. (Chaotic);Responsibility. Fire destroys, but it can also temper when it is applied carefully—if the material tested is strong enough. (Lawful)";
                if (size=="Wyrmling") {
                    connectionlist="A fire giant lord has captured a red dragon wyrmling and is looking to train the willful creature as a pet.;A red dragon wyrmling adopted a nest of fire snakes, which have now grown into salamanders who protect the wyrmling.;A band of kobolds was driven out of its warren by a red dragon wyrmling; they now raid to survive—and to gather offerings to propitiate >>the winged god.<<;A tiefling child has secretly hidden and raised a red dragon wyrmling from an egg. The wyrmling is bonded to the child, but dangerous to anyone else.;A bound fire elemental serves as the guardian of an orphaned red dragon wyrmling.;A band of hobgoblins is thrown into chaos when a red dragon wyrmling supports a coup by an ambitious war leader, in exchange for tribute.";
                } else if (size=="Young") {
                    connectionlist="A specter is bound as the guardian of a young red dragon\’s treasure hoard.;A young red dragon\’s new lair spawns magma mephits and smoke mephits, which escape into the surrounding countryside and cause mischief.;A young red dragon serves as the guardian of a githyanki creche, hoping to eventually earn the allegiance of the young githyanki raised there.;Ogres and ettins cowed by a young red dragon wander the foothills near the dragon\’s lair, helping to drive away intruders.;A colony of mind flayers has captured and controlled a young red dragon, which now guards the passages to the illithids\’ underground lair.;A parent of a young red dragon has become a dracolich, and the dragon wishes to see the Undead abomination destroyed.";
                } else if (size=="Adult") {
                    connectionlist="A flock of gargoyles dwell near an adult red dragon\’s lair, serving as lookouts and guardians.;Azer artisans are bound in service to an adult red dragon, for whom they make sculptures and art objects from precious metals and gems.;An adult red dragon rules over a hidden valley filled with dinosaurs.;A shadow demon serves as an adult red dragon\’s spy and messenger.;Cultists worshiping an adult red dragon act as the dragon\’s agents throughout the region.;A mysterious masked knight relentlessly hunting an adult red dragon is, in fact, the dragon\’s half-dragon offspring bent on vengeance.;An adult red dragon owes a debt of service to an elderly druid, enforced by a magical oath.;An adult red dragon has seized an outpost of an efreeti pash\a’s domain as a lair, and the noble genie wants to evict the intruder.";
                } else if (size=="Ancient") {
                    connectionlist="An ancient red dragon controls a vast intelligence network that has infiltrated nearly every nation.;An ancient red dragon warlord has united a number of formerly squabbling nations, creating a massive army ready to conquer the known world.;A cult in service to an ancient red dragon is gathering resources to summon a consort of Tiamat, so the cult\’s master can defeat the consort in single combat and claim a place at Tiama\’s side.;A balor demon hopes an ancient red dragon\’s dragonsight can help the demon coordinate a multidimensional play for power in the Abyss.";
                }
                break;
            case 'Sapphire':
                traitlist="I often fixate on specific historical battles or wars and won\’t rest until my hoard contains that conflict\’s most significant artifacts.;I am constantly aware of a call from beyond this world. I must prepare to answer that call by amassing powerful arms and armor.;I secretly look forward to adventurers trying to infiltrate my lair. How else could I try out new defenses?;Give me a storied helmet or scimitar over a pile of gold any day.;No creature can outsmart my defenses—if they do, they obviously cheated.;Any creature that can hold their own against me must teach me how—whether they want to or not.;I cannot resist a game of dragonchess—which, I will have you know, my ancestors probably invented.;The sight of blood makes me queasy.";
                ideallist="Solitude. A stranger is just an intruder I haven\’t dealt with yet. (Neutral);Preservation. Most creatures cannot be trusted to properly safeguard historically significant artifacts. I can. (Lawful);Knowledge. The stories surrounding every piece in my collection are as important as the treasures themselves. (Any);Order. An organized hoard makes me happy—and you don\’t want to see me unhappy. (Lawful);Preparation. Justice and righteousness do not guarantee victory. Planning and tactics do. (Lawful);Companionship. Sure, my hoard brings me great joy. But the real treasures are the guests who stop by to see it. (Good)";
                if (size=="Wyrmling") {
                    connectionlist="After being robbed by gnomes who had pledged to protect the hoard, a sapphire dragon wyrmling installs new guardians that have no interest in material riches: gelatinous cubes and ochre jellies.;A band of minotaurs in service to Baphomet has captured a sapphire dragon wyrmling to learn from the wyrmling\’s strategies.;Two sapphire dragon wyrmlings vie for the same territory. Their primary battle tactic involves luring grells into each other\’s lairs.;A group of Lolth-worshiping drow warriors were sent to kill a sapphire dragon wyrmling who has been making meals of their goddess\’s holy spiders.;A sapphire dragon wyrmling is on the verge of starvation after incorrectly identifying a nearby phase spider nest as an easy food source.;A sapphire dragon wyrmling\’s hoard contains a cursed item, which has attracted specters and wraiths to the area around the dragon\’s lair.";
                } else if (size=="Young") {
                    connectionlist="A young sapphire dragon practices martial skills by regularly using a horn of Valhalla to summon berserker spirits to fight.;A young sapphire dragon has found a collection of long-forgotten clay golems and is trying to teach them military tactics.;A druid summoned galeb duhr to guard a young sapphire dragon\’s hoard in exchange for the dragon controlling the giant spider population, but the galeb duhr are causing trouble for local miners.;Two Lolth cultists seek a magical relic that attracts giant spiders, but the relic\’s resting place has become a young sapphire dragon\’s feeding ground.;A young sapphire dragon and a hobgoblin warlord have become friends. The hobgoblin visits regularly to trade war stories and tactics with the dragon.;A kuo-toa archpriest believes a young sapphire dragon is a god named Sliploopdreegoo, and calls on other kuo-toa to worship the dragon.";
                } else if (size=="Adult") {
                    connectionlist="An adult sapphire dragon lives adjacent to active purple worm tunnels, hoping the threat of the worm will deter treasure hunters.;An adult sapphire dragon employs a dao to help shape and defend the dragon\’s lair, and the dao maintains a portal to the Elemental Plane of Earth there.;An adult sapphire dragon regularly confers with a plane-hopping archmage regarding the dragon\’s ongoing dreams of other worlds and other lives.;A drow priestess of Lolth and several yochlol demons have been ordered by their goddess to deal with the adult sapphire dragon who has been hunting her holy spiders.;A forgetful and nearsighted adult sapphire dragon believes a blue dragon wyrmling is actually the sapphire wyrmling who left home months before.;An adult sapphire dragon and a squadron of githyanki have joined forces to locate and destroy a mind flayer colony.;A group of stone giants believes a young sapphire dragon to be an emissary of their god, Skoraeus Stonebones. The dragon considers the notion ridiculous but loves having an audience who will listen to lectures on military history without complaint;An adult sapphire dragon and an aboleth psychically face off for control of an area of the Underdark. The constant bombardment of psychic forces has begun to affect the local fauna in strange ways.";
                } else if (size=="Ancient") {
                    connectionlist="An ancient sapphire dragon has called a conclave of ancient gem dragons to discuss how they might reunite and restore Sardior, the Ruby Dragon.;A horde of revenants led by a death knight has one goal—destroying the ancient sapphire dragon who defeated their army in battle centuries ago.;An ancient sapphire dragon guards the phylactery of a lich who helped the dragon establish a lair centuries before becoming Undead.;Lolth the Spider Queen has declared war on an ancient sapphire dragon who has annexed the heart of her cult\’s Underdark territory.";
                }
                break;
            case 'Silver':
                traitlist="People are so wonderfully varied, and I do so love experiencing life with them.;I\’m an epicurean, and I live to eat all the delightful foods people concoct.;It\’s my duty as a member of an elder species to protect and guide other peoples.;I like coming up with new disguises to use among small folk. It makes me feel clever!;Violence is the provenance of uncouth beings, and I will do my best to avoid its use.;I don\’t understand why anyone would fight when they could talk instead and build on this ecosystem of wondrous cultures and fascinating traditions.;I owe the short-lived mortals I become friends with the responsibility of watching over their progeny.;People must earn my respect—and they\’re failing badly.";
                ideallist="Sensualism. I savor the world and consume its myriad delights with appropriate gratitude. (Any);Altruism. We are surrounded by a malignant and unfeeling cosmos. Ultimately, all we have is each other. (Good);Camaraderie. The true treasure is the friends we make along the way. (Good);Leadership. These younger species will do great things—but need some subtle support. (Good);Guile. All the world is a stage, and it is both my purpose and my pleasure to give an excellent performance. (Any);Ownership. This town, these families, this world—I’ve spent centuries watching over them, and they belong to me. (Evil)";
                if (size=="Wyrmling") {
                    connectionlist="A silver dragon wyrmling is raised by giant eagles who have lost their own clutch of eggs.;A silver dragon wyrmling becomes the mascot and would-be protector of a group of refugee aarakocra.;A silver dragon wyrmling practices precocious shape-shifting abilities among a colony of kobolds.;A hell hound watches over a silver dragon wyrmling in the name of its master—a lich hoping to corrupt the dragon when the dragon is older.;A silver dragon wyrmling besieges a pack of pseudodragons, intent on teaching them poetry.;Ogres keep a young silver dragon wyrmling as a pet, and the dragon has become dedicated to changing the ogres\’ nefarious ways.";
                } else if (size=="Young") {
                    connectionlist="A young silver dragon allows a stone giant to take refuge in the dragon\’s lair.;A young silver dragon in Humanoid form tries to keep an unsuspecting royal heir away from an attractive stranger the dragon knows to be a succubus or incubus in disguise.;A herd of hippogriffs has taken over a young silver dragon\’s lair, and the dragon seeks to get rid of the interlopers without violence.;Two silver dragons compete to see who is better at playing the part of a young noble.;A young silver dragon rules over a group of yuan-ti, claiming to be an ancient yuan-ti leader reborn.;A young silver dragon performs nightly to entertain a village of cloud giants, hoping to earn their help in securing a new lair.";
                } else if (size=="Adult") {
                    connectionlist="An adult silver dragon watches over a flock of rare goats, but a group of storm giants covet their wool.;An adult silver dragon and a vampire write books of philosophy arguing with each other\’s works.;An adult red dragon killed a group of adventurers that an adult silver dragon had befriended, and the silver dragon now seeks revenge.;In making a new lair, an adult silver dragon destroyed the home of some galeb duhr, and the dragon now seeks help to restore the site for them.;A number of adult silver dragons all pretend to be painters and vie for the commission to paint the ceiling of a huge cathedral.;An adult silver dragon leads a group of warriors, changing identities every generation.;Having lost their own offspring, two adult silver dragons raise a clutch of wyverns.;A solitary adult silver dragon domesticates rocs as an amusement.";
                } else if (size=="Ancient") {
                    connectionlist="An ancient silver dragon helps a group of spellcasters keep the tarrasque asleep.;An ancient silver dragon is secretly the age-old blacksmith who creates magical weapons for a kingdom\’s heroes.;Bound by an oath, an ancient silver dragon rules a dead city in place of its original monarchs.;An ancient silver dragon has become the figurehead and protector of a clan of frost giants.";
                }
                break;
            case 'Topaz':
                traitlist="I seek no company other than my own, for no one else can compete with me.;If my offspring can\’t care for themselves, I\’m not sure they\’re worthy of my attention.;The sea is beautiful and I love gazing upon it, but I abhor being wet.;Why should I risk damaging my splendid physique when I can fight with the power of my mind?;I am predictable only in my unpredictability.;It takes true artistry to maintain a warm, desert-like dwelling under the water.;I soothe myself to sleep by imagining the perfect insults for bronze dragons; while I wait to meet one, I hone them on other creatures.;I secretly enjoy conversing with lesser beings, although I usually do so only to find their weaknesses.";
                ideallist="Solitude. My own company obviates the need for others in my life, whether they are dragons or lesser creatures. (Any);Change. Consistency is stagnation. (Chaotic);Mental Superiority. I hone my mental powers so I can confuse, control, or kill any who annoy me. (Evil);Territoriality. Any creature that comes into my territory has forfeited its right to be upset by anything I do to it. (Evil);Wonder. Though I don\’t wish to spend time in it, my soul sings at the sight of the vast beauty of the ocean. (Good);Code of Combat. I despise most other dragons, but I meet them face to face without resorting to the base trickery I use on lesser creatures. (Lawful)";
                if (size=="Wyrmling") {
                    connectionlist="Moved by pity, a giant eagle continues bringing food to an abandoned topaz dragon wyrmling, despite the wyrmling\’s attempts to eat the eagle.;A pseudodragon who is fanatical about the kinship of all dragonkind is trying to win a topaz dragon wyrmling\’s friendship.;A topaz dragon wyrmling has developed a taste for crab meat and persistently hunts a giant crab that always manages to evade the wyrmling. (The crab might have been the recipient of a druid\’s awaken spell.);A mated pair of griffons found a topaz dragon egg, and they care for it as if it were their own.;A sea hag is on the hunt for a topaz dragon wyrmling, to be used as a component in a fell ritual.;A pirate crew keeps a curmudgeonly topaz dragon wyrmling as a beloved mascot.";
                } else if (size=="Young") {
                    connectionlist="A young topaz dragon engages in repeated aerial battles with a young gynosphinx to determine territory. Both of them are secretly starting to enjoy the bouts.;A young topaz dragon found and ate a dead sahuagin on the beach, unwittingly incurring the wrath of the sahuagin\’s community.;A flock of harpies enjoy taunting a young topaz dragon who has moved into their territory. The dragon adds a feather to a necklace for each harpy slain.;A curious water elemental supplies a young topaz dragon with aquatic delicacies so as to learn more about the dragon.;A young topaz dragon continually attempts to steal eggs from a roc nest, despite having nearly been killed by the roc parents multiple times.;A clan of winged kobolds consider a young topaz dragon their monarch, despite the dragon\’s complete lack of interest and growing annoyance toward them.";
                } else if (size=="Adult") {
                    connectionlist="An adult topaz dragon vies with a storm giant over territory. The giant keeps live seafood in a tide pool, and the dragon keeps drying out the pool in an effort to drive the giant away.;An adult topaz dragon and an adult bronze dragon are finding their centuries-old enmity turning into a more romantic passion.;A djinni hopes to convince a topaz dragon to tolerate the djinni\’s presence by driving off a clan of cyclopes harassing the dragon.;Reunited after years apart, an adult topaz dragon parent and young dragon child realize they enjoy hunting together.;A tempestuous marid continually floods the carefully dried-out lair of a topaz dragon.;A sahuagin baron attempts to gain the support of other sahuagin for driving away a topaz dragon attempting to claim the sea devils\’ territory.;A pirate captain tells stories of an adult topaz dragon\’s legendary hoard while attempting to gather a crew to raid the dragon\’s lair.;A ship wrecks near an adult topaz dragon’s lair. The dragon claims what\’s left of the cargo and tries to ransom the survivors (including the dragonborn ship captain) back to the city they came from.";
                } else if (size=="Ancient") {
                    connectionlist="An ancient topaz dragon has decided to set local ogre and bandit clans against one another, hoping they wipe each other out.;An adult bronze dragon has ignored the petitions of townsfolk to deal with an ancient topaz dragon killing livestock and farmers alike. But now the topaz dragon has killed the bronze dragon\’s child.;An ancient topaz dragon\’s lair contains a portal to the Elemental Chaos.;An ancient bronze dragon and an ancient topaz dragon are locked in an ongoing conflict that threatens shipping and caravans around a major city.";
                }
                break;
            case 'White':
                traitlist="Talkative people are usually the most dangerous. I like to eat them first.;I brood over past encounters with foes and sometimes mistake newcomers for my ancient enemies.;I can recall many tidbits of lore picked up over the centuries but have no sense of their import.;I don\’t like the taste of warm blood and always rinse my mouth out with snow after a fight.;Whenever I encounter a new type of creature, I try to lure it back to my lair so I can add it to my collection of frozen trophies.;I have named the wind that blows through my lair and speak to it often. It is my sole companion.;I meet any challenge to my territory with aggression, even if I can\’t win outright.;I feel protective of smaller, weaker creatures that are tormented by larger monsters.";
                ideallist="Rapacity. When a creature has the misfortune of crossing my path, I ask myself two questions: Am I hungry now? And if not, will I be hungry later? (Any);Survival. This world is harsh and unforgiving, and so am I. I do whatever it takes to survive. (Any);Dominance. I delight in making others tremble, knowing that I could kill them at any time. (Evil);Isolation. All creatures are either prey or rivals. What do you mean by “company?” (Any);Vengeance. Every scar upon my scales, every treasure beyond my reach, is a slight that must be answered. (Evil);Service. I used to live as a beast, before learning what is possible when creatures put aside their petty needs in service of a greater goal. (Lawful)";
                if (size=="Wyrmling") {
                    connectionlist="A pair of ice mephits delight in chasing townsfolk into a white dragon wyrmling\’s lair to be eaten.;A brooding griffon found a dragon egg and cared for it along with her own brood. Though the white dragon wyrmling ate the griffon\’s other hatchlings, the griffon treats the wyrmling as her offspring and protects the creature fiercely.;A clan of warriors has adopted a white dragon wyrmling as the clan\’s sacred guardian and brings the wyrmling captured foes as offerings.;Yetis keep a white dragon wyrmling chained near the entrance of their lair to discourage scavengers.;A well-meaning druid is trying to rear a white dragon wyrmling as a guardian of nature, training the dragon to hunt only Monstrosities. But the wyrmling keeps attacking other creatures.;A band of ogres keeps a white dragon wyrmling caged near their larder, as they have discovered that the dragon\’s cold breath keeps their meat fresh.";
                } else if (size=="Young") {
                    connectionlist="A young white dragon and a young remorhaz are vying for control of the same territory, and their altercations endanger the other creatures in the area.;A young white dragon has gained control of an invisible stalker and sends it out to steal treasure.;A young white dragon allows a clan of deep gnomes to mine the dragon\’s mountain home in exchange for a healthy portion of the gemstones they extract.;A frost giant hunter has raised a young white dragon since the dragon hatched, and the two are now inseparable.;A young white dragon is pestered by a flameskull bound to guard a magic item the dragon recently acquired.;A young white dragon has been stalking a herd of mammoths for days, trying to pick off the herd\’s newborn calves.";
                } else if (size=="Adult") {
                    connectionlist="A pirate captain uses the pervasive fog near an adult white dragon\’s lair to elude capture and propitiates the dragon with a share of the crew\’s booty.;A djinni has pledged to serve an adult white dragon for a year and a day in exchange for sparing the genie\’s previous master\’s life.;An arcanaloth has been trying to tease information out of an adult white dragon, hoping the dragon can lead it to a lost font of magical power.;An adult white dragon, captured by devils decades ago, now serves as a mount for an ice devil.;A beholder manipulates an adult white dragon into eliminating its enemies by inventing ways in which these foes have supposedly offended the dragon.;A storm giant and an adult white dragon are engaged in a deadly game of cat-and-mouse, leaving a trail of destruction behind them.;An adult white dragon periodically brings a mouthful of gems to the ancient crystal dragon who raised them, and who is now too old and tired to seek out new mineral veins for sustenance.;A clan of winged kobolds treat the air currents and ice slides of an adult white dragon\’s lair as an obstacle course. The dragon enjoys devising increasingly hazardous routes for the kobolds to tackle.";
                } else if (size=="Ancient") {
                    connectionlist="A death knight and an ancient white dragon swap tales of old foes and unanswered grievances, nursing the hunger for vengeance that sustains them.;An ancient white dragon makes intermittent assaults against a mated pair of adult silver dragons who lair nearby.;An ancient white dragon guards a lich\’s phylactery, keeping it sealed in a tomb of ice. The lich visits periodically, bearing fabulous treasures as payment.;A community of orcs believe an ancient white dragon to be the reincarnation of a legendary leader. They\’ve been venerating the dragon so long that the dragon now believes the story and speaks proudly in Orc about the orcs\’ triumphs.";
                }
                break;
        }
        for (let i=0;i<4;i++) {
            traitlist=traitlist.replace(',', '&#44');
            ideallist=ideallist.replace(',', '&#44');
            connectionlist=connectionlist.replace(',', '&#44');
        }
        var traits=traitlist.split(';');
        var ideals=ideallist.split(';');
        var connections=connectionlist.split(';');
        var divstyle = 'style="width: 189px; border: 1px solid black; background-color: #ffffff; padding: 5px;"';
        var astyle1 = 'style="text-align:center; border: 1px solid black; margin: 1px; background-color: #7E2D40; border-radius: 4px;  box-shadow: 1px 1px 1px #707070; width: 100px;';
        var astyle2 = 'style="text-align:center; border: 1px solid black; margin: 1px; background-color: #7E2D40; border-radius: 4px;  box-shadow: 1px 1px 1px #707070; width: 150px;';
        var tablestyle = 'style="text-align:center;"';
        var arrowstyle = 'style="border: none; border-top: 3px solid transparent; border-bottom: 3px solid transparent; border-left: 195px solid rgb(126, 45, 64); margin-bottom: 2px; margin-top: 2px;"';
        var headstyle = 'style="color: rgb(126, 45, 64); font-size: 18px; text-align: left; font-variant: small-caps; font-family: Times, serif;"';
        var substyle = 'style="font-size: 11px; line-height: 13px; margin-top: -3px; font-style: italic;"';
        if (size=="Wyrmling"||size=="Young") {
            sendChat('Dragon Creator', '/w gm <div ' + divstyle + '>' + //--
                '<div ' + headstyle + '>Dragon Creator</div>' + //--
                '<div ' + substyle + '>Menu</div>' + //--
                '<div ' + arrowstyle + '></div>' + //--
                '<table>' + //--
                '<div style="text-align:center;"><a ' + astyle2 + '" href="!setpersonality,?{Trait 1?|' + traits[0] + '|' + traits[1] + '|' + traits[2] + '|' + traits[3] + '|' + traits[4] + '|' + traits[5] + '|' + traits[6] + '|' + traits[7] + '|Random},?{Trait?|' + traits[0] + '|' + traits[1] + '|' + traits[2] + '|' + traits[3] + '|' + traits[4] + '|' + traits[5] + '|' + traits[6] + '|' + traits[7] + '|Random},?{Ideal 1?|' + ideals[0] + '|' + ideals[1] + '|' + ideals[2] + '|' + ideals[3] + '|' + ideals[4] + '|' + ideals[5] + '|Random},?{Ideal 2?|' + ideals[0] + '|' + ideals[1] + '|' + ideals[2] + '|' + ideals[3] + '|' + ideals[4] + '|' + ideals[5] + '|Random},?{Connection?|' + connections[0] + '|' + connections[1] + '|' + connections[2] + '|' + connections[3] + '|' + connections[4] + '|' + connections[5] + '|Random}">Set Personality</a></div>' + //--
                '</div>'
            );
        } else if (size=="Adult") {
            sendChat('Dragon Creator', '/w gm <div ' + divstyle + '>' + //--
                '<div ' + headstyle + '>Dragon Creator</div>' + //--
                '<div ' + substyle + '>Menu</div>' + //--
                '<div ' + arrowstyle + '></div>' + //--
                '<table>' + //--
                '<div style="text-align:center;"><a ' + astyle2 + '" href="!setpersonality,?{Trait 1?|' + traits[0] + '|' + traits[1] + '|' + traits[2] + '|' + traits[3] + '|' + traits[4] + '|' + traits[5] + '|' + traits[6] + '|' + traits[7] + '|Random},?{Trait?|' + traits[0] + '|' + traits[1] + '|' + traits[2] + '|' + traits[3] + '|' + traits[4] + '|' + traits[5] + '|' + traits[6] + '|' + traits[7] + '|Random},?{Ideal 1?|' + ideals[0] + '|' + ideals[1] + '|' + ideals[2] + '|' + ideals[3] + '|' + ideals[4] + '|' + ideals[5] + '|Random},?{Ideal 2?|' + ideals[0] + '|' + ideals[1] + '|' + ideals[2] + '|' + ideals[3] + '|' + ideals[4] + '|' + ideals[5] + '|Random},?{Connection?|' + connections[0] + '|' + connections[1] + '|' + connections[2] + '|' + connections[3] + '|' + connections[4] + '|' + connections[5] + '|' + connections[6] + '|' + connections[7] + '|Random}">Set Personality</a></div>' + //--
                '</div>'
            );
        } else if (size=="Ancient") {
            sendChat('Dragon Creator', '/w gm <div ' + divstyle + '>' + //--
                '<div ' + headstyle + '>Dragon Creator</div>' + //--
                '<div ' + substyle + '>Menu</div>' + //--
                '<div ' + arrowstyle + '></div>' + //--
                '<table>' + //--
                '<div style="text-align:center;"><a ' + astyle2 + '" href="!setpersonality,?{Trait 1?|' + traits[0] + '|' + traits[1] + '|' + traits[2] + '|' + traits[3] + '|' + traits[4] + '|' + traits[5] + '|' + traits[6] + '|' + traits[7] + '|Random},?{Trait?|' + traits[0] + '|' + traits[1] + '|' + traits[2] + '|' + traits[3] + '|' + traits[4] + '|' + traits[5] + '|' + traits[6] + '|' + traits[7] + '|Random},?{Ideal 1?|' + ideals[0] + '|' + ideals[1] + '|' + ideals[2] + '|' + ideals[3] + '|' + ideals[4] + '|' + ideals[5] + '|Random},?{Ideal 2?|' + ideals[0] + '|' + ideals[1] + '|' + ideals[2] + '|' + ideals[3] + '|' + ideals[4] + '|' + ideals[5] + '|Random},?{Connection?|' + connections[0] + '|' + connections[1] + '|' + connections[2] + '|' + connections[3] + '|Random}">Set Personality</a></div>' + //--
                '</div>'
            );
        }
    },
    
    setpersonality = function(trait1,trait2,ideal1,ideal2,connection1) {
        var personality;
        var ideal;
        var connection;
        var type=state.dragon.now.type;
        var size=state.dragon.now.size;
        var traitlist;
        var ideallist;
        var connectionlist;
        switch (type) {
            case 'Amethyst':
                traitlist="I am never so content as when contemplating the beauty and wonders of the multiverse.;I am a sworn protector against the depredations of the Far Realm, and I will root out its corruption wherever it may arise.;What use is vast knowledge or insight if it is not shared with those who can appreciate it?;Although some are fascinated by words, I think numbers are the true foundations of creation.;To experience a thing is to truly understand it. Direct and personal experience is the most valuable form of knowledge.;I see a far more kaleidoscopic reality than you do … or than any of your selves do, really.;It is not my place to interfere. I merely seek to observe, learn, and understand.;With a true understanding of metaphysics, anything is possible—including the creation of a more orderly and perfect cosmos than this one.";
                ideallist="Balance. Everything is a complex interaction of forces that must be kept in a delicate and carefully maintained balance. (Neutral);Knowledge. We are the whole of creation, seeking to understand itself. (Any);Self-Improvement. I am a complex gem, and I constantly polish and refine my many facets to make the whole that much more perfect. (Any);Responsibility. Having knowledge and power gives one a responsibility to those who have less of either. (Lawful);Noble Obligation. My superior experience, intellect, and insight give me a duty to mediate disputes when I can. (Good);Power. Knowledge is power, power must be used, and I use it. Your concerns are irrelevant. (Evil)";
                if (size=="Wyrmling") {
                    connectionlist="An amethyst dragon wyrmling is in the care of a cloistered religious order of scribes.;A half-amethyst dragon cares for an amethyst dragon wyrmling sibling after the disappearance of their dragon parent.;A violet faerie dragon is the playmate and guardian of an amethyst dragon wyrmling.;An amethyst dragon wyrmling lives alone in a lair, cared for by a cadre of animated objects.;A cloister of flumphs protects an amethyst dragon wyrmling while feeding on the wyrmling\’s excess psionic energy.;A circle of druids looks after an amethyst dragon wyrmling lairing in the circle’s mountain tarn.";
                } else if (size=="Young") {
                    connectionlist="A myconid community dwells in tunnels near a young amethyst dragon\’s lair, and its members telepathically commune with the dragon and any visitors in the lair from time to time.;A young amethyst dragon and a githzerai zerth travel together, learning about the multiverse.;A young amethyst dragon wants to take over the cavern lair of a hydra.;A deep pool in a young amethyst dragon\’s lair leads to the underground domain of an aboleth the dragon has been seeking to eliminate.;A young amethyst dragon and a cloud giant regularly host each other to play strategy games.;Pegasi nesting in the mountain heights are under the protection of a young amethyst dragon.";
                } else if (size=="Adult") {
                    connectionlist="Merfolk dwelling near an adult amethyst dragon\’s lair are under threat from sahuagin raiders.;Clusters of shriekers serve as a warning system in the tunnels of an adult amethyst dragon\’s lair.;The Enlightened Dragon Master of an isolated monastery is, in fact, an adult amethyst dragon.;An adult amethyst dragon is at war with a beholder that has moved into the dragon’s domain.;Xorn serve as lookouts and spies for an adult amethyst dragon who rewards them with gems.;To repay a favor long owed to a monastery of githzerai warrior-monks, an adult amethyst dragon sends them aid against a mind flayer colony.;An apostate community of githyanki follows the tutelage of an adult amethyst dragon, who safeguards their creche on the Material Plane.;The crystal-infused clay near an adult amethyst dragon\’s lair is ideal for the creation of clay golems, and the dragon can perceive everything those golems do.";
                } else if (size=="Ancient") {
                    connectionlist="A yuan-ti cult known as the Serpents of the Dreaming City draws power from an ancient amethyst dragon, which the cultists keep in eternal slumber with braziers of enchanted smoke.;A rogue purple worm swallowed a large portion of an amethyst dragon’s hoard before burrowing back into the deep Underdark. The dragon has a magic crystal that can trace the worm’s movement.;An ancient amethyst dragon is able to awaken psionic potential in others, and many of the greatest psi warriors in history were the dragon’s students.;After centuries guarding the world against incursions from the Far Realm, an ancient amethyst dragon has been corrupted by aberrant influences and now leads a cult the dragon once opposed.";
                }
                break;
            case 'Black':
                traitlist="I demonstrate my brilliance through the cruel subtlety of my actions.;Watching the works of lesser beings crumble and fall into ruin fills me with joy.;I never confront a threat directly when deceit and skulduggery are available options.;Subjugating others is preferable to destroying them. Thralls make life so much more pleasant.;I will go to great lengths to obtain deadly new magical knowledge.;Nothing lasts forever. But I promise to outlast you.;I have witnessed the rise and fall of civilizations. What consideration does a creature as pitiful and short-lived as you deserve?;Collecting antiquities and learning why lost cultures vanished are my reasons for existing. If you can help me in that, I\’ll let you live.";
                ideallist="Envy. If the achievements of others cannot be eclipsed, they can always be torn down. (Evil);Acquisitiveness. Possessing what others covet is immensely satisfying. (Any);Cunning. Destroying your foes without exposing yourself to danger is an art. (Evil);Adaptability. It is not the most powerful, but the most flexible who survive. (Chaotic);Patience. There\’s no need to rush a poorly constructed plan when time is on your side. (Any);Serenity. Observing a culture sliding into oblivion along the trek of time puts life in perspective. (Any)";
                if (size=="Wyrmling") {
                    connectionlist="After breaking free from captivity at the hands of a cocky mage, a cunning black dragon wyrmling claimed the mage\’s amulet—and the suits of animated armor the amulet controls.;A band of troglodytes is cowed into serving a black dragon wyrmling as bodyguards.;The recent appearance of a black dragon wyrmling has altered the local ecosystem, allowing various types of blights to spread prodigiously and upset nature\’s balance.;A black dragon wyrmling is setting cunning traps along local roadways, hoping to injure horses and draft animals for easy butchering.;Kobolds dwelling under a tropical city serve as safecrackers and tunneling burglars to amass treasure for their beloved black dragon wyrmling master.;A gnome relic hunter looting a long-abandoned city strikes up an unlikely partnership with a black dragon wyrmling to plunder an archaeological dig.";
                } else if (size=="Young") {
                    connectionlist="A young black dragon with a talent for alchemy has weaponized the spores of a myconid colony.;A merrow war band has negotiated an alliance with a young black dragon to sack a nearby trading port.;A pack of ghouls infesting a necropolis serve as a young black dragon\’s bodyguards and enforcers.;A young black dragon has cultivated an awakened carnivorous plant (use the awakened tree stat block) as a lair guardian and has been abducting travelers to feed the plant creature.;Lizardfolk worshiping a young black dragon have been raiding a local fishing community.;A young black dragon has struck up a mutual assistance pact with a roper that haunts the ruins outside the dragon’s lair.";
                } else if (size=="Adult") {
                    connectionlist="An adult black dragon has learned to domesticate swamp-bred chimeras as guardians and has sold a few of the creatures to local warlords.;A cult of assassins worships an adult black dragon as an avatar of their deity. The dragon now uses the cult to destabilize the local sovereign\’s rule.;Ruins rumored to hold the treasury of a lost empire are guarded by an elaborate network of ooze-based traps designed by a restless adult black dragon.;The appearance of a spirit naga in the domain of an adult black dragon encourages the dragon to study necromancy.;An adult black dragon has hidden a cache of gems in a dismal topiary maze filled with shambling mounds, traps, and noxious plant life, all for the amusement of testing adventurers.;An adult black dragon has bound water elementals to the task of bringing food to the dragon\’s lair.;A bullywug community seeks help to defeat an adult black dragon who has been feasting on the bullywugs\’ domesticated giant frogs.;Two nations—one led by an adult black dragon and the other by a yuan-ti abomination—are on the brink of joining forces to destroy a third nation. The threatened nation is recruiting adventurers to defend it.";
                } else if (size=="Ancient") {
                    connectionlist="An ancient black dragon, after studying blasphemous texts dedicated to alien gods, issues a warning that a corrupted planetar will soon fall to earth like a meteor in the fens outside a great city\’s walls.;An illithid community has spent nearly a millennium raising and preparing a black dragon to become an elder brain dragon (described in chapter 6), so the elder brain can wreak ruin upon its rivals.;The decades-long machinations of an ancient black dragon and an evil archmage are nearing fruition. If their pact succeeds, they will unleash devastation on a continental scale.;An ancient black dragon rules a vast, decadent city built on artificial islands within a polluted lake. The site is threatened with destruction by an enraged archdruid—but destroying the city means thousands of innocents will die.";
                }
                break;
            case 'Blue':
                traitlist="I enforce order and social hierarchies because I believe this is how strong societies are built.;Why waste time and energy murdering weaker creatures when I can make them entertain me instead?;My children, whether born to me or chosen by me, are treasures.;Nothing is funnier than tricking a thirsty traveler into drinking a mouthful of sand.;I have standards for my hoard. Not just any gem or trinket will do.;I\’m so pleased with myself and my own good fortune that I can\’t stop laughing or chuckling.;I would rather destroy my lair and lose my hoard than allow anyone to steal from me.;I am sometimes secretly impressed by what other peoples can accomplish with the proper guidance.";
                ideallist="Order. Life is best when everyone is part of a hierarchy and rules are clear and consistent. (Lawful);Humor. Lesser beings exist to be my playthings, and I excel at finding ways to toy with them. (Evil);Taste. I value my possessions for more than just their beauty and consider gauche displays of wealth a sign of inferiority. (Any);Family. Blood ties are irrevocable, and even if one doesn\’t particularly like one\’s family members, they come before anyone else. (Lawful);Display. One should never take risks or waste resources by using power if one can achieve the same results merely by the threat of power. (Any);Loyalty. I don\’t form bonds with those outside my kindred often. But when I do, I am an unshakable and powerful ally. (Good)";
                if (size=="Wyrmling") {
                    connectionlist="A recently hatched brood of blue dragon wyrmlings has adopted a wounded pseudodragon as a sibling.;A blue dragon wyrmling frequently wanders off to a nearby city, where the residents treat the wyrmling as royalty.;A clan of druids has taken in an orphaned blue dragon wyrmling, and its members are trying to teach the creature the value of compassion.;A family of gnolls is holding a blue dragon wyrmling hostage in an attempt to force the wyrmling’s parents to leave the gnolls\’ hunting grounds.;Because of the friendship between a bandit leader\’s child and a blue dragon wyrmling, the wyrmling\’s parents are considering allowing the bandits to move into the dragons\’ territory.;The accidental death of a blue dragon wyrmling has caused a sibling to seek revenge.";
                } else if (size=="Young") {
                    connectionlist="A young blue dragon\’s family was killed, and the dragon is building a whole realm as a base for exterminating those responsible.;A young blue dragon claims the rule of a fast-growing city to impress the dragon\’s family.;A young blue dragon running a protection racket has run afoul of an efreeti, who has decided the area would be better off without dragons.;A tough but fair young blue dragon leads a fanatically loyal mercenary squad.;A young blue dragon schemes to take over a guardian naga\’s ancient temple.;A mummy lord keeps a young blue dragon bodyguard as a sign of power.";
                } else if (size=="Adult") {
                    connectionlist="An adult blue dragon rules a city and applies exacting standards of aesthetic perfection to everything and everyone in it, swiftly disposing of anyone who fails to meet those standards.;An adult blue dragon and an efreeti have formed a friendship over the decades. They now share a territory and assist one another in protecting it.;Feeling unappreciated and disrespected in one family, an adult blue dragon offers allegiance to a rival dragon family, setting off a blood feud.;A pair of adult blue dragons has decided to take over a thriving, wealthy city, whose governor is desperate to buy them off.;Decades ago, a gynosphinx insulted an adult blue dragon, earning the lasting enmity of a whole dragon family.;An adult blue dragon has adopted a half-blue dragon as an heir and is setting this heir up to be a puppet ruler.;An adult blue dragon plans to present a loyal bandit clan to a bronze dragon as a courting gift.;An adult blue dragon is obsessed with getting at the treasure guarded by a medusa.";
                } else if (size=="Ancient") {
                    connectionlist="An ancient blue dragon is worried that no members of the younger generation are strong enough to inherit the ancient dragon\’s territory, and this elder is trying to start a war to test the younger dragons and determine, which, if any might be a worthy heir.;An ancient blue dragon without offspring has adopted wyrmlings of various colors—including a number stolen from the wyrmlings\’ parents.;An ancient blue dragon is training an androsphinx as heir to the region the dragon rules and searching for magic items that will allow the sphinx to control the weather as the dragon does.;Under the pretense of helping an ancient blue dragon become a dracolich, an archmage is actually hoping to claim the dragon\’s vast hoard.";
                }
                break;
            case 'Brass':
                traitlist="I don\’t ask for much in a conversation partner—just smile, occasionally nod, and stay awake!;I\’m skilled at making others feel that I’m interested in the details of their tiny, meaningless lives.;Every word I say is worth hearing, so I speak loudly and eloquently to make sure I get my point across.;I don\’t care about the opinions of creatures that are less intelligent than I am. But I\’m fascinated by creatures that are significantly more intelligent.;Hoarding knowledge is no fun. It\’s best when you can trade knowledge away for treasure.;I\’m fascinated by intelligence with no brain—talking swords, sapient Constructs, and the like.;I love hearing stories and songs and sharing them with others to bring comfort and calm.;I have no patience for people who imagine their lives are the least bit important.";
                ideallist="Curiosity. The best way to show you value others is to learn as much as you can about them. (Good);Perspective. Everyone sees things differently, so if you want to know about the world, gather as many different points of view as you can. (Any);Knowledge. What\’s the point of living for centuries if you don’t learn all there is to know? (Any);Self-Determination. All creatures have the right to make their own decisions about their lives and ultimate destinies. (Chaotic);Compassion. Sharing each other\’s pain and loss brings us all closer to peace and unity. (Good);Cruelty. The most hilarious thing about lesser creatures who think they\’re important is how outraged they get when I hurt them. (Evil)";
                if (size=="Wyrmling") {
                    connectionlist="Captured by a band of gnolls, a brass dragon wyrmling is patiently trying to teach the gnolls to speak Draconic.;Grieved by the fate of a former friend, a brass dragon wyrmling guards a tomb haunted by a wight.;Yuan-ti have captured a brass dragon wyrmling and are picking up the dragon\’s twisted sense of humor.;A party of bandits stole a brass dragon egg, and now the hatched wyrmling is manipulating the bandits to do the dragon\’s whimsical bidding.;A lost brass dragon wyrmling was raised by hyenas and now leads the pack.;A druid who tends a desert oasis has been keeping watch over several brass dragon wyrmlings since adventurers killed the wyrmlings\’ parents.";
                } else if (size=="Young") {
                    connectionlist="A young brass dragon and a young blue dragon fight over territory.;A young brass dragon frequently visits a couatl who is charged with guarding an ancient temple, sharing stories to help the couatl pass the years.;A lamia and a young brass dragon lair in the same desert ruin, mostly leaving each other alone—but the lamia hopes to corrupt the dragon.;A young brass dragon\’s lair occasionally spawns air elementals that roam around the area for a while, causing havoc before eventually dissipating.;A young brass dragon and a weretiger have become close friends as they try to keep a region safe from a growing horde of malicious gnolls.;A young brass dragon allowed a group of cyclopes to shelter in the dragon\’s lair when they were harassed by a blue dragon. Now the cyclopes won\’t leave, so the dragon is trying to educate them.";
                } else if (size=="Adult") {
                    connectionlist="An adult brass dragon enjoys trading riddles with a gynosphinx.;Long ago, an adult brass dragon swore service to a human priest, expecting to outlive the priest. But now the priest is a mummy lord, and the dragon remains bound to serve.;An efreeti wants to claim an adult brass dragon\’s palatial lair and fabulous hoard.;A pair of rocs have nested too close to an adult brass dragon\’s lair, and they harass the dragon whenever they can.;A guardian naga charged with protecting an ancient artifact has decided that the artifact—as well as the naga—would be safer in an adult brass dragon\’s hoard than left alone in some crumbling ruin.;A half-brass dragon yuan-ti abomination leads other yuan-ti in worshiping an adult brass dragon as a serpent god, much to the dragon’s amusement.;Two adult brass dragons are rearing a clutch of wyrmlings together, and they allow the infant dragons to wreak innocent havoc on nearby settlements.;A solitary adult brass dragon has adopted a blue dragon wyrmling found starving in the desert.";
                } else if (size=="Ancient") {
                    connectionlist="An ancient brass dragon once ruled a temple-state through a puppet sovereign, who is now a mummy lord ruling a city of ghouls that owe the dragon fealty.;An ancient brass dragon believes that a local androsphinx is an insufferable know-it-all with no sense of humor and enjoys playing pranks on the sphinx.;An ancient brass dragon and an ancient blue dragon have a centuries-old rivalry, and each dragon manipulates adventurers into harassing the other.;An ancient brass dragon rules a mighty city whose folk have erected massive stone monuments to honor the dragon over the centuries.";
                }
                break;
            case 'Bronze':
                traitlist="The weakest creatures sometimes display the greatest courage. I respect all beings who risk their lives in defense of something greater than themselves.;My payment is a matter of principle. Requiring even a small fee for my service allows those I help to preserve their dignity. It\’s really for your benefit.;I have no time for chitchat or insinuation. I get to the point and expect others to do the same.;I respect law and order, but it’s no excuse for tyranny. Those who abuse power must be stripped of it, and soldiers have a responsibility to refuse immoral orders.;I strive to treat foes honorably, but not at the expense of strategy. A quick death in combat is its own kind of courtesy.;I trust my gut. I\’d rather act on incomplete information than be hamstrung by indecision.;I\’m fascinated by other species\’ military technology, especially magic armaments and siege engines—the bigger, the better!;Conflict drives evolution. By sparking wars between nations, I contribute to the advancement of their civilizations. (And they pay me for it, too!)";
                ideallist="Action. Passivity is shameful. We owe it to the world and ourselves to try to improve things, even if we can’t guarantee success. (Any);Analysis. When possible, dig into the root of a conflict before committing to end it, to ensure you aren\’t fighting for the wrong side. (Any);Honor. I never lie outright, though I choose my words carefully. I will fight to the death rather than break my word or abandon a comrade. (Lawful);Discipline. Disorganization breeds defeat. I demand self-control from both myself and those who fight beside me. (Lawful);Guardianship. It’s the duty of the strong to protect the weak. (Good);Dominance. Anyone who opposes my will is either an underling to be punished or an enemy to be vanquished. (Evil)";
                if (size=="Wyrmling") {
                    connectionlist="A flight of pseudodragons has raised an orphaned bronze dragon wyrmling, who is quickly growing too large for the group\’s usual activities.;A knight rescued a bronze dragon wyrmling from sacrifice at the hands of a cult, and the two now travel together in search of wrongs to right.;A bronze dragon wyrmling\’s murdered tutor rose as a revenant, and the dragon seeks anyone who can help obtain justice.;A bronze dragon wyrmling has chosen a lair filled with poisonous snakes, admiring the elegance with which they slither through the flooded tunnels.;A bronze dragon wyrmling has been captured by sahuagin raiders and manipulated into serving as the band\’s icon and war leader.;A group of merrow stole a bronze dragon wyrmling\’s hoard, and the wyrmling is training a plesiosaurus to help attack the merrow\’s stronghold.";
                } else if (size=="Young") {
                    connectionlist="A guardian naga and a young bronze dragon each defend half of an artifact called the Sundered Crown.;A young bronze dragon and a medusa have been enemies for so long that they\’ve developed mutual respect, communicating by way of a magical book that teleports back and forth between them.;A young bronze dragon seeks to turn a band of cyclopes into a disciplined army, with little success.;A young bronze dragon has been magically bound to the service of a marid, and the dragon is unable to take direct action to get free of the genie.;A young bronze dragon runs a prestigious military academy, training paladins of smaller species to fight for justice beneath the dragon\’s banner.;Dragonborn pirates bribe a young bronze dragon into helping them steal ship cargoes for a sizable cut of the profits.";
                } else if (size=="Adult") {
                    connectionlist="A rakshasa disguised as a pirate lord seeks revenge on the adult bronze dragon who has killed the Fiend three times so far.;An adult bronze dragon regularly consults a storm giant whose prophecies give hints as to which conflicts the dragon should seek out and engage in.;An adult bronze dragon keeps a roc as a beloved pet and views the creature\’s predations on local settlements as simply part of the natural order.;An adult bronze dragon swore an oath to a comrade who later became a vampire. The dragon reluctantly continues to protect the vampire, all the while searching for a way to reverse the transformation.;An adult bronze dragon sends regular tributes of treasure to an adult topaz dragon, not wanting the topaz dragon’s enmity to become a threat to coastal communities under the bronze dragon\’s protection.;An archmage and an adult bronze dragon who have been friends since they fought together in the mage\’s youth often visit each other to share stories.;An adult bronze dragon attempting to raise a clutch of wyrmlings alone is in desperate need of tutors and babysitters who can survive the assignment.;An obsessed shadow dragon plots to trap an adult bronze dragon in the Shadowfell until the bronze dragon too is transformed.";
                } else if (size=="Ancient") {
                    connectionlist="An ancient bronze dragon is locked in a centuries-old conflict with a kraken that destroyed a settlement under the bronze dragon\’s protection.;Two ancient dragons, one bronze and one silver, support different nations locked in a war, each believing that their side has the moral high ground.;An ancient bronze dragon controls a network of privateers who prey on pirates and accept government commissions if the dragon deems a cause worthy.;An ancient bronze dragon guards a merfolk monastery that’s risen mysteriously from the depths, prompting attacks by greedy coastal nations even as the monks warn of a coming apocalypse";
                }
                break;
            case 'Copper':
                traitlist="I am generous with my time, my words, and my considerable wisdom—but my treasure is mine.;I love music. It is truly the universal language, able to express ideas far better than mere words alone.;I find the notion of trade and barter fascinating, and sometimes even find ways to participate in them.;There is no sound I love more than laughter, a powerful balm for hearts and minds.;I enjoy games of all kinds, especially challenges of wit and intellect—and those I can decisively win.;I admire how brightly short-lived creatures shine before their lights go out.;Nothing is more satisfying than deflating the egos of the high-and-mighty with a well-placed jibe.;When I\’m bored, stirring up a settlement and watching its people scurry about amuses me.";
                ideallist="Beauty. The ability to create, appreciate, and sustain beauty is the true measure of a creature or civilization. (Good);Curiosity. The world holds so much to experience. I value different perspectives and insights. (Any);Creativity. Our purpose is to create something new and clever, and I admire those who do so. (Any);Change. The only constant is change, and we must change with the world. (Chaotic);Fairness. Life is often unfair, and it is up to us to rebalance its scales from time to time. (Good);Cruelty. Existence is a cruel joke. You can either be in on the joke, or be made a fool by it. (Evil)";
                if (size=="Wyrmling") {
                    connectionlist="A flock of aarakocra shelters a copper dragon wyrmling from gargoyles hunting in the mountains.;A copper dragon wyrmling guards a hidden pass that leads into a sylvan valley populated by centaurs, pixies, and satyrs.;A copper dragon wyrmling has killed a number of domestic animals. A group of druids wants the wyrmling captured and relocated, rather than killed.;A ruined manor house being reclaimed by a newly titled noble is the lair of a copper dragon wyrmling.;A copper dragon wyrmling follows a wizard everywhere, fascinated by prestidigitation tricks.;An ettin is trying to keep a captured copper dragon wyrmling as a pet.";
                } else if (size=="Young") {
                    connectionlist="A young copper dragon has enticed a band of kobolds to undertake activities for the dragon\’s amusement—and to rein in the band\’s more chaotic tendencies.;The head of a local thieves\’ guild is a young copper dragon who delights in tales of daring thefts and skims the best stolen art objects as tribute.A young copper dragon needs aid to root out a behir that has claimed the dragon\’s lair.;A band of raiders tithes treasure and tales to a young copper dragon, in exchange for using the canyons around the dragon\’s lair as a haven.;A dryad dwelling in the woods near a young copper dragon\’s lair helps to ward off intruders.;A child\’s imaginary friend is a very real young copper dragon who can cast invisibility.";
                } else if (size=="Adult") {
                    connectionlist="An adult copper dragon befriended a djinni after granting the genie freedom. Now the two meet yearly to talk and exchange news.;Centaur communities in the foothills surrounding an adult copper dragon\’s lair gather yearly to offer tribute to the dragon, who settles disputes and dispenses advice for them.;A galeb duhr acts as the guardian of an adult copper dragon\’s hoard.;An adult copper dragon regularly visits the treants of the nearby forest to help protect their woods from encroachment.;A band of fomorians believe they have allied with a red dragon to burn a Feywild grove, but an adult copper dragon has deceived them.;An adult copper dragon serves as the patron of a community of gnome tinkerers, who present their best ideas to the dragon in hopes of being funded.;A community of stone giants believes an adult copper dragon is a key figure in a prophecy—and the dragon has decided to play along for fun.;An adult copper dragon sends agents into a goristro demon\’s labyrinth to steal a lost soul, as part of a centuries-long game.";
                } else if (size=="Ancient") {
                    connectionlist="An ancient copper dragon and an ancient red dragon have been playing a complex game of strategy for centuries, using whole communities as their pawns and nations as their game board.;An ancient copper dragon guards the sealed entrance to a ruined temple filled with devils.;A renowned gnome trickster, now deceased, so impressed an ancient copper dragon that the dragon assumes the gnome\’s form from time to time to help keep their legend alive.;The ancient copper dragon progenitor of a lineage of dragon-blooded sorcerers likes to check in on these descendants from time to time.";
                }
                break;
            case 'Crystal':
                traitlist="If you\’re not a thief or a frost giant, let\’s talk!;Are you comfortable? Can I tell your future for you? Just let me know what I can do for you, okay?;Jokes are as valuable as any gemstone and more fun to share.;My empathy is a bottomless well. I can\’t help but lose myself in the emotions of others.;The stars have much to tell us, and folk need me to interpret what the stars say.;All play and no work—those are the words I live by.;I am always the first to offer a compliment.;Get off my snowfield, you immature bipeds! When I was a wyrmling, people respected their elders!";
                ideallist="Exploration. Yesterday is already known. Today is for something new. (Chaotic);Empathy. It\’s a gift to share in another\’s joy, even if sometimes you must bear their pain, too. (Good);Hospitality. We all live beautiful lives—it would be a shame not to share our lives with others. (Neutral);Determinism. Our destinies may already be written, but the way we achieve them still matters. (Any);Fun and Games. Play is learning, but without the boredom. (Chaotic);Control. Everyone is welcome, as long as they follow my rules. (Lawful)";
                if (size=="Wyrmling") {
                    connectionlist="A crystal dragon wyrmling rides a sled pulled by a trained pack of wolves and frets about outgrowing this favorite pastime.;A crystal dragon wyrmling has foreseen an untimely end for the bandits who raided the wyrmling\’s lair and follows the bandits to keep them safe.;A crystal dragon wyrmling has befriended a white dragon wyrmling. The wyrmlings\’ parents, who are ancient rivals, regard the relationship with concern.;A crystal dragon wyrmling encourages nearby farmers to go on dangerous excursions so they\’ll return with interesting stories to tell the dragon.;A crystal dragon wyrmling finds ice mephits to be the perfect household servants—if only they would stop trying to kill the dragon\’s guests.;A crystal dragon wyrmling is placed in a monastery to learn the teachings of the monks before returning home in three years. The monks don\’t appreciate the wyrmling\’s pranks.";
                } else if (size=="Young") {
                    connectionlist="A young crystal dragon tries to protect a local population of rare snowy owlbears from poachers and hunters.;A young crystal dragon has adopted a group of kobolds and is trying to teach them the value of a good practical joke.;A young crystal dragon has captured a pack of winter wolves loyal to a frost giant, intent on convincing the wolves to change their evil ways.;A lonely werebear enjoys long conversations with a young crystal dragon but doesn\’t always appreciate the dragon\’s sense of humor.;A young crystal dragon finds some manticores\’ bluster hilarious and befriends them despite their fear. But the dragon is having trouble overcoming the manticores\’ predatory nature.;A young crystal dragon uses dancing lights and hypnotic pattern to give an air of authenticity to a charlatan fortuneteller\’s act, in exchange for a portion of the take from the charlatan\’s clients.";
                } else if (size=="Adult") {
                    connectionlist="An adult crystal dragon convinces a druid to cast the awaken spell on creatures around the dragon\’s lair, so the dragon will never want for conversation.;A family of yetis seized an adult crystal dragon\’s lair and hoard, and the dragon seeks help to drive the yetis out.;An adult crystal dragon and an elf archmage have been friends for centuries and often go stargazing together on the peaks of their favorite mountains, but the dragon is grieving as the elf approaches the end of life.;A pair of adult crystal dragons lairing on neighboring mountaintops have enjoyed a decades-long snowball war, but their antics sometimes cause avalanches that threaten nearby villages.;An adult crystal dragon enjoys shaping the ice and snow near a den of trolls into a labyrinth and watching the trolls try to make their way through it.;Remorhazes infest the glacier beneath an adult crystal dragon\’s lair, posing an imminent threat to the dragon\’s home and hoard.;A revenant persuades an adult crystal dragon to help get revenge on the frost giants who murdered her.;An adult crystal dragon teaches astronomy to students of a renowned university, but the students must travel to the dragon\’s mountain lair for class.";
                } else if (size=="Ancient") {
                    connectionlist="A clan of dwarves has discovered a self-renewing vein of quartz near an ancient crystal dragon\’s lair. The dwarves mine the area aggressively, unaware that the dragon is spying on them—and intends to demand recompense at some point in the future.;An ancient crystal dragon is stalked by a villainous ranger who has already claimed a dozen draconic trophies.;An ancient crystal dragon follows a pod of whales from one sea to another, having grown fond of the valuable ambergris they leave in their wake. Now whalers are scheming to kill the dragon.;A community of seal hunters reveres an ancient crystal dragon as the spirit of their glacier home. Such worship amuses and flatters the dragon, who keeps the hunters safe and leads them to locations where seals are plentiful.";
                }
                break;
            case 'Emerald':
                traitlist="I repeat what others have said back to them to make sure I have remembered it correctly.;I might not like you, but I will endeavor to treat you with respect, if not kindness.;I like to impress visitors by reciting epic poetry.;The only people I\’m interested in are those who know history and those who make history.;I like to adopt the personas of characters from legend.;I studiously mimic the mannerisms of my guests.;I prefer to get others talking, then fade into the background. Sometimes literally.;I seek out audiences and like to be the center of attention.";
                ideallist="Seclusion. It\’s safer if others don\’t know I\’m here—safer for me and safer for them. (Any);Observation. People lie. Histories lie. Even dragons lie. But actions always ring true. (Lawful);Storytelling. There is a magic in the retelling of stories. Each new teller adds a bit of themself to the spell. (Any);Nurture. Rearing a child is our best chance to make sure our own stories are passed on. (Any);Inquisitiveness. Even the smallest village contains myriad stories of love, loss, triumph, and betrayal. There is always more to learn about people. (Any);Espionage. Once I get paid for the information I glean, I don\’t care what others do with it. (Evil)";
                if (size=="Wyrmling") {
                    connectionlist="Blood hawks routinely accost an emerald dragon wyrmling who lairs near the hawks\’ nest.;An emerald dragon wyrmling is being hunted by a fire giant\’s pet hell hound.;An emerald dragon wyrmling follows a berserker to observe the berserker\’s life. The berserker believes the dragon is a spirit companion.;A flattering orog plies an emerald dragon wyrmling with gems in exchange for information about a settlement the wyrmling has been observing.;An emerald dragon wyrmling keeps trying to play with a pair of newly hatched fire snakes.;An emerald dragon wyrmling has been captured by scheming duergar, who plan to use the wyrmling as bait to lure the wyrmling\’s parents out of their lair.";
                } else if (size=="Young") {
                    connectionlist="A young emerald dragon has befriended a stone giant, who is teaching the dragon giant folklore.;A young emerald dragon lairs in abandoned bandit caverns also occupied by a friendly earth elemental, which hunts for buried coins for the dragon\’s hoard.;A galeb duhr acts as a door guard to a young emerald dragon\’s lair.;A young emerald dragon invites repeated visits from a drow mage who corrects what the dragon has learned about the history of the elven schism.;A young emerald dragon attempts to drive off a clan of cyclopes who have taken up residence in a nearby cave, attacking the clan\’s herd of giant goats.;An assassin and a young emerald dragon train together to master the art of stealth.";
                } else if (size=="Adult") {
                    connectionlist="An adult emerald dragon wages a constant battle against deep gnome miners, who scour the tunnels of the dragon\’s lair in search of emeralds.;An adult silver dragon tries to befriend and draw out a reclusive adult emerald dragon.;An adult emerald dragon unwillingly serves a fire giant tribe holding the dragon\’s egg hostage.;An adult emerald dragon is fascinated by the intrigues of a rakshasa disguised as a human merchant prince.;An adult emerald dragon shows an emerald dragon wyrmling how to safely observe Humanoids without being detected.;An adult emerald dragon keeps a wary eye on the efreet who have built a tower near the dragon\’s lair, and indirectly aids any who oppose the efreet.;An iron golem ferries visitors across the lava moat surrounding an adult emerald dragon\’s lair.An adult emerald dragon spies on the adult red dragon who killed the emerald dragon\’s mate, looking for weaknesses.";
                } else if (size=="Ancient") {
                    connectionlist="An ancient emerald dragon bargains with a pit fiend to buy back the soul of a legendary hero.;A group of adult red and silver dragons set aside their differences to learn wisdom from an ancient emerald dragon.;Two balors act as jailers for an ancient emerald dragon imprisoned by a long-dead enemy.;An ancient emerald dragon works to summon a solar to get a firsthand account for a history of the gods the dragon is compiling.";
                }
                break;
            case 'Gold':
                traitlist="I prefer to parley before combat. If villains can be reformed without violence, all the better.;Shorter-lived species often have difficulty perceiving the full scope of time\’s tapestry and lack the patience for my appropriately thorough explanations.;Others might find me cold and dispassionate, but such is the price of perspective. Few creatures enjoy confronting the relative smallness of their lives.;Disguises allow me to bestow small kindnesses and experience the simple pleasures of companionship without constantly being petitioned. I\’m proud of my acting ability and never break character.;The future is writ large in the patterns of history. I enjoy conversing with others who think critically about history and society.;I enjoy gifts but find attempts to hire or bribe me deeply offensive.;My reclusiveness is a filter. If someone lacks the motivation to overcome my barriers, then their matter is unworthy of my attention.;On a long enough timescale, all actions are meaningless. So why should I deny myself anything?";
                ideallist="Foresight. Righteous action requires carefully weighing potential consequences to ensure the cure is not worse than the disease. (Lawful);Restraint. I cannot right every wrong. I encourage others to solve their own problems, and I save my strength for tribulations only I can address. (Any);Stewardship. I do not serve individuals, but rather history. By acting strategically, I tip the ultimate balance toward justice and virtue. (Good);Objectivity. I remain impartial in my judgments and refuse to let personal feelings get in the way of what’s fair or necessary. (Lawful);Isolation. Every interaction has ramifications that stretch on into infinity. I curate my impact on the world by remaining aloof and self-reliant. (Any);Sovereignty. Other creatures lack my wisdom and must be controlled to prevent wrongdoing. (Evil)";
                if (size=="Wyrmling") {
                    connectionlist="A gold dragon wyrmling bonded with a xorn over their shared love of gems and seeks to help the creature back to the Elemental Plane of Earth.;A gold dragon wyrmling yearns to imitate a couatl mentor and is searching for a magical location worth guarding.;A gold dragon wyrmling is venerated by a tribe of lizardfolk—much to the consternation of the priest who used to rule the tribe.;A band of centaurs makes pilgrimages to a gold dragon wyrmling\’s lair, bringing gifts of gems and knowledge.;A gold dragon wyrmling is fascinated by modrons\’ clockwork determinism and has tracked down and befriended a rogue pentadrone.;A gold dragon wyrmling has befriended a group of githzerai monks and visits them regularly to conduct elaborate thought experiments.";
                } else if (size=="Young") {
                    connectionlist="A young gold dragon enjoys the company of treants, who share the dragon\’s long view of history and methodical conversational style.;A young gold dragon lives in a cluster of stone spires and has secured the service of the galeb duhr who watch over the site.;An arcanaloth has secured a contract requiring a young gold dragon to serve the Fiend once every five years. It can\’t make the dragon do evil acts, but the jobs often have unforeseen consequences.;A young gold dragon maintains a lair in a flying cloud giant citadel, winning the continued right to dwell there in repeated gambling games.;A young gold dragon and an archmage are uneasy companions, bound to defend each other by the dying wish of a heroic warrior they both loved.;After a young gold dragon freed a djinni from servitude, the djinni installed a portal linking the dragon\’s lair to the djinni\’s citadel on the Elemental Plane of Air.";
                } else if (size=="Adult") {
                    connectionlist="An adult gold dragon has sworn to destroy the balor who killed the dragon\’s mate.;An adult gold dragon feels responsible for a paladin\’s fall from grace and sends minions across the world in search of the paladin—now a death knight—so they both might be redeemed.;An adult green dragon and an adult gold dragon skirmish over control of the vine-choked ruins of a floating mausoleum and its library of talking skulls.;An adult gold dragon enjoys playing strategy games with an androsphinx, one of the few creatures able to successfully bluff the dragon.;An adult gold dragon living in a desert temple helps some elf oracles interpret visions bestowed by an artifact called the Siren\’s Lens.;An imprisoned mummy lord has convinced its adult gold dragon jailer that the mummy\’s plans for domination will be for the best in the long run.;An adult gold dragon crafted an iron golem to defend the dragon\’s lair and talks to it as if it were a person.;An adult gold dragon hunts the adult blue dracolich who stole the legendary Crown of Endings from the gold dragon\’s hoard.";
                } else if (size=="Ancient") {
                    connectionlist="A solar who admires an ancient gold dragon campaigns to recruit the dragon into the service of the solar\’s god.;An ancient gold dragon is infatuated with an oblivious empyrean, drawn in by the empyrean\’s carefree nature and larger-than-life emotions.;An ancient gold dragon and a lich have vied to bend history to their respective wills. The two have reluctantly come to understand and empathize with each other.;An ancient gold dragon takes little interest in the day-to-day governance of a powerful empire. But the dragon expects to be obeyed completely when deigning to address the populace.";
                }
                break;
            case 'Green':
                traitlist="You\’re either with me or you\’re against me. Just kidding—you\’re lunch either way!;I hate how much people think they matter in a world that was old before their kind even learned the idea of names.;The more the merrier as far as I\’m concerned: more to control, more to torture, more to feast upon when I\’m finally bored.;Bipedal life is too ugly and ignorant to merit even a scrap of compassion.;I like seeing life through the eyes of a lesser being—before forcing that creature to gouge their eyes out.;The wilds are mine and mine alone, and anyone who thinks they can enter my territory had best hope I have other distractions that day.;I allow others to dwell in my forest—if they act as my eyes, ears, and occasional playthings in return.;I harbor no animosity toward anyone. Let me grow ancient with my forest, and I\’ll leave you in peace";
                ideallist="Isolation. Territories can be properly established only when all parties respect the borders of their neighbors. (Lawful);Control. All lesser beings should bare their throats to their betters. (Evil);Respect. Fear is amusing, but reverence is delicious. (Any);Intrigue. The world is so much more entertaining when no one trusts anyone. (Evil);Imagination. Nothing is more gauche than repeating the same activities day after day. (Any);Tolerance. The impermanence of intelligent life is bittersweet and should be honored as such. (Good)";
                if (size=="Wyrmling") {
                    connectionlist="A green dragon wyrmling is the centerpiece of a traveling circus but might not be a prisoner after all.;A green dragon wyrmling was raised by a cluster of pseudodragons, whom the wyrmling now protects.;Hobgoblin raiders have captured several green dragon wyrmlings, hoping to use them as the vanguards of their war parties.;A green dragon wyrmling exacerbates the chaotic tendencies of a group of satyrs, driving them to greater acts of mischief with the promise of rich rewards.;A green dragon wyrmling tricks a village of lizardfolk into believing the dragon is an incarnation of a lizardfolk god.;An ancient couatl attempts to shape the moral outlook of a green dragon wyrmling, so the dragon might inherit the duty of guarding the couatl\’s treasures.";
                } else if (size=="Young") {
                    connectionlist="A young green dragon and a treant vie for influence over a woodland region.;A young green dragon forces a group of dryads to collect treasures for the dragon\’s hoard, threatening to destroy their trees if they refuse.;An infestation of twig blights has taken over the lair of a young green dragon, and the dragon will do anything to reclaim it.;Green hags compete to gain an alliance with a young green dragon, turning a village into a staging ground for their games of deceit.;A young green dragon directs a conclave of yuan-ti under the command of a yuan-ti abomination, ordering the serpentfolk to search the forgotten tunnels of a city for the ancient treasures buried there.;An oni and a young green dragon work together to terrorize a village, taking a victim every night and leaving the rest too frightened to flee.";
                } else if (size=="Adult") {
                    connectionlist="A ruler controlled by an adult green dragon plunders the realm\’s populace to fill the dragon\’s hoard.;Several adult green dragons fight to claim a treasure hoard hidden under a woodland city.;An adult green dragon is bound to the service of a guardian naga and baits other creatures to kill the dragon\’s naga captor.;Giant apes raised from birth by an adult green dragon now serve as the dragon\’s hunting party.;Mind-controlled clerics lead unsuspecting worshipers to the lair of an adult green dragon.;An adult green dragon works to corrupt a young gold dragon trapped in the green dragon\’s woods.;Wood elves flagellate themselves to earn the favor of a god suddenly turned cruel, not knowing they\’ve been misled by an adult green dragon.;An adult green dragon turns treants against the druids who once guarded the treants\’ grove.";
                } else if (size=="Ancient") {
                    connectionlist="An ancient green dragon returns to the same sylvan forest every year to feed upon a herd of unicorns.;An ancient green dragon prevents would-be rescuers from reaching a cursed realm whose people are magically asleep and hidden behind a forest of thorns.;A once-peaceful land has become warlike, thanks to the ancient green dragon controlling its elf monarchs.;An ancient green dragon is the guardian of a lich\’s phylactery and extorts favors from the lich.";
                }
                break;
            case 'Red':
                traitlist="The thrill of the hunt and of battle makes my blood burn and stokes the fire in my heart. A pity there are so few foes and so little prey worthy of me.;The worship of smaller creatures pleases me, though their weakness is pathetic—how can they do other than adore me?;Nothing is better than to sleep and dream upon my hoard with the warmth of a full belly. Let those who would disturb me beware!;Ah, if these foolish creatures only knew they were but pawns in the games I play to amuse myself.;I know that others seek to steal my treasures, my beautiful baubles, won through strength and cunning. But they are mine. Mine!;All that I survey, I could easily destroy. From time to time, it is important to remind these small creatures of the true extent of my power.;Although my power and life span are vast, they have merely whetted my appetite for immortality.;Heroes need foes to test them. Not all teachers can afford to be kind, and some lessons must be harsh.";
                ideallist="Cruelty. Pain and fear are the most powerful tools. With them, any creature\’s will can be broken. (Evil);Might. Only the strongest survive and prosper, so I must be the strongest of all. (Any);Greed. If I desire a thing, then it must be mine and mine alone. (Evil);Respect. All that I have achieved must be acknowledged and treated with the utmost respect. (Any);No Limits. I do whatever I please, whenever it pleases me to do so. (Chaotic);Responsibility. Fire destroys, but it can also temper when it is applied carefully—if the material tested is strong enough. (Lawful)";
                if (size=="Wyrmling") {
                    connectionlist="A fire giant lord has captured a red dragon wyrmling and is looking to train the willful creature as a pet.;A red dragon wyrmling adopted a nest of fire snakes, which have now grown into salamanders who protect the wyrmling.;A band of kobolds was driven out of its warren by a red dragon wyrmling; they now raid to survive—and to gather offerings to propitiate >>the winged god.<<;A tiefling child has secretly hidden and raised a red dragon wyrmling from an egg. The wyrmling is bonded to the child, but dangerous to anyone else.;A bound fire elemental serves as the guardian of an orphaned red dragon wyrmling.;A band of hobgoblins is thrown into chaos when a red dragon wyrmling supports a coup by an ambitious war leader, in exchange for tribute.";
                } else if (size=="Young") {
                    connectionlist="A specter is bound as the guardian of a young red dragon\’s treasure hoard.;A young red dragon\’s new lair spawns magma mephits and smoke mephits, which escape into the surrounding countryside and cause mischief.;A young red dragon serves as the guardian of a githyanki creche, hoping to eventually earn the allegiance of the young githyanki raised there.;Ogres and ettins cowed by a young red dragon wander the foothills near the dragon\’s lair, helping to drive away intruders.;A colony of mind flayers has captured and controlled a young red dragon, which now guards the passages to the illithids\’ underground lair.;A parent of a young red dragon has become a dracolich, and the dragon wishes to see the Undead abomination destroyed.";
                } else if (size=="Adult") {
                    connectionlist="A flock of gargoyles dwell near an adult red dragon\’s lair, serving as lookouts and guardians.;Azer artisans are bound in service to an adult red dragon, for whom they make sculptures and art objects from precious metals and gems.;An adult red dragon rules over a hidden valley filled with dinosaurs.;A shadow demon serves as an adult red dragon\’s spy and messenger.;Cultists worshiping an adult red dragon act as the dragon\’s agents throughout the region.;A mysterious masked knight relentlessly hunting an adult red dragon is, in fact, the dragon\’s half-dragon offspring bent on vengeance.;An adult red dragon owes a debt of service to an elderly druid, enforced by a magical oath.;An adult red dragon has seized an outpost of an efreeti pash\a’s domain as a lair, and the noble genie wants to evict the intruder.";
                } else if (size=="Ancient") {
                    connectionlist="An ancient red dragon controls a vast intelligence network that has infiltrated nearly every nation.;An ancient red dragon warlord has united a number of formerly squabbling nations, creating a massive army ready to conquer the known world.;A cult in service to an ancient red dragon is gathering resources to summon a consort of Tiamat, so the cult\’s master can defeat the consort in single combat and claim a place at Tiama\’s side.;A balor demon hopes an ancient red dragon\’s dragonsight can help the demon coordinate a multidimensional play for power in the Abyss.";
                }
                break;
            case 'Sapphire':
                traitlist="I often fixate on specific historical battles or wars and won\’t rest until my hoard contains that conflict\’s most significant artifacts.;I am constantly aware of a call from beyond this world. I must prepare to answer that call by amassing powerful arms and armor.;I secretly look forward to adventurers trying to infiltrate my lair. How else could I try out new defenses?;Give me a storied helmet or scimitar over a pile of gold any day.;No creature can outsmart my defenses—if they do, they obviously cheated.;Any creature that can hold their own against me must teach me how—whether they want to or not.;I cannot resist a game of dragonchess—which, I will have you know, my ancestors probably invented.;The sight of blood makes me queasy.";
                ideallist="Solitude. A stranger is just an intruder I haven\’t dealt with yet. (Neutral);Preservation. Most creatures cannot be trusted to properly safeguard historically significant artifacts. I can. (Lawful);Knowledge. The stories surrounding every piece in my collection are as important as the treasures themselves. (Any);Order. An organized hoard makes me happy—and you don\’t want to see me unhappy. (Lawful);Preparation. Justice and righteousness do not guarantee victory. Planning and tactics do. (Lawful);Companionship. Sure, my hoard brings me great joy. But the real treasures are the guests who stop by to see it. (Good)";
                if (size=="Wyrmling") {
                    connectionlist="After being robbed by gnomes who had pledged to protect the hoard, a sapphire dragon wyrmling installs new guardians that have no interest in material riches: gelatinous cubes and ochre jellies.;A band of minotaurs in service to Baphomet has captured a sapphire dragon wyrmling to learn from the wyrmling\’s strategies.;Two sapphire dragon wyrmlings vie for the same territory. Their primary battle tactic involves luring grells into each other\’s lairs.;A group of Lolth-worshiping drow warriors were sent to kill a sapphire dragon wyrmling who has been making meals of their goddess\’s holy spiders.;A sapphire dragon wyrmling is on the verge of starvation after incorrectly identifying a nearby phase spider nest as an easy food source.;A sapphire dragon wyrmling\’s hoard contains a cursed item, which has attracted specters and wraiths to the area around the dragon\’s lair.";
                } else if (size=="Young") {
                    connectionlist="A young sapphire dragon practices martial skills by regularly using a horn of Valhalla to summon berserker spirits to fight.;A young sapphire dragon has found a collection of long-forgotten clay golems and is trying to teach them military tactics.;A druid summoned galeb duhr to guard a young sapphire dragon\’s hoard in exchange for the dragon controlling the giant spider population, but the galeb duhr are causing trouble for local miners.;Two Lolth cultists seek a magical relic that attracts giant spiders, but the relic\’s resting place has become a young sapphire dragon\’s feeding ground.;A young sapphire dragon and a hobgoblin warlord have become friends. The hobgoblin visits regularly to trade war stories and tactics with the dragon.;A kuo-toa archpriest believes a young sapphire dragon is a god named Sliploopdreegoo, and calls on other kuo-toa to worship the dragon.";
                } else if (size=="Adult") {
                    connectionlist="An adult sapphire dragon lives adjacent to active purple worm tunnels, hoping the threat of the worm will deter treasure hunters.;An adult sapphire dragon employs a dao to help shape and defend the dragon\’s lair, and the dao maintains a portal to the Elemental Plane of Earth there.;An adult sapphire dragon regularly confers with a plane-hopping archmage regarding the dragon\’s ongoing dreams of other worlds and other lives.;A drow priestess of Lolth and several yochlol demons have been ordered by their goddess to deal with the adult sapphire dragon who has been hunting her holy spiders.;A forgetful and nearsighted adult sapphire dragon believes a blue dragon wyrmling is actually the sapphire wyrmling who left home months before.;An adult sapphire dragon and a squadron of githyanki have joined forces to locate and destroy a mind flayer colony.;A group of stone giants believes a young sapphire dragon to be an emissary of their god, Skoraeus Stonebones. The dragon considers the notion ridiculous but loves having an audience who will listen to lectures on military history without complaint;An adult sapphire dragon and an aboleth psychically face off for control of an area of the Underdark. The constant bombardment of psychic forces has begun to affect the local fauna in strange ways.";
                } else if (size=="Ancient") {
                    connectionlist="An ancient sapphire dragon has called a conclave of ancient gem dragons to discuss how they might reunite and restore Sardior, the Ruby Dragon.;A horde of revenants led by a death knight has one goal—destroying the ancient sapphire dragon who defeated their army in battle centuries ago.;An ancient sapphire dragon guards the phylactery of a lich who helped the dragon establish a lair centuries before becoming Undead.;Lolth the Spider Queen has declared war on an ancient sapphire dragon who has annexed the heart of her cult\’s Underdark territory.";
                }
                break;
            case 'Silver':
                traitlist="People are so wonderfully varied, and I do so love experiencing life with them.;I\’m an epicurean, and I live to eat all the delightful foods people concoct.;It\’s my duty as a member of an elder species to protect and guide other peoples.;I like coming up with new disguises to use among small folk. It makes me feel clever!;Violence is the provenance of uncouth beings, and I will do my best to avoid its use.;I don\’t understand why anyone would fight when they could talk instead and build on this ecosystem of wondrous cultures and fascinating traditions.;I owe the short-lived mortals I become friends with the responsibility of watching over their progeny.;People must earn my respect—and they\’re failing badly.";
                ideallist="Sensualism. I savor the world and consume its myriad delights with appropriate gratitude. (Any);Altruism. We are surrounded by a malignant and unfeeling cosmos. Ultimately, all we have is each other. (Good);Camaraderie. The true treasure is the friends we make along the way. (Good);Leadership. These younger species will do great things—but need some subtle support. (Good);Guile. All the world is a stage, and it is both my purpose and my pleasure to give an excellent performance. (Any);Ownership. This town, these families, this world—I’ve spent centuries watching over them, and they belong to me. (Evil)";
                if (size=="Wyrmling") {
                    connectionlist="A silver dragon wyrmling is raised by giant eagles who have lost their own clutch of eggs.;A silver dragon wyrmling becomes the mascot and would-be protector of a group of refugee aarakocra.;A silver dragon wyrmling practices precocious shape-shifting abilities among a colony of kobolds.;A hell hound watches over a silver dragon wyrmling in the name of its master—a lich hoping to corrupt the dragon when the dragon is older.;A silver dragon wyrmling besieges a pack of pseudodragons, intent on teaching them poetry.;Ogres keep a young silver dragon wyrmling as a pet, and the dragon has become dedicated to changing the ogres\’ nefarious ways.";
                } else if (size=="Young") {
                    connectionlist="A young silver dragon allows a stone giant to take refuge in the dragon\’s lair.;A young silver dragon in Humanoid form tries to keep an unsuspecting royal heir away from an attractive stranger the dragon knows to be a succubus or incubus in disguise.;A herd of hippogriffs has taken over a young silver dragon\’s lair, and the dragon seeks to get rid of the interlopers without violence.;Two silver dragons compete to see who is better at playing the part of a young noble.;A young silver dragon rules over a group of yuan-ti, claiming to be an ancient yuan-ti leader reborn.;A young silver dragon performs nightly to entertain a village of cloud giants, hoping to earn their help in securing a new lair.";
                } else if (size=="Adult") {
                    connectionlist="An adult silver dragon watches over a flock of rare goats, but a group of storm giants covet their wool.;An adult silver dragon and a vampire write books of philosophy arguing with each other\’s works.;An adult red dragon killed a group of adventurers that an adult silver dragon had befriended, and the silver dragon now seeks revenge.;In making a new lair, an adult silver dragon destroyed the home of some galeb duhr, and the dragon now seeks help to restore the site for them.;A number of adult silver dragons all pretend to be painters and vie for the commission to paint the ceiling of a huge cathedral.;An adult silver dragon leads a group of warriors, changing identities every generation.;Having lost their own offspring, two adult silver dragons raise a clutch of wyverns.;A solitary adult silver dragon domesticates rocs as an amusement.";
                } else if (size=="Ancient") {
                    connectionlist="An ancient silver dragon helps a group of spellcasters keep the tarrasque asleep.;An ancient silver dragon is secretly the age-old blacksmith who creates magical weapons for a kingdom\’s heroes.;Bound by an oath, an ancient silver dragon rules a dead city in place of its original monarchs.;An ancient silver dragon has become the figurehead and protector of a clan of frost giants.";
                }
                break;
            case 'Topaz':
                traitlist="I seek no company other than my own, for no one else can compete with me.;If my offspring can\’t care for themselves, I\’m not sure they\’re worthy of my attention.;The sea is beautiful and I love gazing upon it, but I abhor being wet.;Why should I risk damaging my splendid physique when I can fight with the power of my mind?;I am predictable only in my unpredictability.;It takes true artistry to maintain a warm, desert-like dwelling under the water.;I soothe myself to sleep by imagining the perfect insults for bronze dragons; while I wait to meet one, I hone them on other creatures.;I secretly enjoy conversing with lesser beings, although I usually do so only to find their weaknesses.";
                ideallist="Solitude. My own company obviates the need for others in my life, whether they are dragons or lesser creatures. (Any);Change. Consistency is stagnation. (Chaotic);Mental Superiority. I hone my mental powers so I can confuse, control, or kill any who annoy me. (Evil);Territoriality. Any creature that comes into my territory has forfeited its right to be upset by anything I do to it. (Evil);Wonder. Though I don\’t wish to spend time in it, my soul sings at the sight of the vast beauty of the ocean. (Good);Code of Combat. I despise most other dragons, but I meet them face to face without resorting to the base trickery I use on lesser creatures. (Lawful)";
                if (size=="Wyrmling") {
                    connectionlist="Moved by pity, a giant eagle continues bringing food to an abandoned topaz dragon wyrmling, despite the wyrmling\’s attempts to eat the eagle.;A pseudodragon who is fanatical about the kinship of all dragonkind is trying to win a topaz dragon wyrmling\’s friendship.;A topaz dragon wyrmling has developed a taste for crab meat and persistently hunts a giant crab that always manages to evade the wyrmling. (The crab might have been the recipient of a druid\’s awaken spell.);A mated pair of griffons found a topaz dragon egg, and they care for it as if it were their own.;A sea hag is on the hunt for a topaz dragon wyrmling, to be used as a component in a fell ritual.;A pirate crew keeps a curmudgeonly topaz dragon wyrmling as a beloved mascot.";
                } else if (size=="Young") {
                    connectionlist="A young topaz dragon engages in repeated aerial battles with a young gynosphinx to determine territory. Both of them are secretly starting to enjoy the bouts.;A young topaz dragon found and ate a dead sahuagin on the beach, unwittingly incurring the wrath of the sahuagin\’s community.;A flock of harpies enjoy taunting a young topaz dragon who has moved into their territory. The dragon adds a feather to a necklace for each harpy slain.;A curious water elemental supplies a young topaz dragon with aquatic delicacies so as to learn more about the dragon.;A young topaz dragon continually attempts to steal eggs from a roc nest, despite having nearly been killed by the roc parents multiple times.;A clan of winged kobolds consider a young topaz dragon their monarch, despite the dragon\’s complete lack of interest and growing annoyance toward them.";
                } else if (size=="Adult") {
                    connectionlist="An adult topaz dragon vies with a storm giant over territory. The giant keeps live seafood in a tide pool, and the dragon keeps drying out the pool in an effort to drive the giant away.;An adult topaz dragon and an adult bronze dragon are finding their centuries-old enmity turning into a more romantic passion.;A djinni hopes to convince a topaz dragon to tolerate the djinni\’s presence by driving off a clan of cyclopes harassing the dragon.;Reunited after years apart, an adult topaz dragon parent and young dragon child realize they enjoy hunting together.;A tempestuous marid continually floods the carefully dried-out lair of a topaz dragon.;A sahuagin baron attempts to gain the support of other sahuagin for driving away a topaz dragon attempting to claim the sea devils\’ territory.;A pirate captain tells stories of an adult topaz dragon\’s legendary hoard while attempting to gather a crew to raid the dragon\’s lair.;A ship wrecks near an adult topaz dragon’s lair. The dragon claims what\’s left of the cargo and tries to ransom the survivors (including the dragonborn ship captain) back to the city they came from.";
                } else if (size=="Ancient") {
                    connectionlist="An ancient topaz dragon has decided to set local ogre and bandit clans against one another, hoping they wipe each other out.;An adult bronze dragon has ignored the petitions of townsfolk to deal with an ancient topaz dragon killing livestock and farmers alike. But now the topaz dragon has killed the bronze dragon\’s child.;An ancient topaz dragon\’s lair contains a portal to the Elemental Chaos.;An ancient bronze dragon and an ancient topaz dragon are locked in an ongoing conflict that threatens shipping and caravans around a major city.";
                }
                break;
            case 'White':
                traitlist="Talkative people are usually the most dangerous. I like to eat them first.;I brood over past encounters with foes and sometimes mistake newcomers for my ancient enemies.;I can recall many tidbits of lore picked up over the centuries but have no sense of their import.;I don\’t like the taste of warm blood and always rinse my mouth out with snow after a fight.;Whenever I encounter a new type of creature, I try to lure it back to my lair so I can add it to my collection of frozen trophies.;I have named the wind that blows through my lair and speak to it often. It is my sole companion.;I meet any challenge to my territory with aggression, even if I can\’t win outright.;I feel protective of smaller, weaker creatures that are tormented by larger monsters.";
                ideallist="Rapacity. When a creature has the misfortune of crossing my path, I ask myself two questions: Am I hungry now? And if not, will I be hungry later? (Any);Survival. This world is harsh and unforgiving, and so am I. I do whatever it takes to survive. (Any);Dominance. I delight in making others tremble, knowing that I could kill them at any time. (Evil);Isolation. All creatures are either prey or rivals. What do you mean by “company?” (Any);Vengeance. Every scar upon my scales, every treasure beyond my reach, is a slight that must be answered. (Evil);Service. I used to live as a beast, before learning what is possible when creatures put aside their petty needs in service of a greater goal. (Lawful)";
                if (size=="Wyrmling") {
                    connectionlist="A pair of ice mephits delight in chasing townsfolk into a white dragon wyrmling\’s lair to be eaten.;A brooding griffon found a dragon egg and cared for it along with her own brood. Though the white dragon wyrmling ate the griffon\’s other hatchlings, the griffon treats the wyrmling as her offspring and protects the creature fiercely.;A clan of warriors has adopted a white dragon wyrmling as the clan\’s sacred guardian and brings the wyrmling captured foes as offerings.;Yetis keep a white dragon wyrmling chained near the entrance of their lair to discourage scavengers.;A well-meaning druid is trying to rear a white dragon wyrmling as a guardian of nature, training the dragon to hunt only Monstrosities. But the wyrmling keeps attacking other creatures.;A band of ogres keeps a white dragon wyrmling caged near their larder, as they have discovered that the dragon\’s cold breath keeps their meat fresh.";
                } else if (size=="Young") {
                    connectionlist="A young white dragon and a young remorhaz are vying for control of the same territory, and their altercations endanger the other creatures in the area.;A young white dragon has gained control of an invisible stalker and sends it out to steal treasure.;A young white dragon allows a clan of deep gnomes to mine the dragon\’s mountain home in exchange for a healthy portion of the gemstones they extract.;A frost giant hunter has raised a young white dragon since the dragon hatched, and the two are now inseparable.;A young white dragon is pestered by a flameskull bound to guard a magic item the dragon recently acquired.;A young white dragon has been stalking a herd of mammoths for days, trying to pick off the herd\’s newborn calves.";
                } else if (size=="Adult") {
                    connectionlist="A pirate captain uses the pervasive fog near an adult white dragon\’s lair to elude capture and propitiates the dragon with a share of the crew\’s booty.;A djinni has pledged to serve an adult white dragon for a year and a day in exchange for sparing the genie\’s previous master\’s life.;An arcanaloth has been trying to tease information out of an adult white dragon, hoping the dragon can lead it to a lost font of magical power.;An adult white dragon, captured by devils decades ago, now serves as a mount for an ice devil.;A beholder manipulates an adult white dragon into eliminating its enemies by inventing ways in which these foes have supposedly offended the dragon.;A storm giant and an adult white dragon are engaged in a deadly game of cat-and-mouse, leaving a trail of destruction behind them.;An adult white dragon periodically brings a mouthful of gems to the ancient crystal dragon who raised them, and who is now too old and tired to seek out new mineral veins for sustenance.;A clan of winged kobolds treat the air currents and ice slides of an adult white dragon\’s lair as an obstacle course. The dragon enjoys devising increasingly hazardous routes for the kobolds to tackle.";
                } else if (size=="Ancient") {
                    connectionlist="A death knight and an ancient white dragon swap tales of old foes and unanswered grievances, nursing the hunger for vengeance that sustains them.;An ancient white dragon makes intermittent assaults against a mated pair of adult silver dragons who lair nearby.;An ancient white dragon guards a lich\’s phylactery, keeping it sealed in a tomb of ice. The lich visits periodically, bearing fabulous treasures as payment.;A community of orcs believe an ancient white dragon to be the reincarnation of a legendary leader. They\’ve been venerating the dragon so long that the dragon now believes the story and speaks proudly in Orc about the orcs\’ triumphs.";
                }
                break;
        }
        var traits=traitlist.split(';');
        var ideals=ideallist.split(';');
        var connections=connectionlist.split(';');
        if (trait1=="Random") {
            var rand=randomInteger(traits.length);
            trait1=traits[rand-1];
        }
        if (trait2=="Random") {
            var rand=randomInteger(traits.length);
            trait2=traits[rand-1];
        }
        while (trait2==trait1) {
            var rand=randomInteger(traits.length);
            trait2=traits[rand-1];
        }
        if (ideal1=="Random") {
            var rand=randomInteger(ideals.length);
            ideal1=ideals[rand-1];
        }
        if (ideal2=="Random") {
            var rand=randomInteger(ideals.length);
            ideal2=ideals[rand-1];
        }
        while (ideal2==ideal1) {
            var rand=randomInteger(ideals.length);
            ideal2=ideals[rand-1];
        }
        if (connection1=="Random") {
            var rand=randomInteger(connections.length);
            connection1=connections[rand-1];
        }
        for (let i=0;i<4;i++) {
            trait1=trait1.replace('&#44', ',');
            trait2=trait2.replace('&#44', ',');
            ideal1=ideal1.replace('&#44', ',');
            ideal2=ideal2.replace('&#44', ',');
            connection1=connection1.replace('&#44', ',');
        }
        personality='<br>'+String(trait1)+'<br>'+String(trait2);
        ideal='<br>'+String(ideal1)+'<br>'+String(ideal2);
        connection='<br>'+String(connection1);
        state.dragon.now.personality=personality;
        state.dragon.now.ideal=ideal;
        state.dragon.now.connection=connection;
    },
    
    sethoard = function() {
        var money=getmoney();
        var gems=getgems();
        var art=getart();
        var mundane=getmundane();
        var magic=getmagic();
        state.dragon.now.hoard=money+gems+"<br>"+art+"<br>"+mundane+"<br>"+magic+"<br>";
    },
    
    getmoney = function() {
        var size=state.dragon.now.size;
        var pp=0;
        var gp=0;
        var sp=0;
        var cp=0;
        if (size=="Wyrmling") {
            for (let i=0;i<12;i++) {
                cp+=(randomInteger(6)*100);
            }
            for (let i=0;i<6;i++) {
                sp+=(randomInteger(6)*100);
            }
            for (let i=0;i<4;i++) {
                gp+=(randomInteger(6)*10);
            }
        } else if (size=="Young") {
            for (let i=0;i<12;i++) {
                cp+=(randomInteger(6)*100);
            }
            for (let i=0;i<4;i++) {
                sp+=(randomInteger(6)*1000);
            }
            for (let i=0;i<12;i++) {
                gp+=(randomInteger(6)*100);
            }
            for (let i=0;i<6;i++) {
                pp+=(randomInteger(6)*10);
            }
        } else if (size=="Adult") {
            for (let i=0;i<12;i++) {
                cp+=(randomInteger(6)*100);
            }
            for (let i=0;i<4;i++) {
                sp+=(randomInteger(6)*1000);
            }
            for (let i=0;i<8;i++) {
                gp+=(randomInteger(6)*1000);
            }
            for (let i=0;i<10;i++) {
                pp+=(randomInteger(6)*100);
            }
        } else if (size=="Ancient") {
            for (let i=0;i<12;i++) {
                cp+=(randomInteger(6)*100);
            }
            for (let i=0;i<4;i++) {
                sp+=(randomInteger(6)*1000);
            }
            for (let i=0;i<6;i++) {
                gp+=(randomInteger(6)*10000);
            }
            for (let i=0;i<12;i++) {
                pp+=(randomInteger(6)*1000);
            }
        }
        var money="<br>"+pp+" PP<br>"+gp+" GP<br>"+sp+" SP<br>"+cp+" CP<br>";
        return money;
    },
    
    getmundane = function() {
        var mundanelist="A painting by an artist long forgotten by everyone except the dragon.,4;A hogshead (large cask) containing 65 gallons of clean drinking water.,8;Several embroidered throw pillows depicting wyrmling dragons.,12;A funerary urn containing remains the dragon can\’t identify.,16;A set of seven candlesticks bearing a god\’s holy symbol.,20;A tarnished brazier with pleasant-smelling ash.,24;A drum for use in religious rites with a foreboding echo to its beat.,28;A stuffed Monstrosity appropriate to the local terrain.,32;The skull of a Fiend or Celestial.,36;A spinning wheel.,40;An hourglass filled with sparkling sand.,44;A crude flute with a pleasing sound.,48;Hundreds or thousands of fake coins interspersed with the real treasure.,52;A treatise on alchemy etched on steel cylinders.,56;The battle standard of one of the dragon\’s ancient foes.,60;A sketchbook from another world of the Material Plane depicting unfamiliar creatures and one very familiar dragon.,64;A set of irregular polyhedral dice (with 9 13 25 and 34 sides).,68;A map showing the dragon\’s lair in relation to villages and other long-gone landmarks.,72;A kneeling bench which anyone addressing the dragon is required to use.,76;A scroll containing a long epic poem in praise of the dragon.,80;A star chart showing Bahamut and a one-headed Tiamat as constellations with >>Elegy for the First World<< written between the stars.,84;A large noisy wind chime.,88;A small shrine with a statuette - a brazier - and an altar dedicated to a god worshiped by many of the dragon\’s minions.,92;A jar with a dead illithid tadpole floating in preserving chemicals.,96;An extensive historical record in the form of carefully knotted strings.,100";
        var size=state.dragon.now.size;
        var munamount=0;
        var mundaneitem="";
        if (size=="Wyrmling") {
            munamount+=randomInteger(6);
        } else if (size=="Young") {
            munamount=randomInteger(8);
        } else if (size=="Adult") {
            munamount+=randomInteger(6);
            munamount+=randomInteger(6);
        } else if (size=="Ancient") {
            munamount+=randomInteger(8);
            munamount+=randomInteger(8);
        }
        mundanelist=String(mundanelist.split(';'));
        mundanelist=mundanelist.split(',');
        sendChat("Dragon Creator","/w gm "+mundanelist.length);
        for (let i=0;i<munamount;i++) {
            var rand=randomInteger(100);
            for (let j=1;j<mundanelist.length;j+=2) {
                if (rand<=mundanelist[j]) {
                    mundaneitem+="<br>"+mundanelist[j-1];
                    break;
                }
            }
        }
        return mundaneitem;
    },
    
    getgems = function() {
        var size=state.dragon.now.size;
        var gemamount=0;
        var gemlist;
        if (size=="Wyrmling") {
            gemlist="10,43;50,99;100,100";
            gemamount+=randomInteger(8);
            gemamount+=randomInteger(8);
        } else if (size=="Young") {
            gemlist="10,51;50,75;100,99;500,100";
            for (let i=0;i<6;i++) {
                gemamount+=randomInteger(6);
            }
        } else if (size=="Adult") {
            gemlist="10,18;50,36;100,54;500,77;1000,99;5000,100";
            for (let i=0;i<6;i++) {
                gemamount+=randomInteger(6);
            }
        } else if (size=="Ancient") {
            gemlist="10,14;50,28;100,42;500,58;1000,93;5000,100";
            for (let i=0;i<6;i++) {
                gemamount+=randomInteger(6);
            }
        }
        var gem1=0;
        var gem2=0;
        var gem3=0;
        var gem4=0;
        var gem5=0;
        var gem6=0;
        gemlist=String(gemlist.split(';'));
        gemlist=gemlist.split(',');
        var rand=randomInteger(100);
        for (let i=0;i<gemamount;i++) {
            if (rand<=gemlist[1]) {
                gem1+=1;
            } else if (rand<=gemlist[3]) {
                gem2+=1;
            } else if (rand<=gemlist[5]) {
                gem3+=1;
            } else if (rand<=gemlist[7]) {
                gem4+=1;
            } else if (rand<=gemlist[9]) {
                gem5+=1;
            } else if (rand<=gemlist[11]) {
                gem6+=1;
            } else {
                rand=randomInteger(100);
            }
        }
        var gems1="";
        var gems2="";
        var gems3="";
        var gems4="";
        var gems5="";
        var gems6="";
        if (gem1>=1) {
            if (gem1==1) {
                gems1="<br>"+gem1+" Gem worth "+gemlist[0]+" GP";
            } else {
                gems1="<br>"+gem1+" Gems worth "+gemlist[0]+" GP";
            }
        }
        if (gem2>=1) {
            if (gem2==1) {
                gems2="<br>"+gem2+" Gem worth "+gemlist[2]+" GP";
            } else {
                gems3="<br>"+gem2+" Gems worth "+gemlist[2]+" GP";
            }
        }
        if (gem3>=1) {
            if (gem3==1) {
                gems3="<br>"+gem3+" Gem worth "+gemlist[4]+" GP";
            } else {
                gems3="<br>"+gem3+" Gems worth "+gemlist[4]+" GP";
            }
        }
        if (gem4>=1) {
            if (gem4==1) {
                gems4="<br>"+gem4+" Gem worth "+gemlist[6]+" GP";
            } else {
                gems4="<br>"+gem4+" Gems worth "+gemlist[6]+" GP";
            }
        }
        if (gem5>=1) {
            if (gem5==1) {
                gems5="<br>"+gem5+" Gem worth "+gemlist[8]+" GP";
            } else {
                gems5="<br>"+gem5+" Gems worth "+gemlist[8]+" GP";
            }
        }
        if (gem6>=1) {
            if (gem6==1) {
                gems6="<br>"+gem6+" Gem worth "+gemlist[10]+" GP";
            } else {
                gems6="<br>"+gem6+" Gems worth "+gemlist[10]+" GP";
            }
        }
        var gems="";
        if (!gems1=="") {
            gems+=gems1;
        }
        if (!gems2=="") {
            gems+=gems2;
        }
        if (!gems3=="") {
            gems+=gems3;
        }
        if (!gems4=="") {
            gems+=gems4;
        }
        if (!gems5=="") {
            gems+=gems5;
        }
        if (!gems6=="") {
            gems+=gems6;
        }
        return gems;
    },
    
    getart = function() {
        var size=state.dragon.now.size;
        var artlist;
        var artamount=0;
        var arts="";
        var art1=0;
        var art2=0;
        var art3=0;
        var art4=0;
        var art5=0;
        if (size=="Wyrmling") {
            artlist="25,95;250,100";
            artamount=randomInteger(4);
        } else if (size=="Young") {
            artlist="25,53;250,99;750,100";
            artamount+=randomInteger(4);
            artamount+=randomInteger(4);
        } else if (size=="Adult") {
            artlist="25,49;250,75;750,99;2500,100";
            artamount+=randomInteger(6);
            artamount+=randomInteger(6);
            artamount+=randomInteger(6);
        } else if (size=="Ancient") {
            artlist="25,22;250,42;750,58;2500,93;7500,100";
            artamount+=randomInteger(10);
            artamount+=randomInteger(10);
        }
        artlist=String(artlist.split(';'));
        artlist=artlist.split(',');
        var rand=randomInteger(100);
        for (let i=0;i<artamount;i++) {
            if (rand<=artlist[1]) {
                art1+=1;
            } else if (rand<=artlist[3]) {
                art2+=1;
            } else if (rand<=artlist[5]) {
                art3+=1;
            } else if (rand<=artlist[7]) {
                art4+=1;
            } else if (rand<=artlist[9]) {
                art5+=1;
            }
        }
        if (art1>=1) {
            if (art1==1) {
                arts+="<br>"+art1+" Art Object worth "+artlist[0]+" GP";
            } else {
                arts+="<br>"+art1+" Art Objects worth "+artlist[0]+" GP";
            }
        }
        if (art2>=1) {
            if (art2==1) {
                arts+="<br>"+art2+" Art Object worth "+artlist[2]+" GP";
            } else {
                arts+="<br>"+art2+" Art Objects worth "+artlist[2]+" GP";
            }
        }
        if (art3>=1) {
            if (art3==1) {
                arts+="<br>"+art3+" Art Object worth "+artlist[4]+" GP";
            } else {
                arts+="<br>"+art3+" Art Objects worth "+artlist[4]+" GP";
            }
        }
        if (art4>=1) {
            if (art4==1) {
                arts+="<br>"+art4+" Art Object worth "+artlist[6]+" GP";
            } else {
                arts+="<br>"+art4+" Art Objects worth "+artlist[6]+" GP";
            }
        }
        if (art5>=1) {
            if (art5==1) {
                arts+="<br>"+art5+" Art Object worth "+artlist[8]+" GP";
            } else {
                arts+="<br>"+art5+" Art Objects worth "+artlist[8]+" GP";
            }
        }
        return arts;
    },
    
    getmagic = function() {
        var size=state.dragon.now.size;
        var magicamount=0;
        var magiclist;
        var magicitem="";
        var listA="Potion of Healing,50;Spell Scroll (Cantrip),60;Potion of Climbing,70;Spell Scroll (1st level),90;Spell Scroll (2nd level),94;Potion of Healing (Greater),98;Bag of Holding,99;Driftglobe,100";
        var listB="Potion of Healing (Greater),15;Potion of Fire Breath,22;Potion of Resistance,29;+1 Ammunition,34;Potion of Animal Friendship,39;Potion of Hill Giant Strength,44;Potion of Growth,49;Potion of Water Breathing,54;Spell Scroll (2nd level),59;Spell Scroll (3rd level),64;Bag of Holding,67;Keoghtom\’s ointment,70;Oil of Slipperiness,73;Dust of Disappearance,75;Dust of Dryness,77;Dust of Sneezing and Choking,79;Elemental Gem,81;Philter of Love,83;Alchemy Jug,84;Cap of Water Breathing,85;Cloak of the Manta Ray,86;Driftglobe,87;Goggles of Night,88;Helm of Comprehending Languages,89;Immovable Rod,90;Lantern of Revealing,91;Mariner\'s Armor,92;Mithral Armor,93;Potion of Poison,94;Ring of Swimming,95;Robe of useful Items,96;Rope of Climbing,97;Saddle of the Cavalier,98;Wand of Magic Detection,99;Wand of Secrets,100";
        var listC="Potion of Healing (Superior),15;Spell Scroll (4th level),22;+2 Ammunition,27;Potion of Clairvoyance,32;Potion of Diminution,37;Potion of Gaseous Form,42;Potion of Frost Giant Strength,47;Potion of Stone Giant Strength,52;Potion of Heroism,57;Potion of Invulnerability,62;Potion of Mind reading,67;Spell Scroll (5th level),72;Elixir of health,75;Oil of Etherealness,78;Potion of Fire Giant Strength,81;Quaal\’s Feather Token,84;Scroll of Protection,87;Bag of Beans,89;Bead of Force,91;Chime of Opening,92;Decanter of Endless Water,93;Eyes of minute seeing,94;Folding Boat,95;Heward\’s Handy Haversack,96;Horseshoes of Speed,97;Necklace of Fireballs,98;Periapt of Health,99;Sending Stones,100";
        var listD="Potion of Healing (Supreme),20;Potion of Invisibility,30;Potion of Speed,40;Spell Scroll (6th level),50;Spell Scroll (7th level),57;+3 Ammunition,62;Oil of Sharpness,67;Potion of Flying,72;Potion of Cloud Giant Strength,77;Potion of Longevity,82;Potion of Vitality,87;Spell Scroll (8th level),92;Horseshoes of a Zephyr,95;Nolzur\’s Marvelous Pigments,98;Bag of Devouring,99;Portable Hole,100";
        var listE="Spell Scroll (8th level),30;Potion of Storm Giant Strength,55;Potion of Healing (Supreme),70;Spell Scroll (9th level),85;Universal Solvent,93;Arrow of Slaying,98;Soverign Glue,100";
        var listF="+1 Weapon,15;+1 Shield,18;Sentinel Shield,21;Amulet of Proof against Detection and Location,23;Boots of Elvenkind,25;Boots of Striding and Springing,27;Bracers of Archery,29;Brooch of Shielding,31;Broom of Flying,33;Cloak of Elvenkind,25;Cloak of Protection,37;Gauntlets of Ogre Power,39;Hat of Disguise,41;Javelin of Lightning,43;Pearl of Power,45;+1 Rod of the Pact Keeper,47;Slippers of Spider Climbing,49;Staff of the Adder,51;Staff of the Python,53;Sword of Vengeance,55;Trident of Fish Command,57;Wand of Magic Missiles,59;+1 Wand of the War Mage,61;Wand of Web,63;Weapon of Warning,65;Adamantine Armor (Chain Mail),66;Adamantine Armor (Chain Shirt),67;Adamantine Armor (Scale Mail),68;Bag of Tricks (grey),69;Bag of Tricks (rust),70;Bag of Tricks (tan),71;Boots of the Winterlands,72;Circlet of Blasting,73;Deck of Illusions,74;Eversmoking Bottle,75;Eyes of Charming,76;Eyes of the Eagle,77;Figurine of Wondrous Power (Silver Raven),78;Gem of Brightness,79;Gloves of Missile Snaring,80;Gloves of Swimming and Climbing,81;Gloves of Thievery,82;Headband of Intellect,83;Helm of Telepathy,84;Instrument of the Bards (Doss lute),85;Instrument of the Bards (Fochlucan bandore),86;Instrument of the Bards (Mac-Fuirmidh cittern),87;Medallion of Thoughts,88;Necklace of Adaptation,89;Periapt of Wound Closure,90;Pipes of Haunting,91;Pipes of the Sewers,92;Ring of Jumping,93;Ring of Mind Shielding,94;Ring of Warmth,95;Ring of Water Walking,96;Quiver of Ehlonna,97;Stone of Good Luck (Luckstone),98;Wind Fan,99;Winged Boots,100";
        var listG="+2 Weapon,11;Figurine of Wondrous Power (roll 1d8),14;Adamantine Armor (Breastplate),15;Adamantine Armor (Splint),16;Amulet of Health,17;Armor of Vulnerability,18;Arrow-Catching Shield,19;Belt of Dwarvenkind,20;Belt of Hill Giant Strength,21;Berserker Axe,22;Boots of Levitation,23;Boots of Speed,24;Bowl of Commanding Water Elementals,25;Bracers of Defense,26;Brazier of Commanding Fire Elementals,27;Cape of the Mountebank,28;Censer of Controlling Air Elementals,29;+1 Chain Mail,30;Armor of Resistance (Chain Mail),31;+1 Chain Shirt,32;Armor of Resistance (Chain Shirt),33;Cloak of Displacement,34;Cloak of the Bat,35;Cube of Force,36;Daern\’s Instant Fortress,37;Dagger of Venom,38;Dimensional Shackles,39;Dragon Slayer,40;Elven Chain,41;Flame Tongue,42;Gem of Seeing,43;Giant Slayer,44;Glamoured Studded Leather,45;Helm of Teleportation,46;Horn of Blasting,47;Horn of Valhalla (Silver or Brass),48;Instrument of the Bards (Canaith Mandolin),49;Instrument of the Bards (Cli lyre),50;Ioun Stone (Awareness),51;Ioun Stone (Protection),52;Ioun Stone (Reserve),53;Ioun Stone (Sustenance),54;Iron Bands of Bilarro,55;+1 Leather Armor,56;Armor of Resistance (Leather),57;Mace of Disruption,58;Mace of Smiting,59;Mace of Terror,60;Mantle of Spell Resistance,61;Necklace of Prayer Beads,62;Periapt of Proof against Poison,63;Ring of Animal Influence,64;Ring of Evasion,65;Ring of Feather Falling,66;Ring of Free Action,67;Ring of Protection,68;Ring of Resistance,69;Ring of Spell Storing,70;Ring of the Ram,71;Ring of X-Ray Vision,72;Robe of Eyes,73;Rod of Rulership,74;+2 Rod of the Pact Keeper,75;Rope of Entanglement,76;+1 Scale Mail,77;Armor of Resistance (Scale Mail),78;+2 Shield,79;Shield of Missile Attraction,80;Staff of Charming,81;Staff of Healing,82;Staff of Swarming Insects,83;Staff of the Woodlands,84;Staff of Withering,85;Stone of Controlling Earth Elementals,86;Sun Blade,87;Sword of Life Stealing,88;Sword of Wounding,89;Tentacle Rod,90;Vicious Weapon,91;Wand of Binding,92;Wand of Enemy Detection,93;Wand of Fear,94;Wand of Fireballs,95;Wand of Lightning Bolts,96;Wand of Paralysis,97;+2 Wand of the War Mage,98;Wand of Wonder,99;Wings of Flying,100";
        var listH="+3 Weapon,10;Amulet of the Planes,12;Carpet of Flying,14;Crystal Ball (very rare version),16;Ring of Regeneration,18;Ring of Shooting Stars,20;Ring of Telekinesis,22;Robe of Scintillating Colors,24;Robe of Stars,26;Rod of Absorption,28;Rod of Alertness,30;Rod of Security,32;+3 Rod of the Pact Keeper,34;Scimitar of Speed,36;+3 Shield,38;Staff of Fire,40;Staff of Frost,42;Staff of Power,44;Staff of Striking,46;Staff of Thunder and Lightning,48;Sword of Sharpness,50;Wand of Polymorph,52;+3 Wand of the War Mage,54;Adamantine Armor (Half Plate),55;Adamantine Armor (Plate),56;Animated Shield,57;Belt of Fire Giant Strength,58;Belt of Frost Giant Strength (or stone),59;+1 Breastplate,60;Armor of Resistance (Breastplate),61;Candle of Invocation,62;+2 chain mail,63;+2 Chain Shirt,64;Cloak of Arachnida,65;Dancing Sword,66;Demon Armor,67;Dragon Scale Mail,68;Dwarven Plate,69;Dwarven Thrower,70;Efreeti Bottle,71;Figurine of Wondrous Power (obsidian steed),72;Frost Brand,73;Helm of Brilliance,74;Horn of Valhalla (bronze),75;Instrument of the Bards (Anstruth harp),76;Ioun Stone (Absorption),77;Ioun Stone (Agility),78;Ioun Stone (Fortitude),79;Ioun Stone (Insight),80;Ioun Stone (Intellect),81;Ioun Stone (Leadership),82;Ioun Stone (Strength),83;+2 Leather Armor,84;Manual of Bodily Health,85;Manual of Gainful Exercise,86;Manual of Golems,87;Manual of Quickness of Action,88;Mirror of Life Trapping,89;Nine Lives Stealer,90;Oathbow,91;+2 Scale Mail,92;Spellguard Shield,93;+1 Splint Armor,94;Armor of Resistance (Splint),95;+1 Studded Leather,96;Armor of Resistance (Studded Leather),97;Tome of Clear Thought,98;Tome of Leadership and Influence,99;Tome of Understanding,100";
        var listI="Defender,5;Hammer of Thunderbolts,10;Luck Blade,15;Sword of Answering,20;Holy Avenger,23;Ring of Djinni Summoning,26;Ring of Invisibility,29;Ring of Spell Turning,32;Rod of Lordly Might,35;Staff of the Magi,38;Vorpal Sword,41;Belt of Cloud Giant Strength,43;+2 Breastplate,45;+3 Chain Mail,47;+3 Chain Shirt,49;Cloak of Invisibility,51;Crystal Ball (legendary version),53;+1 Half Plate,55;Iron Flask,57;+3 Leather Armor,59;+1 Plate Armor,61;Robe of the Archmagi,63;Rod of Resurrection,65;+1 Scale Mail,67;Scarab of Protection,69;+2 Splint Armor,71;+2 Studded Leather,73;Well of Many Worlds,75;Magic Armor (roll d12),76;Apparatus of Kwalish,77;Armor of Invulnerability,78;Belt of Storm Giant Strength,79;Cubic Gate,80;Deck of Many Things,81;Efreeti Chain,82;Armor of Resistance (Half Plate),83;Horn of Valhalla (Iron),84;Instrument of the Bards (Ollamh harp),85;Ioun Stone (Greater Absorption),86;Ioun Stone (Mastery),87;Ioun Stone (Regeneration),88;Plate Armor of Etherealness,89;Armor of Resistance (Plate),90;Ring of Air Elemental Command,91;Ring of Earth Elemental Command,92;Ring of Fire Elemental Command,93;Ring of Three Wishes,94;Ring of Water Elemental Command,95;Sphere of Annihilation,96;Talisman of Pure Good,97;Talisman of the Sphere,98;Talisman of Ultimate Evil,99;Tome of the Stilled Tongue,100";
        listA=String(listA.split(';'));
        listA=listA.split(',');
        listB=String(listB.split(';'));
        listB=listB.split(',');
        listC=String(listC.split(';'));
        listC=listC.split(',');
        listD=String(listD.split(';'));
        listD=listD.split(',');
        listE=String(listE.split(';'));
        listE=listE.split(',');
        listF=String(listF.split(';'));
        listF=listF.split(',');
        listG=String(listG.split(';'));
        listG=listG.split(',');
        listH=String(listH.split(';'));
        listH=listH.split(',');
        listI=String(listI.split(';'));
        listI=listI.split(',');
        if (size=="Wyrmling") {
            magicamount=randomInteger(8);
        } else if (size=="Young") {
            magicamount=randomInteger(8);
        } else if (size=="Adult") {
            magicamount=randomInteger(8);
        } else if (size=="Ancient") {
            magicamount=randomInteger(6);
            magicamount=randomInteger(6);
        }
        for (let i=0;i<magicamount;i++) {
            var magicrand=randomInteger(100);
            if (size=="Wyrmling") {
                if (magicrand<=34) {
                    magiclist=listA;
                } else if (magicrand<=61) {
                    magiclist=listB;
                } else if (magicrand<=77) {
                    magiclist=listC;
                } else if (magicrand<=96) {
                    magiclist=listF;
                } else if (magicrand<=100) {
                    magiclist=listG;
                }
                var rand=randomInteger(100);
                for (let j=1;j<magiclist.length;j+=2) {
                    if (rand<=magiclist[j]) {
                        magicitem+="<br>"+magiclist[j-1];
                        break;
                    }
                }
            } else if (size=="Young") {
                if (magicrand<=21) {
                    magiclist=listA;
                } else if (magicrand<=49) {
                    magiclist=listB;
                } else if (magicrand<=64) {
                    magiclist=listC;
                } else if (magicrand<=72) {
                    magiclist=listD;
                } else if (magicrand<=91) {
                    magiclist=listF;
                } else if (magicrand<=97) {
                    magiclist=listG;
                } else if (magicrand<=100) {
                    magiclist=listH;
                }
                var rand=randomInteger(100);
                for (let j=1;j<magiclist.length;j+=2) {
                    if (rand<=magiclist[j]) {
                        magicitem+="<br>"+magiclist[j-1];
                        break;
                    }
                }
            } else if (size=="Adult") {
                if (magicrand<=6) {
                    magiclist=listA;
                } else if (magicrand<=18) {
                    magiclist=listB;
                } else if (magicrand<=41) {
                    magiclist=listC;
                } else if (magicrand<=64) {
                    magiclist=listD;
                } else if (magicrand<=69) {
                    magiclist=listE;
                } else if (magicrand<=72) {
                    magiclist=listF;
                } else if (magicrand<=80) {
                    magiclist=listG;
                } else if (magicrand<=91) {
                    magiclist=listH;
                } else if (magicrand<=100) {
                    magiclist=listI;
                }
                var rand=randomInteger(100);
                for (let j=1;j<magiclist.length;j+=2) {
                    if (rand<=magiclist[j]) {
                        magicitem+="<br>"+magiclist[j-1];
                        break;
                    }
                }
            } else if (size=="Ancient") {
                if (magicrand<=12) {
                    magiclist=listC;
                } else if (magicrand<=56) {
                    magiclist=listD;
                } else if (magicrand<=67) {
                    magiclist=listE;
                } else if (magicrand<=73) {
                    magiclist=listG;
                } else if (magicrand<=82) {
                    magiclist=listH;
                } else if (magicrand<=100) {
                    magiclist=listI;
                }
                var rand=randomInteger(100);
                for (let j=1;j<magiclist.length;j+=2) {
                    if (rand<=magiclist[j]) {
                        magicitem+="<br>"+magiclist[j-1];
                        break;
                    }
                }
            }
        }
        return magicitem;
    },
    
    checkInstall = function() {
        if (!state.dragon) {
            setDefaults();
        }
    },
    
    registerEventHandlers = function() {
        on('chat:message', handleInput);
	};

	return {
	    CheckInstall: checkInstall,
		RegisterEventHandlers: registerEventHandlers
	};
}());

on("ready",function(){
	'use strict';
	Dragoncreator.CheckInstall();
	Dragoncreator.RegisterEventHandlers();
});

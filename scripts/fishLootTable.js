// fishLootTable.js
// noinspection JSNonASCIINames

export const fishLootTable = {
    easy: {
        "Vancouver Island": [
            { grade: "C",  name: "Yellow Perch", fishSize: 4, fishImage: "../images/fish/vancouver/perch.png" },
            { grade: "B",  name: "Pink Salmon", fishSize: 6, fishImage: "../images/fish/vancouver/pink_salmon.png" },
            { grade: "A",  name: "Chum Salmon", fishSize: 12, fishImage: "../images/fish/vancouver/chum_salmon.png" },
            { grade: "S",  name: "Halibut", fishSize: 12, fishImage: "../images/fish/vancouver/halibut.png" },
            { grade: "S+",  name: "Chinook Salmon", fishSize: 12, fishImage: "../images/fish/vancouver/chinook_salmon.png" },
            {
                name: "River Monster",
                minScore: 700,
                fishSize: 150,
                fishImage: "../images/fish/vancouver/monster.png",
                isRare: true
            }
        ],

        "Kenai River, Alaska": [
            { grade: "C",  name: "Perch", fishSize: 1, fishImage: "../images/fish/kenai/perch.png" },
            { grade: "B",  name: "Rainbow Trout", fishSize: 2, fishImage: "../images/fish/kenai/rainbowtrout.png" },
            { grade: "A",  name: "Grayling", fishSize: 1, fishImage: "../images/fish/kenai/grayling.png" },
            { grade: "S",  name: "Pike", fishSize: 7, fishImage: "../images/fish/kenai/pike.png" },
            { grade: "S+",  name: "King Salmon", fishSize: 15, fishImage: "../images/fish/kenai/kingsalmon.png" },
            {
                name: "Pixel Pike",
                minScore: 700,
                fishSize: 5,
                fishImage: "images/fish/kenai/pixel_pike.png",
                isRare: true
            }
        ],

        "Lake Michigan": [
            { grade: "C",  name: "Bluegill", fishSize: 1.5, fishImage: "../images/fish/lakemichigan/bluegill.png" },
            { grade: "B",  name: "Crappie", fishSize: 2, fishImage: "../images/fish/lakemichigan/crappie.png" },
            { grade: "A",  name: "Smallmouth Bass", fishSize: 4, fishImage: "../images/fish/lakemichigan/smallmouth_bass.png" },
            { grade: "S",  name: "Largemouth Bass", fishSize: 7, fishImage: "../images/fish/lakemichigan/largemouth_bass.png" },
            { grade: "S+",  name: "Sturgeon", fishSize: 40, fishImage: "../images/fish/lakemichigan/sturgeon.png" },
            {
                name: "Pixel Bluegill",
                minScore: 700,
                fishSize: 2,
                fishImage: "../images/fish/lakemichigan/pixel_bluegill.png",
                isRare: true
            }
        ],

        "Key West, Florida": [
            { grade: "C",  name: "Bonefish", fishSize: 7, fishImage: "../images/fish/keywest/bonefish.png" },
            { grade: "S",  name: "Grouper", fishSize: 30, fishImage: "../images/fish/keywest/grouper.png" },
            { grade: "S+",  name: "Cobbler", fishSize: 18, fishImage: "../images/fish/keywest/cobbler.png" },
            { grade: "S+",  name: "Kingfish", fishSize: 40, fishImage: "../images/fish/keywest/kingfish.png" },
            { grade: "S+",  name: "Tarpon", fishSize: 55, fishImage: "../images/fish/keywest/tarpon.png" },
            {
                name: "Pixel Clownfish",
                minScore: 700,
                fishSize: 0.5,
                fishImage: "../images/fish/keywest/pixel_clownfish.png",
                isRare: true
            }
        ],
    },

    medium: {
        "Jeju Island (제주도)": [
            { grade: "C",  name: "Catfish", fishSize: 4, fishImage: "../images/fish/jejuisland/catfish.png" },
            { grade: "A",  name: "Freshwater Eel", maxScore: 700 , fishSize: 6, fishImage: "../images/fish/jejuisland/freshwater_eel.png" },
            { grade: "S+",  name: "Softshell Turtle", fishSize: 12, fishImage: "../images/fish/jejuisland/softshell.png" },
            { grade: "S+",  name: "Sea Eel", fishSize: 12, fishImage: "../images/fish/jejuisland/sea_eel.png" },
            { grade: "S+",  name: "Yellowtail", fishSize: 12, fishImage: "../images/fish/jejuisland/yellowtail.png" },
            {
                name: "Boss Myeolchi",
                minScore: 2000,
                fishSize: 10000,
                fishImage: "../images/fish/jejuisland/myeolchi.png",
                isRare: true
            }
        ],

        "Yangtze River (长江)": [
            { grade: "C",  name: "Minnow", fishSize: 0.5, fishImage: "../images/fish/yangtze/minnow.png" },
            { grade: "S",  name: "Loach", fishSize: 0.5, fishImage: "../images/fish/yangtze/loach.png" },
            { grade: "S",  name: "Grass Carp", fishSize: 10, fishImage: "../images/fish/yangtze/grass_carp.png" },
            { grade: "S+",  name: "Black Carp", fishSize: 25, fishImage: "../images/fish/yangtze/black_carp.png" },
            { grade: "S+",  name: "Silver Carp", fishSize: 25, fishImage: "../images/fish/yangtze/silver_carp.png" },
            {
                name: "Giant Salamander",
                minScore: 1000,
                fishSize: 45,
                fishImage: "../images/fish/yangtze/salamander.png",
                isRare: true
            }
        ],

        "Okinawa Islands (沖縄)": [
            { grade: "C",  name: "Sea Bream", fishSize: 5, fishImage: "../images/fish/okinawa/sea_bream.png" },
            { grade: "B",  name: "Rockfish", fishSize: 2, fishImage: "../images/fish/okinawa/rockfish.png" },
            { grade: "S+",  name: "Amberjack", fishSize: 10, fishImage: "../images/fish/okinawa/amberjack.png" },
            { grade: "S+",  name: "Japanese Sea Bass", fishSize: 15, fishImage: "../images/fish/okinawa/sea_bass.png" },
            { grade: "S+",  name: "Mola Mola", fishSize: 1000, fishImage: "../images/fish/okinawa/molamola.png" },
            {
                name: "Ningen",
                minScore: 2000,
                fishSize:200,
                fishImage: "../images/fish/okinawa/ningen.png",
                isRare: true
            }
        ],

        "Taal Lake": [
            { grade: "C",  name: "Sinarapan", fishSize: 0.5, fishImage: "../images/fish/taal/sinarapan.png" },
            { grade: "S",  name: "lobed Silver Mullet", fishSize: 2, fishImage: "../images/fish/taal/lobed_mullet.png" },
            { grade: "S+",  name: "Milkfish", fishSize: 5, fishImage: "../images/fish/taal/milkfish.png" },
            { grade: "S+",  name: "Trevally", fishSize: 5, fishImage: "../images/fish/taal/trevally.png" },
            { grade: "S+",  name: "Whale Shark", fishSize: 22000, fishImage: "../images/fish/taal/whale_shark.png" },
            {
                name: "Oarfish",
                minScore: 700,
                fishSize: 0.5,
                fishImage: "../images/fish/taal/oarfish.png",
                isRare: true
            }
        ],
    },

    hard: {
        "Amazon River Basin": [
            { grade: "C",  name: "Catfish", fishSize: 4, fishImage: "../images/fish/jejuisland/catfish.png" },
            { grade: "A",  name: "Freshwater Eel", maxScore: 700 , fishSize: 6, fishImage: "../images/fish/jejuisland/freshwater_eel.png" },
            { grade: "S+",  name: "Softshell Turtle", fishSize: 12, fishImage: "../images/fish/jejuisland/softshell.png" },
            { grade: "S+",  name: "Sea Eel", fishSize: 12, fishImage: "../images/fish/jejuisland/sea_eel.png" },
            { grade: "S+",  name: "Yellowtail", fishSize: 12, fishImage: "../images/fish/jejuisland/yellowtail.png" },
            {
                name: "Boss Myeolchi",
                minScore: 2000,
                fishSize: 10000,
                fishImage: "../images/fish/jejuisland/myeolchi.png",
                isRare: true
            }
        ],

        "Rio Paraná": [
            { grade: "C",  name: "Minnow", fishSize: 0.5, fishImage: "../images/fish/yangtze/minnow.png" },
            { grade: "S",  name: "Loach", fishSize: 0.5, fishImage: "../images/fish/yangtze/loach.png" },
            { grade: "S",  name: "Grass Carp", fishSize: 10, fishImage: "../images/fish/yangtze/grass_carp.png" },
            { grade: "S+",  name: "Black Carp", fishSize: 25, fishImage: "../images/fish/yangtze/black_carp.png" },
            { grade: "S+",  name: "Silver Carp", fishSize: 25, fishImage: "../images/fish/yangtze/silver_carp.png" },
            {
                name: "Giant Salamander",
                minScore: 1000,
                fishSize: 45,
                fishImage: "../images/fish/yangtze/salamander.png",
                isRare: true
            }
        ],

        "Zambezi River": [
            { grade: "C",  name: "Sea Bream", fishSize: 5, fishImage: "../images/fish/okinawa/sea_bream.png" },
            { grade: "B",  name: "Rockfish", fishSize: 2, fishImage: "../images/fish/okinawa/rockfish.png" },
            { grade: "S+",  name: "Amberjack", fishSize: 10, fishImage: "../images/fish/okinawa/amberjack.png" },
            { grade: "S+",  name: "Japanese Sea Bass", fishSize: 15, fishImage: "../images/fish/okinawa/sea_bass.png" },
            { grade: "S+",  name: "Mola Mola", fishSize: 1000, fishImage: "../images/fish/okinawa/molamola.png" },
            {
                name: "Ningen",
                minScore: 2000,
                fishSize:200,
                fishImage: "../images/fish/okinawa/ningen.png",
                isRare: true
            }
        ],

        "Lake Victoria": [
            { grade: "C",  name: "Sinarapan", fishSize: 0.5, fishImage: "../images/fish/taal/sinarapan.png" },
            { grade: "S",  name: "lobed Silver Mullet", fishSize: 2, fishImage: "../images/fish/taal/lobed_mullet.png" },
            { grade: "S+",  name: "Milkfish", fishSize: 5, fishImage: "../images/fish/taal/milkfish.png" },
            { grade: "S+",  name: "Trevally", fishSize: 5, fishImage: "../images/fish/taal/trevally.png" },
            { grade: "S+",  name: "Whale Shark", fishSize: 22000, fishImage: "../images/fish/taal/whale_shark.png" },
            {
                name: "Oarfish",
                minScore: 700,
                fishSize: 0.5,
                fishImage: "../images/fish/taal/oarfish.png",
                isRare: true
            }
        ],
    }

};


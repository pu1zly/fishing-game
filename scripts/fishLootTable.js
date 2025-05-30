// fishLootTable.js
// noinspection JSNonASCIINames
export const fishLootTable = {
    easy: {
        "Vancouver Island": [
            { grade: "C",  name: "Yellow Perch", fishSize: 4, fishImage: "/fishing-game/images/fish/vancouver/perch.png" },
            { grade: "B",  name: "Pink Salmon", fishSize: 6, fishImage: "/fishing-game/images/fish/vancouver/pink_salmon.png" },
            { grade: "A",  name: "Chum Salmon", fishSize: 12, fishImage: "/fishing-game/images/fish/vancouver/chum_salmon.png" },
            { grade: "S",  name: "Halibut", fishSize: 12, fishImage: "/fishing-game/images/fish/vancouver/halibut.png" },
            { grade: "S+",  name: "Chinook Salmon", fishSize: 12, fishImage: "/fishing-game/images/fish/vancouver/chinook_salmon.png" },
            {
                name: "River Monster",
                fishSize: 150,
                fishImage: "/fishing-game/images/fish/vancouver/monster.png",
                isRare: true
            }
        ],

        "Kenai River, Alaska": [
            { grade: "C",  name: "Perch", fishSize: 1, fishImage: "/fishing-game/images/fish/kenai/perch.png" },
            { grade: "B",  name: "Rainbow Trout", fishSize: 2, fishImage: "/fishing-game/images/fish/kenai/rainbowtrout.png" },
            { grade: "A",  name: "Grayling", fishSize: 1, fishImage: "/fishing-game/images/fish/kenai/grayling.png" },
            { grade: "S",  name: "Pike", fishSize: 7, fishImage: "/fishing-game/images/fish/kenai/pike.png" },
            { grade: "S+",  name: "King Salmon", fishSize: 15, fishImage: "/fishing-game/images/fish/kenai/kingsalmon.png" },
            {
                name: "Pixel Pike",
                fishSize: 5,
                fishImage: "/fishing-game/images/fish/kenai/pixel_pike.png",
                isRare: true
            }
        ],

        "Lake Michigan": [
            { grade: "C",  name: "Bluegill", fishSize: 1.5, fishImage: "/fishing-game/images/fish/lakemichigan/bluegill.png" },
            { grade: "B",  name: "Crappie", fishSize: 2, fishImage: "/fishing-game/images/fish/lakemichigan/crappie.png" },
            { grade: "A",  name: "Smallmouth Bass", fishSize: 4, fishImage: "/fishing-game/images/fish/lakemichigan/smallmouth_bass.png" },
            { grade: "S",  name: "Largemouth Bass", fishSize: 7, fishImage: "/fishing-game/images/fish/lakemichigan/largemouth_bass.png" },
            { grade: "S+",  name: "Sturgeon", fishSize: 40, fishImage: "/fishing-game/images/fish/lakemichigan/sturgeon.png" },
            {
                name: "Pixel Bluegill",
                fishSize: 2,
                fishImage: "/fishing-game/images/fish/lakemichigan/pixel_bluegill.png",
                isRare: true
            }
        ],

        "Key West, Florida": [
            { grade: "C",  name: "Bonefish", fishSize: 7, fishImage: "/fishing-game/images/fish/keywest/bonefish.png" },
            { grade: "B",  name: "Grouper", fishSize: 30, fishImage: "/fishing-game/images/fish/keywest/grouper.png" },
            { grade: "A",  name: "Cobbler", fishSize: 18, fishImage: "/fishing-game/images/fish/keywest/cobbler.png" },
            { grade: "S",  name: "Kingfish", fishSize: 40, fishImage: "/fishing-game/images/fish/keywest/kingfish.png" },
            { grade: "S+",  name: "Tarpon", fishSize: 55, fishImage: "/fishing-game/images/fish/keywest/tarpon.png" },
            {
                name: "Pixel Clownfish",
                fishSize: 0.5,
                fishImage: "/fishing-game/images/fish/keywest/pixel_clownfish.png",
                isRare: true
            }
        ],
    },

    medium: {
        "Jeju Island (제주도)": [
            { grade: "C",  name: "Catfish", fishSize: 4, fishImage: "/fishing-game/images/fish/jejuisland/catfish.png" },
            { grade: "B",  name: "Freshwater Eel", maxScore: 700 , fishSize: 6, fishImage: "/fishing-game/images/fish/jejuisland/freshwater_eel.png" },
            { grade: "A",  name: "Softshell Turtle", fishSize: 12, fishImage: "/fishing-game/images/fish/jejuisland/softshell.png" },
            { grade: "S",  name: "Sea Eel", fishSize: 12, fishImage: "/fishing-game/images/fish/jejuisland/sea_eel.png" },
            { grade: "S+",  name: "Yellowtail", fishSize: 12, fishImage: "/fishing-game/images/fish/jejuisland/yellowtail.png" },
            {
                name: "Boss Myeolchi",
                fishSize: 10000,
                fishImage: "/fishing-game/images/fish/jejuisland/myeolchi.png",
                isRare: true
            }
        ],

        "Yangtze River (长江)": [
            { grade: "C",  name: "Minnow", fishSize: 0.5, fishImage: "/fishing-game/images/fish/yangtze/minnow.png" },
            { grade: "B",  name: "Loach", fishSize: 0.5, fishImage: "/fishing-game/images/fish/yangtze/loach.png" },
            { grade: "A",  name: "Grass Carp", fishSize: 10, fishImage: "/fishing-game/images/fish/yangtze/grass_carp.png" },
            { grade: "S",  name: "Black Carp", fishSize: 25, fishImage: "/fishing-game/images/fish/yangtze/black_carp.png" },
            { grade: "S+",  name: "Silver Carp", fishSize: 25, fishImage: "/fishing-game/images/fish/yangtze/silver_carp.png" },
            {
                name: "Giant Salamander",
                fishSize: 45,
                fishImage: "/fishing-game/images/fish/yangtze/salamander.png",
                isRare: true
            }
        ],

        "Okinawa Islands (沖縄)": [
            { grade: "C",  name: "Sea Bream", fishSize: 5, fishImage: "/fishing-game/images/fish/okinawa/sea_bream.png" },
            { grade: "B",  name: "Rockfish", fishSize: 2, fishImage: "/fishing-game/images/fish/okinawa/rockfish.png" },
            { grade: "A",  name: "Amberjack", fishSize: 10, fishImage: "/fishing-game/images/fish/okinawa/amberjack.png" },
            { grade: "S",  name: "Japanese Sea Bass", fishSize: 15, fishImage: "/fishing-game/images/fish/okinawa/sea_bass.png" },
            { grade: "S+", name: "Mola Mola", fishSize: 1000, fishImage: "/fishing-game/images/fish/okinawa/molamola.png" },
            {
                name: "Ningen",
                fishSize: 200,
                fishImage: "/fishing-game/images/fish/okinawa/ningen.png",
                isRare: true
            }
        ],


        "Taal Lake": [
            { grade: "C",  name: "Sinarapan", fishSize: 0.5, fishImage: "/fishing-game/images/fish/taal/sinarapan.png" },
            { grade: "B",  name: "lobed Silver Mullet", fishSize: 2, fishImage: "/fishing-game/images/fish/taal/lobed_mullet.png" },
            { grade: "A",  name: "Milkfish", fishSize: 5, fishImage: "/fishing-game/images/fish/taal/milkfish.png" },
            { grade: "S",  name: "Trevally", fishSize: 5, fishImage: "/fishing-game/images/fish/taal/trevally.png" },
            { grade: "S+",  name: "Whale Shark", fishSize: 22000, fishImage: "/fishing-game/images/fish/taal/whale_shark.png" },
            {
                name: "Oarfish",
                fishSize: 0.5,
                fishImage: "/fishing-game/images/fish/taal/oarfish.png",
                isRare: true
            }
        ],
    },

    hard: {
        "Amazon River Basin": [
            { grade: "C",  name: "Neon Tetra", fishSize: 0.5, fishImage: "/fishing-game/images/fish/amazon/tetra.png" },
            { grade: "B",  name: "Piranha", maxScore: 700 , fishSize: 1, fishImage: "/fishing-game/images/fish/amazon/piranha.png" },
            { grade: "A",  name: "Electric Eel", fishSize: 15, fishImage: "/fishing-game/images/fish/amazon/electric_eel.png" },
            { grade: "S",  name: "Piraíba Catfish", fishSize: 90, fishImage: "/fishing-game/images/fish/amazon/piraiba_catfish.png" },
            { grade: "S+",  name: "Arapaima", fishSize: 150, fishImage: "/fishing-game/images/fish/amazon/arapaima.png" },
            {
                name: "Yacumama",
                fishSize: 5000,
                fishImage: "/fishing-game/images/fish/amazon/yacumama.png",
                isRare: true
            }
        ],

        "Rio Paraná": [
            { grade: "C",  name: "Cascudo Catfish", fishSize: 0.3, fishImage: "/fishing-game/images/fish/rio/cascudo.png" },
            { grade: "B",  name: "Dorado", fishSize: 25, fishImage: "/fishing-game/images/fish/rio/dorado.png" },
            { grade: "A",  name: "Pintado", fishSize: 80, fishImage: "/fishing-game/images/fish/rio/pintado.png" },
            { grade: "S",  name: "Surubí Catfish", fishSize: 100, fishImage: "/fishing-game/images/fish/rio/surubi.png" },
            { grade: "S+",  name: "Manguruyú", fishSize: 120, fishImage: "/fishing-game/images/fish/rio/manguruyu.png" },
            {
                name: "Plesiosaurus",
                fishSize: 10000,
                fishImage: "/fishing-game/images/fish/rio/plesiosaur.png",
                isRare: true
            }
        ],

        "Zambezi River": [
            { grade: "C",  name: "Banded Tilapia", fishSize: 0.3, fishImage: "/fishing-game/images/fish/zambezi/banded_tilapia.png" },
            { grade: "B",  name: "Bream", fishSize: 5, fishImage: "/fishing-game/images/fish/zambezi/bream.png" },
            { grade: "A",  name: "Tigerfish", fishSize: 10, fishImage: "/fishing-game/images/fish/zambezi/tigerfish.png" },
            { grade: "S",  name: "African Sharptooth Catfish", fishSize: 15, fishImage: "/fishing-game/images/fish/zambezi/sharptooth_catfish.png" },
            { grade: "S+",  name: "Nile Perch", fishSize: 1000, fishImage: "/fishing-game/images/fish/zambezi/nile_perch.png" },
            {
                name: "Nyami-Nyami",
                fishSize:200,
                fishImage: "/fishing-game/images/fish/zambezi/nyami.png",
                isRare: true
            }
        ],

        "Lake Victoria": [
            { grade: "C",  name: "African Bullfrog", fishSize: 1.5, fishImage: "/fishing-game/images/fish/victoria/bullfrog.png" },
            { grade: "B",  name: "Helmeted Turtle", fishSize: 2, fishImage: "/fishing-game/images/fish/victoria/helmet_turtle.png" },
            { grade: "A",  name: "Serrated Hinged Terrapin", fishSize: 5, fishImage: "/fishing-game/images/fish/victoria/terrapin.png" },
            { grade: "S",  name: "Softshell Turtle", fishSize: 40, fishImage: "/fishing-game/images/fish/victoria/softshell.png" },
            { grade: "S+",  name: "Nile Crocodile", fishSize: 250, fishImage: "/fishing-game/images/fish/victoria/croc.png" },
            {
                name: "Pixel Perch",
                fishSize: 30,
                fishImage: "/fishing-game/images/fish/victoria/pixel_perch.png",
                isRare: true
            }
        ],
    }

};


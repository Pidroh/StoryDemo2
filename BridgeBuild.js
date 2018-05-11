/**
 * @version 1.0.0.0
 * @author UNITCOM PC
 * @copyright Copyright © UNITCOM PC 2018
 * @compiler Bridge.NET 17.0.0
 */
Bridge.assembly("BridgeBuild", function ($asm, globals) {
    "use strict";

    Bridge.define("BridgeBuild.App", {
        main: function Main () {
            var W = 45;
            var H = 14;

            //new AppTextGame(new DialogNarratoinScreenTestGame()).Start(40, 14);
            //new AppTextGame(new DialogNarratoinControlTestGame()).Start(40, 14);
            new BridgeBuild.AppTextGame(new NovelApp.TextRenderTests()).Start(40, 14);
            return;

            //novelMain = new NovelMain().Init(50, 20);

            //Console.WriteLine("Game Start");
            //colors = new string[20];

            //for (int i = 0; i < colors.Length; i++)
            //{
            //    //colors[i] = "#1f2026";

            //}
            //colors[1] = "#ffffff";




            // After building (Ctrl + Shift + B) this project, 
            // browse to the /bin/Debug or /bin/Release folder.

            // A new bridge/ folder has been created and
            // contains your projects JavaScript files. 

            // Open the bridge/index.html file in a browser by
            // Right-Click > Open With..., then choose a
            // web browser from the list

            // This application will then run in a browser.
        },
        statics: {
            fields: {
                buffer: 0,
                bufferOn: false,
                novelMain: null,
                TextBoard: null,
                colors: null
            },
            methods: {
                UpdateGame: function () {
                    var screen = BridgeBuild.App.novelMain.ScreenHolder.Screen;

                    var delta = 0.033;
                    BridgeBuild.App.novelMain.Update(delta);
                    BridgeBuild.App.TextBoard = screen.NovelApp$ITextScreen$GetBoard();
                    screen.NovelApp$ITextScreen$Update(delta);
                    //gr.Draw(0.033f);

                    //screen.Update(delta);
                    if (BridgeBuild.App.bufferOn) {
                        screen.NovelApp$ITextScreen$InputUnicode = BridgeBuild.App.buffer;

                        BridgeBuild.App.bufferOn = false;
                    } else {
                        screen.NovelApp$ITextScreen$InputUnicode = -1;

                    }
                    clear();
                    BridgeBuild.App.DrawTextBoard();

                    window.setTimeout(BridgeBuild.App.UpdateGame, 33);
                },
                DrawTextBoard: function () {
                    for (var j = 0; j < BridgeBuild.App.TextBoard.Height; j = (j + 1) | 0) {
                        for (var i = 0; i < BridgeBuild.App.TextBoard.Width; i = (i + 1) | 0) {

                            var tc = BridgeBuild.App.TextBoard.TextColor.get([i, j]);
                            var tb = BridgeBuild.App.TextBoard.BackColor.get([i, j]);
                            if (tc < 0) {
                                tc = 0;
                            }
                            if (tb < 0) {
                                tb = 0;
                            }
                            var color1 = BridgeBuild.App.colors[System.Array.index(tc, BridgeBuild.App.colors)];

                            var colorBack = BridgeBuild.App.colors[System.Array.index(tb, BridgeBuild.App.colors)];
                            draw(i, j, color1, colorBack, "" + String.fromCharCode(BridgeBuild.App.TextBoard.CharAt(i, j)));

                        }
                    }
                }
            }
        }
    });

    Bridge.define("BridgeBuild.AppTextGame", {
        fields: {
            buffer: 0,
            bufferOn: false,
            game: null,
            TextBoard: null,
            colors: null
        },
        ctors: {
            ctor: function (novelMain) {
                this.$initialize();
                this.game = novelMain;
            }
        },
        methods: {
            Start: function (W, H) {

                //novelMain = new NovelMain().Init(50, 20);
                this.game.NovelApp$ITextGame$Init(W, H);
                //novelMain = new TextRenderTests().Init(W, H);

                setDisplaySize(W, H);

                //Console.WriteLine("Game Start");
                //colors = new string[20];

                //for (int i = 0; i < colors.Length; i++)
                //{
                //    //colors[i] = "#1f2026";

                //}
                //colors[1] = "#ffffff";

                var style = document.createElement("style");
                style.innerHTML = "html,body {font-family: Courier; background-color:#1f2526; height: 100%;}\n #canvas-container {width: 100%; height: 100%; text-align:center; vertical-align: middle; } ";
                document.head.appendChild(style);
                this.buffer = 9;
                this.bufferOn = false;

                document.onkeypress = Bridge.fn.combine(document.onkeypress, Bridge.fn.bind(this, function (a) {

                    var code = a.keyCode;
                    if (code === 0) {
                        code = a.charCode;
                    }
                    this.buffer = code;
                    this.bufferOn = true;
                }));

                this.UpdateGame();

                // After building (Ctrl + Shift + B) this project, 
                // browse to the /bin/Debug or /bin/Release folder.

                // A new bridge/ folder has been created and
                // contains your projects JavaScript files. 

                // Open the bridge/index.html file in a browser by
                // Right-Click > Open With..., then choose a
                // web browser from the list

                // This application will then run in a browser.
            },
            UpdateGame: function () {
                var screen = this.game.NovelApp$ITextGame$ScreenHolder.Screen;
                this.colors = this.game.NovelApp$ITextGame$GetPalette().HtmlColors;
                var delta = 0.033;
                this.game.NovelApp$ITextGame$Update(delta);
                this.TextBoard = screen.NovelApp$ITextScreen$GetBoard();
                screen.NovelApp$ITextScreen$Update(delta);
                //gr.Draw(0.033f);

                //screen.Update(delta);
                if (this.bufferOn) {
                    screen.NovelApp$ITextScreen$InputUnicode = this.buffer;

                    this.bufferOn = false;
                } else {
                    screen.NovelApp$ITextScreen$InputUnicode = -1;

                }
                clear();
                this.DrawTextBoard();

                window.setTimeout(Bridge.fn.cacheBind(this, this.UpdateGame), 33);
            },
            DrawTextBoard: function () {
                for (var j = 0; j < this.TextBoard.Height; j = (j + 1) | 0) {
                    for (var i = 0; i < this.TextBoard.Width; i = (i + 1) | 0) {

                        var tc = this.TextBoard.TextColor.get([i, j]);
                        var tb = this.TextBoard.BackColor.get([i, j]);
                        if (tc < 0) {
                            tc = 0;
                        }
                        if (tb < 0) {
                            tb = 0;
                        }
                        var color1 = this.colors[System.Array.index(tc, this.colors)];

                        var colorBack = this.colors[System.Array.index(tb, this.colors)];
                        draw(i, j, color1, colorBack, "" + String.fromCharCode(this.TextBoard.CharAt(i, j)));

                    }
                }
            }
        }
    });

    Bridge.define("NovelApp.ITextScreen", {
        $kind: "interface"
    });

    Bridge.define("NovelApp.DialogNarrationScreenControl", {
        fields: {
            text: null,
            tagInfo: null,
            tagIndex: 0,
            screen: null,
            SpeakerData: null,
            Done: false,
            NarrationOnly: false
        },
        ctors: {
            init: function () {
                this.SpeakerData = new (System.Collections.Generic.Dictionary$2(System.Char,System.String))();
            },
            ctor: function (screen) {
                this.$initialize();
                this.screen = screen;
            }
        },
        methods: {
            SetText: function (t) {
                var $t;
                t = System.String.replaceAll(System.String.replaceAll(t, "%", "\""), "\r", "");
                var ttr = new Pidroh.NovelBase.TextTagReader();
                this.text = null;
                this.tagInfo = ttr.ExtractTagInfo(t, Bridge.ref(this, "text"));
                $t = Bridge.getEnumerator(this.tagInfo.Tags);
                try {
                    while ($t.moveNext()) {
                        var item = $t.Current;
                        //Console.WriteLine("TAG");
                        //Console.WriteLine(this.text.Substring(item.Start, item.End - item.Start));
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }},
            ShowNext: function () {
                if (!this.screen.IsDone()) {
                    this.screen.AdvanceRequest();
                    return;
                }
                if (this.tagInfo.Tags.Count <= this.tagIndex) {
                    this.Done = true;
                    return;
                }

                var tag = this.tagInfo.Tags.getItem(this.tagIndex);
                var charaTag = tag.LabelIndexIs(99, 0);
                if (charaTag && !this.NarrationOnly) {
                    var speaker = { v : null };
                    if (this.SpeakerData.tryGetValue(tag.GetLabelChar(1), speaker)) {

                    } else {
                        speaker.v = "";
                    }
                    var text1 = this.text.substr(tag.Start, ((tag.End - tag.Start) | 0));
                    this.screen.AddDialog(speaker.v, text1);
                    //Console.Write(text1);
                    //screen.AddDialog("s", "bbbb");
                }
                if (tag.LabelIndexIs(110, 0) || this.NarrationOnly) {
                    var length = (tag.End - tag.Start) | 0;
                    if (length > 0) {

                        var text11 = this.text.substr(tag.Start, length);
                        if (charaTag && this.NarrationOnly) {
                            var speaker1 = { v : null };
                            if (this.SpeakerData.tryGetValue(tag.GetLabelChar(1), speaker1)) {

                            } else {
                                speaker1.v = "";
                            }
                            text11 = (speaker1.v || "") + ": " + (text11 || "");
                        }
                        this.screen.AddNarration(text11);
                        this.screen.HideDialog();
                    }

                    //Console.Write(text1);
                    //screen.AddDialog("s", "bbbb");
                }
                this.tagIndex = (this.tagIndex + 1) | 0;
            },
            TryAdvance: function () {
                if (this.screen.InputUnicode >= 0) {
                    this.ShowNext();
                }
            }
        }
    });

    Bridge.define("NovelApp.ITextGame", {
        $kind: "interface"
    });

    Bridge.define("NovelApp.Stories", {
        statics: {
            fields: {
                story: null,
                storyA: null,
                story2: null,
                story3: null,
                story4: null,
                story5: null
            },
            ctors: {
                init: function () {
                    this.story = "#cmWelcome back, dear.\r\n#cmHow was school today?\r\nShe says that everyday.\r\n#cpNormal.\r\n#cmGood.\r\n#cmOh, your father called saying he'll be late today.\r\n#cpI see.\r\nI rush to my room, cutting off whatever mom was about to say.\r\ns";
                    this.storyA = "#cmMOM: Welcome back, dear.\r\n#cmMOM: How was school today?\r\nShe says that everyday.\r\n#cpSARA: Normal.\r\n#cmMOM: Good.\r\n#cmMOM: Oh, your father called saying he'll be late today.\r\n#cpSARA: I see.\r\nI rush to my room, cutting off whatever mom was about to say.\r\ns";
                    this.story2 = "#cm%Welcome back, dear% is what I hear as I enter, greeted with a smile so big you can see every teeth.\r\n#cm%How was school today?%\r\n#cp%Normal,% I say.\r\n#cm%Good.%\r\n#cm%Oh, your father called saying he'll be late today.% She mutters, finally letting go of her smile.\r\n#cp%I see.%\r\n\r\nI make my way to my room cutting off whatever mom was about to say. Can't spend the entire afternoon on small talk.\r\n";
                    this.story3 = "%Welcome back, dear% is what I hear as I enter, greeted with a smile so big you can see every teeth.\r\n%How was school today?%\r\n%Normal,% I say.\r\n%Good.%\r\n%Oh, your father called saying he'll be late today.% She mutters, finally letting go of her smile.\r\n%I see.%\r\n\r\nI make my way to my room cutting off whatever mom was about to say. Can't spend the entire afternoon on small talk.\r\n";
                    this.story4 = "#nnI finally make it home. \r\n#cmWelcome back, dear.\r\n#nnMom comes over. With a huge smile showing every teeth, as always.\r\n#cmHow was school today?\r\n#cpNormal.\r\n#nnWe say the same things every single day. It's automated.\r\n#cmGood.\r\n#cmOh, your father called saying he'll be late today.\r\n#cpI see.\r\n#nnI rush to my room before the conversation can continue further.\r\n#nnI do this and that and that.\r\n#nnI do this and that and that.\r\n#nnI do this and that and that.\r\ns";
                    this.story5 = "#nnI take off the headphones and put the the RXPlay back in the charger. Someone knocks on the door.\r\n#cdIf you keep going like this you'll be deaf when you get to my age.\r\n#cpDinner, right? I'm coming, I'm coming.\r\n#cdIf you heard it, you could at least reply...\r\n#nnDad is annoying in a cute way. Always the victim. Most parents would get pretty angry at a daughter like me.\r\n#nnWe go down the stairs, into the living room.\r\n#nnChicken, salad, rice. It looks pretty yummy.\r\n#cpMom is late again, huh?\r\n#cdYes, stuck at the office. It's a big project, she says.\r\n#nnYeah, right. A big project. Sure.\r\n#cpWhat kind of guy do you think he is?\r\n#cdWho?\r\n#cpMom's lover.\r\n#nnDad's gets all surprised, but his face turns to bitterness.\r\n#cdThat joke is getting old, Sara.\r\n#nnI smile at my old man. A smile of joy with just a dash of pity. \r\n";
                }
            }
        }
    });

    Bridge.define("NovelApp.StringToPassage", {
        fields: {
            PassageIndexes: null,
            Text: null
        },
        ctors: {
            init: function () {
                this.PassageIndexes = new (System.Collections.Generic.List$1(System.Int32)).ctor();
            }
        }
    });

    Bridge.define("NovelApp.StringToPassageFactory", {
        statics: {
            methods: {
                Populate: function (iterator, text) {
                    if (iterator == null) {
                        iterator = new NovelApp.StringToPassageIterator();
                        iterator.StringToPassage = new NovelApp.StringToPassage();
                    }
                    iterator.Reset();
                    iterator.StringToPassage.Text = text;
                    var passageMarkers = iterator.StringToPassage.PassageIndexes;

                    passageMarkers.add(-1);
                    var openAspas = false;
                    var lastStop = -10;
                    for (var i = 0; i < ((text.length - 1) | 0); i = (i + 1) | 0) {
                        if (((i - lastStop) | 0) < 2) {

                        } else {

                            if ((text.charCodeAt(i) === 46 && (text.charCodeAt(((i + 1) | 0)) !== 46 && text.charCodeAt(((i + 1) | 0)) !== 34 && text.charCodeAt(((i + 1) | 0)) !== 10 && text.charCodeAt(((i + 1) | 0)) !== 13))) {
                                passageMarkers.add(i);
                                lastStop = i;
                            }
                            if (text.charCodeAt(i) === 34) {
                                openAspas = !openAspas;
                                if (!openAspas) {
                                    passageMarkers.add(i);
                                    lastStop = i;
                                }
                            }
                            if (text.charCodeAt(i) === 10) {
                                passageMarkers.add(i);
                                lastStop = i;
                            }
                        }
                    }
                    passageMarkers.add(((text.length - 1) | 0));
                    return iterator;
                }
            }
        }
    });

    Bridge.define("NovelApp.StringToPassageIterator", {
        fields: {
            StringToPassage: null,
            progress: 0
        },
        methods: {
            Advance: function () {
                this.progress = (this.progress + 1) | 0;
            },
            CurrentPassage: function () {
                return new Pidroh.TextRendering.Vector2D.$ctor2(((this.StringToPassage.PassageIndexes.getItem(this.progress) + 1) | 0), this.StringToPassage.PassageIndexes.getItem(((this.progress + 1) | 0)));
            },
            GetText: function () {
                return this.StringToPassage.Text;
            },
            IsDone: function () {
                return this.StringToPassage.PassageIndexes.Count <= ((this.progress + 2) | 0);
            },
            Reset: function () {
                this.StringToPassage.PassageIndexes.clear();
                this.progress = 0;
            }
        }
    });

    Bridge.define("NovelApp.TextScreenHolder", {
        fields: {
            Screen: null
        }
    });

    Bridge.define("Pidroh.NovelBase.TagInfo", {
        statics: {
            methods: {
                FromLabel: function (v1, v2) {
                    return new Pidroh.NovelBase.TagInfo(0, v1, v2);
                }
            }
        },
        fields: {
            Start: 0,
            End: 0,
            Tag: null
        },
        ctors: {
            init: function () {
                this.Tag = System.Array.init(2, 0, System.Char);
            },
            ctor: function (start, char1, char2) {
                this.$initialize();
                this.Tag[System.Array.index(0, this.Tag)] = char1;
                this.Tag[System.Array.index(1, this.Tag)] = char2;
                this.Start = start;

            }
        },
        methods: {
            GetLabelChar: function (v) {
                return this.Tag[System.Array.index(v, this.Tag)];
            },
            LabelIndexIs: function (v1, v2) {
                return this.Tag[System.Array.index(v2, this.Tag)] === v1;
            },
            SameLabel: function (t) {
                return this.Tag[System.Array.index(0, this.Tag)] === t.Tag[System.Array.index(0, t.Tag)] && this.Tag[System.Array.index(1, this.Tag)] === t.Tag[System.Array.index(1, t.Tag)];
            },
            ValidForPosition: function (charIndex) {
                return charIndex >= this.Start && charIndex <= this.End;
            }
        }
    });

    Bridge.define("Pidroh.NovelBase.TagInfoHolder", {
        fields: {
            Tags: null
        },
        ctors: {
            init: function () {
                this.Tags = new (System.Collections.Generic.List$1(Pidroh.NovelBase.TagInfo)).ctor();
            }
        },
        methods: {
            GetTagOfIndex: function (charIndex, tagNumber) {
                var $t;
                var tN = 0;
                $t = Bridge.getEnumerator(this.Tags);
                try {
                    while ($t.moveNext()) {
                        var item = $t.Current;
                        if (item.ValidForPosition(charIndex)) {
                            if (tagNumber === tN) {
                                return item;
                            }
                            tN = (tN + 1) | 0;
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }return null;
            }
        }
    });

    Bridge.define("Pidroh.NovelBase.TagToData$1", function (T) { return {
        fields: {
            tags: null,
            datas: null
        },
        ctors: {
            init: function () {
                this.tags = new (System.Collections.Generic.List$1(Pidroh.NovelBase.TagInfo)).ctor();
                this.datas = new (System.Collections.Generic.List$1(T)).ctor();
            }
        },
        methods: {
            AddData: function (tag, data) {
                this.datas.add(data);
                this.tags.add(tag);
            },
            GetData: function (tag) {
                return this.GetData$1(tag, Bridge.getDefaultValue(T));
            },
            GetData$1: function (tag, defaultV) {
                for (var i = 0; i < this.tags.Count; i = (i + 1) | 0) {
                    if (tag.SameLabel(this.tags.getItem(i))) {
                        return this.datas.getItem(i);
                    }
                }
                return defaultV;
            }
        }
    }; });

    Bridge.define("Pidroh.NovelBase.TestStories", {
        statics: {
            fields: {
                got: null
            },
            props: {
                Got: {
                    get: function () {
                        return System.String.replaceAll(Pidroh.NovelBase.TestStories.got, "%", "\"");
                    },
                    set: function (value) {
                        Pidroh.NovelBase.TestStories.got = value;
                    }
                }
            },
            ctors: {
                init: function () {
                    this.got = "%#cpWe should start back,% Gared urged as the woods began to grow dark around them. %The wildlings are dead.% \r\n%Do the dead frighten you?% Ser Waymar Royce asked with just the hint of a smile.\r\nGared did not rise to the bait. He was an old man, past fifty, and he had seen the lordlings come and go. %Dead is dead,% he said. %We have no business with the dead.%\r\n%Are they dead?% Royce asked softly. %What proof have we?%\r\n%Will saw them,% Gared said. %If he says they are dead, that’s proof enough for me.%\r\nWill had known they would drag him into the quarrel sooner or later. He wished it had been later rather than sooner. %My mother told me that dead men sing no songs,% he put in.\r\n%My wet nurse said the same thing, Will,% Royce replied. %Never believe anything you hear at a woman’s tit. There are things to be learned even from the dead.% His voice echoed, too loud in the twilit forest.";
                }
            }
        }
    });

    Bridge.define("Pidroh.NovelBase.TextRender", {
        fields: {
            indexer: 0,
            linebreaksProgressed: 0,
            x: 0,
            passageMarkers: null,
            TextHolder: null,
            tagInfo: null,
            text: null,
            textWorld: null,
            lineBreaks: null,
            pageBreaks: null,
            charIndex: 0,
            passageDone: false,
            timeOfChar: 0,
            timeBuffer: 0,
            backgroundColorDefault: 0,
            textColorDefault: 0,
            TagToColor: null,
            quickSkip: false,
            Finished: false,
            lineOffset: 0
        },
        ctors: {
            init: function () {
                this.indexer = 0;
                this.linebreaksProgressed = 0;
                this.x = 0;
                this.passageMarkers = new (System.Collections.Generic.List$1(System.Int32)).ctor();
                this.pageBreaks = new (System.Collections.Generic.List$1(System.Int32)).ctor();
                this.timeOfChar = 0.02;
                this.backgroundColorDefault = Pidroh.TextRendering.DefaultPalettes.C4Black;
                this.textColorDefault = Pidroh.TextRendering.DefaultPalettes.C4White;
                this.TagToColor = new (Pidroh.NovelBase.TagToData$1(System.Int32))();
            }
        },
        methods: {
            Setup: function (text, width, height, tagInfo) {
                this.tagInfo = tagInfo;
                this.text = text;
                this.textWorld = new Pidroh.TextRendering.TextWorld();
                var bufferWidth = width;
                var bufferHeight = height;
                this.textWorld.Init(((bufferWidth - 1) | 0), ((bufferHeight - 1) | 0));
                this.TextHolder = this.textWorld.GetFreeEntity(((bufferWidth - 4) | 0), ((bufferHeight - 2) | 0));
                this.TextHolder.SetPosition(2, 1);
                //Console.WriteLine(got);
                //Console.ReadKey();


                this.passageMarkers.add(-1);
                var openAspas = false;
                var lastStop = -10;
                for (var i = 0; i < ((text.length - 1) | 0); i = (i + 1) | 0) {
                    if (((i - lastStop) | 0) < 2) {

                    } else {

                        if ((text.charCodeAt(i) === 46 && (text.charCodeAt(((i + 1) | 0)) !== 46 && text.charCodeAt(((i + 1) | 0)) !== 34 && text.charCodeAt(((i + 1) | 0)) !== 10 && text.charCodeAt(((i + 1) | 0)) !== 13))) {
                            this.passageMarkers.add(i);
                            lastStop = i;
                        }
                        if (text.charCodeAt(i) === 34) {
                            openAspas = !openAspas;
                            if (!openAspas) {
                                this.passageMarkers.add(i);
                                lastStop = i;
                            }
                        }
                        if (text.charCodeAt(i) === 10) {
                            this.passageMarkers.add(i);
                            lastStop = i;
                        }
                    }
                }

                this.lineBreaks = new (System.Collections.Generic.List$1(System.Int32)).ctor();
                var wishedWidth = (bufferWidth - 4) | 0;
                var xPos = 0;
                for (var i1 = 0; i1 < ((text.length - 1) | 0); i1 = (i1 + 1) | 0) {
                    xPos = (xPos + 1) | 0;
                    if (text.charCodeAt(i1) === 10) {
                        this.lineBreaks.add(i1);
                        this.lineBreaks.add(i1);
                        xPos = -1;
                    }
                    if (text.charCodeAt(i1) === 32) {
                        var xPosAux = (xPos + 1) | 0;
                        for (var j = (i1 + 1) | 0; j < text.length; j = (j + 1) | 0) {
                            if (xPosAux >= ((wishedWidth - 2) | 0)) {
                                //Console.WriteLine(i);
                                this.lineBreaks.add(i1);
                                xPos = -1;
                                break;

                            }
                            if (text.charCodeAt(j) !== 32) {
                                xPosAux = (xPosAux + 1) | 0;
                            }
                            if (text.charCodeAt(j) === 32) {
                                break;
                            }
                        }
                    }

                }

                //if the current passage will break through the page, make the start of the current passage a pagebreaker
                {
                    var lineOffset = 0;
                    while (true) {

                        var dangerLine = (((this.TextHolder.Height - 1) | 0) + lineOffset) | 0;

                        if (dangerLine < this.lineBreaks.Count) {

                            var lineEnder = this.lineBreaks.getItem(dangerLine);
                            var lineEnder2 = 9999;
                            if (dangerLine < ((this.lineBreaks.Count - 1) | 0)) {
                                lineEnder2 = this.lineBreaks.getItem(((dangerLine + 1) | 0));
                            }

                            var passage = -1;

                            for (var i2 = (dangerLine - 1) | 0; i2 >= 0; i2 = (i2 - 1) | 0) {
                                if (this.passageMarkers.contains(this.lineBreaks.getItem(i2))) {
                                    lineOffset = (lineOffset + (((i2 - 1) | 0))) | 0;
                                    passage = this.lineBreaks.getItem(i2);
                                    break;
                                }
                            }

                            this.pageBreaks.add(passage);

                        } else {
                            break;
                        }
                    }


                }

            },
            ReceiveInput: function () {
                if (this.passageDone) {
                    this.passageDone = false;
                } else {
                    this.quickSkip = true;
                }

            },
            Update: function (delta) {
                this.timeBuffer += delta;
                if (this.quickSkip) {
                    this.timeBuffer += 100;
                    this.quickSkip = false;
                }
                while (this.timeBuffer > this.timeOfChar) {
                    this.timeBuffer -= this.timeOfChar;
                    this.TryDrawNextChar();
                }
            },
            TryDrawNextChar: function () {
                if (!this.passageDone) {
                    this.DrawNextChar();
                }
            },
            DrawNextChar: function () {
                var $t;

                var DrawChar = true;
                if (this.passageMarkers.Count > ((this.indexer + 1) | 0)) {
                    DrawChar = this.charIndex < ((this.passageMarkers.getItem(((this.indexer + 1) | 0)) + 1) | 0);
                }
                if (DrawChar) {
                    //while (linebreaksProgressed - lineOffset >= TextHolder.Height)
                    if (this.pageBreaks.contains(this.charIndex)) {
                        this.lineOffset = (this.lineOffset + (((this.TextHolder.Height - 1) | 0))) | 0;
                        this.lineOffset = this.linebreaksProgressed;
                        this.TextHolder.ResetFull();
                        this.x = -1;
                        //Console.Write("PAGE BREAK " + charIndex);
                        //Console.ReadKey();
                    } else {
                        //Console.Write("np - "+charIndex);
                    }
                    this.x = (this.x + 1) | 0;
                    if (this.charIndex >= this.text.length) {
                        this.Finished = true;
                        return false;
                    }
                    var value = this.text.charCodeAt(this.charIndex);
                    if (this.lineBreaks.contains(this.charIndex)) {
                        $t = Bridge.getEnumerator(this.lineBreaks);
                        try {
                            while ($t.moveNext()) {
                                var lb = $t.Current;
                                if (lb === this.charIndex) {
                                    this.linebreaksProgressed = (this.linebreaksProgressed + 1) | 0;
                                }
                            }
                        } finally {
                            if (Bridge.is($t, System.IDisposable)) {
                                $t.System$IDisposable$Dispose();
                            }
                        }
                        this.x = 0;
                    } else {
                        var tagNumber = 0;
                        var textColor = this.textColorDefault;
                        var ti = this.tagInfo.GetTagOfIndex(this.charIndex, tagNumber);
                        while (ti != null) {
                            var color = this.TagToColor.GetData$1(ti, -10);
                            if (color !== -10) {
                                textColor = color;
                            }
                            tagNumber = (tagNumber + 1) | 0;
                            ti = this.tagInfo.GetTagOfIndex(this.charIndex, tagNumber);
                        }
                        this.TextHolder.Origin.DrawChar$1(value, this.x, ((this.linebreaksProgressed - this.lineOffset) | 0), textColor, this.backgroundColorDefault);
                        this.textWorld.Draw();

                    }

                    this.charIndex = (this.charIndex + 1) | 0;
                    this.passageDone = false;
                    return false;
                } else {
                    this.indexer = (this.indexer + 1) | 0;

                    this.passageDone = true;
                    return true;
                }


            }
        }
    });

    Bridge.define("Pidroh.NovelBase.TextRenderDynamic", {
        fields: {
            entity: null
        },
        methods: {
            Init: function (text) {
                this.entity = text;
                text.Origin.SetCursorAt(0, 0);
            },
            InsertText: function (text) {
                this.entity.Origin.Draw_Cursor$2(text);
            }
        }
    });

    Bridge.define("Pidroh.NovelBase.TextTagReader", {
        fields: {
            tagsOpened: null,
            aux: null,
            EndPassageOnAspas: false
        },
        ctors: {
            init: function () {
                this.tagsOpened = new (System.Collections.Generic.List$1(Pidroh.NovelBase.TagInfo)).ctor();
                this.aux = new System.Text.StringBuilder();
                this.EndPassageOnAspas = true;
            }
        },
        methods: {
            ExtractTagInfo: function (text, taglessText) {
                var $t;
                this.aux.setLength(0);
                this.tagsOpened.clear();
                var tih = new Pidroh.NovelBase.TagInfoHolder();
                var removedTagOffset = 0;
                var aspasOpened = false;
                for (var i = 0; i < text.length; i = (i + 1) | 0) {
                    if (text.charCodeAt(i) === 35) {
                        var ti = new Pidroh.NovelBase.TagInfo(((i - removedTagOffset) | 0), text.charCodeAt(((i + 1) | 0)), text.charCodeAt(((i + 2) | 0)));
                        tih.Tags.add(ti);
                        this.tagsOpened.add(ti);
                        removedTagOffset = (removedTagOffset + 3) | 0;
                    }
                    var endDetected = false;
                    if (text.charCodeAt(i) === 34) {
                        if (this.EndPassageOnAspas && aspasOpened) {
                            endDetected = true;
                        }
                        aspasOpened = !aspasOpened;

                    }
                    if (text.charCodeAt(i) === 10 || endDetected) {
                        $t = Bridge.getEnumerator(this.tagsOpened);
                        try {
                            while ($t.moveNext()) {
                                var item = $t.Current;
                                item.End = (i - removedTagOffset) | 0;
                            }
                        } finally {
                            if (Bridge.is($t, System.IDisposable)) {
                                $t.System$IDisposable$Dispose();
                            }
                        }this.tagsOpened.clear();
                    }
                }
                for (var i1 = 0; i1 < text.length; i1 = (i1 + 1) | 0) {
                    if (text.charCodeAt(i1) === 35) {
                        i1 = (i1 + 2) | 0;
                    } else {
                        this.aux.append(String.fromCharCode(text.charCodeAt(i1)));
                    }
                }
                taglessText.v = this.aux.toString();
                return tih;
            }
        }
    });

    Bridge.define("Pidroh.TextRendering.TextAnimation", {
        fields: {
            length: null,
            progress: null,
            targets: null,
            lists: null
        },
        ctors: {
            init: function () {
                this.length = new (System.Collections.Generic.List$1(System.Single)).ctor();
                this.progress = new (System.Collections.Generic.List$1(System.Single)).ctor();
                this.targets = new (System.Collections.Generic.List$1(System.Int32)).ctor();
                this.lists = new (System.Collections.Generic.List$1(System.Collections.IList)).ctor();
            }
        },
        methods: {
            RegisterLists: function () {
                this.lists.add(this.length);
                this.lists.add(this.progress);
                this.lists.add(this.targets);
                this.RequestRegisterLists();
            },
            Update: function (delta) {
                for (var i = 0; i < this.progress.Count; i = (i + 1) | 0) {
                    this.progress.setItem(i, this.progress.getItem(i) +delta);
                    if (this.progress.getItem(i) >= this.length.getItem(i)) {
                        this.EndTask(i);
                    } else {
                        //Execute(i, new BaseData(length[i],progress[i], targets[i]));
                    }
                }
            },
            Add: function (bd) {
                this.progress.add(bd.progress);
                this.targets.add(bd.target);
                this.length.add(bd.length);
            },
            IsDone: function () {
                var $t;
                $t = Bridge.getEnumerator(this.lists);
                try {
                    while ($t.moveNext()) {
                        var item = $t.Current;
                        if (System.Array.getCount(item) !== this.progress.Count) {
                            var s = null;
                            s.trim();
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }return this.progress.Count === 0;
            },
            EndTask: function (i) {
                var $t;
                $t = Bridge.getEnumerator(this.lists);
                try {
                    while ($t.moveNext()) {
                        var l = $t.Current;

                        l.System$Collections$IList$removeAt(i);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }},
            RegisterList: function (mainData) {
                this.lists.add(mainData);
            },
            Modify$1: function (a) {
                for (var i = 0; i < this.progress.Count; i = (i + 1) | 0) {
                    if (a.id === this.targets.getItem(i)) {
                        this.Modify(a, i, this.progress.getItem(i), this.length.getItem(i));
                        a.animating = true;
                    }
                }
            },
            Modify: function (entity, index, progress, length) { }
        }
    });

    Bridge.define("Pidroh.TextRendering.DefaultPalettes", {
        statics: {
            fields: {
                C4KiroKaze: null,
                C4Reader: null,
                C4Novel: null,
                C4Black: 0,
                C4BlackNeutral: 0,
                C4WhiteNeutral: 0,
                C4White: 0
            },
            ctors: {
                init: function () {
                    this.C4KiroKaze = new Pidroh.TextRendering.Palette(["#332c50", "#46878f", "#94e344", "#e2f3e4"]);
                    this.C4Reader = new Pidroh.TextRendering.Palette(["#262626", "#8b8cba", "#8bba91", "#649f8d"]);
                    this.C4Novel = new Pidroh.TextRendering.Palette(["#262626", "#342d41", "#b8b8b8", "#8b8cba"]);
                    this.C4Black = 0;
                    this.C4BlackNeutral = 1;
                    this.C4WhiteNeutral = 2;
                    this.C4White = 3;
                }
            }
        }
    });

    Bridge.define("Pidroh.TextRendering.Palette", {
        fields: {
            HtmlColors: null
        },
        ctors: {
            ctor: function (colors) {
                if (colors === void 0) { colors = []; }

                this.$initialize();
                this.HtmlColors = colors;
            }
        }
    });

    Bridge.define("Pidroh.TextRendering.TextAnimation.BaseData", {
        $kind: "nested struct",
        statics: {
            methods: {
                getDefaultValue: function () { return new Pidroh.TextRendering.TextAnimation.BaseData(); }
            }
        },
        fields: {
            length: 0,
            progress: 0,
            target: 0
        },
        ctors: {
            $ctor1: function (length, progress, target) {
                this.$initialize();
                this.length = length;
                this.progress = progress;
                this.target = target;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            getHashCode: function () {
                var h = Bridge.addHash([3337077382, this.length, this.progress, this.target]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, Pidroh.TextRendering.TextAnimation.BaseData)) {
                    return false;
                }
                return Bridge.equals(this.length, o.length) && Bridge.equals(this.progress, o.progress) && Bridge.equals(this.target, o.target);
            },
            $clone: function (to) {
                var s = to || new Pidroh.TextRendering.TextAnimation.BaseData();
                s.length = this.length;
                s.progress = this.progress;
                s.target = this.target;
                return s;
            }
        }
    });

    Bridge.define("Pidroh.TextRendering.TextBoard", {
        statics: {
            fields: {
                NOCHANGECHAR: 0,
                INVISIBLECHAR: 0,
                NOCHANGECOLOR: 0,
                INVISIBLECOLOR: 0
            },
            ctors: {
                init: function () {
                    this.NOCHANGECHAR = 1;
                    this.INVISIBLECHAR = 2;
                    this.NOCHANGECOLOR = -2;
                    this.INVISIBLECOLOR = -1;
                }
            }
        },
        fields: {
            chars: null,
            TextColor: null,
            BackColor: null,
            cursorX: 0,
            cursorY: 0,
            Position: null,
            Width: 0,
            Height: 0
        },
        props: {
            CursorX: {
                get: function () {
                    return this.cursorX;
                },
                set: function (value) {
                    this.cursorX = value;
                }
            },
            CursorY: {
                get: function () {
                    return this.cursorY;
                },
                set: function (value) {
                    this.cursorY = value;
                }
            }
        },
        ctors: {
            init: function () {
                this.Position = new Pidroh.TextRendering.Vector2D();
                this.cursorX = 0;
                this.cursorY = 0;
            },
            ctor: function (width, height) {
                this.$initialize();
                //SetMaxSize(width, height);
                this.Resize(width, height);
            }
        },
        methods: {
            DrawOnCenter: function (message, color, xOff, yOff, alignString) {
                if (xOff === void 0) { xOff = 0; }
                if (yOff === void 0) { yOff = 0; }
                if (alignString === void 0) { alignString = true; }
                var x = (Bridge.Int.div((this.Width), 2)) | 0;
                if (alignString) {
                    x = (x - (((Bridge.Int.div(message.length, 2)) | 0))) | 0;
                }
                var y = (Bridge.Int.div(this.Height, 2)) | 0;
                this.Draw$1(message, ((x + xOff) | 0), ((y + yOff) | 0), color);
            },
            SetMaxSize: function (width, height) {
                this.chars = System.Array.create(0, null, System.Char, width, height);
                this.TextColor = System.Array.create(0, null, System.Int32, width, height);
                this.BackColor = System.Array.create(0, null, System.Int32, width, height);
            },
            Reset: function () {
                this.DrawRepeated(32, 0, 0, this.Width, this.Height, 0, 0);
            },
            ResetInvisible: function () {
                this.DrawRepeated(Pidroh.TextRendering.TextBoard.INVISIBLECHAR, 0, 0, this.Width, this.Height, Pidroh.TextRendering.TextBoard.INVISIBLECOLOR, Pidroh.TextRendering.TextBoard.INVISIBLECOLOR);
            },
            Insert: function (secondBoard) {
                for (var i = 0; i < secondBoard.Width; i = (i + 1) | 0) {
                    for (var j = 0; j < secondBoard.Height; j = (j + 1) | 0) {
                        var x = (Bridge.Int.clip32(secondBoard.Position.X) + i) | 0;
                        var y = (Bridge.Int.clip32(secondBoard.Position.Y) + j) | 0;
                        if (secondBoard.chars.get([i, j]) !== Pidroh.TextRendering.TextBoard.INVISIBLECHAR) {
                            this.chars.set([x, y], secondBoard.chars.get([i, j]));
                        }
                        if (secondBoard.TextColor.get([i, j]) !== Pidroh.TextRendering.TextBoard.INVISIBLECOLOR) {
                            this.TextColor.set([x, y], secondBoard.TextColor.get([i, j]));
                        }
                        if (secondBoard.BackColor.get([i, j]) !== Pidroh.TextRendering.TextBoard.INVISIBLECOLOR) {
                            this.BackColor.set([x, y], secondBoard.BackColor.get([i, j]));
                        }
                    }
                }
            },
            DrawOneDigit: function (i, x, y, color) {
                if (color === void 0) { color = -2; }
                var c = (((i + 48) | 0)) & 65535;
                this.DrawChar$1(c, x, y, color);
            },
            Set: function (origin) {
                this.Position = origin.Position.$clone();
                for (var i = 0; i < this.Width; i = (i + 1) | 0) {
                    for (var j = 0; j < this.Height; j = (j + 1) | 0) {
                        this.chars.set([i, j], origin.chars.get([i, j]));
                        this.BackColor.set([i, j], origin.BackColor.get([i, j]));
                        this.TextColor.set([i, j], origin.TextColor.get([i, j]));
                    }
                }
            },
            Resize: function (w, h) {
                if (this.chars == null || w > System.Array.getLength(this.chars, 0) || h > System.Array.getLength(this.chars, 1)) {
                    this.SetMaxSize(w, h);
                }
                this.Width = w;
                this.Height = h;

            },
            CharAt: function (i, j) {
                return this.chars.get([i, j]);
            },
            SetCursorAt: function (x, y) {
                this.cursorX = x;
                this.cursorY = y;
            },
            Draw_Cursor$2: function (v) {
                var $t;
                $t = Bridge.getEnumerator(v);
                try {
                    while ($t.moveNext()) {
                        var c = $t.Current;
                        this.Draw_Cursor(c);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }},
            Draw_Cursor$3: function (v, color) {
                var $t;
                $t = Bridge.getEnumerator(v);
                try {
                    while ($t.moveNext()) {
                        var c = $t.Current;
                        this.Draw_Cursor$1(c, color);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }},
            Draw_Cursor: function (c) {

                this.DrawChar(c, this.cursorX, this.cursorY);
                this.AdvanceCursor();
            },
            Draw_Cursor$1: function (c, color) {

                this.DrawChar$1(c, this.cursorX, this.cursorY, color);
                this.AdvanceCursor();
            },
            CanDraw_Cursor_SmartLineBreak: function (v) {
                var currentX = this.cursorX;
                var currentY = this.cursorY;

                for (var i = 0; i < v.length; i = (i + 1) | 0) {
                    var lineBreak = false;
                    var shouldCheckForLineBreaks = (i === 0 || v.charCodeAt(i) === 32) && i !== ((v.length - 1) | 0);
                    if (shouldCheckForLineBreaks) {
                        for (var j = 1; j < ((v.length - i) | 0); j = (j + 1) | 0) {
                            if (((j + currentX) | 0) >= this.Width) {
                                if (v.charCodeAt(i) === 32) {
                                    i = (i + 1) | 0; //skip through the space if it's a new line
                                }
                                lineBreak = true;
                                break;
                            }
                            if (v.charCodeAt(((i + j) | 0)) === 32) {
                                break;
                            }
                        }
                    }
                    if (lineBreak) {
                        currentY = (currentY + 1) | 0;
                        currentX = 0;
                    }
                    currentX = (currentX + 1) | 0;
                    if (currentX >= this.Width) {
                        currentY = (currentY + 1) | 0;
                        currentX = 0;
                    }
                    if (currentX >= this.Width || currentY >= this.Height) {
                        return false;
                    }


                }
                return true;
            },
            Draw_Cursor_SmartLineBreak: function (v, color) {
                var offStart = 0;
                var offEnd = (v.length - 1) | 0;
                return this.Draw_Cursor_SmartLineBreak$1(v, color, offStart, offEnd);
            },
            Draw_Cursor_SmartLineBreak$1: function (v, color, offStart, offEnd) {
                var endIndex = (offEnd + 1) | 0;
                var start = new Pidroh.TextRendering.Vector2D.$ctor2(this.CursorX, this.CursorY);
                for (var i = offStart; i < endIndex; i = (i + 1) | 0) {
                    var originX = this.cursorX;
                    var lineBreak = false;
                    var shouldCheckForLineBreaks = (i === 0 || v.charCodeAt(i) === 32) && i !== ((endIndex - 1) | 0);
                    if (shouldCheckForLineBreaks) {
                        for (var j = 1; j < ((endIndex - i) | 0); j = (j + 1) | 0) {
                            if (((j + originX) | 0) >= this.Width) {
                                if (v.charCodeAt(i) === 32) {
                                    i = (i + 1) | 0; //skip through the space if it's a new line
                                }
                                lineBreak = true;
                                break;
                            }
                            if (v.charCodeAt(((i + j) | 0)) === 32) {
                                break;
                            }
                        }
                    }
                    if (lineBreak) {
                        this.CursorNewLine(0);
                    }
                    this.Draw_Cursor$1(v.charCodeAt(i), color);
                }
                var end = new Pidroh.TextRendering.Vector2D.$ctor2(this.CursorX, this.CursorY);
                return new Pidroh.TextRendering.TextBoard.DrawCursorResult.$ctor1(this.PositionToIndex(start.$clone()), this.PositionToIndex(end.$clone()), start.$clone(), end.$clone());
            },
            PositionToIndex: function (start) {
                return Bridge.Int.clip32(start.X + start.Y * this.Width);
            },
            DrawOneDigit_Cursor: function (i) {
                this.Draw_Cursor(((((i + 48) | 0)) & 65535));
            },
            AdvanceCursor: function () {
                this.cursorX = (this.cursorX + 1) | 0;
                if (this.cursorX >= this.Width) {
                    this.cursorX = 0;
                    this.cursorY = (this.cursorY + 1) | 0;
                }
            },
            CursorNewLine: function (x) {
                this.cursorY = (this.cursorY + 1) | 0;
                this.cursorX = x;
            },
            DrawChar: function (v, x, y) {

                if (v !== Pidroh.TextRendering.TextBoard.NOCHANGECHAR) {
                    this.chars.set([x, y], v);

                }

            },
            DrawChar$1: function (v, x, y, color, backColor) {
                if (backColor === void 0) { backColor = -2; }

                this.DrawChar(v, x, y);
                this.SetColor(color, x, y);
                this.SetBackColor(backColor, x, y);
            },
            SetAll: function (text, textColor, backColor) {
                this.DrawRepeated(text, 0, 0, this.Width, this.Height, textColor, backColor);
            },
            DrawWithGrid: function (text, x, y, gridColor, textColor) {
                var width = text.length;
                this.DrawGrid(x, y, ((width + 2) | 0), 3, gridColor);
                this.Draw$1(text, ((x + 1) | 0), ((y + 1) | 0), textColor);
            },
            Draw$1: function (v, x, y, color, backColor) {
                if (backColor === void 0) { backColor = -2; }
                for (var i = 0; i < v.length; i = (i + 1) | 0) {
                    var x2 = (x + i) | 0;
                    var y2 = y;
                    if (x2 >= this.Width) {
                        x2 = (x2 - this.Width) | 0;
                        y2 = (y2 + 1) | 0;
                    }
                    this.DrawChar$1(v.charCodeAt(i), x2, y2, color, backColor);
                }
            },
            Draw: function (v, x, y, color, backColor) {
                if (backColor === void 0) { backColor = -2; }
                for (var i = 0; i < System.Linq.Enumerable.from(v).count(); i = (i + 1) | 0) {
                    this.DrawChar$1(System.Linq.Enumerable.from(v).elementAt(i), ((x + i) | 0), y, color, backColor);
                }
            },
            Draw$2: function (v, x2, y2, input) {
                throw new System.NotImplementedException.ctor();
            },
            DrawGrid: function (x, y, width, height, color) {

                this.DrawRepeated(124, x, y, 1, height, color);
                this.DrawRepeated(124, ((((x + width) | 0) - 1) | 0), y, 1, height, color);
                this.DrawRepeated(45, x, y, width, 1, color);
                this.DrawRepeated(45, x, ((((y + height) | 0) - 1) | 0), width, 1, color);
            },
            DrawGrid$1: function (v1, v2, v3, v4, board) {
                throw new System.NotImplementedException.ctor();
            },
            DrawRepeated: function (c, x, y, width, height, color, backColor) {
                if (backColor === void 0) { backColor = -2; }
                for (var i = x; i < ((x + width) | 0); i = (i + 1) | 0) {
                    for (var j = y; j < ((y + height) | 0); j = (j + 1) | 0) {
                        this.DrawChar$1(c, i, j, color);

                        this.SetBackColor(backColor, i, j);
                    }
                }
            },
            SetColor: function (color, x, y) {
                if (color !== Pidroh.TextRendering.TextBoard.NOCHANGECOLOR) {
                    this.TextColor.set([x, y], color);
                }
            },
            SetBackColor: function (color, x, y) {
                if (color !== Pidroh.TextRendering.TextBoard.NOCHANGECOLOR) {
                    this.BackColor.set([x, y], color);
                }
            }
        }
    });

    Bridge.define("Pidroh.TextRendering.TextBoard.DrawCursorResult", {
        $kind: "nested struct",
        statics: {
            methods: {
                getDefaultValue: function () { return new Pidroh.TextRendering.TextBoard.DrawCursorResult(); }
            }
        },
        fields: {
            StartIndex: 0,
            EndIndex: 0,
            StartPosition: null,
            EndPosition: null
        },
        ctors: {
            init: function () {
                this.StartPosition = new Pidroh.TextRendering.Vector2D();
                this.EndPosition = new Pidroh.TextRendering.Vector2D();
            },
            $ctor1: function (startIndex, endIndex, startPosition, endPosition) {
                this.$initialize();
                this.StartIndex = startIndex;
                this.EndIndex = endIndex;
                this.StartPosition = startPosition.$clone();
                this.EndPosition = endPosition.$clone();
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            getHashCode: function () {
                var h = Bridge.addHash([7592922985, this.StartIndex, this.EndIndex, this.StartPosition, this.EndPosition]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, Pidroh.TextRendering.TextBoard.DrawCursorResult)) {
                    return false;
                }
                return Bridge.equals(this.StartIndex, o.StartIndex) && Bridge.equals(this.EndIndex, o.EndIndex) && Bridge.equals(this.StartPosition, o.StartPosition) && Bridge.equals(this.EndPosition, o.EndPosition);
            },
            $clone: function (to) {
                var s = to || new Pidroh.TextRendering.TextBoard.DrawCursorResult();
                s.StartIndex = this.StartIndex;
                s.EndIndex = this.EndIndex;
                s.StartPosition = this.StartPosition.$clone();
                s.EndPosition = this.EndPosition.$clone();
                return s;
            }
        }
    });

    Bridge.define("Pidroh.TextRendering.TextEntity", {
        fields: {
            id: 0,
            Origin: null,
            animation: null,
            freeIfIdle: false,
            animating: false
        },
        props: {
            Height: {
                get: function () {
                    return this.Origin.Height;
                }
            }
        },
        ctors: {
            init: function () {
                this.freeIfIdle = false;
            }
        },
        methods: {
            AnimBase: function (length) {
                return new Pidroh.TextRendering.TextAnimation.BaseData.$ctor1(length, 0, this.id);
            },
            ResetAnimation: function () {
                this.animating = false;
                this.animation.Set(this.Origin);
            },
            ResetFull: function () {
                this.Origin.ResetInvisible();
            },
            SetPosition: function (x, y) {
                this.Origin.Position = new Pidroh.TextRendering.Vector2D.$ctor2(x, y);
            },
            SetSize: function (w, h) {
                if (this.Origin == null) {
                    this.Origin = new Pidroh.TextRendering.TextBoard(w, h);
                    this.animation = new Pidroh.TextRendering.TextBoard(w, h);
                }
                this.Origin.Resize(w, h);
                this.animation.Resize(w, h);

            }
        }
    });

    Bridge.define("Pidroh.TextRendering.TextWorld", {
        fields: {
            palette: null,
            activeAgents: null,
            freeBoards: null,
            animations: null,
            mainBoard: null,
            latestId: 0
        },
        ctors: {
            init: function () {
                this.palette = Pidroh.TextRendering.DefaultPalettes.C4KiroKaze;
                this.activeAgents = new (System.Collections.Generic.List$1(Pidroh.TextRendering.TextEntity)).ctor();
                this.freeBoards = new (System.Collections.Generic.List$1(Pidroh.TextRendering.TextEntity)).ctor();
                this.animations = new (System.Collections.Generic.List$1(Pidroh.TextRendering.TextAnimation)).ctor();
                this.latestId = -1;
            }
        },
        methods: {
            AddAnimation: function (T, ta) {
                this.animations.add(ta);
                ta.RegisterLists();
                return ta;
            },
            Init: function (width, height) {
                this.mainBoard = new Pidroh.TextRendering.TextBoard(width, height);

            },
            Draw: function () {
                this.mainBoard.Reset();
                this.DrawChildren();
            },
            DrawChildren: function () {
                var $t;
                for (var i = 0; i < this.activeAgents.Count; i = (i + 1) | 0) {
                    this.activeAgents.getItem(i).ResetAnimation();
                    $t = Bridge.getEnumerator(this.animations);
                    try {
                        while ($t.moveNext()) {
                            var anim = $t.Current;
                            anim.Modify$1(this.activeAgents.getItem(i));
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }if (this.activeAgents.getItem(i).freeIfIdle && !this.activeAgents.getItem(i).animating) {
                        this.freeBoards.add(this.activeAgents.getItem(i));
                        this.activeAgents.remove(this.activeAgents.getItem(i));
                        i = (i - 1) | 0;
                    } else {
                        this.mainBoard.Insert(this.activeAgents.getItem(i).animation);
                    }

                }
            },
            GetFreeEntity: function (w, h) {
                var te;
                if (this.freeBoards.Count > 0) {
                    te = this.freeBoards.getItem(((this.freeBoards.Count - 1) | 0));
                    this.freeBoards.removeAt(((this.freeBoards.Count - 1) | 0));
                } else {
                    te = new Pidroh.TextRendering.TextEntity();
                    te.id = ((this.latestId = (this.latestId + 1) | 0));

                }

                this.activeAgents.add(te);
                te.freeIfIdle = false;
                te.SetSize(w, h);
                te.ResetFull();
                return te;
            },
            GetTempEntity: function (w, h) {
                var te = this.GetFreeEntity(w, h);
                te.freeIfIdle = true;
                return te;
            },
            AdvanceTime: function (v) {
                var $t;
                $t = Bridge.getEnumerator(this.animations);
                try {
                    while ($t.moveNext()) {
                        var anim = $t.Current;
                        anim.Update(v);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }},
            IsDone: function () {
                var $t;
                $t = Bridge.getEnumerator(this.animations);
                try {
                    while ($t.moveNext()) {
                        var anim = $t.Current;
                        if (!anim.IsDone()) {
                            return false;
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }return true;
            }
        }
    });

    Bridge.define("Pidroh.TextRendering.Vector2D", {
        inherits: function () { return [System.IEquatable$1(Pidroh.TextRendering.Vector2D)]; },
        $kind: "struct",
        statics: {
            fields: {
                zeroVector: null,
                unitVector: null,
                unitXVector: null,
                unitYVector: null
            },
            props: {
                Zero: {
                    get: function () {
                        return Pidroh.TextRendering.Vector2D.zeroVector.$clone();
                    }
                },
                One: {
                    get: function () {
                        return Pidroh.TextRendering.Vector2D.unitVector.$clone();
                    }
                },
                UnitX: {
                    get: function () {
                        return Pidroh.TextRendering.Vector2D.unitXVector.$clone();
                    }
                },
                UnitY: {
                    get: function () {
                        return Pidroh.TextRendering.Vector2D.unitYVector.$clone();
                    }
                }
            },
            ctors: {
                init: function () {
                    this.zeroVector = new Pidroh.TextRendering.Vector2D();
                    this.unitVector = new Pidroh.TextRendering.Vector2D();
                    this.unitXVector = new Pidroh.TextRendering.Vector2D();
                    this.unitYVector = new Pidroh.TextRendering.Vector2D();
                    this.zeroVector = new Pidroh.TextRendering.Vector2D.$ctor2(0.0, 0.0);
                    this.unitVector = new Pidroh.TextRendering.Vector2D.$ctor2(1.0, 1.0);
                    this.unitXVector = new Pidroh.TextRendering.Vector2D.$ctor2(1.0, 0.0);
                    this.unitYVector = new Pidroh.TextRendering.Vector2D.$ctor2(0.0, 1.0);
                }
            },
            methods: {
                InterpolateRounded: function (startPosition, endPosition, ratio) {
                    return (Pidroh.TextRendering.Vector2D.op_Addition(Pidroh.TextRendering.Vector2D.op_Multiply$1(startPosition.$clone(), (1 - ratio)), Pidroh.TextRendering.Vector2D.op_Multiply$1(endPosition.$clone(), ratio))).Round();
                },
                Add: function (value1, value2) {
                    value1.X += value2.X;
                    value1.Y += value2.Y;
                    return value1.$clone();
                },
                Add$1: function (value1, value2, result) {
                    result.v.X = value1.v.X + value2.v.X;
                    result.v.Y = value1.v.Y + value2.v.Y;
                },
                Distance: function (value1, value2) {
                    var v1 = value1.X - value2.X, v2 = value1.Y - value2.Y;
                    return Math.sqrt((v1 * v1) + (v2 * v2));
                },
                Distance$1: function (value1, value2, result) {
                    var v1 = value1.v.X - value2.v.X, v2 = value1.v.Y - value2.v.Y;
                    result.v = Math.sqrt((v1 * v1) + (v2 * v2));
                },
                DistanceSquared: function (value1, value2) {
                    var v1 = value1.X - value2.X, v2 = value1.Y - value2.Y;
                    return (v1 * v1) + (v2 * v2);
                },
                DistanceSquared$1: function (value1, value2, result) {
                    var v1 = value1.v.X - value2.v.X, v2 = value1.v.Y - value2.v.Y;
                    result.v = (v1 * v1) + (v2 * v2);
                },
                Divide: function (value1, value2) {
                    value1.X /= value2.X;
                    value1.Y /= value2.Y;
                    return value1.$clone();
                },
                Divide$2: function (value1, value2, result) {
                    result.v.X = value1.v.X / value2.v.X;
                    result.v.Y = value1.v.Y / value2.v.Y;
                },
                Divide$1: function (value1, divider) {
                    var factor = 1 / divider;
                    value1.X *= factor;
                    value1.Y *= factor;
                    return value1.$clone();
                },
                Divide$3: function (value1, divider, result) {
                    var factor = 1 / divider;
                    result.v.X = value1.v.X * factor;
                    result.v.Y = value1.v.Y * factor;
                },
                Dot: function (value1, value2) {
                    return (value1.X * value2.X) + (value1.Y * value2.Y);
                },
                Dot$1: function (value1, value2, result) {
                    result.v = (value1.v.X * value2.v.X) + (value1.v.Y * value2.v.Y);
                },
                Reflect: function (vector, normal) {
                    var result = new Pidroh.TextRendering.Vector2D();
                    var val = 2.0 * ((vector.X * normal.X) + (vector.Y * normal.Y));
                    result.X = vector.X - (normal.X * val);
                    result.Y = vector.Y - (normal.Y * val);
                    return result.$clone();
                },
                Reflect$1: function (vector, normal, result) {
                    var val = 2.0 * ((vector.v.X * normal.v.X) + (vector.v.Y * normal.v.Y));
                    result.v.X = vector.v.X - (normal.v.X * val);
                    result.v.Y = vector.v.Y - (normal.v.Y * val);
                },
                Max: function (value1, value2) {
                    return new Pidroh.TextRendering.Vector2D.$ctor2(value1.X > value2.X ? value1.X : value2.X, value1.Y > value2.Y ? value1.Y : value2.Y);
                },
                Max$1: function (value1, value2, result) {
                    result.v.X = value1.v.X > value2.v.X ? value1.v.X : value2.v.X;
                    result.v.Y = value1.v.Y > value2.v.Y ? value1.v.Y : value2.v.Y;
                },
                Min: function (value1, value2) {
                    return new Pidroh.TextRendering.Vector2D.$ctor2(value1.X < value2.X ? value1.X : value2.X, value1.Y < value2.Y ? value1.Y : value2.Y);
                },
                Min$1: function (value1, value2, result) {
                    result.v.X = value1.v.X < value2.v.X ? value1.v.X : value2.v.X;
                    result.v.Y = value1.v.Y < value2.v.Y ? value1.v.Y : value2.v.Y;
                },
                Multiply: function (value1, value2) {
                    value1.X *= value2.X;
                    value1.Y *= value2.Y;
                    return value1.$clone();
                },
                Multiply$1: function (value1, scaleFactor) {
                    value1.X *= scaleFactor;
                    value1.Y *= scaleFactor;
                    return value1.$clone();
                },
                Multiply$3: function (value1, scaleFactor, result) {
                    result.v.X = value1.v.X * scaleFactor;
                    result.v.Y = value1.v.Y * scaleFactor;
                },
                Multiply$2: function (value1, value2, result) {
                    result.v.X = value1.v.X * value2.v.X;
                    result.v.Y = value1.v.Y * value2.v.Y;
                },
                Negate: function (value) {
                    value.X = -value.X;
                    value.Y = -value.Y;
                    return value.$clone();
                },
                Negate$1: function (value, result) {
                    result.v.X = -value.v.X;
                    result.v.Y = -value.v.Y;
                },
                Normalize: function (value) {
                    var val = 1.0 / Math.sqrt((value.X * value.X) + (value.Y * value.Y));
                    value.X *= val;
                    value.Y *= val;
                    return value.$clone();
                },
                Normalize$1: function (value, result) {
                    var val = 1.0 / Math.sqrt((value.v.X * value.v.X) + (value.v.Y * value.v.Y));
                    result.v.X = value.v.X * val;
                    result.v.Y = value.v.Y * val;
                },
                Subtract: function (value1, value2) {
                    value1.X -= value2.X;
                    value1.Y -= value2.Y;
                    return value1.$clone();
                },
                Subtract$1: function (value1, value2, result) {
                    result.v.X = value1.v.X - value2.v.X;
                    result.v.Y = value1.v.Y - value2.v.Y;
                },
                op_UnaryNegation: function (value) {
                    value.X = -value.X;
                    value.Y = -value.Y;
                    return value.$clone();
                },
                op_Equality: function (value1, value2) {
                    return value1.X === value2.X && value1.Y === value2.Y;
                },
                op_Inequality: function (value1, value2) {
                    return value1.X !== value2.X || value1.Y !== value2.Y;
                },
                op_Addition: function (value1, value2) {
                    value1.X += value2.X;
                    value1.Y += value2.Y;
                    return value1.$clone();
                },
                op_Subtraction: function (value1, value2) {
                    value1.X -= value2.X;
                    value1.Y -= value2.Y;
                    return value1.$clone();
                },
                op_Multiply: function (value1, value2) {
                    value1.X *= value2.X;
                    value1.Y *= value2.Y;
                    return value1.$clone();
                },
                op_Multiply$1: function (value, scaleFactor) {
                    value.X *= scaleFactor;
                    value.Y *= scaleFactor;
                    return value.$clone();
                },
                op_Multiply$2: function (scaleFactor, value) {
                    value.X *= scaleFactor;
                    value.Y *= scaleFactor;
                    return value.$clone();
                },
                op_Division: function (value1, value2) {
                    value1.X /= value2.X;
                    value1.Y /= value2.Y;
                    return value1.$clone();
                },
                op_Division$1: function (value1, divider) {
                    var factor = 1 / divider;
                    value1.X *= factor;
                    value1.Y *= factor;
                    return value1.$clone();
                },
                getDefaultValue: function () { return new Pidroh.TextRendering.Vector2D(); }
            }
        },
        fields: {
            X: 0,
            Y: 0
        },
        props: {
            XInt: {
                get: function () {
                    return Bridge.Int.clip32(this.X);
                }
            },
            YInt: {
                get: function () {
                    return Bridge.Int.clip32(this.Y);
                }
            }
        },
        alias: ["equalsT", "System$IEquatable$1$Pidroh$TextRendering$Vector2D$equalsT"],
        ctors: {
            $ctor2: function (x, y) {
                this.$initialize();
                this.X = x;
                this.Y = y;
            },
            $ctor1: function (value) {
                this.$initialize();
                this.X = value;
                this.Y = value;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            Round: function () {
                return new Pidroh.TextRendering.Vector2D.$ctor2(Bridge.Math.round(this.X, 0, 6), Bridge.Math.round(this.Y, 0, 6));
            },
            equals: function (obj) {
                if (Bridge.is(obj, Pidroh.TextRendering.Vector2D)) {
                    return this.equalsT(this);
                }

                return false;
            },
            equalsT: function (other) {
                return (this.X === other.X) && (this.Y === other.Y);
            },
            getHashCode: function () {
                return ((System.Single.getHashCode(this.X) + System.Single.getHashCode(this.Y)) | 0);
            },
            Length: function () {
                return Math.sqrt((this.X * this.X) + (this.Y * this.Y));
            },
            LengthSquared: function () {
                return (this.X * this.X) + (this.Y * this.Y);
            },
            Normalize: function () {
                var val = 1.0 / Math.sqrt((this.X * this.X) + (this.Y * this.Y));
                this.X *= val;
                this.Y *= val;
            },
            toString: function () {
                var currentCulture = System.Globalization.CultureInfo.getCurrentCulture();
                return System.String.formatProvider.apply(System.String, [currentCulture, "{{X:{0} Y:{1}}}"].concat(System.Array.init([System.Single.format(this.X, "G", currentCulture), System.Single.format(this.Y, "G", currentCulture)], System.Object)));
            },
            $clone: function (to) {
                var s = to || new Pidroh.TextRendering.Vector2D();
                s.X = this.X;
                s.Y = this.Y;
                return s;
            }
        }
    });

    Bridge.define("NovelApp.DialogNarrationScreen", {
        inherits: [NovelApp.ITextScreen],
        statics: {
            fields: {
                NarrationState: 0,
                DialogState: 0
            },
            ctors: {
                init: function () {
                    this.NarrationState = 1;
                    this.DialogState = 2;
                }
            }
        },
        fields: {
            world: null,
            dialogE: null,
            narrationE: null,
            charByCharAnim: null,
            passageIterator: null,
            mode: 0,
            InputUnicode: 0
        },
        alias: [
            "InputUnicode", "NovelApp$ITextScreen$InputUnicode",
            "GetBoard", "NovelApp$ITextScreen$GetBoard",
            "Update", "NovelApp$ITextScreen$Update"
        ],
        ctors: {
            init: function () {
                this.InputUnicode = -1;
            }
        },
        methods: {
            Init: function (w, h) {
                this.world = new Pidroh.TextRendering.TextWorld();
                this.world.palette = Pidroh.TextRendering.DefaultPalettes.C4Novel;
                this.world.Init(w, h);
                this.dialogE = this.world.GetFreeEntity(((w - 2) | 0), 4);
                this.dialogE.SetPosition(1, ((h - 4) | 0));
                this.narrationE = this.world.GetFreeEntity(((w - 2) | 0), ((h - 6) | 0));
                this.narrationE.SetPosition(1, 1);
                this.charByCharAnim = new Pidroh.TextRendering.CharByCharAnimation();
                this.world.AddAnimation(Bridge.global.Pidroh.TextRendering.CharByCharAnimation, this.charByCharAnim);
            },
            AddNarration: function (n) {
                this.mode = NovelApp.DialogNarrationScreen.NarrationState;
                this.Passagify(n);
                if (this.narrationE.Origin.CursorX !== 0 || this.narrationE.Origin.CursorY !== 0) {
                    this.narrationE.Origin.CursorNewLine(0);
                    this.narrationE.Origin.CursorNewLine(0);
                }
                if (this.narrationE.Origin.CanDraw_Cursor_SmartLineBreak(n)) {
                } else {
                    this.narrationE.ResetFull();
                    this.narrationE.Origin.SetCursorAt(0, 0);

                }
                this.ShowPassage();
            },
            ShowPassage: function () {
                var passageIndexes = this.passageIterator.CurrentPassage();
                this.AddNarrationPassage(this.passageIterator.GetText(), passageIndexes.XInt, passageIndexes.YInt);
            },
            Passagify: function (n) {
                this.passageIterator = NovelApp.StringToPassageFactory.Populate(this.passageIterator, n);
            },
            AddNarrationPassage: function (n, start, end) {

                var cursorR = this.narrationE.Origin.Draw_Cursor_SmartLineBreak$1(n, 2, start, end);
                this.charByCharAnim.Add$1(this.narrationE.AnimBase(n.length * 0.005), new Pidroh.TextRendering.CharByCharAnimation.CharByCharData(cursorR.StartIndex, cursorR.EndIndex));
            },
            AddDialog: function (speaker, text) {
                this.mode = NovelApp.DialogNarrationScreen.DialogState;
                this.dialogE.Origin.SetAll(32, 0, 1);
                this.dialogE.Origin.Draw$1(speaker, 0, 0, 2);
                this.dialogE.Origin.SetCursorAt(0, 1);
                this.dialogE.Origin.Draw_Cursor_SmartLineBreak(text, 2);
                this.charByCharAnim.Add$1(this.dialogE.AnimBase(text.length * 0.005), new Pidroh.TextRendering.CharByCharAnimation.CharByCharData(this.dialogE.Origin.Width, ((text.length + this.dialogE.Origin.Width) | 0)));
                //dialogE.Origin.Draw(text, 0,1, 2);
            },
            GetBoard: function () {
                return this.world.mainBoard;
            },
            Update: function (f) {
                this.world.Draw();
                this.world.AdvanceTime(f);
            },
            HideDialog: function () {
                this.dialogE.Origin.SetAll(32, 0, Pidroh.TextRendering.TextBoard.INVISIBLECOLOR);
            },
            IsDone: function () {

                return this.world.IsDone() && (this.passageIterator == null || this.passageIterator.IsDone());
            },
            AdvanceRequest: function () {
                if (!this.world.IsDone()) {
                    this.world.AdvanceTime(999.0);
                } else {

                    this.passageIterator.Advance();
                    this.ShowPassage();
                }

            }
        }
    });

    Bridge.define("NovelApp.DialogNarratoinControlTestGame", {
        inherits: [NovelApp.ITextGame],
        fields: {
            dnsc: null,
            ScreenHolder: null
        },
        alias: [
            "ScreenHolder", "NovelApp$ITextGame$ScreenHolder",
            "GetPalette", "NovelApp$ITextGame$GetPalette",
            "Init", "NovelApp$ITextGame$Init",
            "Update", "NovelApp$ITextGame$Update"
        ],
        ctors: {
            init: function () {
                this.ScreenHolder = new NovelApp.TextScreenHolder();
            }
        },
        methods: {
            GetPalette: function () {
                return Pidroh.TextRendering.DefaultPalettes.C4Novel;
            },
            Init: function (w, h) {
                var dns = new NovelApp.DialogNarrationScreen();
                dns.Init(w, h);
                this.ScreenHolder.Screen = dns;

                this.dnsc = new NovelApp.DialogNarrationScreenControl(dns);
                this.dnsc.SetText(NovelApp.Stories.story4);
                //            dnsc.SetText(@"#cmWelcome back, dear.
                //#cmHow was school today?
                //#nnWhy won't this work?
                //s");
                this.dnsc.SpeakerData.add(109, "Mom");
                this.dnsc.SpeakerData.add(112, "Sara");
                this.dnsc.ShowNext();
            },
            Update: function (delta) {
                this.dnsc.TryAdvance();
            }
        }
    });

    Bridge.define("NovelApp.DialogNarratoinScreenTestGame", {
        inherits: [NovelApp.ITextGame],
        fields: {
            ScreenHolder: null
        },
        alias: [
            "ScreenHolder", "NovelApp$ITextGame$ScreenHolder",
            "GetPalette", "NovelApp$ITextGame$GetPalette",
            "Init", "NovelApp$ITextGame$Init",
            "Update", "NovelApp$ITextGame$Update"
        ],
        ctors: {
            init: function () {
                this.ScreenHolder = new NovelApp.TextScreenHolder();
            }
        },
        methods: {
            GetPalette: function () {
                return Pidroh.TextRendering.DefaultPalettes.C4Novel;
            },
            Init: function (w, h) {
                var dns = new NovelApp.DialogNarrationScreen();
                dns.Init(w, h);
                this.ScreenHolder.Screen = dns;
                dns.AddNarration("dasdsaddddddddddddddddd  dasdsad       dsads");
                dns.AddDialog("Mom", "What?");
                System.Console.Write("sss");
            },
            Update: function (delta) {

            }
        }
    });

    Bridge.define("NovelApp.TextScreenN", {
        inherits: [NovelApp.ITextScreen],
        fields: {
            tw: null,
            InputUnicode: 0
        },
        props: {
            InputAsNumber: {
                get: function () {
                    return ((this.InputUnicode - 48) | 0);
                }
            }
        },
        alias: [
            "GetBoard", "NovelApp$ITextScreen$GetBoard",
            "InputUnicode", "NovelApp$ITextScreen$InputUnicode"
        ],
        methods: {
            Init: function (w, h) {
                this.tw = new Pidroh.TextRendering.TextWorld();
                this.tw.Init(w, h);

            },
            GetBoard: function () {
                return this.tw.mainBoard;
            },
            GetPalette: function () {
                return this.tw.palette;
            }
        }
    });

    Bridge.define("NovelApp.TextRenderTests", {
        inherits: [NovelApp.ITextGame],
        fields: {
            w: 0,
            h: 0,
            menu: null,
            TextRender: null,
            screen: null,
            ScreenHolder: null,
            textScreen: null,
            dnsc: null,
            dns: null
        },
        alias: [
            "ScreenHolder", "NovelApp$ITextGame$ScreenHolder",
            "GetPalette", "NovelApp$ITextGame$GetPalette",
            "Update", "NovelApp$ITextGame$Update",
            "Init", "NovelApp$ITextGame$Init"
        ],
        ctors: {
            init: function () {
                this.ScreenHolder = new NovelApp.TextScreenHolder();
            }
        },
        methods: {
            GetPalette: function () {
                if (Bridge.referenceEquals(this.ScreenHolder.Screen, this.textScreen)) {
                    return Pidroh.TextRendering.DefaultPalettes.C4Reader;
                }
                return Pidroh.TextRendering.DefaultPalettes.C4Novel;
            },
            Update: function (time) {
                if (this.dnsc != null) {
                    if (Bridge.referenceEquals(this.ScreenHolder.Screen, this.dns) && this.dnsc.Done) {
                        this.ScreenHolder.Screen = this.menu;
                        this.menu.Reset();
                    }
                    this.dnsc.TryAdvance();
                }
                if (Bridge.referenceEquals(this.ScreenHolder.Screen, this.menu) && this.menu.ChosenOption >= 0) {

                    var story2 = NovelApp.Stories.story2;
                    var endTagOnAspas = false;
                    switch (this.menu.ChosenOption) {
                        case 0: 
                            {
                                var narrationOnly = false;
                                this.DialogNarration(narrationOnly);
                                return;
                            }
                        case 1: 
                            {
                                var narrationOnly1 = true;
                                this.DialogNarration(narrationOnly1);
                                return;
                            }
                        case 2: 
                            story2 = NovelApp.Stories.storyA;
                            break;
                        case 4: 
                            endTagOnAspas = true;
                            break;
                        case 5: 
                            story2 = NovelApp.Stories.story3;
                            break;
                        default: 
                            break;
                    }
                    if (this.menu.ChosenOption === 0) {
                        story2 = NovelApp.Stories.story;
                    }
                    this.InitTextRender(story2, endTagOnAspas);
                    this.ScreenHolder.Screen = this.textScreen;
                }
                if (Bridge.referenceEquals(this.ScreenHolder.Screen, this.textScreen) && this.TextRender.Finished) {
                    this.ScreenHolder.Screen = this.menu;
                    this.menu.Reset();
                }

            },
            DialogNarration: function (narrationOnly) {
                this.dns = new NovelApp.DialogNarrationScreen();
                this.dns.Init(this.w, this.h);
                this.ScreenHolder.Screen = this.dns;

                this.dnsc = new NovelApp.DialogNarrationScreenControl(this.dns);

                this.dnsc.NarrationOnly = narrationOnly;
                //            dnsc.SetText(@"#cmWelcome back, dear.
                //#cmHow was school today?
                //#nnWhy won't this work?
                //s");
                this.dnsc.SetText(NovelApp.Stories.story5);
                this.dnsc.SpeakerData.add(109, "Mom");
                this.dnsc.SpeakerData.add(112, "Sara");
                this.dnsc.SpeakerData.add(100, "Dad");
                this.dnsc.ShowNext();
            },
            Init: function (w, h) {
                this.w = w;
                this.h = h;
                this.menu = new NovelApp.GenericTextMenu();
                this.menu.AddOptions(["Story X", "Story Y"]);
                this.menu.Init(w, h);
                this.ScreenHolder.Screen = this.menu;


                //return this;
            },
            InitTextRender: function (story2, endTagOnAspas) {
                this.TextRender = new Pidroh.NovelBase.TextRender();
                this.TextRender.TagToColor.AddData(Pidroh.NovelBase.TagInfo.FromLabel(99, 112), Pidroh.TextRendering.DefaultPalettes.C4WhiteNeutral);
                this.TextRender.TagToColor.AddData(Pidroh.NovelBase.TagInfo.FromLabel(99, 109), Pidroh.TextRendering.DefaultPalettes.C4BlackNeutral);
                this.TextRender.TagToColor.AddData(Pidroh.NovelBase.TagInfo.FromLabel(99, 100), Pidroh.TextRendering.DefaultPalettes.C4BlackNeutral);

                var got = System.String.replaceAll(System.String.replaceAll(story2, "%", "\""), "\r", "");
                var taglessText = { };
                var textTagReader = new Pidroh.NovelBase.TextTagReader();
                textTagReader.EndPassageOnAspas = endTagOnAspas;
                var tagInfo = textTagReader.ExtractTagInfo(got, taglessText);
                this.TextRender.Setup(taglessText.v, this.w, this.h, tagInfo);
                this.TextRender.textWorld.palette = Pidroh.TextRendering.DefaultPalettes.C4Reader;
                this.textScreen = new NovelApp.TextRenderToScreen(this.TextRender);
            }
        }
    });

    Bridge.define("NovelApp.TextRenderToScreen", {
        inherits: [NovelApp.ITextScreen],
        fields: {
            textRender: null,
            InputUnicode: 0
        },
        alias: [
            "InputUnicode", "NovelApp$ITextScreen$InputUnicode",
            "GetBoard", "NovelApp$ITextScreen$GetBoard",
            "Update", "NovelApp$ITextScreen$Update"
        ],
        ctors: {
            ctor: function (textRender) {
                this.$initialize();
                this.textRender = textRender;
            }
        },
        methods: {
            GetBoard: function () {
                return this.textRender.textWorld.mainBoard;
            },
            Update: function (f) {
                if (this.InputUnicode !== -1) {
                    this.textRender.ReceiveInput();
                    this.InputUnicode = -1;
                }
                this.textRender.Update(f);
            }
        }
    });

    Bridge.define("Pidroh.TextRendering.TextAnimation$1", function (T) { return {
        inherits: [Pidroh.TextRendering.TextAnimation],
        fields: {
            mainData: null
        },
        ctors: {
            init: function () {
                this.mainData = new (System.Collections.Generic.List$1(T)).ctor();
            }
        },
        methods: {
            RequestRegisterLists: function () {
                this.RegisterList(this.mainData);
            },
            Add$1: function (baseData, mainD) {
                this.Add(baseData);
                this.mainData.add(mainD);
            },
            Modify: function (entity, index, progress, length) {
                this.Modify$2(entity, this.mainData.getItem(index), progress, length);
            },
            Modify$2: function (entity, mainData, progress, length) { }
        }
    }; });

    Bridge.define("NovelApp.GenericTextMenu", {
        inherits: [NovelApp.TextScreenN],
        fields: {
            options: null,
            ChosenOption: 0
        },
        alias: ["Update", "NovelApp$ITextScreen$Update"],
        ctors: {
            init: function () {
                this.options = new (System.Collections.Generic.List$1(System.String)).ctor();
                this.ChosenOption = -1;
            }
        },
        methods: {
            Update: function (f) {
                if (this.InputUnicode >= 0) {
                }

                if (this.InputAsNumber > 0 && this.InputAsNumber <= this.options.Count) {
                    //Console.Write(InputAsNumber + "x");
                    this.ChosenOption = (this.InputAsNumber - 1) | 0;
                }
                var board = this.GetBoard();
                for (var i = 0; i < this.options.Count; i = (i + 1) | 0) {
                    var x = 0;
                    var y = i;
                    board.DrawChar$1(((((49 + i) | 0)) & 65535), x, y, 3);
                    board.DrawChar$1(45, ((x + 2) | 0), y, 3);
                    board.Draw$1(this.options.getItem(i), ((x + 4) | 0), y, 3);


                }

            },
            Reset: function () {
                this.ChosenOption = -10;
            },
            AddOptions: function (args) {
                if (args === void 0) { args = []; }
                this.options.AddRange(args);
            }
        }
    });

    Bridge.define("Pidroh.TextRendering.BlinkAnim.BlinkData", {
        $kind: "nested struct",
        statics: {
            methods: {
                BackColor: function (backColor, blinkDuration) {
                    return new Pidroh.TextRendering.BlinkAnim.BlinkData.$ctor1(Pidroh.TextRendering.TextBoard.NOCHANGECHAR, backColor, Pidroh.TextRendering.TextBoard.NOCHANGECOLOR, blinkDuration, blinkDuration);
                },
                Char: function (c, blinkDuration) {
                    return new Pidroh.TextRendering.BlinkAnim.BlinkData.$ctor1(c, Pidroh.TextRendering.TextBoard.NOCHANGECOLOR, Pidroh.TextRendering.TextBoard.NOCHANGECOLOR, blinkDuration, blinkDuration);
                },
                getDefaultValue: function () { return new Pidroh.TextRendering.BlinkAnim.BlinkData(); }
            }
        },
        fields: {
            text: 0,
            backColor: 0,
            textColor: 0,
            blinkActiveTime: 0,
            blinkInactive: 0
        },
        ctors: {
            $ctor1: function (text, backColor, textColor, blinkActiveTime, blinkInactive) {
                this.$initialize();
                this.text = text;
                this.backColor = backColor;
                this.textColor = textColor;
                this.blinkActiveTime = blinkActiveTime;
                this.blinkInactive = blinkInactive;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            getHashCode: function () {
                var h = Bridge.addHash([3804934414, this.text, this.backColor, this.textColor, this.blinkActiveTime, this.blinkInactive]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, Pidroh.TextRendering.BlinkAnim.BlinkData)) {
                    return false;
                }
                return Bridge.equals(this.text, o.text) && Bridge.equals(this.backColor, o.backColor) && Bridge.equals(this.textColor, o.textColor) && Bridge.equals(this.blinkActiveTime, o.blinkActiveTime) && Bridge.equals(this.blinkInactive, o.blinkInactive);
            },
            $clone: function (to) {
                var s = to || new Pidroh.TextRendering.BlinkAnim.BlinkData();
                s.text = this.text;
                s.backColor = this.backColor;
                s.textColor = this.textColor;
                s.blinkActiveTime = this.blinkActiveTime;
                s.blinkInactive = this.blinkInactive;
                return s;
            }
        }
    });

    Bridge.define("Pidroh.TextRendering.CharByCharAnimation.CharByCharData", {
        $kind: "nested class",
        fields: {
            charStart: 0,
            charEnd: 0
        },
        ctors: {
            ctor: function (charStart, charEnd) {
                this.$initialize();
                this.charStart = charStart;
                this.charEnd = charEnd;
            }
        }
    });

    Bridge.define("Pidroh.TextRendering.PositionAnimation.PositionData", {
        $kind: "nested struct",
        statics: {
            methods: {
                getDefaultValue: function () { return new Pidroh.TextRendering.PositionAnimation.PositionData(); }
            }
        },
        fields: {
            permanent: false,
            startPosition: null,
            endPosition: null
        },
        ctors: {
            init: function () {
                this.startPosition = new Pidroh.TextRendering.Vector2D();
                this.endPosition = new Pidroh.TextRendering.Vector2D();
            },
            $ctor1: function (startPosition, endPosition, perm) {
                if (perm === void 0) { perm = false; }

                this.$initialize();
                this.startPosition = startPosition.$clone();
                this.endPosition = endPosition.$clone();
                this.permanent = perm;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            getHashCode: function () {
                var h = Bridge.addHash([5256985096, this.permanent, this.startPosition, this.endPosition]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, Pidroh.TextRendering.PositionAnimation.PositionData)) {
                    return false;
                }
                return Bridge.equals(this.permanent, o.permanent) && Bridge.equals(this.startPosition, o.startPosition) && Bridge.equals(this.endPosition, o.endPosition);
            },
            $clone: function (to) {
                var s = to || new Pidroh.TextRendering.PositionAnimation.PositionData();
                s.permanent = this.permanent;
                s.startPosition = this.startPosition.$clone();
                s.endPosition = this.endPosition.$clone();
                return s;
            }
        }
    });

    Bridge.define("Pidroh.TextRendering.BlinkAnim", {
        inherits: [Pidroh.TextRendering.TextAnimation$1(Pidroh.TextRendering.BlinkAnim.BlinkData)],
        methods: {
            Modify$2: function (entity, mainData, progress, length) {
                Pidroh.TextRendering.TextAnimation$1(Pidroh.TextRendering.BlinkAnim.BlinkData).prototype.Modify$2.call(this, entity, mainData, progress, length);
                var aux = progress;
                var blink = true;
                while (true) {
                    if (blink) {
                        aux -= mainData.blinkActiveTime;
                    } else {
                        aux -= mainData.blinkInactive;
                    }
                    if (aux < 0) {
                        break;
                    } else {
                        blink = !blink;
                    }
                }
                if (!blink) {
                    entity.animation.SetAll(mainData.text, mainData.textColor, mainData.backColor);
                }
            }
        }
    });

    Bridge.define("Pidroh.TextRendering.CharByCharAnimation", {
        inherits: [Pidroh.TextRendering.TextAnimation$1(Pidroh.TextRendering.CharByCharAnimation.CharByCharData)],
        methods: {
            Modify$2: function (entity, mainData, progress, length) {
                Pidroh.TextRendering.TextAnimation$1(Pidroh.TextRendering.CharByCharAnimation.CharByCharData).prototype.Modify$2.call(this, entity, mainData, progress, length);
                var ratio = progress / length;
                var lengthText = (mainData.charEnd - mainData.charStart) | 0;
                for (var i = mainData.charStart; i < mainData.charEnd; i = (i + 1) | 0) {
                    var offseted = i;
                    var line = 0;
                    var tb = entity.animation;
                    while (offseted >= tb.Width) {
                        line = (line + 1) | 0;
                        offseted = (offseted - tb.Width) | 0;
                    }
                    if (i > ((lengthText * ratio) + mainData.charStart)) {
                        tb.DrawChar(32, offseted, line);
                        //tb.Draw("" + i, 6, 5, 1);

                    }
                }
            }
        }
    });

    Bridge.define("Pidroh.TextRendering.PositionAnimation", {
        inherits: [Pidroh.TextRendering.TextAnimation$1(Pidroh.TextRendering.PositionAnimation.PositionData)],
        methods: {
            Modify$2: function (entity, mainData, progress, length) {
                Pidroh.TextRendering.TextAnimation$1(Pidroh.TextRendering.PositionAnimation.PositionData).prototype.Modify$2.call(this, entity, mainData, progress, length);
                var target = entity.animation;
                if (mainData.permanent) {
                    target = entity.Origin;
                }
                target.Position = Pidroh.TextRendering.Vector2D.InterpolateRounded(mainData.startPosition.$clone(), mainData.endPosition.$clone(), progress / length);

            }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJCcmlkZ2VCdWlsZC5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiQXBwLmNzIiwiQXBwVGV4dEdhbWUuY3MiLCIuLi9Ob3ZlbEFwcC9EaWFsb2dOYXJyYXRpb25TY3JlZW4uY3MiLCIuLi9Ob3ZlbEFwcC9TdHJpbmdUb1Bhc3NhZ2UuY3MiLCIuLi9Ob3ZlbEJhc2UvVGV4dFRhZ1JlYWRlci5jcyIsIi4uL05vdmVsQmFzZS9UYWdUb0RhdGEuY3MiLCIuLi9Ob3ZlbEJhc2UvVGVzdFN0b3JpZXMuY3MiLCIuLi9Ob3ZlbEJhc2UvVGV4dFJlbmRlci5jcyIsIi4uL05vdmVsQmFzZS9UZXh0UmVuZGVyRHluYW1pYy5jcyIsIi4uLy4uLy4uLy4uL1R1cm5CYXNlZC9WaXN1YWxTdHVkaW9Tb2x1dGlvbi9UZXh0UmVuZGVyaW5nTG9naWMvVGV4dFdvcmxkLmNzIiwiLi4vLi4vLi4vLi4vVHVybkJhc2VkL1Zpc3VhbFN0dWRpb1NvbHV0aW9uL1RleHRSZW5kZXJpbmdMb2dpYy9QYWxldHRlLmNzIiwiLi4vLi4vLi4vLi4vVHVybkJhc2VkL1Zpc3VhbFN0dWRpb1NvbHV0aW9uL1RleHRSZW5kZXJpbmdMb2dpYy9UZXh0Qm9hcmQuY3MiLCIuLi8uLi8uLi8uLi9UdXJuQmFzZWQvVmlzdWFsU3R1ZGlvU29sdXRpb24vQmFzZVV0aWxzL1ZlY3RvcjJELmNzIiwiLi4vTm92ZWxBcHAvSVRleHRTY3JlZW5OLmNzIiwiLi4vTm92ZWxBcHAvVGV4dFJlbmRlclRlc3RzLmNzIiwiLi4vTm92ZWxBcHAvVGV4dFJlbmRlclRvU2NyZWVuLmNzIiwiLi4vTm92ZWxBcHAvR2VuZXJpY1RleHRNZW51LmNzIiwiLi4vLi4vLi4vLi4vVHVybkJhc2VkL1Zpc3VhbFN0dWRpb1NvbHV0aW9uL1RleHRSZW5kZXJpbmdMb2dpYy9CbGlua0FuaW1hdGlvbi5jcyIsIi4uLy4uLy4uLy4uL1R1cm5CYXNlZC9WaXN1YWxTdHVkaW9Tb2x1dGlvbi9UZXh0UmVuZGVyaW5n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bWw1O1xyXG51c2luZyBOZXd0b25zb2Z0Lkpzb247XHJcbnVzaW5nIE5vdmVsQXBwO1xyXG51c2luZyBQaWRyb2guTm92ZWxCYXNlO1xyXG51c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZztcclxuXHJcbi8vdXNpbmcgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIEJyaWRnZUJ1aWxkXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBBcHBcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBpbnQgYnVmZmVyO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGJvb2wgYnVmZmVyT247XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVGV4dFJlbmRlclRlc3RzIG5vdmVsTWFpbjtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBUZXh0Qm9hcmQgVGV4dEJvYXJkO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHN0cmluZ1tdIGNvbG9ycztcclxuXHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTWFpbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zdCBpbnQgVyA9IDQ1O1xyXG4gICAgICAgICAgICBjb25zdCBpbnQgSCA9IDE0O1xyXG5cclxuICAgICAgICAgICAgLy9uZXcgQXBwVGV4dEdhbWUobmV3IERpYWxvZ05hcnJhdG9pblNjcmVlblRlc3RHYW1lKCkpLlN0YXJ0KDQwLCAxNCk7XHJcbiAgICAgICAgICAgIC8vbmV3IEFwcFRleHRHYW1lKG5ldyBEaWFsb2dOYXJyYXRvaW5Db250cm9sVGVzdEdhbWUoKSkuU3RhcnQoNDAsIDE0KTtcclxuICAgICAgICAgICAgbmV3IEFwcFRleHRHYW1lKG5ldyBUZXh0UmVuZGVyVGVzdHMoKSkuU3RhcnQoNDAsIDE0KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgLy9ub3ZlbE1haW4gPSBuZXcgTm92ZWxNYWluKCkuSW5pdCg1MCwgMjApO1xyXG4gICAgICAgICAgICBUZXh0UmVuZGVyVGVzdHMgdGV4dFJlbmRlclRlc3RzID0gbmV3IFRleHRSZW5kZXJUZXN0cygpO1xyXG4gICAgICAgICAgICBub3ZlbE1haW4gPSB0ZXh0UmVuZGVyVGVzdHM7XHJcbiAgICAgICAgICAgIHRleHRSZW5kZXJUZXN0cy5Jbml0KFcsIEgpO1xyXG4gICAgICAgICAgICBjb2xvcnMgPSBEZWZhdWx0UGFsZXR0ZXMuQzRSZWFkZXIuSHRtbENvbG9ycztcclxuICAgICAgICAgICAgU2NyaXB0LkNhbGwoXCJzZXREaXNwbGF5U2l6ZVwiLCBXLCBIKTtcclxuXHJcbiAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoXCJHYW1lIFN0YXJ0XCIpO1xyXG4gICAgICAgICAgICAvL2NvbG9ycyA9IG5ldyBzdHJpbmdbMjBdO1xyXG5cclxuICAgICAgICAgICAgLy9mb3IgKGludCBpID0gMDsgaSA8IGNvbG9ycy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgLy97XHJcbiAgICAgICAgICAgIC8vICAgIC8vY29sb3JzW2ldID0gXCIjMWYyMDI2XCI7XHJcblxyXG4gICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgLy9jb2xvcnNbMV0gPSBcIiNmZmZmZmZcIjtcclxuXHJcbiAgICAgICAgICAgIHZhciBzdHlsZSA9IG5ldyBIVE1MU3R5bGVFbGVtZW50KCk7XHJcbiAgICAgICAgICAgIHN0eWxlLklubmVySFRNTCA9IFwiaHRtbCxib2R5IHtmb250LWZhbWlseTogQ291cmllcjsgYmFja2dyb3VuZC1jb2xvcjojMWYyNTI2OyBoZWlnaHQ6IDEwMCU7fVwiICsgXCJcXG4gI2NhbnZhcy1jb250YWluZXIge3dpZHRoOiAxMDAlOyBoZWlnaHQ6IDEwMCU7IHRleHQtYWxpZ246Y2VudGVyOyB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOyB9IFwiO1xyXG4gICAgICAgICAgICBEb2N1bWVudC5IZWFkLkFwcGVuZENoaWxkKHN0eWxlKTtcclxuICAgICAgICAgICAgYnVmZmVyID0gOTtcclxuICAgICAgICAgICAgYnVmZmVyT24gPSBmYWxzZTsgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBEb2N1bWVudC5PbktleVByZXNzICs9IChLZXlib2FyZEV2ZW50IGEpID0+IHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaW50IGNvZGUgPSBhLktleUNvZGU7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29kZSA9PSAwKSBjb2RlID0gYS5DaGFyQ29kZTtcclxuICAgICAgICAgICAgICAgIGJ1ZmZlciA9IGNvZGU7XHJcbiAgICAgICAgICAgICAgICBidWZmZXJPbiA9IHRydWU7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBVcGRhdGVHYW1lKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBBZnRlciBidWlsZGluZyAoQ3RybCArIFNoaWZ0ICsgQikgdGhpcyBwcm9qZWN0LCBcclxuICAgICAgICAgICAgLy8gYnJvd3NlIHRvIHRoZSAvYmluL0RlYnVnIG9yIC9iaW4vUmVsZWFzZSBmb2xkZXIuXHJcblxyXG4gICAgICAgICAgICAvLyBBIG5ldyBicmlkZ2UvIGZvbGRlciBoYXMgYmVlbiBjcmVhdGVkIGFuZFxyXG4gICAgICAgICAgICAvLyBjb250YWlucyB5b3VyIHByb2plY3RzIEphdmFTY3JpcHQgZmlsZXMuIFxyXG5cclxuICAgICAgICAgICAgLy8gT3BlbiB0aGUgYnJpZGdlL2luZGV4Lmh0bWwgZmlsZSBpbiBhIGJyb3dzZXIgYnlcclxuICAgICAgICAgICAgLy8gUmlnaHQtQ2xpY2sgPiBPcGVuIFdpdGguLi4sIHRoZW4gY2hvb3NlIGFcclxuICAgICAgICAgICAgLy8gd2ViIGJyb3dzZXIgZnJvbSB0aGUgbGlzdFxyXG5cclxuICAgICAgICAgICAgLy8gVGhpcyBhcHBsaWNhdGlvbiB3aWxsIHRoZW4gcnVuIGluIGEgYnJvd3Nlci5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHZvaWQgVXBkYXRlR2FtZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgc2NyZWVuID0gbm92ZWxNYWluLlNjcmVlbkhvbGRlci5TY3JlZW47XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zdCBmbG9hdCBkZWx0YSA9IDAuMDMzZjtcclxuICAgICAgICAgICAgbm92ZWxNYWluLlVwZGF0ZShkZWx0YSk7XHJcbiAgICAgICAgICAgIFRleHRCb2FyZCA9IHNjcmVlbi5HZXRCb2FyZCgpO1xyXG4gICAgICAgICAgICBzY3JlZW4uVXBkYXRlKGRlbHRhKTtcclxuICAgICAgICAgICAgLy9nci5EcmF3KDAuMDMzZik7XHJcblxyXG4gICAgICAgICAgICAvL3NjcmVlbi5VcGRhdGUoZGVsdGEpO1xyXG4gICAgICAgICAgICBpZiAoYnVmZmVyT24pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNjcmVlbi5JbnB1dFVuaWNvZGUgPSBidWZmZXI7XHJcblxyXG4gICAgICAgICAgICAgICAgYnVmZmVyT24gPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNjcmVlbi5JbnB1dFVuaWNvZGUgPSAtMTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgU2NyaXB0LkNhbGwoXCJjbGVhclwiKTtcclxuICAgICAgICAgICAgRHJhd1RleHRCb2FyZCgpO1xyXG5cclxuICAgICAgICAgICAgV2luZG93LlNldFRpbWVvdXQoKGdsb2JhbDo6U3lzdGVtLkFjdGlvbilVcGRhdGVHYW1lLCAzMyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyB2b2lkIERyYXdUZXh0Qm9hcmQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaiA9IDA7IGogPCBUZXh0Qm9hcmQuSGVpZ2h0OyBqKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgVGV4dEJvYXJkLldpZHRoOyBpKyspXHJcbiAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGludCB0YyA9IFRleHRCb2FyZC5UZXh0Q29sb3JbaSwgal07XHJcbiAgICAgICAgICAgICAgICAgICAgaW50IHRiID0gVGV4dEJvYXJkLkJhY2tDb2xvcltpLCBqXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGMgPCAwKSB0YyA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRiIDwgMCkgdGIgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0cmluZyBjb2xvcjEgPSBjb2xvcnNbdGNdO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHN0cmluZyBjb2xvckJhY2sgPSBjb2xvcnNbdGJdO1xyXG4gICAgICAgICAgICAgICAgICAgIFNjcmlwdC5DYWxsKFwiZHJhd1wiLCBpLCBqLCBjb2xvcjEsIGNvbG9yQmFjaywgXCJcIiArIFRleHRCb2FyZC5DaGFyQXQoaSwgaikpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIEJyaWRnZTtcclxudXNpbmcgQnJpZGdlLkh0bWw1O1xyXG51c2luZyBOZXd0b25zb2Z0Lkpzb247XHJcbnVzaW5nIE5vdmVsQXBwO1xyXG51c2luZyBQaWRyb2guTm92ZWxCYXNlO1xyXG51c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZztcclxuXHJcbi8vdXNpbmcgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIEJyaWRnZUJ1aWxkXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBBcHBUZXh0R2FtZVxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgaW50IGJ1ZmZlcjtcclxuICAgICAgICBwcml2YXRlIGJvb2wgYnVmZmVyT247XHJcbiAgICAgICAgcHJpdmF0ZSBJVGV4dEdhbWUgZ2FtZTtcclxuICAgICAgICBwcml2YXRlIFRleHRCb2FyZCBUZXh0Qm9hcmQ7XHJcbiAgICAgICAgcHJpdmF0ZSBzdHJpbmdbXSBjb2xvcnM7XHJcblxyXG4gICAgICAgIHB1YmxpYyBBcHBUZXh0R2FtZShJVGV4dEdhbWUgbm92ZWxNYWluKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lID0gbm92ZWxNYWluO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU3RhcnQoaW50IFcsIGludCBIKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIC8vbm92ZWxNYWluID0gbmV3IE5vdmVsTWFpbigpLkluaXQoNTAsIDIwKTtcclxuICAgICAgICAgICAgZ2FtZS5Jbml0KFcsIEgpO1xyXG4gICAgICAgICAgICAvL25vdmVsTWFpbiA9IG5ldyBUZXh0UmVuZGVyVGVzdHMoKS5Jbml0KFcsIEgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgU2NyaXB0LkNhbGwoXCJzZXREaXNwbGF5U2l6ZVwiLCBXLCBIKTtcclxuXHJcbiAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoXCJHYW1lIFN0YXJ0XCIpO1xyXG4gICAgICAgICAgICAvL2NvbG9ycyA9IG5ldyBzdHJpbmdbMjBdO1xyXG5cclxuICAgICAgICAgICAgLy9mb3IgKGludCBpID0gMDsgaSA8IGNvbG9ycy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgLy97XHJcbiAgICAgICAgICAgIC8vICAgIC8vY29sb3JzW2ldID0gXCIjMWYyMDI2XCI7XHJcblxyXG4gICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgLy9jb2xvcnNbMV0gPSBcIiNmZmZmZmZcIjtcclxuXHJcbiAgICAgICAgICAgIHZhciBzdHlsZSA9IG5ldyBIVE1MU3R5bGVFbGVtZW50KCk7XHJcbiAgICAgICAgICAgIHN0eWxlLklubmVySFRNTCA9IFwiaHRtbCxib2R5IHtmb250LWZhbWlseTogQ291cmllcjsgYmFja2dyb3VuZC1jb2xvcjojMWYyNTI2OyBoZWlnaHQ6IDEwMCU7fVwiICsgXCJcXG4gI2NhbnZhcy1jb250YWluZXIge3dpZHRoOiAxMDAlOyBoZWlnaHQ6IDEwMCU7IHRleHQtYWxpZ246Y2VudGVyOyB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOyB9IFwiO1xyXG4gICAgICAgICAgICBEb2N1bWVudC5IZWFkLkFwcGVuZENoaWxkKHN0eWxlKTtcclxuICAgICAgICAgICAgYnVmZmVyID0gOTtcclxuICAgICAgICAgICAgYnVmZmVyT24gPSBmYWxzZTsgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBEb2N1bWVudC5PbktleVByZXNzICs9IChLZXlib2FyZEV2ZW50IGEpID0+IHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaW50IGNvZGUgPSBhLktleUNvZGU7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29kZSA9PSAwKSBjb2RlID0gYS5DaGFyQ29kZTtcclxuICAgICAgICAgICAgICAgIGJ1ZmZlciA9IGNvZGU7XHJcbiAgICAgICAgICAgICAgICBidWZmZXJPbiA9IHRydWU7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBVcGRhdGVHYW1lKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBBZnRlciBidWlsZGluZyAoQ3RybCArIFNoaWZ0ICsgQikgdGhpcyBwcm9qZWN0LCBcclxuICAgICAgICAgICAgLy8gYnJvd3NlIHRvIHRoZSAvYmluL0RlYnVnIG9yIC9iaW4vUmVsZWFzZSBmb2xkZXIuXHJcblxyXG4gICAgICAgICAgICAvLyBBIG5ldyBicmlkZ2UvIGZvbGRlciBoYXMgYmVlbiBjcmVhdGVkIGFuZFxyXG4gICAgICAgICAgICAvLyBjb250YWlucyB5b3VyIHByb2plY3RzIEphdmFTY3JpcHQgZmlsZXMuIFxyXG5cclxuICAgICAgICAgICAgLy8gT3BlbiB0aGUgYnJpZGdlL2luZGV4Lmh0bWwgZmlsZSBpbiBhIGJyb3dzZXIgYnlcclxuICAgICAgICAgICAgLy8gUmlnaHQtQ2xpY2sgPiBPcGVuIFdpdGguLi4sIHRoZW4gY2hvb3NlIGFcclxuICAgICAgICAgICAgLy8gd2ViIGJyb3dzZXIgZnJvbSB0aGUgbGlzdFxyXG5cclxuICAgICAgICAgICAgLy8gVGhpcyBhcHBsaWNhdGlvbiB3aWxsIHRoZW4gcnVuIGluIGEgYnJvd3Nlci5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBVcGRhdGVHYW1lKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBzY3JlZW4gPSBnYW1lLlNjcmVlbkhvbGRlci5TY3JlZW47XHJcbiAgICAgICAgICAgIGNvbG9ycyA9IGdhbWUuR2V0UGFsZXR0ZSgpLkh0bWxDb2xvcnM7XHJcbiAgICAgICAgICAgIGNvbnN0IGZsb2F0IGRlbHRhID0gMC4wMzNmO1xyXG4gICAgICAgICAgICBnYW1lLlVwZGF0ZShkZWx0YSk7XHJcbiAgICAgICAgICAgIFRleHRCb2FyZCA9IHNjcmVlbi5HZXRCb2FyZCgpO1xyXG4gICAgICAgICAgICBzY3JlZW4uVXBkYXRlKGRlbHRhKTtcclxuICAgICAgICAgICAgLy9nci5EcmF3KDAuMDMzZik7XHJcblxyXG4gICAgICAgICAgICAvL3NjcmVlbi5VcGRhdGUoZGVsdGEpO1xyXG4gICAgICAgICAgICBpZiAoYnVmZmVyT24pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNjcmVlbi5JbnB1dFVuaWNvZGUgPSBidWZmZXI7XHJcblxyXG4gICAgICAgICAgICAgICAgYnVmZmVyT24gPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNjcmVlbi5JbnB1dFVuaWNvZGUgPSAtMTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgU2NyaXB0LkNhbGwoXCJjbGVhclwiKTtcclxuICAgICAgICAgICAgRHJhd1RleHRCb2FyZCgpO1xyXG5cclxuICAgICAgICAgICAgV2luZG93LlNldFRpbWVvdXQoKGdsb2JhbDo6U3lzdGVtLkFjdGlvbilVcGRhdGVHYW1lLCAzMyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgRHJhd1RleHRCb2FyZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBqID0gMDsgaiA8IFRleHRCb2FyZC5IZWlnaHQ7IGorKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBUZXh0Qm9hcmQuV2lkdGg7IGkrKylcclxuICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaW50IHRjID0gVGV4dEJvYXJkLlRleHRDb2xvcltpLCBqXTtcclxuICAgICAgICAgICAgICAgICAgICBpbnQgdGIgPSBUZXh0Qm9hcmQuQmFja0NvbG9yW2ksIGpdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YyA8IDApIHRjID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGIgPCAwKSB0YiA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RyaW5nIGNvbG9yMSA9IGNvbG9yc1t0Y107XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgc3RyaW5nIGNvbG9yQmFjayA9IGNvbG9yc1t0Yl07XHJcbiAgICAgICAgICAgICAgICAgICAgU2NyaXB0LkNhbGwoXCJkcmF3XCIsIGksIGosIGNvbG9yMSwgY29sb3JCYWNrLCBcIlwiICsgVGV4dEJvYXJkLkNoYXJBdChpLCBqKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFBpZHJvaC5Ob3ZlbEJhc2U7XHJcbnVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nO1xyXG5cclxubmFtZXNwYWNlIE5vdmVsQXBwXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBEaWFsb2dOYXJyYXRpb25TY3JlZW4gOiBJVGV4dFNjcmVlblxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgY29uc3QgaW50IE5hcnJhdGlvblN0YXRlID0gMTtcclxuICAgICAgICBwcml2YXRlIGNvbnN0IGludCBEaWFsb2dTdGF0ZSA9IDI7XHJcbiAgICAgICAgcHJpdmF0ZSBUZXh0V29ybGQgd29ybGQ7XHJcbiAgICAgICAgcHJpdmF0ZSBUZXh0RW50aXR5IGRpYWxvZ0U7XHJcbiAgICAgICAgcHJpdmF0ZSBUZXh0RW50aXR5IG5hcnJhdGlvbkU7XHJcbiAgICAgICAgcHJpdmF0ZSBDaGFyQnlDaGFyQW5pbWF0aW9uIGNoYXJCeUNoYXJBbmltO1xyXG4gICAgICAgIFN0cmluZ1RvUGFzc2FnZUl0ZXJhdG9yIHBhc3NhZ2VJdGVyYXRvcjtcclxuICAgICAgICBwcml2YXRlIGludCBtb2RlO1xyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBJbml0KGludCB3LCBpbnQgaClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHdvcmxkID0gbmV3IFRleHRXb3JsZCgpO1xyXG4gICAgICAgICAgICB3b3JsZC5wYWxldHRlID0gRGVmYXVsdFBhbGV0dGVzLkM0Tm92ZWw7XHJcbiAgICAgICAgICAgIHdvcmxkLkluaXQodywgaCk7XHJcbiAgICAgICAgICAgIGRpYWxvZ0UgPSB3b3JsZC5HZXRGcmVlRW50aXR5KHctMiwgNCk7XHJcbiAgICAgICAgICAgIGRpYWxvZ0UuU2V0UG9zaXRpb24oMSwgaC00KTtcclxuICAgICAgICAgICAgbmFycmF0aW9uRSA9IHdvcmxkLkdldEZyZWVFbnRpdHkody0yLCBoLTYpO1xyXG4gICAgICAgICAgICBuYXJyYXRpb25FLlNldFBvc2l0aW9uKDEsMSk7XHJcbiAgICAgICAgICAgIGNoYXJCeUNoYXJBbmltID0gbmV3IENoYXJCeUNoYXJBbmltYXRpb24oKTtcclxuICAgICAgICAgICAgd29ybGQuQWRkQW5pbWF0aW9uPGdsb2JhbDo6UGlkcm9oLlRleHRSZW5kZXJpbmcuQ2hhckJ5Q2hhckFuaW1hdGlvbj4oY2hhckJ5Q2hhckFuaW0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGludCBJbnB1dFVuaWNvZGUgeyBzZXQ7IGdldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGROYXJyYXRpb24oc3RyaW5nIG4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtb2RlID0gTmFycmF0aW9uU3RhdGU7XHJcbiAgICAgICAgICAgIFBhc3NhZ2lmeShuKTtcclxuICAgICAgICAgICAgaWYgKG5hcnJhdGlvbkUuT3JpZ2luLkN1cnNvclggIT0gMCB8fCBuYXJyYXRpb25FLk9yaWdpbi5DdXJzb3JZICE9IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hcnJhdGlvbkUuT3JpZ2luLkN1cnNvck5ld0xpbmUoMCk7XHJcbiAgICAgICAgICAgICAgICBuYXJyYXRpb25FLk9yaWdpbi5DdXJzb3JOZXdMaW5lKDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChuYXJyYXRpb25FLk9yaWdpbi5DYW5EcmF3X0N1cnNvcl9TbWFydExpbmVCcmVhayhuKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFycmF0aW9uRS5SZXNldEZ1bGwoKTtcclxuICAgICAgICAgICAgICAgIG5hcnJhdGlvbkUuT3JpZ2luLlNldEN1cnNvckF0KDAsIDApO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBTaG93UGFzc2FnZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIFNob3dQYXNzYWdlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBwYXNzYWdlSW5kZXhlcyA9IHBhc3NhZ2VJdGVyYXRvci5DdXJyZW50UGFzc2FnZSgpO1xyXG4gICAgICAgICAgICBBZGROYXJyYXRpb25QYXNzYWdlKHBhc3NhZ2VJdGVyYXRvci5HZXRUZXh0KCksIHBhc3NhZ2VJbmRleGVzLlhJbnQsIHBhc3NhZ2VJbmRleGVzLllJbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIFBhc3NhZ2lmeShzdHJpbmcgbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHBhc3NhZ2VJdGVyYXRvciA9IFN0cmluZ1RvUGFzc2FnZUZhY3RvcnkuUG9wdWxhdGUocGFzc2FnZUl0ZXJhdG9yLCBuKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBBZGROYXJyYXRpb25QYXNzYWdlKHN0cmluZyBuLCBpbnQgc3RhcnQsIGludCBlbmQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIGN1cnNvclIgPSBuYXJyYXRpb25FLk9yaWdpbi5EcmF3X0N1cnNvcl9TbWFydExpbmVCcmVhayhuLCAyLCBzdGFydCwgZW5kKTtcclxuICAgICAgICAgICAgY2hhckJ5Q2hhckFuaW0uQWRkKG5hcnJhdGlvbkUuQW5pbUJhc2Uobi5MZW5ndGggKiAwLjAwNWYpLCBuZXcgQ2hhckJ5Q2hhckFuaW1hdGlvbi5DaGFyQnlDaGFyRGF0YShjdXJzb3JSLlN0YXJ0SW5kZXgsIGN1cnNvclIuRW5kSW5kZXgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkZERpYWxvZyhzdHJpbmcgc3BlYWtlciwgc3RyaW5nIHRleHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtb2RlID0gRGlhbG9nU3RhdGU7XHJcbiAgICAgICAgICAgIGRpYWxvZ0UuT3JpZ2luLlNldEFsbCgnICcsIDAsIDEpO1xyXG4gICAgICAgICAgICBkaWFsb2dFLk9yaWdpbi5EcmF3KHNwZWFrZXIsIDAsMCwgMik7XHJcbiAgICAgICAgICAgIGRpYWxvZ0UuT3JpZ2luLlNldEN1cnNvckF0KDAsMSk7XHJcbiAgICAgICAgICAgIGRpYWxvZ0UuT3JpZ2luLkRyYXdfQ3Vyc29yX1NtYXJ0TGluZUJyZWFrKHRleHQsIDIpO1xyXG4gICAgICAgICAgICBjaGFyQnlDaGFyQW5pbS5BZGQoZGlhbG9nRS5BbmltQmFzZSh0ZXh0Lkxlbmd0aCAqIDAuMDA1ZiksIG5ldyBDaGFyQnlDaGFyQW5pbWF0aW9uLkNoYXJCeUNoYXJEYXRhKGRpYWxvZ0UuT3JpZ2luLldpZHRoLCB0ZXh0Lkxlbmd0aCsgZGlhbG9nRS5PcmlnaW4uV2lkdGgpKTtcclxuICAgICAgICAgICAgLy9kaWFsb2dFLk9yaWdpbi5EcmF3KHRleHQsIDAsMSwgMik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dEJvYXJkIEdldEJvYXJkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB3b3JsZC5tYWluQm9hcmQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBVcGRhdGUoZmxvYXQgZilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHdvcmxkLkRyYXcoKTtcclxuICAgICAgICAgICAgd29ybGQuQWR2YW5jZVRpbWUoZik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIEhpZGVEaWFsb2coKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZGlhbG9nRS5PcmlnaW4uU2V0QWxsKCcgJywgMCwgVGV4dEJvYXJkLklOVklTSUJMRUNPTE9SKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIGJvb2wgSXNEb25lKClcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gd29ybGQuSXNEb25lKCkgJiYgKHBhc3NhZ2VJdGVyYXRvcj09IG51bGwgfHwgcGFzc2FnZUl0ZXJhdG9yLklzRG9uZSgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgQWR2YW5jZVJlcXVlc3QoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKCF3b3JsZC5Jc0RvbmUoKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgd29ybGQuQWR2YW5jZVRpbWUoOTk5Zik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgcGFzc2FnZUl0ZXJhdG9yLkFkdmFuY2UoKTtcclxuICAgICAgICAgICAgICAgIFNob3dQYXNzYWdlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cbiAgICBcbnByaXZhdGUgaW50IF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19JbnB1dFVuaWNvZGU9LTE7fVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBEaWFsb2dOYXJyYXRpb25TY3JlZW5Db250cm9sXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBzdHJpbmcgdGV4dDtcclxuICAgICAgICBwcml2YXRlIFRhZ0luZm9Ib2xkZXIgdGFnSW5mbztcclxuICAgICAgICBpbnQgdGFnSW5kZXg7XHJcbiAgICAgICAgRGlhbG9nTmFycmF0aW9uU2NyZWVuIHNjcmVlbjtcclxuICAgICAgICBwdWJsaWMgRGljdGlvbmFyeTxjaGFyLCBzdHJpbmc+IFNwZWFrZXJEYXRhID0gbmV3IERpY3Rpb25hcnk8Y2hhciwgc3RyaW5nPigpO1xyXG4gICAgICAgIHB1YmxpYyBib29sIERvbmUgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBib29sIE5hcnJhdGlvbk9ubHk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBEaWFsb2dOYXJyYXRpb25TY3JlZW5Db250cm9sKERpYWxvZ05hcnJhdGlvblNjcmVlbiBzY3JlZW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnNjcmVlbiA9IHNjcmVlbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNldFRleHQoc3RyaW5nIHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0ID0gdC5SZXBsYWNlKFwiJVwiLCBcIlxcXCJcIikuUmVwbGFjZShcIlxcclwiLCBcIlwiKTtcclxuICAgICAgICAgICAgVGV4dFRhZ1JlYWRlciB0dHIgPSBuZXcgVGV4dFRhZ1JlYWRlcigpO1xyXG4gICAgICAgICAgICB0aGlzLnRleHQgPSBudWxsO1xyXG4gICAgICAgICAgICB0YWdJbmZvID0gdHRyLkV4dHJhY3RUYWdJbmZvKHQsIG91dCB0aGlzLnRleHQpO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiB0YWdJbmZvLlRhZ3MpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoXCJUQUdcIik7XHJcbiAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKHRoaXMudGV4dC5TdWJzdHJpbmcoaXRlbS5TdGFydCwgaXRlbS5FbmQgLSBpdGVtLlN0YXJ0KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNob3dOZXh0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICghc2NyZWVuLklzRG9uZSgpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzY3JlZW4uQWR2YW5jZVJlcXVlc3QoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGFnSW5mby5UYWdzLkNvdW50IDw9IHRhZ0luZGV4KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBEb25lID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIHRhZyA9IHRhZ0luZm8uVGFnc1t0YWdJbmRleF07XHJcbiAgICAgICAgICAgIGJvb2wgY2hhcmFUYWcgPSB0YWcuTGFiZWxJbmRleElzKCdjJywgMCk7XHJcbiAgICAgICAgICAgIGlmIChjaGFyYVRhZyAmJiAhTmFycmF0aW9uT25seSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RyaW5nIHNwZWFrZXIgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgaWYgKFNwZWFrZXJEYXRhLlRyeUdldFZhbHVlKHRhZy5HZXRMYWJlbENoYXIoMSksIG91dCBzcGVha2VyKSlcclxuICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3BlYWtlciA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzdHJpbmcgdGV4dDEgPSB0ZXh0LlN1YnN0cmluZyh0YWcuU3RhcnQsIHRhZy5FbmQtIHRhZy5TdGFydCk7XHJcbiAgICAgICAgICAgICAgICBzY3JlZW4uQWRkRGlhbG9nKHNwZWFrZXIsIHRleHQxKTtcclxuICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZSh0ZXh0MSk7XHJcbiAgICAgICAgICAgICAgICAvL3NjcmVlbi5BZGREaWFsb2coXCJzXCIsIFwiYmJiYlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGFnLkxhYmVsSW5kZXhJcygnbicsIDApIHx8IE5hcnJhdGlvbk9ubHkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGludCBsZW5ndGggPSB0YWcuRW5kIC0gdGFnLlN0YXJ0O1xyXG4gICAgICAgICAgICAgICAgaWYgKGxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBzdHJpbmcgdGV4dDEgPSB0ZXh0LlN1YnN0cmluZyh0YWcuU3RhcnQsIGxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoYXJhVGFnICYmIE5hcnJhdGlvbk9ubHkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nIHNwZWFrZXIgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoU3BlYWtlckRhdGEuVHJ5R2V0VmFsdWUodGFnLkdldExhYmVsQ2hhcigxKSwgb3V0IHNwZWFrZXIpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BlYWtlciA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDEgPSBzcGVha2VyICsgXCI6IFwiICsgdGV4dDE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHNjcmVlbi5BZGROYXJyYXRpb24odGV4dDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcmVlbi5IaWRlRGlhbG9nKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZSh0ZXh0MSk7XHJcbiAgICAgICAgICAgICAgICAvL3NjcmVlbi5BZGREaWFsb2coXCJzXCIsIFwiYmJiYlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0YWdJbmRleCsrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBUcnlBZHZhbmNlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChzY3JlZW4uSW5wdXRVbmljb2RlID49IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFNob3dOZXh0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIERpYWxvZ05hcnJhdG9pbkNvbnRyb2xUZXN0R2FtZSA6IElUZXh0R2FtZVxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgRGlhbG9nTmFycmF0aW9uU2NyZWVuQ29udHJvbCBkbnNjO1xyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dFNjcmVlbkhvbGRlciBTY3JlZW5Ib2xkZXIgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUGFsZXR0ZSBHZXRQYWxldHRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBEZWZhdWx0UGFsZXR0ZXMuQzROb3ZlbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEluaXQoaW50IHcsIGludCBoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGRucyA9IG5ldyBEaWFsb2dOYXJyYXRpb25TY3JlZW4oKTtcclxuICAgICAgICAgICAgZG5zLkluaXQodywgaCk7XHJcbiAgICAgICAgICAgIFNjcmVlbkhvbGRlci5TY3JlZW4gPSBkbnM7XHJcblxyXG4gICAgICAgICAgICBkbnNjID0gbmV3IERpYWxvZ05hcnJhdGlvblNjcmVlbkNvbnRyb2woZG5zKTtcclxuICAgICAgICAgICAgZG5zYy5TZXRUZXh0KFN0b3JpZXMuc3Rvcnk0KTtcclxuLy8gICAgICAgICAgICBkbnNjLlNldFRleHQoQFwiI2NtV2VsY29tZSBiYWNrLCBkZWFyLlxyXG4vLyNjbUhvdyB3YXMgc2Nob29sIHRvZGF5P1xyXG4vLyNubldoeSB3b24ndCB0aGlzIHdvcms/XHJcbi8vc1wiKTtcclxuICAgICAgICAgICAgZG5zYy5TcGVha2VyRGF0YS5BZGQoJ20nLCBcIk1vbVwiKTtcclxuICAgICAgICAgICAgZG5zYy5TcGVha2VyRGF0YS5BZGQoJ3AnLCBcIlNhcmFcIik7XHJcbiAgICAgICAgICAgIGRuc2MuU2hvd05leHQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFVwZGF0ZShmbG9hdCBkZWx0YSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRuc2MuVHJ5QWR2YW5jZSgpO1xyXG4gICAgICAgIH1cclxuXG4gICAgXG5wcml2YXRlIFRleHRTY3JlZW5Ib2xkZXIgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX1NjcmVlbkhvbGRlcj1uZXcgVGV4dFNjcmVlbkhvbGRlcigpO31cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgRGlhbG9nTmFycmF0b2luU2NyZWVuVGVzdEdhbWUgOiBJVGV4dEdhbWVcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgVGV4dFNjcmVlbkhvbGRlciBTY3JlZW5Ib2xkZXIgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUGFsZXR0ZSBHZXRQYWxldHRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBEZWZhdWx0UGFsZXR0ZXMuQzROb3ZlbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEluaXQoaW50IHcsIGludCBoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGRucyA9IG5ldyBEaWFsb2dOYXJyYXRpb25TY3JlZW4oKTtcclxuICAgICAgICAgICAgZG5zLkluaXQodywgaCk7XHJcbiAgICAgICAgICAgIFNjcmVlbkhvbGRlci5TY3JlZW4gPSBkbnM7XHJcbiAgICAgICAgICAgIGRucy5BZGROYXJyYXRpb24oXCJkYXNkc2FkZGRkZGRkZGRkZGRkZGRkZCAgZGFzZHNhZCAgICAgICBkc2Fkc1wiKTtcclxuICAgICAgICAgICAgZG5zLkFkZERpYWxvZyhcIk1vbVwiLCBcIldoYXQ/XCIpO1xyXG4gICAgICAgICAgICBDb25zb2xlLldyaXRlKFwic3NzXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVXBkYXRlKGZsb2F0IGRlbHRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cbiAgICBcbnByaXZhdGUgVGV4dFNjcmVlbkhvbGRlciBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fU2NyZWVuSG9sZGVyPW5ldyBUZXh0U2NyZWVuSG9sZGVyKCk7fVxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBOb3ZlbEFwcFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgU3RyaW5nVG9QYXNzYWdlXHJcbiAgICB7XHJcbiAgICAgICAgaW50ZXJuYWwgTGlzdDxpbnQ+IFBhc3NhZ2VJbmRleGVzID0gbmV3IExpc3Q8aW50PigpO1xyXG4gICAgICAgIGludGVybmFsIHN0cmluZyBUZXh0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBTdHJpbmdUb1Bhc3NhZ2VJdGVyYXRvclxyXG4gICAge1xyXG5cclxuICAgICAgICBpbnRlcm5hbCBTdHJpbmdUb1Bhc3NhZ2UgU3RyaW5nVG9QYXNzYWdlO1xyXG4gICAgICAgIGludCBwcm9ncmVzcztcclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWR2YW5jZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwcm9ncmVzcysrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFZlY3RvcjJEIEN1cnJlbnRQYXNzYWdlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmVjdG9yMkQoXHJcbiAgICAgICAgICAgICAgICBTdHJpbmdUb1Bhc3NhZ2UuUGFzc2FnZUluZGV4ZXNbcHJvZ3Jlc3NdKzEsIFN0cmluZ1RvUGFzc2FnZS5QYXNzYWdlSW5kZXhlc1twcm9ncmVzcyArIDFdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgR2V0VGV4dCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gU3RyaW5nVG9QYXNzYWdlLlRleHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBJc0RvbmUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFN0cmluZ1RvUGFzc2FnZS5QYXNzYWdlSW5kZXhlcy5Db3VudCA8PSBwcm9ncmVzcyArIDI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFJlc2V0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFN0cmluZ1RvUGFzc2FnZS5QYXNzYWdlSW5kZXhlcy5DbGVhcigpO1xyXG4gICAgICAgICAgICBwcm9ncmVzcyA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBTdHJpbmdUb1Bhc3NhZ2VGYWN0b3J5XHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBTdHJpbmdUb1Bhc3NhZ2VJdGVyYXRvciBQb3B1bGF0ZShTdHJpbmdUb1Bhc3NhZ2VJdGVyYXRvciBpdGVyYXRvciwgc3RyaW5nIHRleHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoaXRlcmF0b3IgPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaXRlcmF0b3IgPSBuZXcgU3RyaW5nVG9QYXNzYWdlSXRlcmF0b3IoKTtcclxuICAgICAgICAgICAgICAgIGl0ZXJhdG9yLlN0cmluZ1RvUGFzc2FnZSA9IG5ldyBTdHJpbmdUb1Bhc3NhZ2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpdGVyYXRvci5SZXNldCgpO1xyXG4gICAgICAgICAgICBpdGVyYXRvci5TdHJpbmdUb1Bhc3NhZ2UuVGV4dCA9IHRleHQ7XHJcbiAgICAgICAgICAgIHZhciBwYXNzYWdlTWFya2VycyA9IGl0ZXJhdG9yLlN0cmluZ1RvUGFzc2FnZS5QYXNzYWdlSW5kZXhlcztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHBhc3NhZ2VNYXJrZXJzLkFkZCgtMSk7XHJcbiAgICAgICAgICAgIGJvb2wgb3BlbkFzcGFzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGludCBsYXN0U3RvcCA9IC0xMDtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB0ZXh0Lkxlbmd0aCAtIDE7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGkgLSBsYXN0U3RvcCA8IDIpXHJcbiAgICAgICAgICAgICAgICAvL2lmKGZhbHNlKVxyXG4gICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCh0ZXh0W2ldID09ICcuJyAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAodGV4dFtpICsgMV0gIT0gJy4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiB0ZXh0W2kgKyAxXSAhPSAnXCInXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiB0ZXh0W2kgKyAxXSAhPSAnXFxuJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgdGV4dFtpICsgMV0gIT0gJ1xccicpKSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhc3NhZ2VNYXJrZXJzLkFkZChpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFN0b3AgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGV4dFtpXSA9PSAnXCInKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3BlbkFzcGFzID0gIW9wZW5Bc3BhcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFvcGVuQXNwYXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhc3NhZ2VNYXJrZXJzLkFkZChpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTdG9wID0gaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGV4dFtpXSA9PSAnXFxuJylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhc3NhZ2VNYXJrZXJzLkFkZChpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFN0b3AgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwYXNzYWdlTWFya2Vycy5BZGQodGV4dC5MZW5ndGggLSAxKTtcclxuICAgICAgICAgICAgcmV0dXJuIGl0ZXJhdG9yO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guTm92ZWxCYXNlXHJcbntcclxuXHJcblxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBUZXh0VGFnUmVhZGVyXHJcbiAgICB7XHJcblxyXG4gICAgICAgIExpc3Q8VGFnSW5mbz4gdGFnc09wZW5lZCA9IG5ldyBMaXN0PFRhZ0luZm8+KCk7XHJcbiAgICAgICAgU3RyaW5nQnVpbGRlciBhdXggPSBuZXcgU3RyaW5nQnVpbGRlcigpO1xyXG4gICAgICAgIHB1YmxpYyBib29sIEVuZFBhc3NhZ2VPbkFzcGFzID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgcHVibGljIFRhZ0luZm9Ib2xkZXIgRXh0cmFjdFRhZ0luZm8oc3RyaW5nIHRleHQsIG91dCBzdHJpbmcgdGFnbGVzc1RleHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBhdXguTGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgdGFnc09wZW5lZC5DbGVhcigpO1xyXG4gICAgICAgICAgICB2YXIgdGloID0gbmV3IFRhZ0luZm9Ib2xkZXIoKTtcclxuICAgICAgICAgICAgaW50IHJlbW92ZWRUYWdPZmZzZXQgPSAwO1xyXG4gICAgICAgICAgICBib29sIGFzcGFzT3BlbmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgdGV4dC5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRleHRbaV0gPT0gJyMnKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFRhZ0luZm8gdGkgPSBuZXcgVGFnSW5mbyhpIC0gcmVtb3ZlZFRhZ09mZnNldCwgdGV4dFtpICsgMV0sIHRleHRbaSArIDJdKTtcclxuICAgICAgICAgICAgICAgICAgICB0aWguVGFncy5BZGQodGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRhZ3NPcGVuZWQuQWRkKHRpKTtcclxuICAgICAgICAgICAgICAgICAgICByZW1vdmVkVGFnT2Zmc2V0ICs9IDM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBib29sIGVuZERldGVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpZiAodGV4dFtpXSA9PSAnXCInKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChFbmRQYXNzYWdlT25Bc3BhcyAmJiBhc3Bhc09wZW5lZClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZERldGVjdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYXNwYXNPcGVuZWQgPSAhYXNwYXNPcGVuZWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRleHRbaV0gPT0gJ1xcbicgfHwgZW5kRGV0ZWN0ZWQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gdGFnc09wZW5lZClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uRW5kID0gaSAtIHJlbW92ZWRUYWdPZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRhZ3NPcGVuZWQuQ2xlYXIoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHRleHQuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICh0ZXh0W2ldID09ICcjJylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpICs9IDI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXV4LkFwcGVuZCh0ZXh0W2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0YWdsZXNzVGV4dCA9IGF1eC5Ub1N0cmluZygpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGloO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgVGFnSW5mb0hvbGRlclxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBMaXN0PFRhZ0luZm8+IFRhZ3MgPSBuZXcgTGlzdDxUYWdJbmZvPigpO1xyXG5cclxuICAgICAgICBpbnRlcm5hbCBUYWdJbmZvIEdldFRhZ09mSW5kZXgoaW50IGNoYXJJbmRleCwgaW50IHRhZ051bWJlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCB0TiA9IDA7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIFRhZ3MpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLlZhbGlkRm9yUG9zaXRpb24oY2hhckluZGV4KSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGFnTnVtYmVyID09IHROKSByZXR1cm4gaXRlbTtcclxuICAgICAgICAgICAgICAgICAgICB0TisrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgVGFnSW5mb1xyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBpbnQgU3RhcnQ7XHJcbiAgICAgICAgcHVibGljIGludCBFbmQ7XHJcbiAgICAgICAgY2hhcltdIFRhZyA9IG5ldyBjaGFyWzJdO1xyXG5cclxuICAgICAgICBwdWJsaWMgVGFnSW5mbyhpbnQgc3RhcnQsIGNoYXIgY2hhcjEsIGNoYXIgY2hhcjIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBUYWdbMF0gPSBjaGFyMTtcclxuICAgICAgICAgICAgVGFnWzFdID0gY2hhcjI7XHJcbiAgICAgICAgICAgIHRoaXMuU3RhcnQgPSBzdGFydDtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBzdGF0aWMgVGFnSW5mbyBGcm9tTGFiZWwoY2hhciB2MSwgY2hhciB2MilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVGFnSW5mbygwLCB2MSwgdjIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgY2hhciBHZXRMYWJlbENoYXIoaW50IHYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gVGFnW3ZdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgYm9vbCBMYWJlbEluZGV4SXMoY2hhciB2MSwgaW50IHYyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFRhZ1t2Ml0gPT0gdjE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBib29sIFNhbWVMYWJlbChUYWdJbmZvIHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gVGFnWzBdID09IHQuVGFnWzBdICYmIFRhZ1sxXSA9PSB0LlRhZ1sxXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIGJvb2wgVmFsaWRGb3JQb3NpdGlvbihpbnQgY2hhckluZGV4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNoYXJJbmRleCA+PSBTdGFydCAmJiBjaGFySW5kZXggPD0gRW5kO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIiwiXHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Ob3ZlbEJhc2Vcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFRhZ1RvRGF0YTxUPlxyXG4gICAge1xyXG4gICAgICAgIExpc3Q8VGFnSW5mbz4gdGFncyA9IG5ldyBMaXN0PFRhZ0luZm8+KCk7XHJcbiAgICAgICAgTGlzdDxUPiBkYXRhcyA9IG5ldyBMaXN0PFQ+KCk7XHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkRGF0YShUYWdJbmZvIHRhZywgVCBkYXRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZGF0YXMuQWRkKGRhdGEpO1xyXG4gICAgICAgICAgICB0YWdzLkFkZCh0YWcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFQgR2V0RGF0YShUYWdJbmZvIHRhZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBHZXREYXRhKHRhZywgZGVmYXVsdChUKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVCBHZXREYXRhKFRhZ0luZm8gdGFnLCBUIGRlZmF1bHRWKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB0YWdzLkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICh0YWcuU2FtZUxhYmVsKHRhZ3NbaV0pKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhc1tpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZGVmYXVsdFY7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guTm92ZWxCYXNlXHJcbntcclxuICAgIHB1YmxpYyBzdGF0aWMgY2xhc3MgVGVzdFN0b3JpZXNcclxuICAgIHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgc3RyaW5nIGdvdCA9IEBcIiUjY3BXZSBzaG91bGQgc3RhcnQgYmFjaywlIEdhcmVkIHVyZ2VkIGFzIHRoZSB3b29kcyBiZWdhbiB0byBncm93IGRhcmsgYXJvdW5kIHRoZW0uICVUaGUgd2lsZGxpbmdzIGFyZSBkZWFkLiUgXHJcbiVEbyB0aGUgZGVhZCBmcmlnaHRlbiB5b3U/JSBTZXIgV2F5bWFyIFJveWNlIGFza2VkIHdpdGgganVzdCB0aGUgaGludCBvZiBhIHNtaWxlLlxyXG5HYXJlZCBkaWQgbm90IHJpc2UgdG8gdGhlIGJhaXQuIEhlIHdhcyBhbiBvbGQgbWFuLCBwYXN0IGZpZnR5LCBhbmQgaGUgaGFkIHNlZW4gdGhlIGxvcmRsaW5ncyBjb21lIGFuZCBnby4gJURlYWQgaXMgZGVhZCwlIGhlIHNhaWQuICVXZSBoYXZlIG5vIGJ1c2luZXNzIHdpdGggdGhlIGRlYWQuJVxyXG4lQXJlIHRoZXkgZGVhZD8lIFJveWNlIGFza2VkIHNvZnRseS4gJVdoYXQgcHJvb2YgaGF2ZSB3ZT8lXHJcbiVXaWxsIHNhdyB0aGVtLCUgR2FyZWQgc2FpZC4gJUlmIGhlIHNheXMgdGhleSBhcmUgZGVhZCwgdGhhdOKAmXMgcHJvb2YgZW5vdWdoIGZvciBtZS4lXHJcbldpbGwgaGFkIGtub3duIHRoZXkgd291bGQgZHJhZyBoaW0gaW50byB0aGUgcXVhcnJlbCBzb29uZXIgb3IgbGF0ZXIuIEhlIHdpc2hlZCBpdCBoYWQgYmVlbiBsYXRlciByYXRoZXIgdGhhbiBzb29uZXIuICVNeSBtb3RoZXIgdG9sZCBtZSB0aGF0IGRlYWQgbWVuIHNpbmcgbm8gc29uZ3MsJSBoZSBwdXQgaW4uXHJcbiVNeSB3ZXQgbnVyc2Ugc2FpZCB0aGUgc2FtZSB0aGluZywgV2lsbCwlIFJveWNlIHJlcGxpZWQuICVOZXZlciBiZWxpZXZlIGFueXRoaW5nIHlvdSBoZWFyIGF0IGEgd29tYW7igJlzIHRpdC4gVGhlcmUgYXJlIHRoaW5ncyB0byBiZSBsZWFybmVkIGV2ZW4gZnJvbSB0aGUgZGVhZC4lIEhpcyB2b2ljZSBlY2hvZWQsIHRvbyBsb3VkIGluIHRoZSB0d2lsaXQgZm9yZXN0LlwiO1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHN0cmluZyBHb3QgeyBnZXQgeyByZXR1cm4gZ290LlJlcGxhY2UoXCIlXCIsXCJcXFwiXCIpOyB9XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBnb3QgPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Ob3ZlbEJhc2Vcclxue1xyXG4gICAgLypcclxuICAgICAqIFxyXG4gICAgICogQSBjbGFzcyB0byBzaG93IHRleHQgY2hhciBieSBjaGFyLiBBbGwgdGV4dCBoYXMgdG8gYmUgaW5zZXJ0ZWQgb24gdGhlIHNldHVwIHBoYXNlLlxyXG4gICAgICogQ2hhcnMgY2FuIGJlIHNob3duIHRpY2sgYnkgdGljayBvciB0aHJvdWdoIGFuIHVwZGF0ZSBmdW5jdGlvbi4gXHJcbiAgICAgKiBDYWxjdWxhdGVzIHBhc3NhZ2UgYnJlYWtzLCBsaW5lIGJyZWFrcyBhbmQgcGFnZSBicmVha3NcclxuICAgICAqIFxyXG4gICAgICogTWFya2VkIGFzIG9ic29sZXRlIGJlY2F1c2Ugb3RoZXIgY2xhc3NlcyB3aWxsIGRvIHdoYXQgaXQgZG9lcyBiZXR0ZXIgYnV0IHdpdGggZHluYW1pYyB0ZXh0IGluc2VydGlvblxyXG4gICAgICovXHJcbiAgICBbT2Jzb2xldGVdXHJcbiAgICBwdWJsaWMgY2xhc3MgVGV4dFJlbmRlclxyXG4gICAge1xyXG5cclxuICAgICAgICBpbnQgaW5kZXhlciA9IDA7XHJcbiAgICAgICAgaW50IGxpbmVicmVha3NQcm9ncmVzc2VkID0gMDtcclxuICAgICAgICBpbnQgeCA9IDA7XHJcbiAgICAgICAgTGlzdDxpbnQ+IHBhc3NhZ2VNYXJrZXJzID0gbmV3IExpc3Q8aW50PigpO1xyXG4gICAgICAgIHB1YmxpYyBUZXh0RW50aXR5IFRleHRIb2xkZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBUYWdJbmZvSG9sZGVyIHRhZ0luZm87XHJcbiAgICAgICAgcHJpdmF0ZSBzdHJpbmcgdGV4dDtcclxuICAgICAgICBwdWJsaWMgVGV4dFdvcmxkIHRleHRXb3JsZDtcclxuICAgICAgICBwcml2YXRlIExpc3Q8aW50PiBsaW5lQnJlYWtzO1xyXG4gICAgICAgIHByaXZhdGUgTGlzdDxpbnQ+IHBhZ2VCcmVha3MgPSBuZXcgTGlzdDxpbnQ+KCk7XHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgY2hhckluZGV4O1xyXG4gICAgICAgIHByaXZhdGUgYm9vbCBwYXNzYWdlRG9uZTtcclxuICAgICAgICBmbG9hdCB0aW1lT2ZDaGFyID0gMC4wMmY7XHJcbiAgICAgICAgZmxvYXQgdGltZUJ1ZmZlcjtcclxuICAgICAgICBpbnQgYmFja2dyb3VuZENvbG9yRGVmYXVsdCA9IERlZmF1bHRQYWxldHRlcy5DNEJsYWNrO1xyXG4gICAgICAgIGludCB0ZXh0Q29sb3JEZWZhdWx0ID0gRGVmYXVsdFBhbGV0dGVzLkM0V2hpdGU7XHJcblxyXG4gICAgICAgIHB1YmxpYyBUYWdUb0RhdGE8aW50PiBUYWdUb0NvbG9yID0gbmV3IFRhZ1RvRGF0YTxpbnQ+KCk7XHJcbiAgICAgICAgcHJpdmF0ZSBib29sIHF1aWNrU2tpcDtcclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgRmluaXNoZWQgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgaW50IGxpbmVPZmZzZXQ7XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNldHVwKHN0cmluZyB0ZXh0LCBpbnQgd2lkdGgsIGludCBoZWlnaHQsIFRhZ0luZm9Ib2xkZXIgdGFnSW5mbylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMudGFnSW5mbyA9IHRhZ0luZm87XHJcbiAgICAgICAgICAgIHRoaXMudGV4dCA9IHRleHQ7XHJcbiAgICAgICAgICAgIHRleHRXb3JsZCA9IG5ldyBUZXh0V29ybGQoKTtcclxuICAgICAgICAgICAgaW50IGJ1ZmZlcldpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgICAgIGludCBidWZmZXJIZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgICAgIHRleHRXb3JsZC5Jbml0KGJ1ZmZlcldpZHRoIC0gMSwgYnVmZmVySGVpZ2h0IC0gMSk7XHJcbiAgICAgICAgICAgIFRleHRIb2xkZXIgPSB0ZXh0V29ybGQuR2V0RnJlZUVudGl0eShidWZmZXJXaWR0aCAtIDQsIGJ1ZmZlckhlaWdodCAtIDIpO1xyXG4gICAgICAgICAgICBUZXh0SG9sZGVyLlNldFBvc2l0aW9uKDIsIDEpO1xyXG4gICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKGdvdCk7XHJcbiAgICAgICAgICAgIC8vQ29uc29sZS5SZWFkS2V5KCk7XHJcblxyXG4gICAgICAgICAgICAjcmVnaW9uIG1lc3NhZ2UgcGFjaW5nIG1hcmtlclxyXG5cclxuICAgICAgICAgICAgcGFzc2FnZU1hcmtlcnMuQWRkKC0xKTtcclxuICAgICAgICAgICAgYm9vbCBvcGVuQXNwYXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgaW50IGxhc3RTdG9wID0gLTEwO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHRleHQuTGVuZ3RoIC0gMTsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaSAtIGxhc3RTdG9wIDwgMilcclxuICAgICAgICAgICAgICAgIC8vaWYoZmFsc2UpXHJcbiAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoKHRleHRbaV0gPT0gJy4nICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICh0ZXh0W2kgKyAxXSAhPSAnLidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIHRleHRbaSArIDFdICE9ICdcIidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIHRleHRbaSArIDFdICE9ICdcXG4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiB0ZXh0W2kgKyAxXSAhPSAnXFxyJykpKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFzc2FnZU1hcmtlcnMuQWRkKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0U3RvcCA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZXh0W2ldID09ICdcIicpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVuQXNwYXMgPSAhb3BlbkFzcGFzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW9wZW5Bc3BhcylcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFzc2FnZU1hcmtlcnMuQWRkKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFN0b3AgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZXh0W2ldID09ICdcXG4nKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFzc2FnZU1hcmtlcnMuQWRkKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0U3RvcCA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgICAgICNyZWdpb24gbGluZWJyZWFrIG1hcmtlclxyXG4gICAgICAgICAgICBsaW5lQnJlYWtzID0gbmV3IExpc3Q8aW50PigpO1xyXG4gICAgICAgICAgICBpbnQgd2lzaGVkV2lkdGggPSBidWZmZXJXaWR0aCAtIDQ7XHJcbiAgICAgICAgICAgIGludCB4UG9zID0gMDtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB0ZXh0Lkxlbmd0aCAtIDE7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgeFBvcysrO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRleHRbaV0gPT0gJ1xcbicpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZUJyZWFrcy5BZGQoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZUJyZWFrcy5BZGQoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgeFBvcyA9IC0xO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRleHRbaV0gPT0gJyAnKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGludCB4UG9zQXV4ID0geFBvcyArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IGkgKyAxOyBqIDwgdGV4dC5MZW5ndGg7IGorKylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh4UG9zQXV4ID49IHdpc2hlZFdpZHRoIC0gMilcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVCcmVha3MuQWRkKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeFBvcyA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZXh0W2pdICE9ICcgJylcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeFBvc0F1eCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZXh0W2pdID09ICcgJylcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgICAgIC8vaWYgdGhlIGN1cnJlbnQgcGFzc2FnZSB3aWxsIGJyZWFrIHRocm91Z2ggdGhlIHBhZ2UsIG1ha2UgdGhlIHN0YXJ0IG9mIHRoZSBjdXJyZW50IHBhc3NhZ2UgYSBwYWdlYnJlYWtlclxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbnQgbGluZU9mZnNldCA9IDA7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAodHJ1ZSlcclxuICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaW50IGRhbmdlckxpbmUgPSBUZXh0SG9sZGVyLkhlaWdodCAtIDEgKyBsaW5lT2Zmc2V0O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGFuZ2VyTGluZSA8IGxpbmVCcmVha3MuQ291bnQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaW50IGxpbmVFbmRlciA9IGxpbmVCcmVha3NbZGFuZ2VyTGluZV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludCBsaW5lRW5kZXIyID0gOTk5OTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhbmdlckxpbmUgPCBsaW5lQnJlYWtzLkNvdW50IC0gMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZUVuZGVyMiA9IGxpbmVCcmVha3NbZGFuZ2VyTGluZSArIDFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnQgcGFzc2FnZSA9IC0xO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IGRhbmdlckxpbmUgLSAxOyBpID49IDA7IGktLSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhc3NhZ2VNYXJrZXJzLkNvbnRhaW5zKGxpbmVCcmVha3NbaV0pKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVPZmZzZXQgKz0gaSAtIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFzc2FnZSA9IGxpbmVCcmVha3NbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VCcmVha3MuQWRkKHBhc3NhZ2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZWNlaXZlSW5wdXQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHBhc3NhZ2VEb25lKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwYXNzYWdlRG9uZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcXVpY2tTa2lwID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFVwZGF0ZShmbG9hdCBkZWx0YSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRpbWVCdWZmZXIgKz0gZGVsdGE7XHJcbiAgICAgICAgICAgIGlmIChxdWlja1NraXApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRpbWVCdWZmZXIgKz0gMTAwO1xyXG4gICAgICAgICAgICAgICAgcXVpY2tTa2lwID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgd2hpbGUgKHRpbWVCdWZmZXIgPiB0aW1lT2ZDaGFyKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aW1lQnVmZmVyIC09IHRpbWVPZkNoYXI7XHJcbiAgICAgICAgICAgICAgICBUcnlEcmF3TmV4dENoYXIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVHJ5RHJhd05leHRDaGFyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICghcGFzc2FnZURvbmUpIERyYXdOZXh0Q2hhcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgRHJhd05leHRDaGFyKClcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICBib29sIERyYXdDaGFyID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHBhc3NhZ2VNYXJrZXJzLkNvdW50ID4gaW5kZXhlciArIDEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIERyYXdDaGFyID0gY2hhckluZGV4IDwgcGFzc2FnZU1hcmtlcnNbaW5kZXhlciArIDFdICsgMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoRHJhd0NoYXIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vd2hpbGUgKGxpbmVicmVha3NQcm9ncmVzc2VkIC0gbGluZU9mZnNldCA+PSBUZXh0SG9sZGVyLkhlaWdodClcclxuICAgICAgICAgICAgICAgIGlmIChwYWdlQnJlYWtzLkNvbnRhaW5zKGNoYXJJbmRleCkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZU9mZnNldCArPSBUZXh0SG9sZGVyLkhlaWdodCAtIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZU9mZnNldCA9IGxpbmVicmVha3NQcm9ncmVzc2VkO1xyXG4gICAgICAgICAgICAgICAgICAgIFRleHRIb2xkZXIuUmVzZXRGdWxsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgeCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZShcIlBBR0UgQlJFQUsgXCIgKyBjaGFySW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vQ29uc29sZS5SZWFkS2V5KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlKFwibnAgLSBcIitjaGFySW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgeCsrO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoYXJJbmRleCA+PSB0ZXh0Lkxlbmd0aClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBGaW5pc2hlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2hhciB2YWx1ZSA9IHRleHRbY2hhckluZGV4XTtcclxuICAgICAgICAgICAgICAgIGlmIChsaW5lQnJlYWtzLkNvbnRhaW5zKGNoYXJJbmRleCkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGxiIGluIGxpbmVCcmVha3MpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGIgPT0gY2hhckluZGV4KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lYnJlYWtzUHJvZ3Jlc3NlZCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB4ID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnQgdGFnTnVtYmVyID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBpbnQgdGV4dENvbG9yID0gdGV4dENvbG9yRGVmYXVsdDtcclxuICAgICAgICAgICAgICAgICAgICBUYWdJbmZvIHRpID0gdGFnSW5mby5HZXRUYWdPZkluZGV4KGNoYXJJbmRleCwgdGFnTnVtYmVyKTtcclxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAodGkgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludCBjb2xvciA9IFRhZ1RvQ29sb3IuR2V0RGF0YSh0aSwgLTEwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbG9yICE9IC0xMClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dENvbG9yID0gY29sb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFnTnVtYmVyKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpID0gdGFnSW5mby5HZXRUYWdPZkluZGV4KGNoYXJJbmRleCwgdGFnTnVtYmVyKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgVGV4dEhvbGRlci5PcmlnaW4uRHJhd0NoYXIodmFsdWUsIHgsIGxpbmVicmVha3NQcm9ncmVzc2VkIC0gbGluZU9mZnNldCwgdGV4dENvbG9yLCBiYWNrZ3JvdW5kQ29sb3JEZWZhdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0V29ybGQuRHJhdygpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjaGFySW5kZXgrKztcclxuICAgICAgICAgICAgICAgIHBhc3NhZ2VEb25lID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbmRleGVyKys7XHJcblxyXG4gICAgICAgICAgICAgICAgcGFzc2FnZURvbmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLlRleHRSZW5kZXJpbmc7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Ob3ZlbEJhc2Vcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFRleHRSZW5kZXJEeW5hbWljXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBUZXh0RW50aXR5IGVudGl0eTtcclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgSW5pdChUZXh0RW50aXR5IHRleHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmVudGl0eSA9IHRleHQ7XHJcbiAgICAgICAgICAgIHRleHQuT3JpZ2luLlNldEN1cnNvckF0KDAsMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBJbnNlcnRUZXh0KHN0cmluZyB0ZXh0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZW50aXR5Lk9yaWdpbi5EcmF3X0N1cnNvcih0ZXh0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnM7XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLlRleHRSZW5kZXJpbmdcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFRleHRXb3JsZFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBQYWxldHRlIHBhbGV0dGUgPSBEZWZhdWx0UGFsZXR0ZXMuQzRLaXJvS2F6ZTtcclxuICAgICAgICBMaXN0PFRleHRFbnRpdHk+IGFjdGl2ZUFnZW50cyA9IG5ldyBMaXN0PFRleHRFbnRpdHk+KCk7XHJcbiAgICAgICAgTGlzdDxUZXh0RW50aXR5PiBmcmVlQm9hcmRzID0gbmV3IExpc3Q8VGV4dEVudGl0eT4oKTtcclxuICAgICAgICBMaXN0PFRleHRBbmltYXRpb24+IGFuaW1hdGlvbnMgPSBuZXcgTGlzdDxUZXh0QW5pbWF0aW9uPigpO1xyXG4gICAgICAgIHB1YmxpYyBUZXh0Qm9hcmQgbWFpbkJvYXJkO1xyXG4gICAgICAgIGludCBsYXRlc3RJZCA9IC0xO1xyXG5cclxuICAgICAgICBwdWJsaWMgVCBBZGRBbmltYXRpb248VD4oVCB0YSkgd2hlcmUgVCA6IFRleHRBbmltYXRpb25cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGFuaW1hdGlvbnMuQWRkKHRhKTtcclxuICAgICAgICAgICAgdGEuUmVnaXN0ZXJMaXN0cygpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBJbml0KGludCB3aWR0aCwgaW50IGhlaWdodClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1haW5Cb2FyZCA9IG5ldyBUZXh0Qm9hcmQod2lkdGgsIGhlaWdodCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhdygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtYWluQm9hcmQuUmVzZXQoKTtcclxuICAgICAgICAgICAgRHJhd0NoaWxkcmVuKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3Q2hpbGRyZW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBhY3RpdmVBZ2VudHMuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYWN0aXZlQWdlbnRzW2ldLlJlc2V0QW5pbWF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgYW5pbSBpbiBhbmltYXRpb25zKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGFuaW0uTW9kaWZ5KGFjdGl2ZUFnZW50c1tpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYWN0aXZlQWdlbnRzW2ldLmZyZWVJZklkbGUgJiYgIWFjdGl2ZUFnZW50c1tpXS5hbmltYXRpbmcpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZnJlZUJvYXJkcy5BZGQoYWN0aXZlQWdlbnRzW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICBhY3RpdmVBZ2VudHMuUmVtb3ZlKGFjdGl2ZUFnZW50c1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaS0tO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG1haW5Cb2FyZC5JbnNlcnQoYWN0aXZlQWdlbnRzW2ldLmFuaW1hdGlvbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dEVudGl0eSBHZXRGcmVlRW50aXR5KGludCB3LCBpbnQgaClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFRleHRFbnRpdHkgdGU7XHJcbiAgICAgICAgICAgIGlmIChmcmVlQm9hcmRzLkNvdW50ID4gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGUgPSBmcmVlQm9hcmRzW2ZyZWVCb2FyZHMuQ291bnQgLSAxXTtcclxuICAgICAgICAgICAgICAgIGZyZWVCb2FyZHMuUmVtb3ZlQXQoZnJlZUJvYXJkcy5Db3VudCAtIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGUgPSBuZXcgVGV4dEVudGl0eSgpO1xyXG4gICAgICAgICAgICAgICAgdGUuaWQgPSArK2xhdGVzdElkO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYWN0aXZlQWdlbnRzLkFkZCh0ZSk7XHJcbiAgICAgICAgICAgIHRlLmZyZWVJZklkbGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGUuU2V0U2l6ZSh3LCBoKTtcclxuICAgICAgICAgICAgdGUuUmVzZXRGdWxsKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0RW50aXR5IEdldFRlbXBFbnRpdHkoaW50IHcsIGludCBoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHRlID0gR2V0RnJlZUVudGl0eSh3LCBoKTtcclxuICAgICAgICAgICAgdGUuZnJlZUlmSWRsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybiB0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkdmFuY2VUaW1lKGZsb2F0IHYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgYW5pbSBpbiBhbmltYXRpb25zKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBhbmltLlVwZGF0ZSh2KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgSXNEb25lKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBhbmltIGluIGFuaW1hdGlvbnMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICghYW5pbS5Jc0RvbmUoKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgVGV4dEVudGl0eVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBpbnQgaWQ7XHJcbiAgICAgICAgcHVibGljIFRleHRCb2FyZCBPcmlnaW47XHJcbiAgICAgICAgcHVibGljIFRleHRCb2FyZCBhbmltYXRpb247XHJcbiAgICAgICAgcHVibGljIGJvb2wgZnJlZUlmSWRsZSA9IGZhbHNlO1xyXG4gICAgICAgIGludGVybmFsIGJvb2wgYW5pbWF0aW5nO1xyXG5cclxuICAgICAgICBwdWJsaWMgaW50IEhlaWdodCB7IGdldCB7IHJldHVybiBPcmlnaW4uSGVpZ2h0OyB9IH1cclxuXHJcbiAgICAgICAgcHVibGljIFRleHRBbmltYXRpb24uQmFzZURhdGEgQW5pbUJhc2UoZmxvYXQgbGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBUZXh0QW5pbWF0aW9uLkJhc2VEYXRhKGxlbmd0aCwgMCwgaWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBSZXNldEFuaW1hdGlvbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBhbmltYXRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgYW5pbWF0aW9uLlNldChPcmlnaW4pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBSZXNldEZ1bGwoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgT3JpZ2luLlJlc2V0SW52aXNpYmxlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFNldFBvc2l0aW9uKGludCB4LCBpbnQgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE9yaWdpbi5Qb3NpdGlvbiA9IG5ldyBWZWN0b3IyRCh4LHkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBTZXRTaXplKGludCB3LCBpbnQgaClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChPcmlnaW4gPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgT3JpZ2luID0gbmV3IFRleHRCb2FyZCh3LCBoKTtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbiA9IG5ldyBUZXh0Qm9hcmQodywgaCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgT3JpZ2luLlJlc2l6ZSh3LCBoKTtcclxuICAgICAgICAgICAgYW5pbWF0aW9uLlJlc2l6ZSh3LCBoKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgUG9zaXRpb25BbmltYXRpb24gOiBUZXh0QW5pbWF0aW9uPFBvc2l0aW9uQW5pbWF0aW9uLlBvc2l0aW9uRGF0YT5cclxuICAgIHtcclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgTW9kaWZ5KFRleHRFbnRpdHkgZW50aXR5LCBQb3NpdGlvbkRhdGEgbWFpbkRhdGEsIGZsb2F0IHByb2dyZXNzLCBmbG9hdCBsZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLk1vZGlmeShlbnRpdHksIG1haW5EYXRhLCBwcm9ncmVzcywgbGVuZ3RoKTtcclxuICAgICAgICAgICAgVGV4dEJvYXJkIHRhcmdldCA9IGVudGl0eS5hbmltYXRpb247XHJcbiAgICAgICAgICAgIGlmIChtYWluRGF0YS5wZXJtYW5lbnQpXHJcbiAgICAgICAgICAgICAgICB0YXJnZXQgPSBlbnRpdHkuT3JpZ2luO1xyXG4gICAgICAgICAgICB0YXJnZXQuUG9zaXRpb24gPSBWZWN0b3IyRC5JbnRlcnBvbGF0ZVJvdW5kZWQobWFpbkRhdGEuc3RhcnRQb3NpdGlvbiwgbWFpbkRhdGEuZW5kUG9zaXRpb24sIHByb2dyZXNzIC8gbGVuZ3RoKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RydWN0IFBvc2l0aW9uRGF0YVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGJvb2wgcGVybWFuZW50O1xyXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgVmVjdG9yMkQgc3RhcnRQb3NpdGlvbiwgZW5kUG9zaXRpb247XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgUG9zaXRpb25EYXRhKFZlY3RvcjJEIHN0YXJ0UG9zaXRpb24sIFZlY3RvcjJEIGVuZFBvc2l0aW9uLCBib29sIHBlcm0gPSBmYWxzZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydFBvc2l0aW9uID0gc3RhcnRQb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgIHRoaXMuZW5kUG9zaXRpb24gPSBlbmRQb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgIHRoaXMucGVybWFuZW50ID0gcGVybTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgY2xhc3MgVGV4dEFuaW1hdGlvbjxUPiA6IFRleHRBbmltYXRpb25cclxuICAgIHtcclxuICAgICAgICBwcm90ZWN0ZWQgTGlzdDxUPiBtYWluRGF0YSA9IG5ldyBMaXN0PFQ+KCk7XHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgUmVxdWVzdFJlZ2lzdGVyTGlzdHMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYmFzZS5SZWdpc3Rlckxpc3QobWFpbkRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkKEJhc2VEYXRhIGJhc2VEYXRhLCBUIG1haW5EKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYmFzZS5BZGQoYmFzZURhdGEpO1xyXG4gICAgICAgICAgICBtYWluRGF0YS5BZGQobWFpbkQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgTW9kaWZ5KFRleHRFbnRpdHkgZW50aXR5LCBpbnQgaW5kZXgsIGZsb2F0IHByb2dyZXNzLCBmbG9hdCBsZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBNb2RpZnkoZW50aXR5LCBtYWluRGF0YVtpbmRleF0sIHByb2dyZXNzLCBsZW5ndGgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgdm9pZCBNb2RpZnkoVGV4dEVudGl0eSBlbnRpdHksIFQgbWFpbkRhdGEsIGZsb2F0IHByb2dyZXNzLCBmbG9hdCBsZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9pbnRlcm5hbCBvdmVycmlkZSB2b2lkIEV4ZWN1dGUoaW50IGluZGV4LCBCYXNlRGF0YSBiYXNlRGF0YSlcclxuICAgICAgICAvL3tcclxuICAgICAgICAvLyAgICB0aGlzLkV4ZWN1dGUobWFpbkRhdGFbaW5kZXhdLCBiYXNlRGF0YSk7XHJcbiAgICAgICAgLy99XHJcblxyXG4gICAgICAgIC8vcHVibGljIGFic3RyYWN0IHZvaWQgRXhlY3V0ZShUIG1haW5EYXRhLCBCYXNlRGF0YSBiYXNlRGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFic3RyYWN0IGNsYXNzIFRleHRBbmltYXRpb25cclxuICAgIHtcclxuXHJcbiAgICAgICAgcHVibGljIHN0cnVjdCBCYXNlRGF0YVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGZsb2F0IGxlbmd0aDtcclxuICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGZsb2F0IHByb2dyZXNzO1xyXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IHRhcmdldDtcclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBCYXNlRGF0YShmbG9hdCBsZW5ndGgsIGZsb2F0IHByb2dyZXNzLCBpbnQgdGFyZ2V0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3MgPSBwcm9ncmVzcztcclxuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIExpc3Q8ZmxvYXQ+IGxlbmd0aCA9IG5ldyBMaXN0PGZsb2F0PigpO1xyXG4gICAgICAgIExpc3Q8ZmxvYXQ+IHByb2dyZXNzID0gbmV3IExpc3Q8ZmxvYXQ+KCk7XHJcbiAgICAgICAgTGlzdDxpbnQ+IHRhcmdldHMgPSBuZXcgTGlzdDxpbnQ+KCk7XHJcbiAgICAgICAgTGlzdDxJTGlzdD4gbGlzdHMgPSBuZXcgTGlzdDxJTGlzdD4oKTtcclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVnaXN0ZXJMaXN0cygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsaXN0cy5BZGQobGVuZ3RoKTtcclxuICAgICAgICAgICAgbGlzdHMuQWRkKHByb2dyZXNzKTtcclxuICAgICAgICAgICAgbGlzdHMuQWRkKHRhcmdldHMpO1xyXG4gICAgICAgICAgICBSZXF1ZXN0UmVnaXN0ZXJMaXN0cygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGFic3RyYWN0IHZvaWQgUmVxdWVzdFJlZ2lzdGVyTGlzdHMoKTtcclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVXBkYXRlKGZsb2F0IGRlbHRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBwcm9ncmVzcy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwcm9ncmVzc1tpXSArPSBkZWx0YTtcclxuICAgICAgICAgICAgICAgIGlmIChwcm9ncmVzc1tpXSA+PSBsZW5ndGhbaV0pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgRW5kVGFzayhpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvL0V4ZWN1dGUoaSwgbmV3IEJhc2VEYXRhKGxlbmd0aFtpXSxwcm9ncmVzc1tpXSwgdGFyZ2V0c1tpXSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2ludGVybmFsIGFic3RyYWN0IHZvaWQgRXhlY3V0ZShpbnQgaW5kZXgsIEJhc2VEYXRhIGJhc2VEYXRhKTtcclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBBZGQoQmFzZURhdGEgYmQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwcm9ncmVzcy5BZGQoYmQucHJvZ3Jlc3MpO1xyXG4gICAgICAgICAgICB0YXJnZXRzLkFkZChiZC50YXJnZXQpO1xyXG4gICAgICAgICAgICBsZW5ndGguQWRkKGJkLmxlbmd0aCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBJc0RvbmUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gbGlzdHMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLkNvdW50ICE9IHByb2dyZXNzLkNvdW50KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0cmluZyBzID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBzLlRyaW0oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvZ3Jlc3MuQ291bnQgPT0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgRW5kVGFzayhpbnQgaSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBsIGluIGxpc3RzKVxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgbC5SZW1vdmVBdChpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBSZWdpc3Rlckxpc3QoSUxpc3QgbWFpbkRhdGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsaXN0cy5BZGQobWFpbkRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBNb2RpZnkoVGV4dEVudGl0eSBhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBwcm9ncmVzcy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYS5pZCA9PSB0YXJnZXRzW2ldKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIE1vZGlmeShhLCBpLCBwcm9ncmVzc1tpXSwgbGVuZ3RoW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICBhLmFuaW1hdGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIHZvaWQgTW9kaWZ5KFRleHRFbnRpdHkgZW50aXR5LCBpbnQgaW5kZXgsIGZsb2F0IHByb2dyZXNzLCBmbG9hdCBsZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guVGV4dFJlbmRlcmluZ1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgUGFsZXR0ZVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdHJpbmdbXSBIdG1sQ29sb3JzO1xyXG5cclxuXHJcbiAgICAgICAgcHVibGljIFBhbGV0dGUocGFyYW1zIHN0cmluZ1tdIGNvbG9ycylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEh0bWxDb2xvcnMgPSBjb2xvcnM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBEZWZhdWx0UGFsZXR0ZXNcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIFBhbGV0dGUgQzRLaXJvS2F6ZSA9IG5ldyBQYWxldHRlKFwiIzMzMmM1MFwiLCBcIiM0Njg3OGZcIiwgXCIjOTRlMzQ0XCIsIFwiI2UyZjNlNFwiKTtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIFBhbGV0dGUgQzRSZWFkZXIgPSBuZXcgUGFsZXR0ZShcIiMyNjI2MjZcIiwgXCIjOGI4Y2JhXCIsIFwiIzhiYmE5MVwiLCBcIiM2NDlmOGRcIik7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBQYWxldHRlIEM0Tm92ZWwgPSBuZXcgUGFsZXR0ZShcIiMyNjI2MjZcIiwgXCIjMzQyZDQxXCIsIFwiI2I4YjhiOFwiLCBcIiM4YjhjYmFcIik7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGludCBDNEJsYWNrID0gMDtcclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IEM0QmxhY2tOZXV0cmFsID0gMTtcclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IEM0V2hpdGVOZXV0cmFsID0gMjtcclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IEM0V2hpdGUgPSAzO1xyXG5cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLlRleHRSZW5kZXJpbmdcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFRleHRCb2FyZFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBjaGFyIE5PQ0hBTkdFQ0hBUiA9IChjaGFyKTE7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGNoYXIgSU5WSVNJQkxFQ0hBUiA9IChjaGFyKTI7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGludCBOT0NIQU5HRUNPTE9SID0gLTI7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGludCBJTlZJU0lCTEVDT0xPUiA9IC0xO1xyXG4gICAgICAgIGNoYXJbLF0gY2hhcnM7XHJcbiAgICAgICAgcHVibGljIGludFssXSBUZXh0Q29sb3IgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIGludFssXSBCYWNrQ29sb3IgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgLy9TdHJpbmdCdWlsZGVyIHN0cmluZ0J1aWxkZXIgPSBuZXcgU3RyaW5nQnVpbGRlcigpO1xyXG4gICAgICAgIGludCBjdXJzb3JYID0gMDtcclxuICAgICAgICBpbnQgY3Vyc29yWSA9IDA7XHJcbiAgICAgICAgcHVibGljIFZlY3RvcjJEIFBvc2l0aW9uIHsgZ2V0OyBzZXQ7IH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0Qm9hcmQoaW50IHdpZHRoLCBpbnQgaGVpZ2h0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9TZXRNYXhTaXplKHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICBSZXNpemUod2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3T25DZW50ZXIoc3RyaW5nIG1lc3NhZ2UsIGludCBjb2xvciwgaW50IHhPZmYgPSAwLCBpbnQgeU9mZiA9IDAsIGJvb2wgYWxpZ25TdHJpbmcgPSB0cnVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IHggPSAoV2lkdGgpIC8gMjtcclxuICAgICAgICAgICAgaWYgKGFsaWduU3RyaW5nKSB4IC09IG1lc3NhZ2UuTGVuZ3RoIC8gMjtcclxuICAgICAgICAgICAgaW50IHkgPSBIZWlnaHQgLyAyO1xyXG4gICAgICAgICAgICBEcmF3KG1lc3NhZ2UsIHggKyB4T2ZmLCB5ICsgeU9mZiwgY29sb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBTZXRNYXhTaXplKGludCB3aWR0aCwgaW50IGhlaWdodClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNoYXJzID0gbmV3IGNoYXJbd2lkdGgsIGhlaWdodF07XHJcbiAgICAgICAgICAgIFRleHRDb2xvciA9IG5ldyBpbnRbd2lkdGgsIGhlaWdodF07XHJcbiAgICAgICAgICAgIEJhY2tDb2xvciA9IG5ldyBpbnRbd2lkdGgsIGhlaWdodF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZXNldCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWQoJyAnLCAwLCAwLCBXaWR0aCwgSGVpZ2h0LCAwLCAwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlc2V0SW52aXNpYmxlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIERyYXdSZXBlYXRlZChJTlZJU0lCTEVDSEFSLCAwLCAwLCBXaWR0aCwgSGVpZ2h0LCBJTlZJU0lCTEVDT0xPUiwgSU5WSVNJQkxFQ09MT1IpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgV2lkdGggeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEluc2VydChUZXh0Qm9hcmQgc2Vjb25kQm9hcmQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHNlY29uZEJvYXJkLldpZHRoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSAwOyBqIDwgc2Vjb25kQm9hcmQuSGVpZ2h0OyBqKyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW50IHggPSAoaW50KXNlY29uZEJvYXJkLlBvc2l0aW9uLlggKyBpO1xyXG4gICAgICAgICAgICAgICAgICAgIGludCB5ID0gKGludClzZWNvbmRCb2FyZC5Qb3NpdGlvbi5ZICsgajtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2Vjb25kQm9hcmQuY2hhcnNbaSwgal0gIT0gSU5WSVNJQkxFQ0hBUilcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhcnNbeCwgeV0gPSBzZWNvbmRCb2FyZC5jaGFyc1tpLCBqXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2Vjb25kQm9hcmQuVGV4dENvbG9yW2ksIGpdICE9IElOVklTSUJMRUNPTE9SKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBUZXh0Q29sb3JbeCwgeV0gPSBzZWNvbmRCb2FyZC5UZXh0Q29sb3JbaSwgal07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlY29uZEJvYXJkLkJhY2tDb2xvcltpLCBqXSAhPSBJTlZJU0lCTEVDT0xPUilcclxuICAgICAgICAgICAgICAgICAgICAgICAgQmFja0NvbG9yW3gsIHldID0gc2Vjb25kQm9hcmQuQmFja0NvbG9yW2ksIGpdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaW50IEhlaWdodCB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgaW50IEN1cnNvclhcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBjdXJzb3JYOyB9XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjdXJzb3JYID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGludCBDdXJzb3JZIHsgZ2V0IHsgcmV0dXJuIGN1cnNvclk7IH1cclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGN1cnNvclkgPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd09uZURpZ2l0KGludCBpLCBpbnQgeCwgaW50IHksIGludCBjb2xvciA9IE5PQ0hBTkdFQ09MT1IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjaGFyIGMgPSAoY2hhcikoaSArICcwJyk7XHJcbiAgICAgICAgICAgIERyYXdDaGFyKGMsIHgsIHksIGNvbG9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgU2V0KFRleHRCb2FyZCBvcmlnaW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlBvc2l0aW9uID0gb3JpZ2luLlBvc2l0aW9uO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IFdpZHRoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSAwOyBqIDwgSGVpZ2h0OyBqKyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFyc1tpLCBqXSA9IG9yaWdpbi5jaGFyc1tpLCBqXTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkJhY2tDb2xvcltpLCBqXSA9IG9yaWdpbi5CYWNrQ29sb3JbaSwgal07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5UZXh0Q29sb3JbaSwgal0gPSBvcmlnaW4uVGV4dENvbG9yW2ksIGpdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFJlc2l6ZShpbnQgdywgaW50IGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoY2hhcnMgPT0gbnVsbCB8fCB3ID4gY2hhcnMuR2V0TGVuZ3RoKDApIHx8IGggPiBjaGFycy5HZXRMZW5ndGgoMSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFNldE1heFNpemUodywgaCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgV2lkdGggPSB3O1xyXG4gICAgICAgICAgICBIZWlnaHQgPSBoO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjaGFyIENoYXJBdChpbnQgaSwgaW50IGopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gY2hhcnNbaSwgal07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTZXRDdXJzb3JBdChpbnQgeCwgaW50IHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjdXJzb3JYID0geDtcclxuICAgICAgICAgICAgY3Vyc29yWSA9IHk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3X0N1cnNvcihzdHJpbmcgdilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBjIGluIHYpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIERyYXdfQ3Vyc29yKGMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3X0N1cnNvcihzdHJpbmcgdiwgaW50IGNvbG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGMgaW4gdilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRHJhd19DdXJzb3IoYywgY29sb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBib29sIENhbkRyYXdfQ3Vyc29yX1NtYXJ0TGluZUJyZWFrKHN0cmluZyB2KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IGN1cnJlbnRYID0gY3Vyc29yWDtcclxuICAgICAgICAgICAgaW50IGN1cnJlbnRZID0gY3Vyc29yWTtcclxuXHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgdi5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYm9vbCBsaW5lQnJlYWsgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGJvb2wgc2hvdWxkQ2hlY2tGb3JMaW5lQnJlYWtzID0gKGkgPT0gMCB8fCB2W2ldID09ICcgJykgJiYgaSAhPSB2Lkxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2hvdWxkQ2hlY2tGb3JMaW5lQnJlYWtzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSAxOyBqIDwgdi5MZW5ndGggLSBpOyBqKyspXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaiArIGN1cnJlbnRYID49IFdpZHRoKSAvL3JlYWNoIGVuZCBvZiB0aGUgbGluZSB3aXRob3V0IGVuZGluZyB0aGUgd29yZCwgc2hvdWxkIGxpbmUgYnJlYWtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZbaV0gPT0gJyAnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkrKzsgLy9za2lwIHRocm91Z2ggdGhlIHNwYWNlIGlmIGl0J3MgYSBuZXcgbGluZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZUJyZWFrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2W2kgKyBqXSA9PSAnICcpIC8vbmV3IHdvcmQgYmVnaW5zIHNvIG5vIG5lZWQgdG8gbGluZSBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChsaW5lQnJlYWspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFkrKztcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50WCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50WCsrO1xyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRYID49IFdpZHRoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRZKys7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFggPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRYID49IFdpZHRoIHx8IGN1cnJlbnRZID49IEhlaWdodCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBEcmF3Q3Vyc29yUmVzdWx0IERyYXdfQ3Vyc29yX1NtYXJ0TGluZUJyZWFrKHN0cmluZyB2LCBpbnQgY29sb3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgb2ZmU3RhcnQgPSAwO1xyXG4gICAgICAgICAgICBpbnQgb2ZmRW5kID0gdi5MZW5ndGggLSAxO1xyXG4gICAgICAgICAgICByZXR1cm4gRHJhd19DdXJzb3JfU21hcnRMaW5lQnJlYWsodiwgY29sb3IsIG9mZlN0YXJ0LCBvZmZFbmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIERyYXdDdXJzb3JSZXN1bHQgRHJhd19DdXJzb3JfU21hcnRMaW5lQnJlYWsoc3RyaW5nIHYsIGludCBjb2xvciwgaW50IG9mZlN0YXJ0LCBpbnQgb2ZmRW5kKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IGVuZEluZGV4ID0gb2ZmRW5kICsgMTtcclxuICAgICAgICAgICAgVmVjdG9yMkQgc3RhcnQgPSBuZXcgVmVjdG9yMkQoQ3Vyc29yWCwgQ3Vyc29yWSk7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSBvZmZTdGFydDsgaSA8IGVuZEluZGV4OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGludCBvcmlnaW5YID0gY3Vyc29yWDtcclxuICAgICAgICAgICAgICAgIGJvb2wgbGluZUJyZWFrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBib29sIHNob3VsZENoZWNrRm9yTGluZUJyZWFrcyA9IChpID09IDAgfHwgdltpXSA9PSAnICcpICYmIGkgIT0gZW5kSW5kZXggLSAxO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNob3VsZENoZWNrRm9yTGluZUJyZWFrcylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBqID0gMTsgaiA8IGVuZEluZGV4IC0gaTsgaisrKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGogKyBvcmlnaW5YID49IFdpZHRoKSAvL3JlYWNoIGVuZCBvZiB0aGUgbGluZSB3aXRob3V0IGVuZGluZyB0aGUgd29yZCwgc2hvdWxkIGxpbmUgYnJlYWtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZbaV0gPT0gJyAnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkrKzsgLy9za2lwIHRocm91Z2ggdGhlIHNwYWNlIGlmIGl0J3MgYSBuZXcgbGluZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZUJyZWFrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2W2kgKyBqXSA9PSAnICcpIC8vbmV3IHdvcmQgYmVnaW5zIHNvIG5vIG5lZWQgdG8gbGluZSBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChsaW5lQnJlYWspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgQ3Vyc29yTmV3TGluZSgwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIERyYXdfQ3Vyc29yKHZbaV0sIGNvbG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBWZWN0b3IyRCBlbmQgPSBuZXcgVmVjdG9yMkQoQ3Vyc29yWCwgQ3Vyc29yWSk7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgRHJhd0N1cnNvclJlc3VsdChQb3NpdGlvblRvSW5kZXgoc3RhcnQpLCBQb3NpdGlvblRvSW5kZXgoZW5kKSwgc3RhcnQsIGVuZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGludCBQb3NpdGlvblRvSW5kZXgoVmVjdG9yMkQgc3RhcnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKGludCkoc3RhcnQuWCArIHN0YXJ0LlkgKiBXaWR0aCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3T25lRGlnaXRfQ3Vyc29yKGludCBpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRHJhd19DdXJzb3IoKGNoYXIpKGkgKyAnMCcpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdfQ3Vyc29yKGNoYXIgYylcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICBEcmF3Q2hhcihjLCBjdXJzb3JYLCBjdXJzb3JZKTtcclxuICAgICAgICAgICAgQWR2YW5jZUN1cnNvcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd19DdXJzb3IoY2hhciBjLCBpbnQgY29sb3IpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgRHJhd0NoYXIoYywgY3Vyc29yWCwgY3Vyc29yWSwgY29sb3IpO1xyXG4gICAgICAgICAgICBBZHZhbmNlQ3Vyc29yKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgQWR2YW5jZUN1cnNvcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjdXJzb3JYKys7XHJcbiAgICAgICAgICAgIGlmIChjdXJzb3JYID49IFdpZHRoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjdXJzb3JYID0gMDtcclxuICAgICAgICAgICAgICAgIGN1cnNvclkrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQ3Vyc29yTmV3TGluZShpbnQgeClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGN1cnNvclkrKztcclxuICAgICAgICAgICAgY3Vyc29yWCA9IHg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3Q2hhcihjaGFyIHYsIGludCB4LCBpbnQgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAodiAhPSBOT0NIQU5HRUNIQVIpIHtcclxuICAgICAgICAgICAgICAgIGNoYXJzW3gsIHldID0gdjtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd0NoYXIoY2hhciB2LCBpbnQgeCwgaW50IHksIGludCBjb2xvciwgaW50IGJhY2tDb2xvciA9IE5PQ0hBTkdFQ09MT1IpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgRHJhd0NoYXIodiwgeCwgeSk7XHJcbiAgICAgICAgICAgIFNldENvbG9yKGNvbG9yLCB4LCB5KTtcclxuICAgICAgICAgICAgU2V0QmFja0NvbG9yKGJhY2tDb2xvciwgeCwgeSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFNldEFsbChjaGFyIHRleHQsIGludCB0ZXh0Q29sb3IsIGludCBiYWNrQ29sb3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWQodGV4dCwgMCwgMCwgV2lkdGgsIEhlaWdodCwgdGV4dENvbG9yLCBiYWNrQ29sb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd1dpdGhHcmlkKHN0cmluZyB0ZXh0LCBpbnQgeCwgaW50IHksIGludCBncmlkQ29sb3IsIGludCB0ZXh0Q29sb3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgd2lkdGggPSB0ZXh0Lkxlbmd0aDtcclxuICAgICAgICAgICAgRHJhd0dyaWQoeCwgeSwgd2lkdGggKyAyLCAzLCBncmlkQ29sb3IpO1xyXG4gICAgICAgICAgICBEcmF3KHRleHQsIHggKyAxLCB5ICsgMSwgdGV4dENvbG9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoc3RyaW5nIHYsIGludCB4LCBpbnQgeSwgaW50IGNvbG9yLCBpbnQgYmFja0NvbG9yID0gTk9DSEFOR0VDT0xPUilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgdi5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW50IHgyID0geCArIGk7XHJcbiAgICAgICAgICAgICAgICBpbnQgeTIgPSB5O1xyXG4gICAgICAgICAgICAgICAgaWYoeDIgPj0gV2lkdGgpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgeDIgLT0gV2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgeTIrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIERyYXdDaGFyKHZbaV0sIHgyLCB5MiwgY29sb3IsIGJhY2tDb2xvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoSUVudW1lcmFibGU8Y2hhcj4gdiwgaW50IHgsIGludCB5LCBpbnQgY29sb3IsIGludCBiYWNrQ29sb3IgPSBOT0NIQU5HRUNPTE9SKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkNvdW50PGNoYXI+KHYpOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIERyYXdDaGFyKFN5c3RlbS5MaW5xLkVudW1lcmFibGUuRWxlbWVudEF0PGNoYXI+KHYsaSksIHggKyBpLCB5LCBjb2xvciwgYmFja0NvbG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd0dyaWQoaW50IHgsIGludCB5LCBpbnQgd2lkdGgsIGludCBoZWlnaHQsIGludCBjb2xvcilcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWQoJ3wnLCB4LCB5LCAxLCBoZWlnaHQsIGNvbG9yKTtcclxuICAgICAgICAgICAgRHJhd1JlcGVhdGVkKCd8JywgeCArIHdpZHRoIC0gMSwgeSwgMSwgaGVpZ2h0LCBjb2xvcik7XHJcbiAgICAgICAgICAgIERyYXdSZXBlYXRlZCgnLScsIHgsIHksIHdpZHRoLCAxLCBjb2xvcik7XHJcbiAgICAgICAgICAgIERyYXdSZXBlYXRlZCgnLScsIHgsIHkgKyBoZWlnaHQgLSAxLCB3aWR0aCwgMSwgY29sb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd1JlcGVhdGVkKGNoYXIgYywgaW50IHgsIGludCB5LCBpbnQgd2lkdGgsIGludCBoZWlnaHQsIGludCBjb2xvciwgaW50IGJhY2tDb2xvciA9IE5PQ0hBTkdFQ09MT1IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0geDsgaSA8IHggKyB3aWR0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBqID0geTsgaiA8IHkgKyBoZWlnaHQ7IGorKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBEcmF3Q2hhcihjLCBpLCBqLCBjb2xvcik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFNldEJhY2tDb2xvcihiYWNrQ29sb3IsIGksIGopO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTZXRDb2xvcihpbnQgY29sb3IsIGludCB4LCBpbnQgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChjb2xvciAhPSBOT0NIQU5HRUNPTE9SKVxyXG4gICAgICAgICAgICAgICAgVGV4dENvbG9yW3gsIHldID0gY29sb3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTZXRCYWNrQ29sb3IoaW50IGNvbG9yLCBpbnQgeCwgaW50IHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoY29sb3IgIT0gTk9DSEFOR0VDT0xPUilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgQmFja0NvbG9yW3gsIHldID0gY29sb3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoc3RyaW5nIHYsIGludCB4MiwgaW50IHkyLCBvYmplY3QgaW5wdXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgTm90SW1wbGVtZW50ZWRFeGNlcHRpb24oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdHcmlkKGludCB2MSwgaW50IHYyLCBpbnQgdjMsIGludCB2NCwgb2JqZWN0IGJvYXJkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IE5vdEltcGxlbWVudGVkRXhjZXB0aW9uKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RydWN0IERyYXdDdXJzb3JSZXN1bHRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnQgU3RhcnRJbmRleDtcclxuICAgICAgICAgICAgcHVibGljIGludCBFbmRJbmRleDtcclxuICAgICAgICAgICAgcHVibGljIFZlY3RvcjJEIFN0YXJ0UG9zaXRpb247XHJcbiAgICAgICAgICAgIHB1YmxpYyBWZWN0b3IyRCBFbmRQb3NpdGlvbjtcclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBEcmF3Q3Vyc29yUmVzdWx0KGludCBzdGFydEluZGV4LCBpbnQgZW5kSW5kZXgsIFZlY3RvcjJEIHN0YXJ0UG9zaXRpb24sIFZlY3RvcjJEIGVuZFBvc2l0aW9uKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBTdGFydEluZGV4ID0gc3RhcnRJbmRleDtcclxuICAgICAgICAgICAgICAgIEVuZEluZGV4ID0gZW5kSW5kZXg7XHJcbiAgICAgICAgICAgICAgICBTdGFydFBvc2l0aW9uID0gc3RhcnRQb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgIEVuZFBvc2l0aW9uID0gZW5kUG9zaXRpb247XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuLy91c2luZyBTeXN0ZW0uRHJhd2luZztcclxudXNpbmcgU3lzdGVtLkdsb2JhbGl6YXRpb247XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLlRleHRSZW5kZXJpbmdcclxue1xyXG4gICAgW1NlcmlhbGl6YWJsZV1cclxuICAgIHB1YmxpYyBzdHJ1Y3QgVmVjdG9yMkQgOiBJRXF1YXRhYmxlPFZlY3RvcjJEPlxyXG4gICAge1xyXG4gICAgICAgICNyZWdpb24gUHJpdmF0ZSBGaWVsZHNcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yMkQgemVyb1ZlY3RvciA9IG5ldyBWZWN0b3IyRCgwZiwgMGYpO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFZlY3RvcjJEIHVuaXRWZWN0b3IgPSBuZXcgVmVjdG9yMkQoMWYsIDFmKTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBWZWN0b3IyRCB1bml0WFZlY3RvciA9IG5ldyBWZWN0b3IyRCgxZiwgMGYpO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFZlY3RvcjJEIHVuaXRZVmVjdG9yID0gbmV3IFZlY3RvcjJEKDBmLCAxZik7XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gUHJpdmF0ZSBGaWVsZHNcclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gUHVibGljIEZpZWxkc1xyXG5cclxuICAgICAgICBwdWJsaWMgZmxvYXQgWDtcclxuICAgICAgICBwdWJsaWMgZmxvYXQgWTtcclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQdWJsaWMgRmllbGRzXHJcblxyXG4gICAgICAgICMgcmVnaW9uIFB1YmxpYyBQcm9wZXJ0aWVzXHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgWEludCB7IGdldCB7IHJldHVybiAoaW50KVg7IH0gfVxyXG4gICAgICAgIHB1YmxpYyBpbnQgWUludCB7IGdldCB7IHJldHVybiAoaW50KSBZOyB9IH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQdWJsaWMgUHJvcGVydGllc1xyXG5cclxuICAgICAgICAjcmVnaW9uIENvbnN0YW50c1xyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gUHJvcGVydGllc1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIFplcm9cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiB6ZXJvVmVjdG9yOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIE9uZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIHVuaXRWZWN0b3I7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgVW5pdFhcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiB1bml0WFZlY3RvcjsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBVbml0WVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIHVuaXRZVmVjdG9yOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIFByb3BlcnRpZXNcclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gQ29uc3RydWN0b3JzXHJcblxyXG4gICAgICAgIHB1YmxpYyBWZWN0b3IyRChmbG9hdCB4LCBmbG9hdCB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5YID0geDtcclxuICAgICAgICAgICAgdGhpcy5ZID0geTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBWZWN0b3IyRChmbG9hdCB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuWCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLlkgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgSW50ZXJwb2xhdGVSb3VuZGVkKFZlY3RvcjJEIHN0YXJ0UG9zaXRpb24sIFZlY3RvcjJEIGVuZFBvc2l0aW9uLCBmbG9hdCByYXRpbylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoc3RhcnRQb3NpdGlvbiAqICgxIC0gcmF0aW8pICsgZW5kUG9zaXRpb24gKiByYXRpbykuUm91bmQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgVmVjdG9yMkQgUm91bmQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyRCgoZmxvYXQpTWF0aC5Sb3VuZChYKSwgKGZsb2F0KU1hdGguUm91bmQoWSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBDb25zdHJ1Y3RvcnNcclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gUHVibGljIE1ldGhvZHNcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBBZGQoVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCArPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgKz0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgQWRkKHJlZiBWZWN0b3IyRCB2YWx1ZTEsIHJlZiBWZWN0b3IyRCB2YWx1ZTIsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YICsgdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgKyB2YWx1ZTIuWTtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGZsb2F0IERpc3RhbmNlKFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgdjEgPSB2YWx1ZTEuWCAtIHZhbHVlMi5YLCB2MiA9IHZhbHVlMS5ZIC0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJldHVybiAoZmxvYXQpTWF0aC5TcXJ0KCh2MSAqIHYxKSArICh2MiAqIHYyKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgRGlzdGFuY2UocmVmIFZlY3RvcjJEIHZhbHVlMSwgcmVmIFZlY3RvcjJEIHZhbHVlMiwgb3V0IGZsb2F0IHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IHYxID0gdmFsdWUxLlggLSB2YWx1ZTIuWCwgdjIgPSB2YWx1ZTEuWSAtIHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXN1bHQgPSAoZmxvYXQpTWF0aC5TcXJ0KCh2MSAqIHYxKSArICh2MiAqIHYyKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGZsb2F0IERpc3RhbmNlU3F1YXJlZChWZWN0b3IyRCB2YWx1ZTEsIFZlY3RvcjJEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IHYxID0gdmFsdWUxLlggLSB2YWx1ZTIuWCwgdjIgPSB2YWx1ZTEuWSAtIHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXR1cm4gKHYxICogdjEpICsgKHYyICogdjIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIERpc3RhbmNlU3F1YXJlZChyZWYgVmVjdG9yMkQgdmFsdWUxLCByZWYgVmVjdG9yMkQgdmFsdWUyLCBvdXQgZmxvYXQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgdjEgPSB2YWx1ZTEuWCAtIHZhbHVlMi5YLCB2MiA9IHZhbHVlMS5ZIC0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9ICh2MSAqIHYxKSArICh2MiAqIHYyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgRGl2aWRlKFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggLz0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZIC89IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIERpdmlkZShyZWYgVmVjdG9yMkQgdmFsdWUxLCByZWYgVmVjdG9yMkQgdmFsdWUyLCBvdXQgVmVjdG9yMkQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2YWx1ZTEuWCAvIHZhbHVlMi5YO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZhbHVlMS5ZIC8gdmFsdWUyLlk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIERpdmlkZShWZWN0b3IyRCB2YWx1ZTEsIGZsb2F0IGRpdmlkZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCBmYWN0b3IgPSAxIC8gZGl2aWRlcjtcclxuICAgICAgICAgICAgdmFsdWUxLlggKj0gZmFjdG9yO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAqPSBmYWN0b3I7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgRGl2aWRlKHJlZiBWZWN0b3IyRCB2YWx1ZTEsIGZsb2F0IGRpdmlkZXIsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCBmYWN0b3IgPSAxIC8gZGl2aWRlcjtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2YWx1ZTEuWCAqIGZhY3RvcjtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSAqIGZhY3RvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZmxvYXQgRG90KFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuICh2YWx1ZTEuWCAqIHZhbHVlMi5YKSArICh2YWx1ZTEuWSAqIHZhbHVlMi5ZKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBEb3QocmVmIFZlY3RvcjJEIHZhbHVlMSwgcmVmIFZlY3RvcjJEIHZhbHVlMiwgb3V0IGZsb2F0IHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9ICh2YWx1ZTEuWCAqIHZhbHVlMi5YKSArICh2YWx1ZTEuWSAqIHZhbHVlMi5ZKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBib29sIEVxdWFscyhvYmplY3Qgb2JqKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKG9iaiBpcyBWZWN0b3IyRClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEVxdWFscygoVmVjdG9yMkQpdGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIEVxdWFscyhWZWN0b3IyRCBvdGhlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoWCA9PSBvdGhlci5YKSAmJiAoWSA9PSBvdGhlci5ZKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgUmVmbGVjdChWZWN0b3IyRCB2ZWN0b3IsIFZlY3RvcjJEIG5vcm1hbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFZlY3RvcjJEIHJlc3VsdDtcclxuICAgICAgICAgICAgZmxvYXQgdmFsID0gMi4wZiAqICgodmVjdG9yLlggKiBub3JtYWwuWCkgKyAodmVjdG9yLlkgKiBub3JtYWwuWSkpO1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZlY3Rvci5YIC0gKG5vcm1hbC5YICogdmFsKTtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2ZWN0b3IuWSAtIChub3JtYWwuWSAqIHZhbCk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgUmVmbGVjdChyZWYgVmVjdG9yMkQgdmVjdG9yLCByZWYgVmVjdG9yMkQgbm9ybWFsLCBvdXQgVmVjdG9yMkQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgdmFsID0gMi4wZiAqICgodmVjdG9yLlggKiBub3JtYWwuWCkgKyAodmVjdG9yLlkgKiBub3JtYWwuWSkpO1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZlY3Rvci5YIC0gKG5vcm1hbC5YICogdmFsKTtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2ZWN0b3IuWSAtIChub3JtYWwuWSAqIHZhbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgaW50IEdldEhhc2hDb2RlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBYLkdldEhhc2hDb2RlKCkgKyBZLkdldEhhc2hDb2RlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIGZsb2F0IExlbmd0aCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKGZsb2F0KU1hdGguU3FydCgoWCAqIFgpICsgKFkgKiBZKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZmxvYXQgTGVuZ3RoU3F1YXJlZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKFggKiBYKSArIChZICogWSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgTWF4KFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyRCh2YWx1ZTEuWCA+IHZhbHVlMi5YID8gdmFsdWUxLlggOiB2YWx1ZTIuWCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlMS5ZID4gdmFsdWUyLlkgPyB2YWx1ZTEuWSA6IHZhbHVlMi5ZKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNYXgocmVmIFZlY3RvcjJEIHZhbHVlMSwgcmVmIFZlY3RvcjJEIHZhbHVlMiwgb3V0IFZlY3RvcjJEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUxLlggPiB2YWx1ZTIuWCA/IHZhbHVlMS5YIDogdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgPiB2YWx1ZTIuWSA/IHZhbHVlMS5ZIDogdmFsdWUyLlk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIE1pbihWZWN0b3IyRCB2YWx1ZTEsIFZlY3RvcjJEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmVjdG9yMkQodmFsdWUxLlggPCB2YWx1ZTIuWCA/IHZhbHVlMS5YIDogdmFsdWUyLlgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTEuWSA8IHZhbHVlMi5ZID8gdmFsdWUxLlkgOiB2YWx1ZTIuWSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTWluKHJlZiBWZWN0b3IyRCB2YWx1ZTEsIHJlZiBWZWN0b3IyRCB2YWx1ZTIsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YIDwgdmFsdWUyLlggPyB2YWx1ZTEuWCA6IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZhbHVlMS5ZIDwgdmFsdWUyLlkgPyB2YWx1ZTEuWSA6IHZhbHVlMi5ZO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBNdWx0aXBseShWZWN0b3IyRCB2YWx1ZTEsIFZlY3RvcjJEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICo9IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAqPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgTXVsdGlwbHkoVmVjdG9yMkQgdmFsdWUxLCBmbG9hdCBzY2FsZUZhY3RvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICo9IHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAqPSBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNdWx0aXBseShyZWYgVmVjdG9yMkQgdmFsdWUxLCBmbG9hdCBzY2FsZUZhY3Rvciwgb3V0IFZlY3RvcjJEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUxLlggKiBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSAqIHNjYWxlRmFjdG9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE11bHRpcGx5KHJlZiBWZWN0b3IyRCB2YWx1ZTEsIHJlZiBWZWN0b3IyRCB2YWx1ZTIsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YICogdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgKiB2YWx1ZTIuWTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgTmVnYXRlKFZlY3RvcjJEIHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUuWCA9IC12YWx1ZS5YO1xyXG4gICAgICAgICAgICB2YWx1ZS5ZID0gLXZhbHVlLlk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBOZWdhdGUocmVmIFZlY3RvcjJEIHZhbHVlLCBvdXQgVmVjdG9yMkQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSAtdmFsdWUuWDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSAtdmFsdWUuWTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIE5vcm1hbGl6ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCB2YWwgPSAxLjBmIC8gKGZsb2F0KU1hdGguU3FydCgoWCAqIFgpICsgKFkgKiBZKSk7XHJcbiAgICAgICAgICAgIFggKj0gdmFsO1xyXG4gICAgICAgICAgICBZICo9IHZhbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgTm9ybWFsaXplKFZlY3RvcjJEIHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgdmFsID0gMS4wZiAvIChmbG9hdClNYXRoLlNxcnQoKHZhbHVlLlggKiB2YWx1ZS5YKSArICh2YWx1ZS5ZICogdmFsdWUuWSkpO1xyXG4gICAgICAgICAgICB2YWx1ZS5YICo9IHZhbDtcclxuICAgICAgICAgICAgdmFsdWUuWSAqPSB2YWw7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBOb3JtYWxpemUocmVmIFZlY3RvcjJEIHZhbHVlLCBvdXQgVmVjdG9yMkQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgdmFsID0gMS4wZiAvIChmbG9hdClNYXRoLlNxcnQoKHZhbHVlLlggKiB2YWx1ZS5YKSArICh2YWx1ZS5ZICogdmFsdWUuWSkpO1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlLlggKiB2YWw7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUuWSAqIHZhbDtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBTdWJ0cmFjdChWZWN0b3IyRCB2YWx1ZTEsIFZlY3RvcjJEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YIC09IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAtPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBTdWJ0cmFjdChyZWYgVmVjdG9yMkQgdmFsdWUxLCByZWYgVmVjdG9yMkQgdmFsdWUyLCBvdXQgVmVjdG9yMkQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2YWx1ZTEuWCAtIHZhbHVlMi5YO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZhbHVlMS5ZIC0gdmFsdWUyLlk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRvU3RyaW5nKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEN1bHR1cmVJbmZvIGN1cnJlbnRDdWx0dXJlID0gQ3VsdHVyZUluZm8uQ3VycmVudEN1bHR1cmU7XHJcbiAgICAgICAgICAgIHJldHVybiBzdHJpbmcuRm9ybWF0KGN1cnJlbnRDdWx0dXJlLCBcInt7WDp7MH0gWTp7MX19fVwiLCBuZXcgb2JqZWN0W10ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5YLlRvU3RyaW5nKGN1cnJlbnRDdWx0dXJlKSwgdGhpcy5ZLlRvU3RyaW5nKGN1cnJlbnRDdWx0dXJlKSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gUHVibGljIE1ldGhvZHNcclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gT3BlcmF0b3JzXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgb3BlcmF0b3IgLShWZWN0b3IyRCB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlLlggPSAtdmFsdWUuWDtcclxuICAgICAgICAgICAgdmFsdWUuWSA9IC12YWx1ZS5ZO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIG9wZXJhdG9yID09KFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMS5YID09IHZhbHVlMi5YICYmIHZhbHVlMS5ZID09IHZhbHVlMi5ZO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYm9vbCBvcGVyYXRvciAhPShWZWN0b3IyRCB2YWx1ZTEsIFZlY3RvcjJEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTEuWCAhPSB2YWx1ZTIuWCB8fCB2YWx1ZTEuWSAhPSB2YWx1ZTIuWTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIG9wZXJhdG9yICsoVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCArPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgKz0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBvcGVyYXRvciAtKFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggLT0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZIC09IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgb3BlcmF0b3IgKihWZWN0b3IyRCB2YWx1ZTEsIFZlY3RvcjJEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICo9IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAqPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIG9wZXJhdG9yICooVmVjdG9yMkQgdmFsdWUsIGZsb2F0IHNjYWxlRmFjdG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUuWCAqPSBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgdmFsdWUuWSAqPSBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgb3BlcmF0b3IgKihmbG9hdCBzY2FsZUZhY3RvciwgVmVjdG9yMkQgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZS5YICo9IHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICB2YWx1ZS5ZICo9IHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBvcGVyYXRvciAvKFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggLz0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZIC89IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgb3BlcmF0b3IgLyhWZWN0b3IyRCB2YWx1ZTEsIGZsb2F0IGRpdmlkZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCBmYWN0b3IgPSAxIC8gZGl2aWRlcjtcclxuICAgICAgICAgICAgdmFsdWUxLlggKj0gZmFjdG9yO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAqPSBmYWN0b3I7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIE9wZXJhdG9yc1xyXG4gICAgfVxyXG59IiwidXNpbmcgUGlkcm9oLlRleHRSZW5kZXJpbmc7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIE5vdmVsQXBwXHJcbntcclxuICAgIHB1YmxpYyBhYnN0cmFjdCBjbGFzcyBUZXh0U2NyZWVuTiA6IElUZXh0U2NyZWVuXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBUZXh0V29ybGQgdHc7XHJcblxyXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCB2b2lkIFVwZGF0ZShmbG9hdCBmKTtcclxuXHJcbiAgICAgICAgcHVibGljICB2b2lkIEluaXQoaW50IHcsIGludCBoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdHcgPSBuZXcgVGV4dFdvcmxkKCk7XHJcbiAgICAgICAgICAgIHR3LkluaXQodywgaCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRleHRCb2FyZCBHZXRCb2FyZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdHcubWFpbkJvYXJkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFBhbGV0dGUgR2V0UGFsZXR0ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdHcucGFsZXR0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgSW5wdXRVbmljb2RlIHsgc2V0OyBwcm90ZWN0ZWQgZ2V0OyB9XHJcbiAgICAgICAgcHJvdGVjdGVkIGludCBJbnB1dEFzTnVtYmVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIElucHV0VW5pY29kZSAtIDQ4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbnRlcmZhY2UgSVRleHRTY3JlZW5cclxuICAgIHtcclxuICAgICAgICBUZXh0Qm9hcmQgR2V0Qm9hcmQoKTtcclxuICAgICAgICBpbnQgSW5wdXRVbmljb2RlIHsgc2V0OyB9XHJcbiAgICAgICAgdm9pZCBVcGRhdGUoZmxvYXQgZik7XHJcbiAgICAgICAgLy9QYWxldHRlIEdldFBhbGV0dGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgVGV4dFNjcmVlbkhvbGRlclxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBJVGV4dFNjcmVlbiBTY3JlZW4geyBnZXQ7IHNldDsgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5Ob3ZlbEJhc2U7XHJcbnVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBOb3ZlbEFwcFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgVGV4dFJlbmRlclRlc3RzIDogSVRleHRHYW1lXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgdztcclxuICAgICAgICBwcml2YXRlIGludCBoO1xyXG4gICAgICAgIHByaXZhdGUgR2VuZXJpY1RleHRNZW51IG1lbnU7XHJcbiAgICAgICAgcHVibGljIFRleHRSZW5kZXIgVGV4dFJlbmRlcjtcclxuICAgICAgICBUZXh0U2NyZWVuTiBzY3JlZW47XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0U2NyZWVuSG9sZGVyIFNjcmVlbkhvbGRlciB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICBwcml2YXRlIFRleHRSZW5kZXJUb1NjcmVlbiB0ZXh0U2NyZWVuO1xyXG4gICAgICAgIHByaXZhdGUgRGlhbG9nTmFycmF0aW9uU2NyZWVuQ29udHJvbCBkbnNjO1xyXG4gICAgICAgIHByaXZhdGUgRGlhbG9nTmFycmF0aW9uU2NyZWVuIGRucztcclxuXHJcbiAgICAgICAgcHVibGljIFBhbGV0dGUgR2V0UGFsZXR0ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoU2NyZWVuSG9sZGVyLlNjcmVlbiA9PSB0ZXh0U2NyZWVuKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gRGVmYXVsdFBhbGV0dGVzLkM0UmVhZGVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBEZWZhdWx0UGFsZXR0ZXMuQzROb3ZlbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFVwZGF0ZShmbG9hdCB0aW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGRuc2MgIT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKFNjcmVlbkhvbGRlci5TY3JlZW4gPT0gZG5zICYmIGRuc2MuRG9uZSkgLy9jaGFuZ2UgdG8gaXMgZG9uZSBzaGl0XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgU2NyZWVuSG9sZGVyLlNjcmVlbiA9IG1lbnU7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVudS5SZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZG5zYy5UcnlBZHZhbmNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKFNjcmVlbkhvbGRlci5TY3JlZW4gPT0gbWVudSAmJiBtZW51LkNob3Nlbk9wdGlvbiA+PSAwKVxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgc3RyaW5nIHN0b3J5MiA9IFN0b3JpZXMuc3RvcnkyO1xyXG4gICAgICAgICAgICAgICAgYm9vbCBlbmRUYWdPbkFzcGFzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKG1lbnUuQ2hvc2VuT3B0aW9uKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9vbCBuYXJyYXRpb25Pbmx5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBEaWFsb2dOYXJyYXRpb24obmFycmF0aW9uT25seSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9vbCBuYXJyYXRpb25Pbmx5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIERpYWxvZ05hcnJhdGlvbihuYXJyYXRpb25Pbmx5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RvcnkyID0gU3Rvcmllcy5zdG9yeUE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5kVGFnT25Bc3BhcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RvcnkyID0gU3Rvcmllcy5zdG9yeTM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChtZW51LkNob3Nlbk9wdGlvbiA9PSAwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0b3J5MiA9IFN0b3JpZXMuc3Rvcnk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBJbml0VGV4dFJlbmRlcihzdG9yeTIsIGVuZFRhZ09uQXNwYXMpO1xyXG4gICAgICAgICAgICAgICAgU2NyZWVuSG9sZGVyLlNjcmVlbiA9IHRleHRTY3JlZW47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKFNjcmVlbkhvbGRlci5TY3JlZW4gPT0gdGV4dFNjcmVlbiAmJiBUZXh0UmVuZGVyLkZpbmlzaGVkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBTY3JlZW5Ib2xkZXIuU2NyZWVuID0gbWVudTtcclxuICAgICAgICAgICAgICAgIG1lbnUuUmVzZXQoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBEaWFsb2dOYXJyYXRpb24oYm9vbCBuYXJyYXRpb25Pbmx5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZG5zID0gbmV3IERpYWxvZ05hcnJhdGlvblNjcmVlbigpO1xyXG4gICAgICAgICAgICBkbnMuSW5pdCh3LCBoKTtcclxuICAgICAgICAgICAgU2NyZWVuSG9sZGVyLlNjcmVlbiA9IGRucztcclxuXHJcbiAgICAgICAgICAgIGRuc2MgPSBuZXcgRGlhbG9nTmFycmF0aW9uU2NyZWVuQ29udHJvbChkbnMpO1xyXG5cclxuICAgICAgICAgICAgZG5zYy5OYXJyYXRpb25Pbmx5ID0gbmFycmF0aW9uT25seTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBkbnNjLlNldFRleHQoQFwiI2NtV2VsY29tZSBiYWNrLCBkZWFyLlxyXG4gICAgICAgICAgICAvLyNjbUhvdyB3YXMgc2Nob29sIHRvZGF5P1xyXG4gICAgICAgICAgICAvLyNubldoeSB3b24ndCB0aGlzIHdvcms/XHJcbiAgICAgICAgICAgIC8vc1wiKTtcclxuICAgICAgICAgICAgZG5zYy5TZXRUZXh0KFN0b3JpZXMuc3Rvcnk1KTtcclxuICAgICAgICAgICAgZG5zYy5TcGVha2VyRGF0YS5BZGQoJ20nLCBcIk1vbVwiKTtcclxuICAgICAgICAgICAgZG5zYy5TcGVha2VyRGF0YS5BZGQoJ3AnLCBcIlNhcmFcIik7XHJcbiAgICAgICAgICAgIGRuc2MuU3BlYWtlckRhdGEuQWRkKCdkJywgXCJEYWRcIik7XHJcbiAgICAgICAgICAgIGRuc2MuU2hvd05leHQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEluaXQoaW50IHcsIGludCBoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy53ID0gdztcclxuICAgICAgICAgICAgdGhpcy5oID0gaDtcclxuICAgICAgICAgICAgbWVudSA9IG5ldyBHZW5lcmljVGV4dE1lbnUoKTtcclxuICAgICAgICAgICAgbWVudS5BZGRPcHRpb25zKFwiU3RvcnkgWFwiLCBcIlN0b3J5IFlcIik7XHJcbiAgICAgICAgICAgIG1lbnUuSW5pdCh3LCBoKTtcclxuICAgICAgICAgICAgU2NyZWVuSG9sZGVyLlNjcmVlbiA9IG1lbnU7XHJcblxyXG5cclxuICAgICAgICAgICAgLy9yZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBJbml0VGV4dFJlbmRlcihzdHJpbmcgc3RvcnkyLCBib29sIGVuZFRhZ09uQXNwYXMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBUZXh0UmVuZGVyID0gbmV3IFRleHRSZW5kZXIoKTtcclxuICAgICAgICAgICAgVGV4dFJlbmRlci5UYWdUb0NvbG9yLkFkZERhdGEoVGFnSW5mby5Gcm9tTGFiZWwoJ2MnLCAncCcpLCBEZWZhdWx0UGFsZXR0ZXMuQzRXaGl0ZU5ldXRyYWwpO1xyXG4gICAgICAgICAgICBUZXh0UmVuZGVyLlRhZ1RvQ29sb3IuQWRkRGF0YShUYWdJbmZvLkZyb21MYWJlbCgnYycsICdtJyksIERlZmF1bHRQYWxldHRlcy5DNEJsYWNrTmV1dHJhbCk7XHJcbiAgICAgICAgICAgIFRleHRSZW5kZXIuVGFnVG9Db2xvci5BZGREYXRhKFRhZ0luZm8uRnJvbUxhYmVsKCdjJywgJ2QnKSwgRGVmYXVsdFBhbGV0dGVzLkM0QmxhY2tOZXV0cmFsKTtcclxuXHJcbiAgICAgICAgICAgIHN0cmluZyBnb3QgPSBzdG9yeTIuUmVwbGFjZShcIiVcIiwgXCJcXFwiXCIpLlJlcGxhY2UoXCJcXHJcIiwgXCJcIik7XHJcbiAgICAgICAgICAgIHN0cmluZyB0YWdsZXNzVGV4dDtcclxuICAgICAgICAgICAgVGV4dFRhZ1JlYWRlciB0ZXh0VGFnUmVhZGVyID0gbmV3IFRleHRUYWdSZWFkZXIoKTtcclxuICAgICAgICAgICAgdGV4dFRhZ1JlYWRlci5FbmRQYXNzYWdlT25Bc3BhcyA9IGVuZFRhZ09uQXNwYXM7XHJcbiAgICAgICAgICAgIHZhciB0YWdJbmZvID0gdGV4dFRhZ1JlYWRlci5FeHRyYWN0VGFnSW5mbyhnb3QsIG91dCB0YWdsZXNzVGV4dCk7XHJcbiAgICAgICAgICAgIFRleHRSZW5kZXIuU2V0dXAodGFnbGVzc1RleHQsIHcsIGgsIHRhZ0luZm8pO1xyXG4gICAgICAgICAgICBUZXh0UmVuZGVyLnRleHRXb3JsZC5wYWxldHRlID0gRGVmYXVsdFBhbGV0dGVzLkM0UmVhZGVyO1xyXG4gICAgICAgICAgICB0ZXh0U2NyZWVuID0gbmV3IFRleHRSZW5kZXJUb1NjcmVlbihUZXh0UmVuZGVyKTtcclxuICAgICAgICB9XHJcblxuXHJcblxyXG4gICAgXG5wcml2YXRlIFRleHRTY3JlZW5Ib2xkZXIgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX1NjcmVlbkhvbGRlcj1uZXcgVGV4dFNjcmVlbkhvbGRlcigpO31cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guTm92ZWxCYXNlO1xyXG51c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgTm92ZWxBcHBcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFRleHRSZW5kZXJUb1NjcmVlbiA6IElUZXh0U2NyZWVuXHJcbiAgICB7XHJcbiAgICAgICAgVGV4dFJlbmRlciB0ZXh0UmVuZGVyO1xyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dFJlbmRlclRvU2NyZWVuKFRleHRSZW5kZXIgdGV4dFJlbmRlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMudGV4dFJlbmRlciA9IHRleHRSZW5kZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaW50IElucHV0VW5pY29kZSB7IHNldDsgZ2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0Qm9hcmQgR2V0Qm9hcmQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRleHRSZW5kZXIudGV4dFdvcmxkLm1haW5Cb2FyZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFVwZGF0ZShmbG9hdCBmKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKElucHV0VW5pY29kZSAhPSAtMSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGV4dFJlbmRlci5SZWNlaXZlSW5wdXQoKTtcclxuICAgICAgICAgICAgICAgIElucHV0VW5pY29kZSA9IC0xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRleHRSZW5kZXIuVXBkYXRlKGYpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgUGlkcm9oLlRleHRSZW5kZXJpbmc7XHJcblxyXG5uYW1lc3BhY2UgTm92ZWxBcHBcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEdlbmVyaWNUZXh0TWVudSA6IFRleHRTY3JlZW5OXHJcbiAgICB7XHJcblxyXG4gICAgICAgIExpc3Q8c3RyaW5nPiBvcHRpb25zID0gbmV3IExpc3Q8c3RyaW5nPigpO1xyXG4gICAgICAgIHB1YmxpYyBpbnQgQ2hvc2VuT3B0aW9uIHsgcHJpdmF0ZSBzZXQ7IGdldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBVcGRhdGUoZmxvYXQgZilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChJbnB1dFVuaWNvZGUgPj0gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoSW5wdXRBc051bWJlciA+IDAgJiYgSW5wdXRBc051bWJlciA8PSBvcHRpb25zLkNvdW50KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoSW5wdXRBc051bWJlciArIFwieFwiKTtcclxuICAgICAgICAgICAgICAgIENob3Nlbk9wdGlvbiA9IElucHV0QXNOdW1iZXItMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgYm9hcmQgPSBHZXRCb2FyZCgpO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IG9wdGlvbnMuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW50IHggPSAwO1xyXG4gICAgICAgICAgICAgICAgaW50IHkgPSBpO1xyXG4gICAgICAgICAgICAgICAgYm9hcmQuRHJhd0NoYXIoKGNoYXIpKCcxJytpKSwgeCwgeSwgMyk7XHJcbiAgICAgICAgICAgICAgICBib2FyZC5EcmF3Q2hhcigoY2hhcikoJy0nKSwgeCsyLCB5LCAzKTtcclxuICAgICAgICAgICAgICAgIGJvYXJkLkRyYXcob3B0aW9uc1tpXSwgeCs0LCB5LCAzKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFJlc2V0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENob3Nlbk9wdGlvbiA9IC0xMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgQWRkT3B0aW9ucyhwYXJhbXMgc3RyaW5nW10gYXJncylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMuQWRkUmFuZ2UoYXJncyk7XHJcbiAgICAgICAgfVxyXG5cbiAgICBcbnByaXZhdGUgaW50IF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19DaG9zZW5PcHRpb249LTE7fVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guVGV4dFJlbmRlcmluZ1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQmxpbmtBbmltIDogVGV4dEFuaW1hdGlvbjxCbGlua0FuaW0uQmxpbmtEYXRhPlxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIE1vZGlmeShUZXh0RW50aXR5IGVudGl0eSwgQmxpbmtEYXRhIG1haW5EYXRhLCBmbG9hdCBwcm9ncmVzcywgZmxvYXQgbGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYmFzZS5Nb2RpZnkoZW50aXR5LCBtYWluRGF0YSwgcHJvZ3Jlc3MsIGxlbmd0aCk7XHJcbiAgICAgICAgICAgIGZsb2F0IGF1eCA9IHByb2dyZXNzO1xyXG4gICAgICAgICAgICBib29sIGJsaW5rID0gdHJ1ZTtcclxuICAgICAgICAgICAgd2hpbGUgKHRydWUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChibGluaylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhdXggLT0gbWFpbkRhdGEuYmxpbmtBY3RpdmVUaW1lO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGF1eCAtPSBtYWluRGF0YS5ibGlua0luYWN0aXZlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGF1eCA8IDApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmxpbmsgPSAhYmxpbms7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFibGluaylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZW50aXR5LmFuaW1hdGlvbi5TZXRBbGwobWFpbkRhdGEudGV4dCwgbWFpbkRhdGEudGV4dENvbG9yLCBtYWluRGF0YS5iYWNrQ29sb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0cnVjdCBCbGlua0RhdGFcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBjaGFyIHRleHQ7XHJcbiAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBpbnQgYmFja0NvbG9yLCB0ZXh0Q29sb3I7XHJcbiAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBmbG9hdCBibGlua0FjdGl2ZVRpbWU7XHJcbiAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBmbG9hdCBibGlua0luYWN0aXZlO1xyXG5cclxuICAgICAgICAgICAgcHVibGljIEJsaW5rRGF0YShjaGFyIHRleHQsIGludCBiYWNrQ29sb3IsIGludCB0ZXh0Q29sb3IsIGZsb2F0IGJsaW5rQWN0aXZlVGltZSwgZmxvYXQgYmxpbmtJbmFjdGl2ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0ID0gdGV4dDtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmFja0NvbG9yID0gYmFja0NvbG9yO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0Q29sb3IgPSB0ZXh0Q29sb3I7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJsaW5rQWN0aXZlVGltZSA9IGJsaW5rQWN0aXZlVGltZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmxpbmtJbmFjdGl2ZSA9IGJsaW5rSW5hY3RpdmU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBzdGF0aWMgQmxpbmtEYXRhIEJhY2tDb2xvcihpbnQgYmFja0NvbG9yLCBmbG9hdCBibGlua0R1cmF0aW9uKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEJsaW5rRGF0YShUZXh0Qm9hcmQuTk9DSEFOR0VDSEFSLCBiYWNrQ29sb3IsIFRleHRCb2FyZC5OT0NIQU5HRUNPTE9SLCBibGlua0R1cmF0aW9uLCBibGlua0R1cmF0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHVibGljIHN0YXRpYyBCbGlua0RhdGEgQ2hhcihjaGFyIGMsIGZsb2F0IGJsaW5rRHVyYXRpb24pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQmxpbmtEYXRhKGMsIFRleHRCb2FyZC5OT0NIQU5HRUNPTE9SLCBUZXh0Qm9hcmQuTk9DSEFOR0VDT0xPUiwgYmxpbmtEdXJhdGlvbiwgYmxpbmtEdXJhdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwibmFtZXNwYWNlIFBpZHJvaC5UZXh0UmVuZGVyaW5nXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBDaGFyQnlDaGFyQW5pbWF0aW9uIDogVGV4dEFuaW1hdGlvbjxDaGFyQnlDaGFyQW5pbWF0aW9uLkNoYXJCeUNoYXJEYXRhPlxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIE1vZGlmeShUZXh0RW50aXR5IGVudGl0eSwgQ2hhckJ5Q2hhckRhdGEgbWFpbkRhdGEsIGZsb2F0IHByb2dyZXNzLCBmbG9hdCBsZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLk1vZGlmeShlbnRpdHksIG1haW5EYXRhLCBwcm9ncmVzcywgbGVuZ3RoKTtcclxuICAgICAgICAgICAgZmxvYXQgcmF0aW8gPSBwcm9ncmVzcyAvIGxlbmd0aDtcclxuICAgICAgICAgICAgZmxvYXQgbGVuZ3RoVGV4dCA9IG1haW5EYXRhLmNoYXJFbmQgLSBtYWluRGF0YS5jaGFyU3RhcnQ7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSBtYWluRGF0YS5jaGFyU3RhcnQ7IGkgPCBtYWluRGF0YS5jaGFyRW5kOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGludCBvZmZzZXRlZCA9IGk7XHJcbiAgICAgICAgICAgICAgICBpbnQgbGluZSA9IDA7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGIgPSBlbnRpdHkuYW5pbWF0aW9uO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKG9mZnNldGVkID49IHRiLldpZHRoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpbmUrKztcclxuICAgICAgICAgICAgICAgICAgICBvZmZzZXRlZCAtPSB0Yi5XaWR0aDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpID4gKChsZW5ndGhUZXh0ICogcmF0aW8pICsgbWFpbkRhdGEuY2hhclN0YXJ0KSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0Yi5EcmF3Q2hhcignICcsIG9mZnNldGVkLCBsaW5lKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3RiLkRyYXcoXCJcIiArIGksIDYsIDUsIDEpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBjbGFzcyBDaGFyQnlDaGFyRGF0YVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50ZXJuYWwgaW50IGNoYXJTdGFydDtcclxuICAgICAgICAgICAgaW50ZXJuYWwgaW50IGNoYXJFbmQ7XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgQ2hhckJ5Q2hhckRhdGEoaW50IGNoYXJTdGFydCwgaW50IGNoYXJFbmQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhclN0YXJ0ID0gY2hhclN0YXJ0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFyRW5kID0gY2hhckVuZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXQp9Cg==

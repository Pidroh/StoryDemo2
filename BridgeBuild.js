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
                    this.story5 = "#nnI take off my headphones and put the the RXPlay back in the charger. I hear three soft knocks on the door.\r\n#cdIf you keep going like this you'll be deaf when you get to my age.\r\n#cpDinner, right? I'm coming, I'm coming.\r\n#cdIf you heard it, you could at least reply...\r\n#nnDad is annoying in a cute way. Always the victim. Most parents would get pretty angry at a daughter like me.\r\n#nnWe go down the stairs, into the living room.\r\n#nnChicken, salad, rice. It looks pretty yummy.\r\n#cpMom is late again, huh?\r\n#cdYes, stuck at the office. It's a big project, she says.\r\n#nnYeah, right. A big project. Sure.\r\n#cpWhat kind of guy do you think he is?\r\n#cdWho?\r\n#cpMom's lover.\r\n#nnDad gets all surprised, but his face turns to bitterness.\r\n#cdThat joke is getting old, Sara.\r\n#nnI smile at my old man. A smile of joy with just a dash of pity. \r\n";
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
            dialogFrame: null,
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
                this.dialogFrame = this.world.GetFreeEntity(w, 4);
                this.dialogFrame.SetPosition(0, ((h - 4) | 0));

                this.dialogE = this.world.GetFreeEntity(((w - 4) | 0), 4);
                this.dialogE.SetPosition(2, ((h - 4) | 0));
                this.narrationE = this.world.GetFreeEntity(((w - 4) | 0), ((h - 6) | 0));
                this.narrationE.SetPosition(2, 1);
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
                this.dialogFrame.Origin.SetAll(32, 0, 1);
                this.dialogE.Origin.SetAll(32, 0, Pidroh.TextRendering.TextBoard.INVISIBLECOLOR);
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
                this.dialogFrame.Origin.SetAll(32, 0, Pidroh.TextRendering.TextBoard.INVISIBLECOLOR);
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJCcmlkZ2VCdWlsZC5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiQXBwLmNzIiwiQXBwVGV4dEdhbWUuY3MiLCIuLi9Ob3ZlbEFwcC9EaWFsb2dOYXJyYXRpb25TY3JlZW4uY3MiLCIuLi9Ob3ZlbEFwcC9TdHJpbmdUb1Bhc3NhZ2UuY3MiLCIuLi9Ob3ZlbEJhc2UvVGV4dFRhZ1JlYWRlci5jcyIsIi4uL05vdmVsQmFzZS9UYWdUb0RhdGEuY3MiLCIuLi9Ob3ZlbEJhc2UvVGVzdFN0b3JpZXMuY3MiLCIuLi9Ob3ZlbEJhc2UvVGV4dFJlbmRlci5jcyIsIi4uL05vdmVsQmFzZS9UZXh0UmVuZGVyRHluYW1pYy5jcyIsIi4uLy4uLy4uLy4uL1R1cm5CYXNlZC9WaXN1YWxTdHVkaW9Tb2x1dGlvbi9UZXh0UmVuZGVyaW5nTG9naWMvVGV4dFdvcmxkLmNzIiwiLi4vLi4vLi4vLi4vVHVybkJhc2VkL1Zpc3VhbFN0dWRpb1NvbHV0aW9uL1RleHRSZW5kZXJpbmdMb2dpYy9QYWxldHRlLmNzIiwiLi4vLi4vLi4vLi4vVHVybkJhc2VkL1Zpc3VhbFN0dWRpb1NvbHV0aW9uL1RleHRSZW5kZXJpbmdMb2dpYy9UZXh0Qm9hcmQuY3MiLCIuLi8uLi8uLi8uLi9UdXJuQmFzZWQvVmlzdWFsU3R1ZGlvU29sdXRpb24vQmFzZVV0aWxzL1ZlY3RvcjJELmNzIiwiLi4vTm92ZWxBcHAvSVRleHRTY3JlZW5OLmNzIiwiLi4vTm92ZWxBcHAvVGV4dFJlbmRlclRlc3RzLmNzIiwiLi4vTm92ZWxBcHAvVGV4dFJlbmRlclRvU2NyZWVuLmNzIiwiLi4vTm92ZWxBcHAvR2VuZXJpY1RleHRNZW51LmNzIiwiLi4vLi4vLi4vLi4vVHVybkJhc2VkL1Zpc3VhbFN0dWRpb1NvbHV0aW9uL1RleHRSZW5kZXJpbmdMb2dpYy9CbGlua0FuaW1hdGlvbi5jcyIsIi4uLy4uLy4uLy4uL1R1cm5CYXNlZC9WaXN1YWxTdHVkaW9Tb2x1dGlvbi9UZXh0UmVuZGVyaW5n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d0JBLCtCQUFzQkEsV0FBV0EiLAogICJzb3VyY2VzQ29udGVudCI6IFsidXNpbmcgQnJpZGdlO1xyXG51c2luZyBCcmlkZ2UuSHRtbDU7XHJcbnVzaW5nIE5ld3RvbnNvZnQuSnNvbjtcclxudXNpbmcgTm92ZWxBcHA7XHJcbnVzaW5nIFBpZHJvaC5Ob3ZlbEJhc2U7XHJcbnVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nO1xyXG5cclxuLy91c2luZyBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQ7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgQnJpZGdlQnVpbGRcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEFwcFxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGludCBidWZmZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgYm9vbCBidWZmZXJPbjtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBUZXh0UmVuZGVyVGVzdHMgbm92ZWxNYWluO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFRleHRCb2FyZCBUZXh0Qm9hcmQ7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgc3RyaW5nW10gY29sb3JzO1xyXG5cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNYWluKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnN0IGludCBXID0gNDU7XHJcbiAgICAgICAgICAgIGNvbnN0IGludCBIID0gMTQ7XHJcblxyXG4gICAgICAgICAgICAvL25ldyBBcHBUZXh0R2FtZShuZXcgRGlhbG9nTmFycmF0b2luU2NyZWVuVGVzdEdhbWUoKSkuU3RhcnQoNDAsIDE0KTtcclxuICAgICAgICAgICAgLy9uZXcgQXBwVGV4dEdhbWUobmV3IERpYWxvZ05hcnJhdG9pbkNvbnRyb2xUZXN0R2FtZSgpKS5TdGFydCg0MCwgMTQpO1xyXG4gICAgICAgICAgICBuZXcgQXBwVGV4dEdhbWUobmV3IFRleHRSZW5kZXJUZXN0cygpKS5TdGFydCg0MCwgMTQpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAvL25vdmVsTWFpbiA9IG5ldyBOb3ZlbE1haW4oKS5Jbml0KDUwLCAyMCk7XHJcbiAgICAgICAgICAgIFRleHRSZW5kZXJUZXN0cyB0ZXh0UmVuZGVyVGVzdHMgPSBuZXcgVGV4dFJlbmRlclRlc3RzKCk7XHJcbiAgICAgICAgICAgIG5vdmVsTWFpbiA9IHRleHRSZW5kZXJUZXN0cztcclxuICAgICAgICAgICAgdGV4dFJlbmRlclRlc3RzLkluaXQoVywgSCk7XHJcbiAgICAgICAgICAgIGNvbG9ycyA9IERlZmF1bHRQYWxldHRlcy5DNFJlYWRlci5IdG1sQ29sb3JzO1xyXG4gICAgICAgICAgICBTY3JpcHQuQ2FsbChcInNldERpc3BsYXlTaXplXCIsIFcsIEgpO1xyXG5cclxuICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShcIkdhbWUgU3RhcnRcIik7XHJcbiAgICAgICAgICAgIC8vY29sb3JzID0gbmV3IHN0cmluZ1syMF07XHJcblxyXG4gICAgICAgICAgICAvL2ZvciAoaW50IGkgPSAwOyBpIDwgY29sb3JzLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICAvL3tcclxuICAgICAgICAgICAgLy8gICAgLy9jb2xvcnNbaV0gPSBcIiMxZjIwMjZcIjtcclxuXHJcbiAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAvL2NvbG9yc1sxXSA9IFwiI2ZmZmZmZlwiO1xyXG5cclxuICAgICAgICAgICAgdmFyIHN0eWxlID0gbmV3IEhUTUxTdHlsZUVsZW1lbnQoKTtcclxuICAgICAgICAgICAgc3R5bGUuSW5uZXJIVE1MID0gXCJodG1sLGJvZHkge2ZvbnQtZmFtaWx5OiBDb3VyaWVyOyBiYWNrZ3JvdW5kLWNvbG9yOiMxZjI1MjY7IGhlaWdodDogMTAwJTt9XCIgKyBcIlxcbiAjY2FudmFzLWNvbnRhaW5lciB7d2lkdGg6IDEwMCU7IGhlaWdodDogMTAwJTsgdGV4dC1hbGlnbjpjZW50ZXI7IHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7IH0gXCI7XHJcbiAgICAgICAgICAgIERvY3VtZW50LkhlYWQuQXBwZW5kQ2hpbGQoc3R5bGUpO1xyXG4gICAgICAgICAgICBidWZmZXIgPSA5O1xyXG4gICAgICAgICAgICBidWZmZXJPbiA9IGZhbHNlOyBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIERvY3VtZW50Lk9uS2V5UHJlc3MgKz0gKEtleWJvYXJkRXZlbnQgYSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpbnQgY29kZSA9IGEuS2V5Q29kZTtcclxuICAgICAgICAgICAgICAgIGlmIChjb2RlID09IDApIGNvZGUgPSBhLkNoYXJDb2RlO1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyID0gY29kZTtcclxuICAgICAgICAgICAgICAgIGJ1ZmZlck9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFVwZGF0ZUdhbWUoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEFmdGVyIGJ1aWxkaW5nIChDdHJsICsgU2hpZnQgKyBCKSB0aGlzIHByb2plY3QsIFxyXG4gICAgICAgICAgICAvLyBicm93c2UgdG8gdGhlIC9iaW4vRGVidWcgb3IgL2Jpbi9SZWxlYXNlIGZvbGRlci5cclxuXHJcbiAgICAgICAgICAgIC8vIEEgbmV3IGJyaWRnZS8gZm9sZGVyIGhhcyBiZWVuIGNyZWF0ZWQgYW5kXHJcbiAgICAgICAgICAgIC8vIGNvbnRhaW5zIHlvdXIgcHJvamVjdHMgSmF2YVNjcmlwdCBmaWxlcy4gXHJcblxyXG4gICAgICAgICAgICAvLyBPcGVuIHRoZSBicmlkZ2UvaW5kZXguaHRtbCBmaWxlIGluIGEgYnJvd3NlciBieVxyXG4gICAgICAgICAgICAvLyBSaWdodC1DbGljayA+IE9wZW4gV2l0aC4uLiwgdGhlbiBjaG9vc2UgYVxyXG4gICAgICAgICAgICAvLyB3ZWIgYnJvd3NlciBmcm9tIHRoZSBsaXN0XHJcblxyXG4gICAgICAgICAgICAvLyBUaGlzIGFwcGxpY2F0aW9uIHdpbGwgdGhlbiBydW4gaW4gYSBicm93c2VyLlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdm9pZCBVcGRhdGVHYW1lKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBzY3JlZW4gPSBub3ZlbE1haW4uU2NyZWVuSG9sZGVyLlNjcmVlbjtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IGZsb2F0IGRlbHRhID0gMC4wMzNmO1xyXG4gICAgICAgICAgICBub3ZlbE1haW4uVXBkYXRlKGRlbHRhKTtcclxuICAgICAgICAgICAgVGV4dEJvYXJkID0gc2NyZWVuLkdldEJvYXJkKCk7XHJcbiAgICAgICAgICAgIHNjcmVlbi5VcGRhdGUoZGVsdGEpO1xyXG4gICAgICAgICAgICAvL2dyLkRyYXcoMC4wMzNmKTtcclxuXHJcbiAgICAgICAgICAgIC8vc2NyZWVuLlVwZGF0ZShkZWx0YSk7XHJcbiAgICAgICAgICAgIGlmIChidWZmZXJPbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2NyZWVuLklucHV0VW5pY29kZSA9IGJ1ZmZlcjtcclxuXHJcbiAgICAgICAgICAgICAgICBidWZmZXJPbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2NyZWVuLklucHV0VW5pY29kZSA9IC0xO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBTY3JpcHQuQ2FsbChcImNsZWFyXCIpO1xyXG4gICAgICAgICAgICBEcmF3VGV4dEJvYXJkKCk7XHJcblxyXG4gICAgICAgICAgICBXaW5kb3cuU2V0VGltZW91dCgoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uKVVwZGF0ZUdhbWUsIDMzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHZvaWQgRHJhd1RleHRCb2FyZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBqID0gMDsgaiA8IFRleHRCb2FyZC5IZWlnaHQ7IGorKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBUZXh0Qm9hcmQuV2lkdGg7IGkrKylcclxuICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaW50IHRjID0gVGV4dEJvYXJkLlRleHRDb2xvcltpLCBqXTtcclxuICAgICAgICAgICAgICAgICAgICBpbnQgdGIgPSBUZXh0Qm9hcmQuQmFja0NvbG9yW2ksIGpdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YyA8IDApIHRjID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGIgPCAwKSB0YiA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RyaW5nIGNvbG9yMSA9IGNvbG9yc1t0Y107XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgc3RyaW5nIGNvbG9yQmFjayA9IGNvbG9yc1t0Yl07XHJcbiAgICAgICAgICAgICAgICAgICAgU2NyaXB0LkNhbGwoXCJkcmF3XCIsIGksIGosIGNvbG9yMSwgY29sb3JCYWNrLCBcIlwiICsgVGV4dEJvYXJkLkNoYXJBdChpLCBqKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwidXNpbmcgQnJpZGdlO1xyXG51c2luZyBCcmlkZ2UuSHRtbDU7XHJcbnVzaW5nIE5ld3RvbnNvZnQuSnNvbjtcclxudXNpbmcgTm92ZWxBcHA7XHJcbnVzaW5nIFBpZHJvaC5Ob3ZlbEJhc2U7XHJcbnVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nO1xyXG5cclxuLy91c2luZyBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQ7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgQnJpZGdlQnVpbGRcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEFwcFRleHRHYW1lXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgYnVmZmVyO1xyXG4gICAgICAgIHByaXZhdGUgYm9vbCBidWZmZXJPbjtcclxuICAgICAgICBwcml2YXRlIElUZXh0R2FtZSBnYW1lO1xyXG4gICAgICAgIHByaXZhdGUgVGV4dEJvYXJkIFRleHRCb2FyZDtcclxuICAgICAgICBwcml2YXRlIHN0cmluZ1tdIGNvbG9ycztcclxuXHJcbiAgICAgICAgcHVibGljIEFwcFRleHRHYW1lKElUZXh0R2FtZSBub3ZlbE1haW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmdhbWUgPSBub3ZlbE1haW47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTdGFydChpbnQgVywgaW50IEgpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgLy9ub3ZlbE1haW4gPSBuZXcgTm92ZWxNYWluKCkuSW5pdCg1MCwgMjApO1xyXG4gICAgICAgICAgICBnYW1lLkluaXQoVywgSCk7XHJcbiAgICAgICAgICAgIC8vbm92ZWxNYWluID0gbmV3IFRleHRSZW5kZXJUZXN0cygpLkluaXQoVywgSCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBTY3JpcHQuQ2FsbChcInNldERpc3BsYXlTaXplXCIsIFcsIEgpO1xyXG5cclxuICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShcIkdhbWUgU3RhcnRcIik7XHJcbiAgICAgICAgICAgIC8vY29sb3JzID0gbmV3IHN0cmluZ1syMF07XHJcblxyXG4gICAgICAgICAgICAvL2ZvciAoaW50IGkgPSAwOyBpIDwgY29sb3JzLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICAvL3tcclxuICAgICAgICAgICAgLy8gICAgLy9jb2xvcnNbaV0gPSBcIiMxZjIwMjZcIjtcclxuXHJcbiAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAvL2NvbG9yc1sxXSA9IFwiI2ZmZmZmZlwiO1xyXG5cclxuICAgICAgICAgICAgdmFyIHN0eWxlID0gbmV3IEhUTUxTdHlsZUVsZW1lbnQoKTtcclxuICAgICAgICAgICAgc3R5bGUuSW5uZXJIVE1MID0gXCJodG1sLGJvZHkge2ZvbnQtZmFtaWx5OiBDb3VyaWVyOyBiYWNrZ3JvdW5kLWNvbG9yOiMxZjI1MjY7IGhlaWdodDogMTAwJTt9XCIgKyBcIlxcbiAjY2FudmFzLWNvbnRhaW5lciB7d2lkdGg6IDEwMCU7IGhlaWdodDogMTAwJTsgdGV4dC1hbGlnbjpjZW50ZXI7IHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7IH0gXCI7XHJcbiAgICAgICAgICAgIERvY3VtZW50LkhlYWQuQXBwZW5kQ2hpbGQoc3R5bGUpO1xyXG4gICAgICAgICAgICBidWZmZXIgPSA5O1xyXG4gICAgICAgICAgICBidWZmZXJPbiA9IGZhbHNlOyBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIERvY3VtZW50Lk9uS2V5UHJlc3MgKz0gKEtleWJvYXJkRXZlbnQgYSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpbnQgY29kZSA9IGEuS2V5Q29kZTtcclxuICAgICAgICAgICAgICAgIGlmIChjb2RlID09IDApIGNvZGUgPSBhLkNoYXJDb2RlO1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyID0gY29kZTtcclxuICAgICAgICAgICAgICAgIGJ1ZmZlck9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFVwZGF0ZUdhbWUoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEFmdGVyIGJ1aWxkaW5nIChDdHJsICsgU2hpZnQgKyBCKSB0aGlzIHByb2plY3QsIFxyXG4gICAgICAgICAgICAvLyBicm93c2UgdG8gdGhlIC9iaW4vRGVidWcgb3IgL2Jpbi9SZWxlYXNlIGZvbGRlci5cclxuXHJcbiAgICAgICAgICAgIC8vIEEgbmV3IGJyaWRnZS8gZm9sZGVyIGhhcyBiZWVuIGNyZWF0ZWQgYW5kXHJcbiAgICAgICAgICAgIC8vIGNvbnRhaW5zIHlvdXIgcHJvamVjdHMgSmF2YVNjcmlwdCBmaWxlcy4gXHJcblxyXG4gICAgICAgICAgICAvLyBPcGVuIHRoZSBicmlkZ2UvaW5kZXguaHRtbCBmaWxlIGluIGEgYnJvd3NlciBieVxyXG4gICAgICAgICAgICAvLyBSaWdodC1DbGljayA+IE9wZW4gV2l0aC4uLiwgdGhlbiBjaG9vc2UgYVxyXG4gICAgICAgICAgICAvLyB3ZWIgYnJvd3NlciBmcm9tIHRoZSBsaXN0XHJcblxyXG4gICAgICAgICAgICAvLyBUaGlzIGFwcGxpY2F0aW9uIHdpbGwgdGhlbiBydW4gaW4gYSBicm93c2VyLlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIFVwZGF0ZUdhbWUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHNjcmVlbiA9IGdhbWUuU2NyZWVuSG9sZGVyLlNjcmVlbjtcclxuICAgICAgICAgICAgY29sb3JzID0gZ2FtZS5HZXRQYWxldHRlKCkuSHRtbENvbG9ycztcclxuICAgICAgICAgICAgY29uc3QgZmxvYXQgZGVsdGEgPSAwLjAzM2Y7XHJcbiAgICAgICAgICAgIGdhbWUuVXBkYXRlKGRlbHRhKTtcclxuICAgICAgICAgICAgVGV4dEJvYXJkID0gc2NyZWVuLkdldEJvYXJkKCk7XHJcbiAgICAgICAgICAgIHNjcmVlbi5VcGRhdGUoZGVsdGEpO1xyXG4gICAgICAgICAgICAvL2dyLkRyYXcoMC4wMzNmKTtcclxuXHJcbiAgICAgICAgICAgIC8vc2NyZWVuLlVwZGF0ZShkZWx0YSk7XHJcbiAgICAgICAgICAgIGlmIChidWZmZXJPbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2NyZWVuLklucHV0VW5pY29kZSA9IGJ1ZmZlcjtcclxuXHJcbiAgICAgICAgICAgICAgICBidWZmZXJPbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2NyZWVuLklucHV0VW5pY29kZSA9IC0xO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBTY3JpcHQuQ2FsbChcImNsZWFyXCIpO1xyXG4gICAgICAgICAgICBEcmF3VGV4dEJvYXJkKCk7XHJcblxyXG4gICAgICAgICAgICBXaW5kb3cuU2V0VGltZW91dCgoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uKVVwZGF0ZUdhbWUsIDMzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBEcmF3VGV4dEJvYXJkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGogPSAwOyBqIDwgVGV4dEJvYXJkLkhlaWdodDsgaisrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IFRleHRCb2FyZC5XaWR0aDsgaSsrKVxyXG4gICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpbnQgdGMgPSBUZXh0Qm9hcmQuVGV4dENvbG9yW2ksIGpdO1xyXG4gICAgICAgICAgICAgICAgICAgIGludCB0YiA9IFRleHRCb2FyZC5CYWNrQ29sb3JbaSwgal07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRjIDwgMCkgdGMgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YiA8IDApIHRiID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBzdHJpbmcgY29sb3IxID0gY29sb3JzW3RjXTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBzdHJpbmcgY29sb3JCYWNrID0gY29sb3JzW3RiXTtcclxuICAgICAgICAgICAgICAgICAgICBTY3JpcHQuQ2FsbChcImRyYXdcIiwgaSwgaiwgY29sb3IxLCBjb2xvckJhY2ssIFwiXCIgKyBUZXh0Qm9hcmQuQ2hhckF0KGksIGopKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgUGlkcm9oLk5vdmVsQmFzZTtcclxudXNpbmcgUGlkcm9oLlRleHRSZW5kZXJpbmc7XHJcblxyXG5uYW1lc3BhY2UgTm92ZWxBcHBcclxue1xyXG4gICAgcHVibGljIGNsYXNzIERpYWxvZ05hcnJhdGlvblNjcmVlbiA6IElUZXh0U2NyZWVuXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBjb25zdCBpbnQgTmFycmF0aW9uU3RhdGUgPSAxO1xyXG4gICAgICAgIHByaXZhdGUgY29uc3QgaW50IERpYWxvZ1N0YXRlID0gMjtcclxuICAgICAgICBwcml2YXRlIFRleHRXb3JsZCB3b3JsZDtcclxuICAgICAgICBwcml2YXRlIFRleHRFbnRpdHkgZGlhbG9nRnJhbWU7XHJcbiAgICAgICAgcHJpdmF0ZSBUZXh0RW50aXR5IGRpYWxvZ0U7XHJcbiAgICAgICAgcHJpdmF0ZSBUZXh0RW50aXR5IG5hcnJhdGlvbkU7XHJcbiAgICAgICAgcHJpdmF0ZSBDaGFyQnlDaGFyQW5pbWF0aW9uIGNoYXJCeUNoYXJBbmltO1xyXG4gICAgICAgIFN0cmluZ1RvUGFzc2FnZUl0ZXJhdG9yIHBhc3NhZ2VJdGVyYXRvcjtcclxuICAgICAgICBwcml2YXRlIGludCBtb2RlO1xyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBJbml0KGludCB3LCBpbnQgaClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHdvcmxkID0gbmV3IFRleHRXb3JsZCgpO1xyXG4gICAgICAgICAgICB3b3JsZC5wYWxldHRlID0gRGVmYXVsdFBhbGV0dGVzLkM0Tm92ZWw7XHJcbiAgICAgICAgICAgIHdvcmxkLkluaXQodywgaCk7XHJcbiAgICAgICAgICAgIGRpYWxvZ0ZyYW1lID0gd29ybGQuR2V0RnJlZUVudGl0eSh3LCA0KTtcclxuICAgICAgICAgICAgZGlhbG9nRnJhbWUuU2V0UG9zaXRpb24oMCwgaC00KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGRpYWxvZ0UgPSB3b3JsZC5HZXRGcmVlRW50aXR5KHctNCwgNCk7XHJcbiAgICAgICAgICAgIGRpYWxvZ0UuU2V0UG9zaXRpb24oMiwgaC00KTtcclxuICAgICAgICAgICAgbmFycmF0aW9uRSA9IHdvcmxkLkdldEZyZWVFbnRpdHkody00LCBoLTYpO1xyXG4gICAgICAgICAgICBuYXJyYXRpb25FLlNldFBvc2l0aW9uKDIsMSk7XHJcbiAgICAgICAgICAgIGNoYXJCeUNoYXJBbmltID0gbmV3IENoYXJCeUNoYXJBbmltYXRpb24oKTtcclxuICAgICAgICAgICAgd29ybGQuQWRkQW5pbWF0aW9uPGdsb2JhbDo6UGlkcm9oLlRleHRSZW5kZXJpbmcuQ2hhckJ5Q2hhckFuaW1hdGlvbj4oY2hhckJ5Q2hhckFuaW0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGludCBJbnB1dFVuaWNvZGUgeyBzZXQ7IGdldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGROYXJyYXRpb24oc3RyaW5nIG4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtb2RlID0gTmFycmF0aW9uU3RhdGU7XHJcbiAgICAgICAgICAgIFBhc3NhZ2lmeShuKTtcclxuICAgICAgICAgICAgaWYgKG5hcnJhdGlvbkUuT3JpZ2luLkN1cnNvclggIT0gMCB8fCBuYXJyYXRpb25FLk9yaWdpbi5DdXJzb3JZICE9IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hcnJhdGlvbkUuT3JpZ2luLkN1cnNvck5ld0xpbmUoMCk7XHJcbiAgICAgICAgICAgICAgICBuYXJyYXRpb25FLk9yaWdpbi5DdXJzb3JOZXdMaW5lKDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChuYXJyYXRpb25FLk9yaWdpbi5DYW5EcmF3X0N1cnNvcl9TbWFydExpbmVCcmVhayhuKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFycmF0aW9uRS5SZXNldEZ1bGwoKTtcclxuICAgICAgICAgICAgICAgIG5hcnJhdGlvbkUuT3JpZ2luLlNldEN1cnNvckF0KDAsIDApO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBTaG93UGFzc2FnZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIFNob3dQYXNzYWdlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBwYXNzYWdlSW5kZXhlcyA9IHBhc3NhZ2VJdGVyYXRvci5DdXJyZW50UGFzc2FnZSgpO1xyXG4gICAgICAgICAgICBBZGROYXJyYXRpb25QYXNzYWdlKHBhc3NhZ2VJdGVyYXRvci5HZXRUZXh0KCksIHBhc3NhZ2VJbmRleGVzLlhJbnQsIHBhc3NhZ2VJbmRleGVzLllJbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIFBhc3NhZ2lmeShzdHJpbmcgbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHBhc3NhZ2VJdGVyYXRvciA9IFN0cmluZ1RvUGFzc2FnZUZhY3RvcnkuUG9wdWxhdGUocGFzc2FnZUl0ZXJhdG9yLCBuKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBBZGROYXJyYXRpb25QYXNzYWdlKHN0cmluZyBuLCBpbnQgc3RhcnQsIGludCBlbmQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIGN1cnNvclIgPSBuYXJyYXRpb25FLk9yaWdpbi5EcmF3X0N1cnNvcl9TbWFydExpbmVCcmVhayhuLCAyLCBzdGFydCwgZW5kKTtcclxuICAgICAgICAgICAgY2hhckJ5Q2hhckFuaW0uQWRkKG5hcnJhdGlvbkUuQW5pbUJhc2Uobi5MZW5ndGggKiAwLjAwNWYpLCBuZXcgQ2hhckJ5Q2hhckFuaW1hdGlvbi5DaGFyQnlDaGFyRGF0YShjdXJzb3JSLlN0YXJ0SW5kZXgsIGN1cnNvclIuRW5kSW5kZXgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkZERpYWxvZyhzdHJpbmcgc3BlYWtlciwgc3RyaW5nIHRleHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtb2RlID0gRGlhbG9nU3RhdGU7XHJcbiAgICAgICAgICAgIGRpYWxvZ0ZyYW1lLk9yaWdpbi5TZXRBbGwoJyAnLCAwLCAxKTtcclxuICAgICAgICAgICAgZGlhbG9nRS5PcmlnaW4uU2V0QWxsKCcgJywgMCwgVGV4dEJvYXJkLklOVklTSUJMRUNPTE9SKTtcclxuICAgICAgICAgICAgZGlhbG9nRS5PcmlnaW4uRHJhdyhzcGVha2VyLCAwLDAsIDIpO1xyXG4gICAgICAgICAgICBkaWFsb2dFLk9yaWdpbi5TZXRDdXJzb3JBdCgwLDEpO1xyXG4gICAgICAgICAgICBkaWFsb2dFLk9yaWdpbi5EcmF3X0N1cnNvcl9TbWFydExpbmVCcmVhayh0ZXh0LCAyKTtcclxuICAgICAgICAgICAgY2hhckJ5Q2hhckFuaW0uQWRkKGRpYWxvZ0UuQW5pbUJhc2UodGV4dC5MZW5ndGggKiAwLjAwNWYpLCBuZXcgQ2hhckJ5Q2hhckFuaW1hdGlvbi5DaGFyQnlDaGFyRGF0YShkaWFsb2dFLk9yaWdpbi5XaWR0aCwgdGV4dC5MZW5ndGgrIGRpYWxvZ0UuT3JpZ2luLldpZHRoKSk7XHJcbiAgICAgICAgICAgIC8vZGlhbG9nRS5PcmlnaW4uRHJhdyh0ZXh0LCAwLDEsIDIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRleHRCb2FyZCBHZXRCb2FyZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gd29ybGQubWFpbkJvYXJkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVXBkYXRlKGZsb2F0IGYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB3b3JsZC5EcmF3KCk7XHJcbiAgICAgICAgICAgIHdvcmxkLkFkdmFuY2VUaW1lKGYpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBIaWRlRGlhbG9nKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRpYWxvZ0UuT3JpZ2luLlNldEFsbCgnICcsIDAsIFRleHRCb2FyZC5JTlZJU0lCTEVDT0xPUik7XHJcbiAgICAgICAgICAgIGRpYWxvZ0ZyYW1lLk9yaWdpbi5TZXRBbGwoJyAnLCAwLCBUZXh0Qm9hcmQuSU5WSVNJQkxFQ09MT1IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgYm9vbCBJc0RvbmUoKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB3b3JsZC5Jc0RvbmUoKSAmJiAocGFzc2FnZUl0ZXJhdG9yPT0gbnVsbCB8fCBwYXNzYWdlSXRlcmF0b3IuSXNEb25lKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBBZHZhbmNlUmVxdWVzdCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoIXdvcmxkLklzRG9uZSgpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB3b3JsZC5BZHZhbmNlVGltZSg5OTlmKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBwYXNzYWdlSXRlcmF0b3IuQWR2YW5jZSgpO1xyXG4gICAgICAgICAgICAgICAgU2hvd1Bhc3NhZ2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxuICAgIFxucHJpdmF0ZSBpbnQgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX0lucHV0VW5pY29kZT0tMTt9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIERpYWxvZ05hcnJhdGlvblNjcmVlbkNvbnRyb2xcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIHN0cmluZyB0ZXh0O1xyXG4gICAgICAgIHByaXZhdGUgVGFnSW5mb0hvbGRlciB0YWdJbmZvO1xyXG4gICAgICAgIGludCB0YWdJbmRleDtcclxuICAgICAgICBEaWFsb2dOYXJyYXRpb25TY3JlZW4gc2NyZWVuO1xyXG4gICAgICAgIHB1YmxpYyBEaWN0aW9uYXJ5PGNoYXIsIHN0cmluZz4gU3BlYWtlckRhdGEgPSBuZXcgRGljdGlvbmFyeTxjaGFyLCBzdHJpbmc+KCk7XHJcbiAgICAgICAgcHVibGljIGJvb2wgRG9uZSB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIGJvb2wgTmFycmF0aW9uT25seTtcclxuXHJcbiAgICAgICAgcHVibGljIERpYWxvZ05hcnJhdGlvblNjcmVlbkNvbnRyb2woRGlhbG9nTmFycmF0aW9uU2NyZWVuIHNjcmVlbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NyZWVuID0gc2NyZWVuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU2V0VGV4dChzdHJpbmcgdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHQgPSB0LlJlcGxhY2UoXCIlXCIsIFwiXFxcIlwiKS5SZXBsYWNlKFwiXFxyXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICBUZXh0VGFnUmVhZGVyIHR0ciA9IG5ldyBUZXh0VGFnUmVhZGVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMudGV4dCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRhZ0luZm8gPSB0dHIuRXh0cmFjdFRhZ0luZm8odCwgb3V0IHRoaXMudGV4dCk7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIHRhZ0luZm8uVGFncylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShcIlRBR1wiKTtcclxuICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUodGhpcy50ZXh0LlN1YnN0cmluZyhpdGVtLlN0YXJ0LCBpdGVtLkVuZCAtIGl0ZW0uU3RhcnQpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU2hvd05leHQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKCFzY3JlZW4uSXNEb25lKCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNjcmVlbi5BZHZhbmNlUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0YWdJbmZvLlRhZ3MuQ291bnQgPD0gdGFnSW5kZXgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIERvbmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgdGFnID0gdGFnSW5mby5UYWdzW3RhZ0luZGV4XTtcclxuICAgICAgICAgICAgYm9vbCBjaGFyYVRhZyA9IHRhZy5MYWJlbEluZGV4SXMoJ2MnLCAwKTtcclxuICAgICAgICAgICAgaWYgKGNoYXJhVGFnICYmICFOYXJyYXRpb25Pbmx5KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdHJpbmcgc3BlYWtlciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBpZiAoU3BlYWtlckRhdGEuVHJ5R2V0VmFsdWUodGFnLkdldExhYmVsQ2hhcigxKSwgb3V0IHNwZWFrZXIpKVxyXG4gICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzcGVha2VyID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHN0cmluZyB0ZXh0MSA9IHRleHQuU3Vic3RyaW5nKHRhZy5TdGFydCwgdGFnLkVuZC0gdGFnLlN0YXJ0KTtcclxuICAgICAgICAgICAgICAgIHNjcmVlbi5BZGREaWFsb2coc3BlYWtlciwgdGV4dDEpO1xyXG4gICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlKHRleHQxKTtcclxuICAgICAgICAgICAgICAgIC8vc2NyZWVuLkFkZERpYWxvZyhcInNcIiwgXCJiYmJiXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0YWcuTGFiZWxJbmRleElzKCduJywgMCkgfHwgTmFycmF0aW9uT25seSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW50IGxlbmd0aCA9IHRhZy5FbmQgLSB0YWcuU3RhcnQ7XHJcbiAgICAgICAgICAgICAgICBpZiAobGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHN0cmluZyB0ZXh0MSA9IHRleHQuU3Vic3RyaW5nKHRhZy5TdGFydCwgbGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hhcmFUYWcgJiYgTmFycmF0aW9uT25seSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmcgc3BlYWtlciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChTcGVha2VyRGF0YS5UcnlHZXRWYWx1ZSh0YWcuR2V0TGFiZWxDaGFyKDEpLCBvdXQgc3BlYWtlcikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGVha2VyID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0MSA9IHNwZWFrZXIgKyBcIjogXCIgKyB0ZXh0MTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgc2NyZWVuLkFkZE5hcnJhdGlvbih0ZXh0MSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NyZWVuLkhpZGVEaWFsb2coKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlKHRleHQxKTtcclxuICAgICAgICAgICAgICAgIC8vc2NyZWVuLkFkZERpYWxvZyhcInNcIiwgXCJiYmJiXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRhZ0luZGV4Kys7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFRyeUFkdmFuY2UoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHNjcmVlbi5JbnB1dFVuaWNvZGUgPj0gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgU2hvd05leHQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgRGlhbG9nTmFycmF0b2luQ29udHJvbFRlc3RHYW1lIDogSVRleHRHYW1lXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBEaWFsb2dOYXJyYXRpb25TY3JlZW5Db250cm9sIGRuc2M7XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0U2NyZWVuSG9sZGVyIFNjcmVlbkhvbGRlciB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBQYWxldHRlIEdldFBhbGV0dGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIERlZmF1bHRQYWxldHRlcy5DNE5vdmVsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgSW5pdChpbnQgdywgaW50IGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgZG5zID0gbmV3IERpYWxvZ05hcnJhdGlvblNjcmVlbigpO1xyXG4gICAgICAgICAgICBkbnMuSW5pdCh3LCBoKTtcclxuICAgICAgICAgICAgU2NyZWVuSG9sZGVyLlNjcmVlbiA9IGRucztcclxuXHJcbiAgICAgICAgICAgIGRuc2MgPSBuZXcgRGlhbG9nTmFycmF0aW9uU2NyZWVuQ29udHJvbChkbnMpO1xyXG4gICAgICAgICAgICBkbnNjLlNldFRleHQoU3Rvcmllcy5zdG9yeTQpO1xyXG4vLyAgICAgICAgICAgIGRuc2MuU2V0VGV4dChAXCIjY21XZWxjb21lIGJhY2ssIGRlYXIuXHJcbi8vI2NtSG93IHdhcyBzY2hvb2wgdG9kYXk/XHJcbi8vI25uV2h5IHdvbid0IHRoaXMgd29yaz9cclxuLy9zXCIpO1xyXG4gICAgICAgICAgICBkbnNjLlNwZWFrZXJEYXRhLkFkZCgnbScsIFwiTW9tXCIpO1xyXG4gICAgICAgICAgICBkbnNjLlNwZWFrZXJEYXRhLkFkZCgncCcsIFwiU2FyYVwiKTtcclxuICAgICAgICAgICAgZG5zYy5TaG93TmV4dCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVXBkYXRlKGZsb2F0IGRlbHRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZG5zYy5UcnlBZHZhbmNlKCk7XHJcbiAgICAgICAgfVxyXG5cbiAgICBcbnByaXZhdGUgVGV4dFNjcmVlbkhvbGRlciBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fU2NyZWVuSG9sZGVyPW5ldyBUZXh0U2NyZWVuSG9sZGVyKCk7fVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBEaWFsb2dOYXJyYXRvaW5TY3JlZW5UZXN0R2FtZSA6IElUZXh0R2FtZVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBUZXh0U2NyZWVuSG9sZGVyIFNjcmVlbkhvbGRlciB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBQYWxldHRlIEdldFBhbGV0dGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIERlZmF1bHRQYWxldHRlcy5DNE5vdmVsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgSW5pdChpbnQgdywgaW50IGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgZG5zID0gbmV3IERpYWxvZ05hcnJhdGlvblNjcmVlbigpO1xyXG4gICAgICAgICAgICBkbnMuSW5pdCh3LCBoKTtcclxuICAgICAgICAgICAgU2NyZWVuSG9sZGVyLlNjcmVlbiA9IGRucztcclxuICAgICAgICAgICAgZG5zLkFkZE5hcnJhdGlvbihcImRhc2RzYWRkZGRkZGRkZGRkZGRkZGRkICBkYXNkc2FkICAgICAgIGRzYWRzXCIpO1xyXG4gICAgICAgICAgICBkbnMuQWRkRGlhbG9nKFwiTW9tXCIsIFwiV2hhdD9cIik7XHJcbiAgICAgICAgICAgIENvbnNvbGUuV3JpdGUoXCJzc3NcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBVcGRhdGUoZmxvYXQgZGVsdGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxuICAgIFxucHJpdmF0ZSBUZXh0U2NyZWVuSG9sZGVyIF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19TY3JlZW5Ib2xkZXI9bmV3IFRleHRTY3JlZW5Ib2xkZXIoKTt9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLlRleHRSZW5kZXJpbmc7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIE5vdmVsQXBwXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBTdHJpbmdUb1Bhc3NhZ2VcclxuICAgIHtcclxuICAgICAgICBpbnRlcm5hbCBMaXN0PGludD4gUGFzc2FnZUluZGV4ZXMgPSBuZXcgTGlzdDxpbnQ+KCk7XHJcbiAgICAgICAgaW50ZXJuYWwgc3RyaW5nIFRleHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFN0cmluZ1RvUGFzc2FnZUl0ZXJhdG9yXHJcbiAgICB7XHJcblxyXG4gICAgICAgIGludGVybmFsIFN0cmluZ1RvUGFzc2FnZSBTdHJpbmdUb1Bhc3NhZ2U7XHJcbiAgICAgICAgaW50IHByb2dyZXNzO1xyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZHZhbmNlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHByb2dyZXNzKys7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVmVjdG9yMkQgQ3VycmVudFBhc3NhZ2UoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyRChcclxuICAgICAgICAgICAgICAgIFN0cmluZ1RvUGFzc2FnZS5QYXNzYWdlSW5kZXhlc1twcm9ncmVzc10rMSwgU3RyaW5nVG9QYXNzYWdlLlBhc3NhZ2VJbmRleGVzW3Byb2dyZXNzICsgMV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBHZXRUZXh0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBTdHJpbmdUb1Bhc3NhZ2UuVGV4dDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIElzRG9uZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gU3RyaW5nVG9QYXNzYWdlLlBhc3NhZ2VJbmRleGVzLkNvdW50IDw9IHByb2dyZXNzICsgMjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgUmVzZXQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgU3RyaW5nVG9QYXNzYWdlLlBhc3NhZ2VJbmRleGVzLkNsZWFyKCk7XHJcbiAgICAgICAgICAgIHByb2dyZXNzID0gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFN0cmluZ1RvUGFzc2FnZUZhY3RvcnlcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIFN0cmluZ1RvUGFzc2FnZUl0ZXJhdG9yIFBvcHVsYXRlKFN0cmluZ1RvUGFzc2FnZUl0ZXJhdG9yIGl0ZXJhdG9yLCBzdHJpbmcgdGV4dClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChpdGVyYXRvciA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpdGVyYXRvciA9IG5ldyBTdHJpbmdUb1Bhc3NhZ2VJdGVyYXRvcigpO1xyXG4gICAgICAgICAgICAgICAgaXRlcmF0b3IuU3RyaW5nVG9QYXNzYWdlID0gbmV3IFN0cmluZ1RvUGFzc2FnZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGl0ZXJhdG9yLlJlc2V0KCk7XHJcbiAgICAgICAgICAgIGl0ZXJhdG9yLlN0cmluZ1RvUGFzc2FnZS5UZXh0ID0gdGV4dDtcclxuICAgICAgICAgICAgdmFyIHBhc3NhZ2VNYXJrZXJzID0gaXRlcmF0b3IuU3RyaW5nVG9QYXNzYWdlLlBhc3NhZ2VJbmRleGVzO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcGFzc2FnZU1hcmtlcnMuQWRkKC0xKTtcclxuICAgICAgICAgICAgYm9vbCBvcGVuQXNwYXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgaW50IGxhc3RTdG9wID0gLTEwO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHRleHQuTGVuZ3RoIC0gMTsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaSAtIGxhc3RTdG9wIDwgMilcclxuICAgICAgICAgICAgICAgIC8vaWYoZmFsc2UpXHJcbiAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoKHRleHRbaV0gPT0gJy4nICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICh0ZXh0W2kgKyAxXSAhPSAnLidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIHRleHRbaSArIDFdICE9ICdcIidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIHRleHRbaSArIDFdICE9ICdcXG4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiB0ZXh0W2kgKyAxXSAhPSAnXFxyJykpKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFzc2FnZU1hcmtlcnMuQWRkKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0U3RvcCA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZXh0W2ldID09ICdcIicpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVuQXNwYXMgPSAhb3BlbkFzcGFzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW9wZW5Bc3BhcylcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFzc2FnZU1hcmtlcnMuQWRkKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFN0b3AgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZXh0W2ldID09ICdcXG4nKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFzc2FnZU1hcmtlcnMuQWRkKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0U3RvcCA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHBhc3NhZ2VNYXJrZXJzLkFkZCh0ZXh0Lkxlbmd0aCAtIDEpO1xyXG4gICAgICAgICAgICByZXR1cm4gaXRlcmF0b3I7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Ob3ZlbEJhc2Vcclxue1xyXG5cclxuXHJcblxyXG4gICAgcHVibGljIGNsYXNzIFRleHRUYWdSZWFkZXJcclxuICAgIHtcclxuXHJcbiAgICAgICAgTGlzdDxUYWdJbmZvPiB0YWdzT3BlbmVkID0gbmV3IExpc3Q8VGFnSW5mbz4oKTtcclxuICAgICAgICBTdHJpbmdCdWlsZGVyIGF1eCA9IG5ldyBTdHJpbmdCdWlsZGVyKCk7XHJcbiAgICAgICAgcHVibGljIGJvb2wgRW5kUGFzc2FnZU9uQXNwYXMgPSB0cnVlO1xyXG5cclxuICAgICAgICBwdWJsaWMgVGFnSW5mb0hvbGRlciBFeHRyYWN0VGFnSW5mbyhzdHJpbmcgdGV4dCwgb3V0IHN0cmluZyB0YWdsZXNzVGV4dClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGF1eC5MZW5ndGggPSAwO1xyXG4gICAgICAgICAgICB0YWdzT3BlbmVkLkNsZWFyKCk7XHJcbiAgICAgICAgICAgIHZhciB0aWggPSBuZXcgVGFnSW5mb0hvbGRlcigpO1xyXG4gICAgICAgICAgICBpbnQgcmVtb3ZlZFRhZ09mZnNldCA9IDA7XHJcbiAgICAgICAgICAgIGJvb2wgYXNwYXNPcGVuZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB0ZXh0Lkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGV4dFtpXSA9PSAnIycpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgVGFnSW5mbyB0aSA9IG5ldyBUYWdJbmZvKGkgLSByZW1vdmVkVGFnT2Zmc2V0LCB0ZXh0W2kgKyAxXSwgdGV4dFtpICsgMl0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRpaC5UYWdzLkFkZCh0aSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFnc09wZW5lZC5BZGQodGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZWRUYWdPZmZzZXQgKz0gMztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJvb2wgZW5kRGV0ZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmICh0ZXh0W2ldID09ICdcIicpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKEVuZFBhc3NhZ2VPbkFzcGFzICYmIGFzcGFzT3BlbmVkKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5kRGV0ZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBhc3Bhc09wZW5lZCA9ICFhc3Bhc09wZW5lZDtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGV4dFtpXSA9PSAnXFxuJyB8fCBlbmREZXRlY3RlZClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiB0YWdzT3BlbmVkKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5FbmQgPSBpIC0gcmVtb3ZlZFRhZ09mZnNldDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGFnc09wZW5lZC5DbGVhcigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgdGV4dC5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRleHRbaV0gPT0gJyMnKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGkgKz0gMjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhdXguQXBwZW5kKHRleHRbaV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRhZ2xlc3NUZXh0ID0gYXV4LlRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aWg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBUYWdJbmZvSG9sZGVyXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIExpc3Q8VGFnSW5mbz4gVGFncyA9IG5ldyBMaXN0PFRhZ0luZm8+KCk7XHJcblxyXG4gICAgICAgIGludGVybmFsIFRhZ0luZm8gR2V0VGFnT2ZJbmRleChpbnQgY2hhckluZGV4LCBpbnQgdGFnTnVtYmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IHROID0gMDtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gVGFncylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uVmFsaWRGb3JQb3NpdGlvbihjaGFySW5kZXgpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YWdOdW1iZXIgPT0gdE4pIHJldHVybiBpdGVtO1xyXG4gICAgICAgICAgICAgICAgICAgIHROKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBUYWdJbmZvXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIGludCBTdGFydDtcclxuICAgICAgICBwdWJsaWMgaW50IEVuZDtcclxuICAgICAgICBjaGFyW10gVGFnID0gbmV3IGNoYXJbMl07XHJcblxyXG4gICAgICAgIHB1YmxpYyBUYWdJbmZvKGludCBzdGFydCwgY2hhciBjaGFyMSwgY2hhciBjaGFyMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFRhZ1swXSA9IGNoYXIxO1xyXG4gICAgICAgICAgICBUYWdbMV0gPSBjaGFyMjtcclxuICAgICAgICAgICAgdGhpcy5TdGFydCA9IHN0YXJ0O1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHN0YXRpYyBUYWdJbmZvIEZyb21MYWJlbChjaGFyIHYxLCBjaGFyIHYyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBUYWdJbmZvKDAsIHYxLCB2Mik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBjaGFyIEdldExhYmVsQ2hhcihpbnQgdilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBUYWdbdl07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBib29sIExhYmVsSW5kZXhJcyhjaGFyIHYxLCBpbnQgdjIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gVGFnW3YyXSA9PSB2MTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIGJvb2wgU2FtZUxhYmVsKFRhZ0luZm8gdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBUYWdbMF0gPT0gdC5UYWdbMF0gJiYgVGFnWzFdID09IHQuVGFnWzFdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgYm9vbCBWYWxpZEZvclBvc2l0aW9uKGludCBjaGFySW5kZXgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gY2hhckluZGV4ID49IFN0YXJ0ICYmIGNoYXJJbmRleCA8PSBFbmQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iLCJcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLk5vdmVsQmFzZVxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgVGFnVG9EYXRhPFQ+XHJcbiAgICB7XHJcbiAgICAgICAgTGlzdDxUYWdJbmZvPiB0YWdzID0gbmV3IExpc3Q8VGFnSW5mbz4oKTtcclxuICAgICAgICBMaXN0PFQ+IGRhdGFzID0gbmV3IExpc3Q8VD4oKTtcclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGREYXRhKFRhZ0luZm8gdGFnLCBUIGRhdGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBkYXRhcy5BZGQoZGF0YSk7XHJcbiAgICAgICAgICAgIHRhZ3MuQWRkKHRhZyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVCBHZXREYXRhKFRhZ0luZm8gdGFnKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIEdldERhdGEodGFnLCBkZWZhdWx0KFQpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUIEdldERhdGEoVGFnSW5mbyB0YWcsIFQgZGVmYXVsdFYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHRhZ3MuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRhZy5TYW1lTGFiZWwodGFnc1tpXSkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGFzW2ldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBkZWZhdWx0VjtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Ob3ZlbEJhc2Vcclxue1xyXG4gICAgcHVibGljIHN0YXRpYyBjbGFzcyBUZXN0U3Rvcmllc1xyXG4gICAge1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBzdHJpbmcgZ290ID0gQFwiJSNjcFdlIHNob3VsZCBzdGFydCBiYWNrLCUgR2FyZWQgdXJnZWQgYXMgdGhlIHdvb2RzIGJlZ2FuIHRvIGdyb3cgZGFyayBhcm91bmQgdGhlbS4gJVRoZSB3aWxkbGluZ3MgYXJlIGRlYWQuJSBcclxuJURvIHRoZSBkZWFkIGZyaWdodGVuIHlvdT8lIFNlciBXYXltYXIgUm95Y2UgYXNrZWQgd2l0aCBqdXN0IHRoZSBoaW50IG9mIGEgc21pbGUuXHJcbkdhcmVkIGRpZCBub3QgcmlzZSB0byB0aGUgYmFpdC4gSGUgd2FzIGFuIG9sZCBtYW4sIHBhc3QgZmlmdHksIGFuZCBoZSBoYWQgc2VlbiB0aGUgbG9yZGxpbmdzIGNvbWUgYW5kIGdvLiAlRGVhZCBpcyBkZWFkLCUgaGUgc2FpZC4gJVdlIGhhdmUgbm8gYnVzaW5lc3Mgd2l0aCB0aGUgZGVhZC4lXHJcbiVBcmUgdGhleSBkZWFkPyUgUm95Y2UgYXNrZWQgc29mdGx5LiAlV2hhdCBwcm9vZiBoYXZlIHdlPyVcclxuJVdpbGwgc2F3IHRoZW0sJSBHYXJlZCBzYWlkLiAlSWYgaGUgc2F5cyB0aGV5IGFyZSBkZWFkLCB0aGF04oCZcyBwcm9vZiBlbm91Z2ggZm9yIG1lLiVcclxuV2lsbCBoYWQga25vd24gdGhleSB3b3VsZCBkcmFnIGhpbSBpbnRvIHRoZSBxdWFycmVsIHNvb25lciBvciBsYXRlci4gSGUgd2lzaGVkIGl0IGhhZCBiZWVuIGxhdGVyIHJhdGhlciB0aGFuIHNvb25lci4gJU15IG1vdGhlciB0b2xkIG1lIHRoYXQgZGVhZCBtZW4gc2luZyBubyBzb25ncywlIGhlIHB1dCBpbi5cclxuJU15IHdldCBudXJzZSBzYWlkIHRoZSBzYW1lIHRoaW5nLCBXaWxsLCUgUm95Y2UgcmVwbGllZC4gJU5ldmVyIGJlbGlldmUgYW55dGhpbmcgeW91IGhlYXIgYXQgYSB3b21hbuKAmXMgdGl0LiBUaGVyZSBhcmUgdGhpbmdzIHRvIGJlIGxlYXJuZWQgZXZlbiBmcm9tIHRoZSBkZWFkLiUgSGlzIHZvaWNlIGVjaG9lZCwgdG9vIGxvdWQgaW4gdGhlIHR3aWxpdCBmb3Jlc3QuXCI7XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc3RyaW5nIEdvdCB7IGdldCB7IHJldHVybiBnb3QuUmVwbGFjZShcIiVcIixcIlxcXCJcIik7IH1cclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGdvdCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLk5vdmVsQmFzZVxyXG57XHJcbiAgICAvKlxyXG4gICAgICogXHJcbiAgICAgKiBBIGNsYXNzIHRvIHNob3cgdGV4dCBjaGFyIGJ5IGNoYXIuIEFsbCB0ZXh0IGhhcyB0byBiZSBpbnNlcnRlZCBvbiB0aGUgc2V0dXAgcGhhc2UuXHJcbiAgICAgKiBDaGFycyBjYW4gYmUgc2hvd24gdGljayBieSB0aWNrIG9yIHRocm91Z2ggYW4gdXBkYXRlIGZ1bmN0aW9uLiBcclxuICAgICAqIENhbGN1bGF0ZXMgcGFzc2FnZSBicmVha3MsIGxpbmUgYnJlYWtzIGFuZCBwYWdlIGJyZWFrc1xyXG4gICAgICogXHJcbiAgICAgKiBNYXJrZWQgYXMgb2Jzb2xldGUgYmVjYXVzZSBvdGhlciBjbGFzc2VzIHdpbGwgZG8gd2hhdCBpdCBkb2VzIGJldHRlciBidXQgd2l0aCBkeW5hbWljIHRleHQgaW5zZXJ0aW9uXHJcbiAgICAgKi9cclxuICAgIFtPYnNvbGV0ZV1cclxuICAgIHB1YmxpYyBjbGFzcyBUZXh0UmVuZGVyXHJcbiAgICB7XHJcblxyXG4gICAgICAgIGludCBpbmRleGVyID0gMDtcclxuICAgICAgICBpbnQgbGluZWJyZWFrc1Byb2dyZXNzZWQgPSAwO1xyXG4gICAgICAgIGludCB4ID0gMDtcclxuICAgICAgICBMaXN0PGludD4gcGFzc2FnZU1hcmtlcnMgPSBuZXcgTGlzdDxpbnQ+KCk7XHJcbiAgICAgICAgcHVibGljIFRleHRFbnRpdHkgVGV4dEhvbGRlcjtcclxuICAgICAgICBwcml2YXRlIFRhZ0luZm9Ib2xkZXIgdGFnSW5mbztcclxuICAgICAgICBwcml2YXRlIHN0cmluZyB0ZXh0O1xyXG4gICAgICAgIHB1YmxpYyBUZXh0V29ybGQgdGV4dFdvcmxkO1xyXG4gICAgICAgIHByaXZhdGUgTGlzdDxpbnQ+IGxpbmVCcmVha3M7XHJcbiAgICAgICAgcHJpdmF0ZSBMaXN0PGludD4gcGFnZUJyZWFrcyA9IG5ldyBMaXN0PGludD4oKTtcclxuICAgICAgICBwcml2YXRlIGludCBjaGFySW5kZXg7XHJcbiAgICAgICAgcHJpdmF0ZSBib29sIHBhc3NhZ2VEb25lO1xyXG4gICAgICAgIGZsb2F0IHRpbWVPZkNoYXIgPSAwLjAyZjtcclxuICAgICAgICBmbG9hdCB0aW1lQnVmZmVyO1xyXG4gICAgICAgIGludCBiYWNrZ3JvdW5kQ29sb3JEZWZhdWx0ID0gRGVmYXVsdFBhbGV0dGVzLkM0QmxhY2s7XHJcbiAgICAgICAgaW50IHRleHRDb2xvckRlZmF1bHQgPSBEZWZhdWx0UGFsZXR0ZXMuQzRXaGl0ZTtcclxuXHJcbiAgICAgICAgcHVibGljIFRhZ1RvRGF0YTxpbnQ+IFRhZ1RvQ29sb3IgPSBuZXcgVGFnVG9EYXRhPGludD4oKTtcclxuICAgICAgICBwcml2YXRlIGJvb2wgcXVpY2tTa2lwO1xyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBGaW5pc2hlZCB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICBpbnQgbGluZU9mZnNldDtcclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU2V0dXAoc3RyaW5nIHRleHQsIGludCB3aWR0aCwgaW50IGhlaWdodCwgVGFnSW5mb0hvbGRlciB0YWdJbmZvKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy50YWdJbmZvID0gdGFnSW5mbztcclxuICAgICAgICAgICAgdGhpcy50ZXh0ID0gdGV4dDtcclxuICAgICAgICAgICAgdGV4dFdvcmxkID0gbmV3IFRleHRXb3JsZCgpO1xyXG4gICAgICAgICAgICBpbnQgYnVmZmVyV2lkdGggPSB3aWR0aDtcclxuICAgICAgICAgICAgaW50IGJ1ZmZlckhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICAgICAgdGV4dFdvcmxkLkluaXQoYnVmZmVyV2lkdGggLSAxLCBidWZmZXJIZWlnaHQgLSAxKTtcclxuICAgICAgICAgICAgVGV4dEhvbGRlciA9IHRleHRXb3JsZC5HZXRGcmVlRW50aXR5KGJ1ZmZlcldpZHRoIC0gNCwgYnVmZmVySGVpZ2h0IC0gMik7XHJcbiAgICAgICAgICAgIFRleHRIb2xkZXIuU2V0UG9zaXRpb24oMiwgMSk7XHJcbiAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoZ290KTtcclxuICAgICAgICAgICAgLy9Db25zb2xlLlJlYWRLZXkoKTtcclxuXHJcbiAgICAgICAgICAgICNyZWdpb24gbWVzc2FnZSBwYWNpbmcgbWFya2VyXHJcblxyXG4gICAgICAgICAgICBwYXNzYWdlTWFya2Vycy5BZGQoLTEpO1xyXG4gICAgICAgICAgICBib29sIG9wZW5Bc3BhcyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpbnQgbGFzdFN0b3AgPSAtMTA7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgdGV4dC5MZW5ndGggLSAxOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChpIC0gbGFzdFN0b3AgPCAyKVxyXG4gICAgICAgICAgICAgICAgLy9pZihmYWxzZSlcclxuICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgodGV4dFtpXSA9PSAnLicgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgKHRleHRbaSArIDFdICE9ICcuJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgdGV4dFtpICsgMV0gIT0gJ1wiJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgdGV4dFtpICsgMV0gIT0gJ1xcbidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIHRleHRbaSArIDFdICE9ICdcXHInKSkpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXNzYWdlTWFya2Vycy5BZGQoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTdG9wID0gaTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRleHRbaV0gPT0gJ1wiJylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5Bc3BhcyA9ICFvcGVuQXNwYXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghb3BlbkFzcGFzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXNzYWdlTWFya2Vycy5BZGQoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0U3RvcCA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRleHRbaV0gPT0gJ1xcbicpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXNzYWdlTWFya2Vycy5BZGQoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTdG9wID0gaTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAgICAgI3JlZ2lvbiBsaW5lYnJlYWsgbWFya2VyXHJcbiAgICAgICAgICAgIGxpbmVCcmVha3MgPSBuZXcgTGlzdDxpbnQ+KCk7XHJcbiAgICAgICAgICAgIGludCB3aXNoZWRXaWR0aCA9IGJ1ZmZlcldpZHRoIC0gNDtcclxuICAgICAgICAgICAgaW50IHhQb3MgPSAwO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHRleHQuTGVuZ3RoIC0gMTsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB4UG9zKys7XHJcbiAgICAgICAgICAgICAgICBpZiAodGV4dFtpXSA9PSAnXFxuJylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsaW5lQnJlYWtzLkFkZChpKTtcclxuICAgICAgICAgICAgICAgICAgICBsaW5lQnJlYWtzLkFkZChpKTtcclxuICAgICAgICAgICAgICAgICAgICB4UG9zID0gLTE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGV4dFtpXSA9PSAnICcpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW50IHhQb3NBdXggPSB4UG9zICsgMTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBqID0gaSArIDE7IGogPCB0ZXh0Lkxlbmd0aDsgaisrKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHhQb3NBdXggPj0gd2lzaGVkV2lkdGggLSAyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZUJyZWFrcy5BZGQoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4UG9zID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRleHRbal0gIT0gJyAnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4UG9zQXV4Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRleHRbal0gPT0gJyAnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAgICAgLy9pZiB0aGUgY3VycmVudCBwYXNzYWdlIHdpbGwgYnJlYWsgdGhyb3VnaCB0aGUgcGFnZSwgbWFrZSB0aGUgc3RhcnQgb2YgdGhlIGN1cnJlbnQgcGFzc2FnZSBhIHBhZ2VicmVha2VyXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGludCBsaW5lT2Zmc2V0ID0gMDtcclxuICAgICAgICAgICAgICAgIHdoaWxlICh0cnVlKVxyXG4gICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpbnQgZGFuZ2VyTGluZSA9IFRleHRIb2xkZXIuSGVpZ2h0IC0gMSArIGxpbmVPZmZzZXQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYW5nZXJMaW5lIDwgbGluZUJyZWFrcy5Db3VudClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnQgbGluZUVuZGVyID0gbGluZUJyZWFrc1tkYW5nZXJMaW5lXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW50IGxpbmVFbmRlcjIgPSA5OTk5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGFuZ2VyTGluZSA8IGxpbmVCcmVha3MuQ291bnQgLSAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lRW5kZXIyID0gbGluZUJyZWFrc1tkYW5nZXJMaW5lICsgMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludCBwYXNzYWdlID0gLTE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gZGFuZ2VyTGluZSAtIDE7IGkgPj0gMDsgaS0tKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFzc2FnZU1hcmtlcnMuQ29udGFpbnMobGluZUJyZWFrc1tpXSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZU9mZnNldCArPSBpIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXNzYWdlID0gbGluZUJyZWFrc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFnZUJyZWFrcy5BZGQocGFzc2FnZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlY2VpdmVJbnB1dCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAocGFzc2FnZURvbmUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHBhc3NhZ2VEb25lID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBxdWlja1NraXAgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVXBkYXRlKGZsb2F0IGRlbHRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGltZUJ1ZmZlciArPSBkZWx0YTtcclxuICAgICAgICAgICAgaWYgKHF1aWNrU2tpcClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGltZUJ1ZmZlciArPSAxMDA7XHJcbiAgICAgICAgICAgICAgICBxdWlja1NraXAgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB3aGlsZSAodGltZUJ1ZmZlciA+IHRpbWVPZkNoYXIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRpbWVCdWZmZXIgLT0gdGltZU9mQ2hhcjtcclxuICAgICAgICAgICAgICAgIFRyeURyYXdOZXh0Q2hhcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBUcnlEcmF3TmV4dENoYXIoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKCFwYXNzYWdlRG9uZSkgRHJhd05leHRDaGFyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBEcmF3TmV4dENoYXIoKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIGJvb2wgRHJhd0NoYXIgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAocGFzc2FnZU1hcmtlcnMuQ291bnQgPiBpbmRleGVyICsgMSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRHJhd0NoYXIgPSBjaGFySW5kZXggPCBwYXNzYWdlTWFya2Vyc1tpbmRleGVyICsgMV0gKyAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChEcmF3Q2hhcilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy93aGlsZSAobGluZWJyZWFrc1Byb2dyZXNzZWQgLSBsaW5lT2Zmc2V0ID49IFRleHRIb2xkZXIuSGVpZ2h0KVxyXG4gICAgICAgICAgICAgICAgaWYgKHBhZ2VCcmVha3MuQ29udGFpbnMoY2hhckluZGV4KSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsaW5lT2Zmc2V0ICs9IFRleHRIb2xkZXIuSGVpZ2h0IC0gMTtcclxuICAgICAgICAgICAgICAgICAgICBsaW5lT2Zmc2V0ID0gbGluZWJyZWFrc1Byb2dyZXNzZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgVGV4dEhvbGRlci5SZXNldEZ1bGwoKTtcclxuICAgICAgICAgICAgICAgICAgICB4ID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlKFwiUEFHRSBCUkVBSyBcIiArIGNoYXJJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9Db25zb2xlLlJlYWRLZXkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoXCJucCAtIFwiK2NoYXJJbmRleCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB4Kys7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hhckluZGV4ID49IHRleHQuTGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEZpbmlzaGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjaGFyIHZhbHVlID0gdGV4dFtjaGFySW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpbmVCcmVha3MuQ29udGFpbnMoY2hhckluZGV4KSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgbGIgaW4gbGluZUJyZWFrcylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYiA9PSBjaGFySW5kZXgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVicmVha3NQcm9ncmVzc2VkKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHggPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGludCB0YWdOdW1iZXIgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGludCB0ZXh0Q29sb3IgPSB0ZXh0Q29sb3JEZWZhdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIFRhZ0luZm8gdGkgPSB0YWdJbmZvLkdldFRhZ09mSW5kZXgoY2hhckluZGV4LCB0YWdOdW1iZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICh0aSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW50IGNvbG9yID0gVGFnVG9Db2xvci5HZXREYXRhKHRpLCAtMTApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29sb3IgIT0gLTEwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0Q29sb3IgPSBjb2xvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWdOdW1iZXIrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGkgPSB0YWdJbmZvLkdldFRhZ09mSW5kZXgoY2hhckluZGV4LCB0YWdOdW1iZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBUZXh0SG9sZGVyLk9yaWdpbi5EcmF3Q2hhcih2YWx1ZSwgeCwgbGluZWJyZWFrc1Byb2dyZXNzZWQgLSBsaW5lT2Zmc2V0LCB0ZXh0Q29sb3IsIGJhY2tncm91bmRDb2xvckRlZmF1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHRXb3JsZC5EcmF3KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNoYXJJbmRleCsrO1xyXG4gICAgICAgICAgICAgICAgcGFzc2FnZURvbmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGluZGV4ZXIrKztcclxuXHJcbiAgICAgICAgICAgICAgICBwYXNzYWdlRG9uZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLk5vdmVsQmFzZVxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgVGV4dFJlbmRlckR5bmFtaWNcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIFRleHRFbnRpdHkgZW50aXR5O1xyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBJbml0KFRleHRFbnRpdHkgdGV4dClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZW50aXR5ID0gdGV4dDtcclxuICAgICAgICAgICAgdGV4dC5PcmlnaW4uU2V0Q3Vyc29yQXQoMCwwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEluc2VydFRleHQoc3RyaW5nIHRleHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlbnRpdHkuT3JpZ2luLkRyYXdfQ3Vyc29yKHRleHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucztcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guVGV4dFJlbmRlcmluZ1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgVGV4dFdvcmxkXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIFBhbGV0dGUgcGFsZXR0ZSA9IERlZmF1bHRQYWxldHRlcy5DNEtpcm9LYXplO1xyXG4gICAgICAgIExpc3Q8VGV4dEVudGl0eT4gYWN0aXZlQWdlbnRzID0gbmV3IExpc3Q8VGV4dEVudGl0eT4oKTtcclxuICAgICAgICBMaXN0PFRleHRFbnRpdHk+IGZyZWVCb2FyZHMgPSBuZXcgTGlzdDxUZXh0RW50aXR5PigpO1xyXG4gICAgICAgIExpc3Q8VGV4dEFuaW1hdGlvbj4gYW5pbWF0aW9ucyA9IG5ldyBMaXN0PFRleHRBbmltYXRpb24+KCk7XHJcbiAgICAgICAgcHVibGljIFRleHRCb2FyZCBtYWluQm9hcmQ7XHJcbiAgICAgICAgaW50IGxhdGVzdElkID0gLTE7XHJcblxyXG4gICAgICAgIHB1YmxpYyBUIEFkZEFuaW1hdGlvbjxUPihUIHRhKSB3aGVyZSBUIDogVGV4dEFuaW1hdGlvblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYW5pbWF0aW9ucy5BZGQodGEpO1xyXG4gICAgICAgICAgICB0YS5SZWdpc3Rlckxpc3RzKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0YTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEluaXQoaW50IHdpZHRoLCBpbnQgaGVpZ2h0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbWFpbkJvYXJkID0gbmV3IFRleHRCb2FyZCh3aWR0aCwgaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1haW5Cb2FyZC5SZXNldCgpO1xyXG4gICAgICAgICAgICBEcmF3Q2hpbGRyZW4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdDaGlsZHJlbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGFjdGl2ZUFnZW50cy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBhY3RpdmVBZ2VudHNbaV0uUmVzZXRBbmltYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBhbmltIGluIGFuaW1hdGlvbnMpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYW5pbS5Nb2RpZnkoYWN0aXZlQWdlbnRzW2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChhY3RpdmVBZ2VudHNbaV0uZnJlZUlmSWRsZSAmJiAhYWN0aXZlQWdlbnRzW2ldLmFuaW1hdGluZylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmcmVlQm9hcmRzLkFkZChhY3RpdmVBZ2VudHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZUFnZW50cy5SZW1vdmUoYWN0aXZlQWdlbnRzW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICBpLS07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbkJvYXJkLkluc2VydChhY3RpdmVBZ2VudHNbaV0uYW5pbWF0aW9uKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0RW50aXR5IEdldEZyZWVFbnRpdHkoaW50IHcsIGludCBoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVGV4dEVudGl0eSB0ZTtcclxuICAgICAgICAgICAgaWYgKGZyZWVCb2FyZHMuQ291bnQgPiAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0ZSA9IGZyZWVCb2FyZHNbZnJlZUJvYXJkcy5Db3VudCAtIDFdO1xyXG4gICAgICAgICAgICAgICAgZnJlZUJvYXJkcy5SZW1vdmVBdChmcmVlQm9hcmRzLkNvdW50IC0gMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0ZSA9IG5ldyBUZXh0RW50aXR5KCk7XHJcbiAgICAgICAgICAgICAgICB0ZS5pZCA9ICsrbGF0ZXN0SWQ7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBhY3RpdmVBZ2VudHMuQWRkKHRlKTtcclxuICAgICAgICAgICAgdGUuZnJlZUlmSWRsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0ZS5TZXRTaXplKHcsIGgpO1xyXG4gICAgICAgICAgICB0ZS5SZXNldEZ1bGwoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRleHRFbnRpdHkgR2V0VGVtcEVudGl0eShpbnQgdywgaW50IGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdGUgPSBHZXRGcmVlRW50aXR5KHcsIGgpO1xyXG4gICAgICAgICAgICB0ZS5mcmVlSWZJZGxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIHRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWR2YW5jZVRpbWUoZmxvYXQgdilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBhbmltIGluIGFuaW1hdGlvbnMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGFuaW0uVXBkYXRlKHYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBJc0RvbmUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGFuaW0gaW4gYW5pbWF0aW9ucylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFhbmltLklzRG9uZSgpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBUZXh0RW50aXR5XHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIGludCBpZDtcclxuICAgICAgICBwdWJsaWMgVGV4dEJvYXJkIE9yaWdpbjtcclxuICAgICAgICBwdWJsaWMgVGV4dEJvYXJkIGFuaW1hdGlvbjtcclxuICAgICAgICBwdWJsaWMgYm9vbCBmcmVlSWZJZGxlID0gZmFsc2U7XHJcbiAgICAgICAgaW50ZXJuYWwgYm9vbCBhbmltYXRpbmc7XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgSGVpZ2h0IHsgZ2V0IHsgcmV0dXJuIE9yaWdpbi5IZWlnaHQ7IH0gfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dEFuaW1hdGlvbi5CYXNlRGF0YSBBbmltQmFzZShmbG9hdCBsZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFRleHRBbmltYXRpb24uQmFzZURhdGEobGVuZ3RoLCAwLCBpZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFJlc2V0QW5pbWF0aW9uKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGFuaW1hdGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBhbmltYXRpb24uU2V0KE9yaWdpbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFJlc2V0RnVsbCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBPcmlnaW4uUmVzZXRJbnZpc2libGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgU2V0UG9zaXRpb24oaW50IHgsIGludCB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgT3JpZ2luLlBvc2l0aW9uID0gbmV3IFZlY3RvcjJEKHgseSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFNldFNpemUoaW50IHcsIGludCBoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKE9yaWdpbiA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBPcmlnaW4gPSBuZXcgVGV4dEJvYXJkKHcsIGgpO1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uID0gbmV3IFRleHRCb2FyZCh3LCBoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBPcmlnaW4uUmVzaXplKHcsIGgpO1xyXG4gICAgICAgICAgICBhbmltYXRpb24uUmVzaXplKHcsIGgpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBQb3NpdGlvbkFuaW1hdGlvbiA6IFRleHRBbmltYXRpb248UG9zaXRpb25BbmltYXRpb24uUG9zaXRpb25EYXRhPlxyXG4gICAge1xyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBNb2RpZnkoVGV4dEVudGl0eSBlbnRpdHksIFBvc2l0aW9uRGF0YSBtYWluRGF0YSwgZmxvYXQgcHJvZ3Jlc3MsIGZsb2F0IGxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuTW9kaWZ5KGVudGl0eSwgbWFpbkRhdGEsIHByb2dyZXNzLCBsZW5ndGgpO1xyXG4gICAgICAgICAgICBUZXh0Qm9hcmQgdGFyZ2V0ID0gZW50aXR5LmFuaW1hdGlvbjtcclxuICAgICAgICAgICAgaWYgKG1haW5EYXRhLnBlcm1hbmVudClcclxuICAgICAgICAgICAgICAgIHRhcmdldCA9IGVudGl0eS5PcmlnaW47XHJcbiAgICAgICAgICAgIHRhcmdldC5Qb3NpdGlvbiA9IFZlY3RvcjJELkludGVycG9sYXRlUm91bmRlZChtYWluRGF0YS5zdGFydFBvc2l0aW9uLCBtYWluRGF0YS5lbmRQb3NpdGlvbiwgcHJvZ3Jlc3MgLyBsZW5ndGgpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJ1Y3QgUG9zaXRpb25EYXRhXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgYm9vbCBwZXJtYW5lbnQ7XHJcbiAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBWZWN0b3IyRCBzdGFydFBvc2l0aW9uLCBlbmRQb3NpdGlvbjtcclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBQb3NpdGlvbkRhdGEoVmVjdG9yMkQgc3RhcnRQb3NpdGlvbiwgVmVjdG9yMkQgZW5kUG9zaXRpb24sIGJvb2wgcGVybSA9IGZhbHNlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0UG9zaXRpb24gPSBzdGFydFBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbmRQb3NpdGlvbiA9IGVuZFBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wZXJtYW5lbnQgPSBwZXJtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBjbGFzcyBUZXh0QW5pbWF0aW9uPFQ+IDogVGV4dEFuaW1hdGlvblxyXG4gICAge1xyXG4gICAgICAgIHByb3RlY3RlZCBMaXN0PFQ+IG1haW5EYXRhID0gbmV3IExpc3Q8VD4oKTtcclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBSZXF1ZXN0UmVnaXN0ZXJMaXN0cygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLlJlZ2lzdGVyTGlzdChtYWluRGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGQoQmFzZURhdGEgYmFzZURhdGEsIFQgbWFpbkQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLkFkZChiYXNlRGF0YSk7XHJcbiAgICAgICAgICAgIG1haW5EYXRhLkFkZChtYWluRCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBNb2RpZnkoVGV4dEVudGl0eSBlbnRpdHksIGludCBpbmRleCwgZmxvYXQgcHJvZ3Jlc3MsIGZsb2F0IGxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE1vZGlmeShlbnRpdHksIG1haW5EYXRhW2luZGV4XSwgcHJvZ3Jlc3MsIGxlbmd0aCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCB2b2lkIE1vZGlmeShUZXh0RW50aXR5IGVudGl0eSwgVCBtYWluRGF0YSwgZmxvYXQgcHJvZ3Jlc3MsIGZsb2F0IGxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2ludGVybmFsIG92ZXJyaWRlIHZvaWQgRXhlY3V0ZShpbnQgaW5kZXgsIEJhc2VEYXRhIGJhc2VEYXRhKVxyXG4gICAgICAgIC8ve1xyXG4gICAgICAgIC8vICAgIHRoaXMuRXhlY3V0ZShtYWluRGF0YVtpbmRleF0sIGJhc2VEYXRhKTtcclxuICAgICAgICAvL31cclxuXHJcbiAgICAgICAgLy9wdWJsaWMgYWJzdHJhY3Qgdm9pZCBFeGVjdXRlKFQgbWFpbkRhdGEsIEJhc2VEYXRhIGJhc2VEYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgY2xhc3MgVGV4dEFuaW1hdGlvblxyXG4gICAge1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RydWN0IEJhc2VEYXRhXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgZmxvYXQgbGVuZ3RoO1xyXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgZmxvYXQgcHJvZ3Jlc3M7XHJcbiAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBpbnQgdGFyZ2V0O1xyXG5cclxuICAgICAgICAgICAgcHVibGljIEJhc2VEYXRhKGZsb2F0IGxlbmd0aCwgZmxvYXQgcHJvZ3Jlc3MsIGludCB0YXJnZXQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzcyA9IHByb2dyZXNzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgTGlzdDxmbG9hdD4gbGVuZ3RoID0gbmV3IExpc3Q8ZmxvYXQ+KCk7XHJcbiAgICAgICAgTGlzdDxmbG9hdD4gcHJvZ3Jlc3MgPSBuZXcgTGlzdDxmbG9hdD4oKTtcclxuICAgICAgICBMaXN0PGludD4gdGFyZ2V0cyA9IG5ldyBMaXN0PGludD4oKTtcclxuICAgICAgICBMaXN0PElMaXN0PiBsaXN0cyA9IG5ldyBMaXN0PElMaXN0PigpO1xyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZWdpc3Rlckxpc3RzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxpc3RzLkFkZChsZW5ndGgpO1xyXG4gICAgICAgICAgICBsaXN0cy5BZGQocHJvZ3Jlc3MpO1xyXG4gICAgICAgICAgICBsaXN0cy5BZGQodGFyZ2V0cyk7XHJcbiAgICAgICAgICAgIFJlcXVlc3RSZWdpc3Rlckxpc3RzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgYWJzdHJhY3Qgdm9pZCBSZXF1ZXN0UmVnaXN0ZXJMaXN0cygpO1xyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBVcGRhdGUoZmxvYXQgZGVsdGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHByb2dyZXNzLkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHByb2dyZXNzW2ldICs9IGRlbHRhO1xyXG4gICAgICAgICAgICAgICAgaWYgKHByb2dyZXNzW2ldID49IGxlbmd0aFtpXSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBFbmRUYXNrKGkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vRXhlY3V0ZShpLCBuZXcgQmFzZURhdGEobGVuZ3RoW2ldLHByb2dyZXNzW2ldLCB0YXJnZXRzW2ldKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vaW50ZXJuYWwgYWJzdHJhY3Qgdm9pZCBFeGVjdXRlKGludCBpbmRleCwgQmFzZURhdGEgYmFzZURhdGEpO1xyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIEFkZChCYXNlRGF0YSBiZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHByb2dyZXNzLkFkZChiZC5wcm9ncmVzcyk7XHJcbiAgICAgICAgICAgIHRhcmdldHMuQWRkKGJkLnRhcmdldCk7XHJcbiAgICAgICAgICAgIGxlbmd0aC5BZGQoYmQubGVuZ3RoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIElzRG9uZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBsaXN0cylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uQ291bnQgIT0gcHJvZ3Jlc3MuQ291bnQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RyaW5nIHMgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIHMuVHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBwcm9ncmVzcy5Db3VudCA9PSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBFbmRUYXNrKGludCBpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGwgaW4gbGlzdHMpXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsLlJlbW92ZUF0KGkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFJlZ2lzdGVyTGlzdChJTGlzdCBtYWluRGF0YSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxpc3RzLkFkZChtYWluRGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIE1vZGlmeShUZXh0RW50aXR5IGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHByb2dyZXNzLkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChhLmlkID09IHRhcmdldHNbaV0pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgTW9kaWZ5KGEsIGksIHByb2dyZXNzW2ldLCBsZW5ndGhbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGEuYW5pbWF0aW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgdm9pZCBNb2RpZnkoVGV4dEVudGl0eSBlbnRpdHksIGludCBpbmRleCwgZmxvYXQgcHJvZ3Jlc3MsIGZsb2F0IGxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5UZXh0UmVuZGVyaW5nXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBQYWxldHRlXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0cmluZ1tdIEh0bWxDb2xvcnM7XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgUGFsZXR0ZShwYXJhbXMgc3RyaW5nW10gY29sb3JzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgSHRtbENvbG9ycyA9IGNvbG9ycztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIERlZmF1bHRQYWxldHRlc1xyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgUGFsZXR0ZSBDNEtpcm9LYXplID0gbmV3IFBhbGV0dGUoXCIjMzMyYzUwXCIsIFwiIzQ2ODc4ZlwiLCBcIiM5NGUzNDRcIiwgXCIjZTJmM2U0XCIpO1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgUGFsZXR0ZSBDNFJlYWRlciA9IG5ldyBQYWxldHRlKFwiIzI2MjYyNlwiLCBcIiM4YjhjYmFcIiwgXCIjOGJiYTkxXCIsIFwiIzY0OWY4ZFwiKTtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIFBhbGV0dGUgQzROb3ZlbCA9IG5ldyBQYWxldHRlKFwiIzI2MjYyNlwiLCBcIiMzNDJkNDFcIiwgXCIjYjhiOGI4XCIsIFwiIzhiOGNiYVwiKTtcclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IEM0QmxhY2sgPSAwO1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBpbnQgQzRCbGFja05ldXRyYWwgPSAxO1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBpbnQgQzRXaGl0ZU5ldXRyYWwgPSAyO1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBpbnQgQzRXaGl0ZSA9IDM7XHJcblxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guVGV4dFJlbmRlcmluZ1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgVGV4dEJvYXJkXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGNoYXIgTk9DSEFOR0VDSEFSID0gKGNoYXIpMTtcclxuICAgICAgICBwdWJsaWMgY29uc3QgY2hhciBJTlZJU0lCTEVDSEFSID0gKGNoYXIpMjtcclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IE5PQ0hBTkdFQ09MT1IgPSAtMjtcclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IElOVklTSUJMRUNPTE9SID0gLTE7XHJcbiAgICAgICAgY2hhclssXSBjaGFycztcclxuICAgICAgICBwdWJsaWMgaW50WyxdIFRleHRDb2xvciB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgaW50WyxdIEJhY2tDb2xvciB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICAvL1N0cmluZ0J1aWxkZXIgc3RyaW5nQnVpbGRlciA9IG5ldyBTdHJpbmdCdWlsZGVyKCk7XHJcbiAgICAgICAgaW50IGN1cnNvclggPSAwO1xyXG4gICAgICAgIGludCBjdXJzb3JZID0gMDtcclxuICAgICAgICBwdWJsaWMgVmVjdG9yMkQgUG9zaXRpb24geyBnZXQ7IHNldDsgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIFRleHRCb2FyZChpbnQgd2lkdGgsIGludCBoZWlnaHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL1NldE1heFNpemUod2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgICAgIFJlc2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdPbkNlbnRlcihzdHJpbmcgbWVzc2FnZSwgaW50IGNvbG9yLCBpbnQgeE9mZiA9IDAsIGludCB5T2ZmID0gMCwgYm9vbCBhbGlnblN0cmluZyA9IHRydWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgeCA9IChXaWR0aCkgLyAyO1xyXG4gICAgICAgICAgICBpZiAoYWxpZ25TdHJpbmcpIHggLT0gbWVzc2FnZS5MZW5ndGggLyAyO1xyXG4gICAgICAgICAgICBpbnQgeSA9IEhlaWdodCAvIDI7XHJcbiAgICAgICAgICAgIERyYXcobWVzc2FnZSwgeCArIHhPZmYsIHkgKyB5T2ZmLCBjb2xvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBcclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIFNldE1heFNpemUoaW50IHdpZHRoLCBpbnQgaGVpZ2h0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2hhcnMgPSBuZXcgY2hhclt3aWR0aCwgaGVpZ2h0XTtcclxuICAgICAgICAgICAgVGV4dENvbG9yID0gbmV3IGludFt3aWR0aCwgaGVpZ2h0XTtcclxuICAgICAgICAgICAgQmFja0NvbG9yID0gbmV3IGludFt3aWR0aCwgaGVpZ2h0XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlc2V0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIERyYXdSZXBlYXRlZCgnICcsIDAsIDAsIFdpZHRoLCBIZWlnaHQsIDAsIDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVzZXRJbnZpc2libGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRHJhd1JlcGVhdGVkKElOVklTSUJMRUNIQVIsIDAsIDAsIFdpZHRoLCBIZWlnaHQsIElOVklTSUJMRUNPTE9SLCBJTlZJU0lCTEVDT0xPUik7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIGludCBXaWR0aCB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgSW5zZXJ0KFRleHRCb2FyZCBzZWNvbmRCb2FyZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgc2Vjb25kQm9hcmQuV2lkdGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IDA7IGogPCBzZWNvbmRCb2FyZC5IZWlnaHQ7IGorKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnQgeCA9IChpbnQpc2Vjb25kQm9hcmQuUG9zaXRpb24uWCArIGk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW50IHkgPSAoaW50KXNlY29uZEJvYXJkLlBvc2l0aW9uLlkgKyBqO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWNvbmRCb2FyZC5jaGFyc1tpLCBqXSAhPSBJTlZJU0lCTEVDSEFSKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFyc1t4LCB5XSA9IHNlY29uZEJvYXJkLmNoYXJzW2ksIGpdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWNvbmRCb2FyZC5UZXh0Q29sb3JbaSwgal0gIT0gSU5WSVNJQkxFQ09MT1IpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRleHRDb2xvclt4LCB5XSA9IHNlY29uZEJvYXJkLlRleHRDb2xvcltpLCBqXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2Vjb25kQm9hcmQuQmFja0NvbG9yW2ksIGpdICE9IElOVklTSUJMRUNPTE9SKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBCYWNrQ29sb3JbeCwgeV0gPSBzZWNvbmRCb2FyZC5CYWNrQ29sb3JbaSwgal07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgSGVpZ2h0IHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBpbnQgQ3Vyc29yWFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIGN1cnNvclg7IH1cclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGN1cnNvclggPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgaW50IEN1cnNvclkgeyBnZXQgeyByZXR1cm4gY3Vyc29yWTsgfVxyXG4gICAgICAgICAgICBzZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yWSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3T25lRGlnaXQoaW50IGksIGludCB4LCBpbnQgeSwgaW50IGNvbG9yID0gTk9DSEFOR0VDT0xPUilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNoYXIgYyA9IChjaGFyKShpICsgJzAnKTtcclxuICAgICAgICAgICAgRHJhd0NoYXIoYywgeCwgeSwgY29sb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBTZXQoVGV4dEJvYXJkIG9yaWdpbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuUG9zaXRpb24gPSBvcmlnaW4uUG9zaXRpb247XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgV2lkdGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IDA7IGogPCBIZWlnaHQ7IGorKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYXJzW2ksIGpdID0gb3JpZ2luLmNoYXJzW2ksIGpdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQmFja0NvbG9yW2ksIGpdID0gb3JpZ2luLkJhY2tDb2xvcltpLCBqXTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlRleHRDb2xvcltpLCBqXSA9IG9yaWdpbi5UZXh0Q29sb3JbaSwgal07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgUmVzaXplKGludCB3LCBpbnQgaClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChjaGFycyA9PSBudWxsIHx8IHcgPiBjaGFycy5HZXRMZW5ndGgoMCkgfHwgaCA+IGNoYXJzLkdldExlbmd0aCgxKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgU2V0TWF4U2l6ZSh3LCBoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBXaWR0aCA9IHc7XHJcbiAgICAgICAgICAgIEhlaWdodCA9IGg7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNoYXIgQ2hhckF0KGludCBpLCBpbnQgailcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBjaGFyc1tpLCBqXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNldEN1cnNvckF0KGludCB4LCBpbnQgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGN1cnNvclggPSB4O1xyXG4gICAgICAgICAgICBjdXJzb3JZID0geTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdfQ3Vyc29yKHN0cmluZyB2KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGMgaW4gdilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRHJhd19DdXJzb3IoYyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdfQ3Vyc29yKHN0cmluZyB2LCBpbnQgY29sb3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgYyBpbiB2KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBEcmF3X0N1cnNvcihjLCBjb2xvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIGJvb2wgQ2FuRHJhd19DdXJzb3JfU21hcnRMaW5lQnJlYWsoc3RyaW5nIHYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgY3VycmVudFggPSBjdXJzb3JYO1xyXG4gICAgICAgICAgICBpbnQgY3VycmVudFkgPSBjdXJzb3JZO1xyXG5cclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB2Lkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBib29sIGxpbmVCcmVhayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYm9vbCBzaG91bGRDaGVja0ZvckxpbmVCcmVha3MgPSAoaSA9PSAwIHx8IHZbaV0gPT0gJyAnKSAmJiBpICE9IHYuTGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgICAgIGlmIChzaG91bGRDaGVja0ZvckxpbmVCcmVha3MpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IDE7IGogPCB2Lkxlbmd0aCAtIGk7IGorKylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChqICsgY3VycmVudFggPj0gV2lkdGgpIC8vcmVhY2ggZW5kIG9mIHRoZSBsaW5lIHdpdGhvdXQgZW5kaW5nIHRoZSB3b3JkLCBzaG91bGQgbGluZSBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodltpXSA9PSAnICcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSsrOyAvL3NraXAgdGhyb3VnaCB0aGUgc3BhY2UgaWYgaXQncyBhIG5ldyBsaW5lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lQnJlYWsgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZbaSArIGpdID09ICcgJykgLy9uZXcgd29yZCBiZWdpbnMgc28gbm8gbmVlZCB0byBsaW5lIGJyZWFrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGxpbmVCcmVhaylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50WSsrO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRYID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGN1cnJlbnRYKys7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFggPj0gV2lkdGgpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFkrKztcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50WCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFggPj0gV2lkdGggfHwgY3VycmVudFkgPj0gSGVpZ2h0KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIERyYXdDdXJzb3JSZXN1bHQgRHJhd19DdXJzb3JfU21hcnRMaW5lQnJlYWsoc3RyaW5nIHYsIGludCBjb2xvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCBvZmZTdGFydCA9IDA7XHJcbiAgICAgICAgICAgIGludCBvZmZFbmQgPSB2Lkxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgIHJldHVybiBEcmF3X0N1cnNvcl9TbWFydExpbmVCcmVhayh2LCBjb2xvciwgb2ZmU3RhcnQsIG9mZkVuZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRHJhd0N1cnNvclJlc3VsdCBEcmF3X0N1cnNvcl9TbWFydExpbmVCcmVhayhzdHJpbmcgdiwgaW50IGNvbG9yLCBpbnQgb2ZmU3RhcnQsIGludCBvZmZFbmQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgZW5kSW5kZXggPSBvZmZFbmQgKyAxO1xyXG4gICAgICAgICAgICBWZWN0b3IyRCBzdGFydCA9IG5ldyBWZWN0b3IyRChDdXJzb3JYLCBDdXJzb3JZKTtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IG9mZlN0YXJ0OyBpIDwgZW5kSW5kZXg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW50IG9yaWdpblggPSBjdXJzb3JYO1xyXG4gICAgICAgICAgICAgICAgYm9vbCBsaW5lQnJlYWsgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGJvb2wgc2hvdWxkQ2hlY2tGb3JMaW5lQnJlYWtzID0gKGkgPT0gMCB8fCB2W2ldID09ICcgJykgJiYgaSAhPSBlbmRJbmRleCAtIDE7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2hvdWxkQ2hlY2tGb3JMaW5lQnJlYWtzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSAxOyBqIDwgZW5kSW5kZXggLSBpOyBqKyspXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaiArIG9yaWdpblggPj0gV2lkdGgpIC8vcmVhY2ggZW5kIG9mIHRoZSBsaW5lIHdpdGhvdXQgZW5kaW5nIHRoZSB3b3JkLCBzaG91bGQgbGluZSBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodltpXSA9PSAnICcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSsrOyAvL3NraXAgdGhyb3VnaCB0aGUgc3BhY2UgaWYgaXQncyBhIG5ldyBsaW5lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lQnJlYWsgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZbaSArIGpdID09ICcgJykgLy9uZXcgd29yZCBiZWdpbnMgc28gbm8gbmVlZCB0byBsaW5lIGJyZWFrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGxpbmVCcmVhaylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBDdXJzb3JOZXdMaW5lKDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgRHJhd19DdXJzb3IodltpXSwgY29sb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFZlY3RvcjJEIGVuZCA9IG5ldyBWZWN0b3IyRChDdXJzb3JYLCBDdXJzb3JZKTtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBEcmF3Q3Vyc29yUmVzdWx0KFBvc2l0aW9uVG9JbmRleChzdGFydCksIFBvc2l0aW9uVG9JbmRleChlbmQpLCBzdGFydCwgZW5kKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgaW50IFBvc2l0aW9uVG9JbmRleChWZWN0b3IyRCBzdGFydClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoaW50KShzdGFydC5YICsgc3RhcnQuWSAqIFdpZHRoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdPbmVEaWdpdF9DdXJzb3IoaW50IGkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBEcmF3X0N1cnNvcigoY2hhcikoaSArICcwJykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd19DdXJzb3IoY2hhciBjKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIERyYXdDaGFyKGMsIGN1cnNvclgsIGN1cnNvclkpO1xyXG4gICAgICAgICAgICBBZHZhbmNlQ3Vyc29yKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3X0N1cnNvcihjaGFyIGMsIGludCBjb2xvcilcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICBEcmF3Q2hhcihjLCBjdXJzb3JYLCBjdXJzb3JZLCBjb2xvcik7XHJcbiAgICAgICAgICAgIEFkdmFuY2VDdXJzb3IoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBBZHZhbmNlQ3Vyc29yKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGN1cnNvclgrKztcclxuICAgICAgICAgICAgaWYgKGN1cnNvclggPj0gV2lkdGgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGN1cnNvclggPSAwO1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yWSsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBDdXJzb3JOZXdMaW5lKGludCB4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY3Vyc29yWSsrO1xyXG4gICAgICAgICAgICBjdXJzb3JYID0geDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdDaGFyKGNoYXIgdiwgaW50IHgsIGludCB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICh2ICE9IE5PQ0hBTkdFQ0hBUikge1xyXG4gICAgICAgICAgICAgICAgY2hhcnNbeCwgeV0gPSB2O1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3Q2hhcihjaGFyIHYsIGludCB4LCBpbnQgeSwgaW50IGNvbG9yLCBpbnQgYmFja0NvbG9yID0gTk9DSEFOR0VDT0xPUilcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICBEcmF3Q2hhcih2LCB4LCB5KTtcclxuICAgICAgICAgICAgU2V0Q29sb3IoY29sb3IsIHgsIHkpO1xyXG4gICAgICAgICAgICBTZXRCYWNrQ29sb3IoYmFja0NvbG9yLCB4LCB5KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgU2V0QWxsKGNoYXIgdGV4dCwgaW50IHRleHRDb2xvciwgaW50IGJhY2tDb2xvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIERyYXdSZXBlYXRlZCh0ZXh0LCAwLCAwLCBXaWR0aCwgSGVpZ2h0LCB0ZXh0Q29sb3IsIGJhY2tDb2xvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3V2l0aEdyaWQoc3RyaW5nIHRleHQsIGludCB4LCBpbnQgeSwgaW50IGdyaWRDb2xvciwgaW50IHRleHRDb2xvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCB3aWR0aCA9IHRleHQuTGVuZ3RoO1xyXG4gICAgICAgICAgICBEcmF3R3JpZCh4LCB5LCB3aWR0aCArIDIsIDMsIGdyaWRDb2xvcik7XHJcbiAgICAgICAgICAgIERyYXcodGV4dCwgeCArIDEsIHkgKyAxLCB0ZXh0Q29sb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhdyhzdHJpbmcgdiwgaW50IHgsIGludCB5LCBpbnQgY29sb3IsIGludCBiYWNrQ29sb3IgPSBOT0NIQU5HRUNPTE9SKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB2Lkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbnQgeDIgPSB4ICsgaTtcclxuICAgICAgICAgICAgICAgIGludCB5MiA9IHk7XHJcbiAgICAgICAgICAgICAgICBpZih4MiA+PSBXaWR0aClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB4MiAtPSBXaWR0aDtcclxuICAgICAgICAgICAgICAgICAgICB5MisrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgRHJhd0NoYXIodltpXSwgeDIsIHkyLCBjb2xvciwgYmFja0NvbG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhdyhJRW51bWVyYWJsZTxjaGFyPiB2LCBpbnQgeCwgaW50IHksIGludCBjb2xvciwgaW50IGJhY2tDb2xvciA9IE5PQ0hBTkdFQ09MT1IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuQ291bnQ8Y2hhcj4odik7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRHJhd0NoYXIoU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5FbGVtZW50QXQ8Y2hhcj4odixpKSwgeCArIGksIHksIGNvbG9yLCBiYWNrQ29sb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3R3JpZChpbnQgeCwgaW50IHksIGludCB3aWR0aCwgaW50IGhlaWdodCwgaW50IGNvbG9yKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIERyYXdSZXBlYXRlZCgnfCcsIHgsIHksIDEsIGhlaWdodCwgY29sb3IpO1xyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWQoJ3wnLCB4ICsgd2lkdGggLSAxLCB5LCAxLCBoZWlnaHQsIGNvbG9yKTtcclxuICAgICAgICAgICAgRHJhd1JlcGVhdGVkKCctJywgeCwgeSwgd2lkdGgsIDEsIGNvbG9yKTtcclxuICAgICAgICAgICAgRHJhd1JlcGVhdGVkKCctJywgeCwgeSArIGhlaWdodCAtIDEsIHdpZHRoLCAxLCBjb2xvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3UmVwZWF0ZWQoY2hhciBjLCBpbnQgeCwgaW50IHksIGludCB3aWR0aCwgaW50IGhlaWdodCwgaW50IGNvbG9yLCBpbnQgYmFja0NvbG9yID0gTk9DSEFOR0VDT0xPUilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSB4OyBpIDwgeCArIHdpZHRoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSB5OyBqIDwgeSArIGhlaWdodDsgaisrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIERyYXdDaGFyKGMsIGksIGosIGNvbG9yKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgU2V0QmFja0NvbG9yKGJhY2tDb2xvciwgaSwgaik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNldENvbG9yKGludCBjb2xvciwgaW50IHgsIGludCB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGNvbG9yICE9IE5PQ0hBTkdFQ09MT1IpXHJcbiAgICAgICAgICAgICAgICBUZXh0Q29sb3JbeCwgeV0gPSBjb2xvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNldEJhY2tDb2xvcihpbnQgY29sb3IsIGludCB4LCBpbnQgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChjb2xvciAhPSBOT0NIQU5HRUNPTE9SKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBCYWNrQ29sb3JbeCwgeV0gPSBjb2xvcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhdyhzdHJpbmcgdiwgaW50IHgyLCBpbnQgeTIsIG9iamVjdCBpbnB1dClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd0dyaWQoaW50IHYxLCBpbnQgdjIsIGludCB2MywgaW50IHY0LCBvYmplY3QgYm9hcmQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgTm90SW1wbGVtZW50ZWRFeGNlcHRpb24oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJ1Y3QgRHJhd0N1cnNvclJlc3VsdFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIGludCBTdGFydEluZGV4O1xyXG4gICAgICAgICAgICBwdWJsaWMgaW50IEVuZEluZGV4O1xyXG4gICAgICAgICAgICBwdWJsaWMgVmVjdG9yMkQgU3RhcnRQb3NpdGlvbjtcclxuICAgICAgICAgICAgcHVibGljIFZlY3RvcjJEIEVuZFBvc2l0aW9uO1xyXG5cclxuICAgICAgICAgICAgcHVibGljIERyYXdDdXJzb3JSZXN1bHQoaW50IHN0YXJ0SW5kZXgsIGludCBlbmRJbmRleCwgVmVjdG9yMkQgc3RhcnRQb3NpdGlvbiwgVmVjdG9yMkQgZW5kUG9zaXRpb24pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFN0YXJ0SW5kZXggPSBzdGFydEluZGV4O1xyXG4gICAgICAgICAgICAgICAgRW5kSW5kZXggPSBlbmRJbmRleDtcclxuICAgICAgICAgICAgICAgIFN0YXJ0UG9zaXRpb24gPSBzdGFydFBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgRW5kUG9zaXRpb24gPSBlbmRQb3NpdGlvbjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG4vL3VzaW5nIFN5c3RlbS5EcmF3aW5nO1xyXG51c2luZyBTeXN0ZW0uR2xvYmFsaXphdGlvbjtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guVGV4dFJlbmRlcmluZ1xyXG57XHJcbiAgICBbU2VyaWFsaXphYmxlXVxyXG4gICAgcHVibGljIHN0cnVjdCBWZWN0b3IyRCA6IElFcXVhdGFibGU8VmVjdG9yMkQ+XHJcbiAgICB7XHJcbiAgICAgICAgI3JlZ2lvbiBQcml2YXRlIEZpZWxkc1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBWZWN0b3IyRCB6ZXJvVmVjdG9yID0gbmV3IFZlY3RvcjJEKDBmLCAwZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yMkQgdW5pdFZlY3RvciA9IG5ldyBWZWN0b3IyRCgxZiwgMWYpO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFZlY3RvcjJEIHVuaXRYVmVjdG9yID0gbmV3IFZlY3RvcjJEKDFmLCAwZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yMkQgdW5pdFlWZWN0b3IgPSBuZXcgVmVjdG9yMkQoMGYsIDFmKTtcclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQcml2YXRlIEZpZWxkc1xyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQdWJsaWMgRmllbGRzXHJcblxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBYO1xyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBZO1xyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIFB1YmxpYyBGaWVsZHNcclxuXHJcbiAgICAgICAgIyByZWdpb24gUHVibGljIFByb3BlcnRpZXNcclxuXHJcbiAgICAgICAgcHVibGljIGludCBYSW50IHsgZ2V0IHsgcmV0dXJuIChpbnQpWDsgfSB9XHJcbiAgICAgICAgcHVibGljIGludCBZSW50IHsgZ2V0IHsgcmV0dXJuIChpbnQpIFk7IH0gfVxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIFB1YmxpYyBQcm9wZXJ0aWVzXHJcblxyXG4gICAgICAgICNyZWdpb24gQ29uc3RhbnRzXHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQcm9wZXJ0aWVzXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgWmVyb1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIHplcm9WZWN0b3I7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgT25lXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gdW5pdFZlY3RvcjsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBVbml0WFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIHVuaXRYVmVjdG9yOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIFVuaXRZXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gdW5pdFlWZWN0b3I7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gUHJvcGVydGllc1xyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBDb25zdHJ1Y3RvcnNcclxuXHJcbiAgICAgICAgcHVibGljIFZlY3RvcjJEKGZsb2F0IHgsIGZsb2F0IHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlggPSB4O1xyXG4gICAgICAgICAgICB0aGlzLlkgPSB5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFZlY3RvcjJEKGZsb2F0IHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5YID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuWSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBJbnRlcnBvbGF0ZVJvdW5kZWQoVmVjdG9yMkQgc3RhcnRQb3NpdGlvbiwgVmVjdG9yMkQgZW5kUG9zaXRpb24sIGZsb2F0IHJhdGlvKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIChzdGFydFBvc2l0aW9uICogKDEgLSByYXRpbykgKyBlbmRQb3NpdGlvbiAqIHJhdGlvKS5Sb3VuZCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBWZWN0b3IyRCBSb3VuZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjJEKChmbG9hdClNYXRoLlJvdW5kKFgpLCAoZmxvYXQpTWF0aC5Sb3VuZChZKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIENvbnN0cnVjdG9yc1xyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQdWJsaWMgTWV0aG9kc1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIEFkZChWZWN0b3IyRCB2YWx1ZTEsIFZlY3RvcjJEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICs9IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSArPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBBZGQocmVmIFZlY3RvcjJEIHZhbHVlMSwgcmVmIFZlY3RvcjJEIHZhbHVlMiwgb3V0IFZlY3RvcjJEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUxLlggKyB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSArIHZhbHVlMi5ZO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZmxvYXQgRGlzdGFuY2UoVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCB2MSA9IHZhbHVlMS5YIC0gdmFsdWUyLlgsIHYyID0gdmFsdWUxLlkgLSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmV0dXJuIChmbG9hdClNYXRoLlNxcnQoKHYxICogdjEpICsgKHYyICogdjIpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBEaXN0YW5jZShyZWYgVmVjdG9yMkQgdmFsdWUxLCByZWYgVmVjdG9yMkQgdmFsdWUyLCBvdXQgZmxvYXQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgdjEgPSB2YWx1ZTEuWCAtIHZhbHVlMi5YLCB2MiA9IHZhbHVlMS5ZIC0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IChmbG9hdClNYXRoLlNxcnQoKHYxICogdjEpICsgKHYyICogdjIpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZmxvYXQgRGlzdGFuY2VTcXVhcmVkKFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgdjEgPSB2YWx1ZTEuWCAtIHZhbHVlMi5YLCB2MiA9IHZhbHVlMS5ZIC0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJldHVybiAodjEgKiB2MSkgKyAodjIgKiB2Mik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgRGlzdGFuY2VTcXVhcmVkKHJlZiBWZWN0b3IyRCB2YWx1ZTEsIHJlZiBWZWN0b3IyRCB2YWx1ZTIsIG91dCBmbG9hdCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCB2MSA9IHZhbHVlMS5YIC0gdmFsdWUyLlgsIHYyID0gdmFsdWUxLlkgLSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmVzdWx0ID0gKHYxICogdjEpICsgKHYyICogdjIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBEaXZpZGUoVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAvPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgLz0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgRGl2aWRlKHJlZiBWZWN0b3IyRCB2YWx1ZTEsIHJlZiBWZWN0b3IyRCB2YWx1ZTIsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YIC8gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgLyB2YWx1ZTIuWTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgRGl2aWRlKFZlY3RvcjJEIHZhbHVlMSwgZmxvYXQgZGl2aWRlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IGZhY3RvciA9IDEgLyBkaXZpZGVyO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAqPSBmYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICo9IGZhY3RvcjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBEaXZpZGUocmVmIFZlY3RvcjJEIHZhbHVlMSwgZmxvYXQgZGl2aWRlciwgb3V0IFZlY3RvcjJEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IGZhY3RvciA9IDEgLyBkaXZpZGVyO1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YICogZmFjdG9yO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZhbHVlMS5ZICogZmFjdG9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBmbG9hdCBEb3QoVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKHZhbHVlMS5YICogdmFsdWUyLlgpICsgKHZhbHVlMS5ZICogdmFsdWUyLlkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIERvdChyZWYgVmVjdG9yMkQgdmFsdWUxLCByZWYgVmVjdG9yMkQgdmFsdWUyLCBvdXQgZmxvYXQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gKHZhbHVlMS5YICogdmFsdWUyLlgpICsgKHZhbHVlMS5ZICogdmFsdWUyLlkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGJvb2wgRXF1YWxzKG9iamVjdCBvYmopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAob2JqIGlzIFZlY3RvcjJEKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gRXF1YWxzKChWZWN0b3IyRCl0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgRXF1YWxzKFZlY3RvcjJEIG90aGVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIChYID09IG90aGVyLlgpICYmIChZID09IG90aGVyLlkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBSZWZsZWN0KFZlY3RvcjJEIHZlY3RvciwgVmVjdG9yMkQgbm9ybWFsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVmVjdG9yMkQgcmVzdWx0O1xyXG4gICAgICAgICAgICBmbG9hdCB2YWwgPSAyLjBmICogKCh2ZWN0b3IuWCAqIG5vcm1hbC5YKSArICh2ZWN0b3IuWSAqIG5vcm1hbC5ZKSk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmVjdG9yLlggLSAobm9ybWFsLlggKiB2YWwpO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZlY3Rvci5ZIC0gKG5vcm1hbC5ZICogdmFsKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBSZWZsZWN0KHJlZiBWZWN0b3IyRCB2ZWN0b3IsIHJlZiBWZWN0b3IyRCBub3JtYWwsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCB2YWwgPSAyLjBmICogKCh2ZWN0b3IuWCAqIG5vcm1hbC5YKSArICh2ZWN0b3IuWSAqIG5vcm1hbC5ZKSk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmVjdG9yLlggLSAobm9ybWFsLlggKiB2YWwpO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZlY3Rvci5ZIC0gKG5vcm1hbC5ZICogdmFsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBpbnQgR2V0SGFzaENvZGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFguR2V0SGFzaENvZGUoKSArIFkuR2V0SGFzaENvZGUoKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgZmxvYXQgTGVuZ3RoKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoZmxvYXQpTWF0aC5TcXJ0KChYICogWCkgKyAoWSAqIFkpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBMZW5ndGhTcXVhcmVkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoWCAqIFgpICsgKFkgKiBZKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBNYXgoVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjJEKHZhbHVlMS5YID4gdmFsdWUyLlggPyB2YWx1ZTEuWCA6IHZhbHVlMi5YLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUxLlkgPiB2YWx1ZTIuWSA/IHZhbHVlMS5ZIDogdmFsdWUyLlkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1heChyZWYgVmVjdG9yMkQgdmFsdWUxLCByZWYgVmVjdG9yMkQgdmFsdWUyLCBvdXQgVmVjdG9yMkQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2YWx1ZTEuWCA+IHZhbHVlMi5YID8gdmFsdWUxLlggOiB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSA+IHZhbHVlMi5ZID8gdmFsdWUxLlkgOiB2YWx1ZTIuWTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgTWluKFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyRCh2YWx1ZTEuWCA8IHZhbHVlMi5YID8gdmFsdWUxLlggOiB2YWx1ZTIuWCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlMS5ZIDwgdmFsdWUyLlkgPyB2YWx1ZTEuWSA6IHZhbHVlMi5ZKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNaW4ocmVmIFZlY3RvcjJEIHZhbHVlMSwgcmVmIFZlY3RvcjJEIHZhbHVlMiwgb3V0IFZlY3RvcjJEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUxLlggPCB2YWx1ZTIuWCA/IHZhbHVlMS5YIDogdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgPCB2YWx1ZTIuWSA/IHZhbHVlMS5ZIDogdmFsdWUyLlk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIE11bHRpcGx5KFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggKj0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICo9IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBNdWx0aXBseShWZWN0b3IyRCB2YWx1ZTEsIGZsb2F0IHNjYWxlRmFjdG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICo9IHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE11bHRpcGx5KHJlZiBWZWN0b3IyRCB2YWx1ZTEsIGZsb2F0IHNjYWxlRmFjdG9yLCBvdXQgVmVjdG9yMkQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2YWx1ZTEuWCAqIHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZhbHVlMS5ZICogc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTXVsdGlwbHkocmVmIFZlY3RvcjJEIHZhbHVlMSwgcmVmIFZlY3RvcjJEIHZhbHVlMiwgb3V0IFZlY3RvcjJEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUxLlggKiB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSAqIHZhbHVlMi5ZO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBOZWdhdGUoVmVjdG9yMkQgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZS5YID0gLXZhbHVlLlg7XHJcbiAgICAgICAgICAgIHZhbHVlLlkgPSAtdmFsdWUuWTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE5lZ2F0ZShyZWYgVmVjdG9yMkQgdmFsdWUsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IC12YWx1ZS5YO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IC12YWx1ZS5ZO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgTm9ybWFsaXplKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IHZhbCA9IDEuMGYgLyAoZmxvYXQpTWF0aC5TcXJ0KChYICogWCkgKyAoWSAqIFkpKTtcclxuICAgICAgICAgICAgWCAqPSB2YWw7XHJcbiAgICAgICAgICAgIFkgKj0gdmFsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBOb3JtYWxpemUoVmVjdG9yMkQgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCB2YWwgPSAxLjBmIC8gKGZsb2F0KU1hdGguU3FydCgodmFsdWUuWCAqIHZhbHVlLlgpICsgKHZhbHVlLlkgKiB2YWx1ZS5ZKSk7XHJcbiAgICAgICAgICAgIHZhbHVlLlggKj0gdmFsO1xyXG4gICAgICAgICAgICB2YWx1ZS5ZICo9IHZhbDtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE5vcm1hbGl6ZShyZWYgVmVjdG9yMkQgdmFsdWUsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCB2YWwgPSAxLjBmIC8gKGZsb2F0KU1hdGguU3FydCgodmFsdWUuWCAqIHZhbHVlLlgpICsgKHZhbHVlLlkgKiB2YWx1ZS5ZKSk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUuWCAqIHZhbDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZS5ZICogdmFsO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIFN1YnRyYWN0KFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggLT0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZIC09IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIFN1YnRyYWN0KHJlZiBWZWN0b3IyRCB2YWx1ZTEsIHJlZiBWZWN0b3IyRCB2YWx1ZTIsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YIC0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgLSB2YWx1ZTIuWTtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVG9TdHJpbmcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ3VsdHVyZUluZm8gY3VycmVudEN1bHR1cmUgPSBDdWx0dXJlSW5mby5DdXJyZW50Q3VsdHVyZTtcclxuICAgICAgICAgICAgcmV0dXJuIHN0cmluZy5Gb3JtYXQoY3VycmVudEN1bHR1cmUsIFwie3tYOnswfSBZOnsxfX19XCIsIG5ldyBvYmplY3RbXSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlguVG9TdHJpbmcoY3VycmVudEN1bHR1cmUpLCB0aGlzLlkuVG9TdHJpbmcoY3VycmVudEN1bHR1cmUpIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQdWJsaWMgTWV0aG9kc1xyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBPcGVyYXRvcnNcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBvcGVyYXRvciAtKFZlY3RvcjJEIHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUuWCA9IC12YWx1ZS5YO1xyXG4gICAgICAgICAgICB2YWx1ZS5ZID0gLXZhbHVlLlk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJvb2wgb3BlcmF0b3IgPT0oVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxLlggPT0gdmFsdWUyLlggJiYgdmFsdWUxLlkgPT0gdmFsdWUyLlk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIG9wZXJhdG9yICE9KFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMS5YICE9IHZhbHVlMi5YIHx8IHZhbHVlMS5ZICE9IHZhbHVlMi5ZO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgb3BlcmF0b3IgKyhWZWN0b3IyRCB2YWx1ZTEsIFZlY3RvcjJEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICs9IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSArPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIG9wZXJhdG9yIC0oVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAtPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgLT0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBvcGVyYXRvciAqKFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggKj0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICo9IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgb3BlcmF0b3IgKihWZWN0b3IyRCB2YWx1ZSwgZmxvYXQgc2NhbGVGYWN0b3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZS5YICo9IHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICB2YWx1ZS5ZICo9IHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBvcGVyYXRvciAqKGZsb2F0IHNjYWxlRmFjdG9yLCBWZWN0b3IyRCB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlLlggKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlLlkgKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIG9wZXJhdG9yIC8oVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAvPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgLz0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBvcGVyYXRvciAvKFZlY3RvcjJEIHZhbHVlMSwgZmxvYXQgZGl2aWRlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IGZhY3RvciA9IDEgLyBkaXZpZGVyO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAqPSBmYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICo9IGZhY3RvcjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gT3BlcmF0b3JzXHJcbiAgICB9XHJcbn0iLCJ1c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgTm92ZWxBcHBcclxue1xyXG4gICAgcHVibGljIGFic3RyYWN0IGNsYXNzIFRleHRTY3JlZW5OIDogSVRleHRTY3JlZW5cclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIFRleHRXb3JsZCB0dztcclxuXHJcbiAgICAgICAgcHVibGljIGFic3RyYWN0IHZvaWQgVXBkYXRlKGZsb2F0IGYpO1xyXG5cclxuICAgICAgICBwdWJsaWMgIHZvaWQgSW5pdChpbnQgdywgaW50IGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0dyA9IG5ldyBUZXh0V29ybGQoKTtcclxuICAgICAgICAgICAgdHcuSW5pdCh3LCBoKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dEJvYXJkIEdldEJvYXJkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0dy5tYWluQm9hcmQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUGFsZXR0ZSBHZXRQYWxldHRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0dy5wYWxldHRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGludCBJbnB1dFVuaWNvZGUgeyBzZXQ7IHByb3RlY3RlZCBnZXQ7IH1cclxuICAgICAgICBwcm90ZWN0ZWQgaW50IElucHV0QXNOdW1iZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSW5wdXRVbmljb2RlIC0gNDg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGludGVyZmFjZSBJVGV4dFNjcmVlblxyXG4gICAge1xyXG4gICAgICAgIFRleHRCb2FyZCBHZXRCb2FyZCgpO1xyXG4gICAgICAgIGludCBJbnB1dFVuaWNvZGUgeyBzZXQ7IH1cclxuICAgICAgICB2b2lkIFVwZGF0ZShmbG9hdCBmKTtcclxuICAgICAgICAvL1BhbGV0dGUgR2V0UGFsZXR0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBUZXh0U2NyZWVuSG9sZGVyXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIElUZXh0U2NyZWVuIFNjcmVlbiB7IGdldDsgc2V0OyB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLk5vdmVsQmFzZTtcclxudXNpbmcgUGlkcm9oLlRleHRSZW5kZXJpbmc7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIE5vdmVsQXBwXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBUZXh0UmVuZGVyVGVzdHMgOiBJVGV4dEdhbWVcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIGludCB3O1xyXG4gICAgICAgIHByaXZhdGUgaW50IGg7XHJcbiAgICAgICAgcHJpdmF0ZSBHZW5lcmljVGV4dE1lbnUgbWVudTtcclxuICAgICAgICBwdWJsaWMgVGV4dFJlbmRlciBUZXh0UmVuZGVyO1xyXG4gICAgICAgIFRleHRTY3JlZW5OIHNjcmVlbjtcclxuXHJcbiAgICAgICAgcHVibGljIFRleHRTY3JlZW5Ib2xkZXIgU2NyZWVuSG9sZGVyIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgIHByaXZhdGUgVGV4dFJlbmRlclRvU2NyZWVuIHRleHRTY3JlZW47XHJcbiAgICAgICAgcHJpdmF0ZSBEaWFsb2dOYXJyYXRpb25TY3JlZW5Db250cm9sIGRuc2M7XHJcbiAgICAgICAgcHJpdmF0ZSBEaWFsb2dOYXJyYXRpb25TY3JlZW4gZG5zO1xyXG5cclxuICAgICAgICBwdWJsaWMgUGFsZXR0ZSBHZXRQYWxldHRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChTY3JlZW5Ib2xkZXIuU2NyZWVuID09IHRleHRTY3JlZW4pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBEZWZhdWx0UGFsZXR0ZXMuQzRSZWFkZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIERlZmF1bHRQYWxldHRlcy5DNE5vdmVsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVXBkYXRlKGZsb2F0IHRpbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoZG5zYyAhPSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoU2NyZWVuSG9sZGVyLlNjcmVlbiA9PSBkbnMgJiYgZG5zYy5Eb25lKSAvL2NoYW5nZSB0byBpcyBkb25lIHNoaXRcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBTY3JlZW5Ib2xkZXIuU2NyZWVuID0gbWVudTtcclxuICAgICAgICAgICAgICAgICAgICBtZW51LlJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkbnNjLlRyeUFkdmFuY2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoU2NyZWVuSG9sZGVyLlNjcmVlbiA9PSBtZW51ICYmIG1lbnUuQ2hvc2VuT3B0aW9uID49IDApXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBzdHJpbmcgc3RvcnkyID0gU3Rvcmllcy5zdG9yeTI7XHJcbiAgICAgICAgICAgICAgICBib29sIGVuZFRhZ09uQXNwYXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAobWVudS5DaG9zZW5PcHRpb24pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib29sIG5hcnJhdGlvbk9ubHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIERpYWxvZ05hcnJhdGlvbihuYXJyYXRpb25Pbmx5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib29sIG5hcnJhdGlvbk9ubHkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRGlhbG9nTmFycmF0aW9uKG5hcnJhdGlvbk9ubHkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdG9yeTIgPSBTdG9yaWVzLnN0b3J5QTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmRUYWdPbkFzcGFzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdG9yeTIgPSBTdG9yaWVzLnN0b3J5MztcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG1lbnUuQ2hvc2VuT3B0aW9uID09IDApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RvcnkyID0gU3Rvcmllcy5zdG9yeTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIEluaXRUZXh0UmVuZGVyKHN0b3J5MiwgZW5kVGFnT25Bc3Bhcyk7XHJcbiAgICAgICAgICAgICAgICBTY3JlZW5Ib2xkZXIuU2NyZWVuID0gdGV4dFNjcmVlbjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoU2NyZWVuSG9sZGVyLlNjcmVlbiA9PSB0ZXh0U2NyZWVuICYmIFRleHRSZW5kZXIuRmluaXNoZWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFNjcmVlbkhvbGRlci5TY3JlZW4gPSBtZW51O1xyXG4gICAgICAgICAgICAgICAgbWVudS5SZXNldCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIERpYWxvZ05hcnJhdGlvbihib29sIG5hcnJhdGlvbk9ubHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBkbnMgPSBuZXcgRGlhbG9nTmFycmF0aW9uU2NyZWVuKCk7XHJcbiAgICAgICAgICAgIGRucy5Jbml0KHcsIGgpO1xyXG4gICAgICAgICAgICBTY3JlZW5Ib2xkZXIuU2NyZWVuID0gZG5zO1xyXG5cclxuICAgICAgICAgICAgZG5zYyA9IG5ldyBEaWFsb2dOYXJyYXRpb25TY3JlZW5Db250cm9sKGRucyk7XHJcblxyXG4gICAgICAgICAgICBkbnNjLk5hcnJhdGlvbk9ubHkgPSBuYXJyYXRpb25Pbmx5O1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGRuc2MuU2V0VGV4dChAXCIjY21XZWxjb21lIGJhY2ssIGRlYXIuXHJcbiAgICAgICAgICAgIC8vI2NtSG93IHdhcyBzY2hvb2wgdG9kYXk/XHJcbiAgICAgICAgICAgIC8vI25uV2h5IHdvbid0IHRoaXMgd29yaz9cclxuICAgICAgICAgICAgLy9zXCIpO1xyXG4gICAgICAgICAgICBkbnNjLlNldFRleHQoU3Rvcmllcy5zdG9yeTUpO1xyXG4gICAgICAgICAgICBkbnNjLlNwZWFrZXJEYXRhLkFkZCgnbScsIFwiTW9tXCIpO1xyXG4gICAgICAgICAgICBkbnNjLlNwZWFrZXJEYXRhLkFkZCgncCcsIFwiU2FyYVwiKTtcclxuICAgICAgICAgICAgZG5zYy5TcGVha2VyRGF0YS5BZGQoJ2QnLCBcIkRhZFwiKTtcclxuICAgICAgICAgICAgZG5zYy5TaG93TmV4dCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgSW5pdChpbnQgdywgaW50IGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLncgPSB3O1xyXG4gICAgICAgICAgICB0aGlzLmggPSBoO1xyXG4gICAgICAgICAgICBtZW51ID0gbmV3IEdlbmVyaWNUZXh0TWVudSgpO1xyXG4gICAgICAgICAgICBtZW51LkFkZE9wdGlvbnMoXCJTdG9yeSBYXCIsIFwiU3RvcnkgWVwiKTtcclxuICAgICAgICAgICAgbWVudS5Jbml0KHcsIGgpO1xyXG4gICAgICAgICAgICBTY3JlZW5Ib2xkZXIuU2NyZWVuID0gbWVudTtcclxuXHJcblxyXG4gICAgICAgICAgICAvL3JldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIEluaXRUZXh0UmVuZGVyKHN0cmluZyBzdG9yeTIsIGJvb2wgZW5kVGFnT25Bc3BhcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFRleHRSZW5kZXIgPSBuZXcgVGV4dFJlbmRlcigpO1xyXG4gICAgICAgICAgICBUZXh0UmVuZGVyLlRhZ1RvQ29sb3IuQWRkRGF0YShUYWdJbmZvLkZyb21MYWJlbCgnYycsICdwJyksIERlZmF1bHRQYWxldHRlcy5DNFdoaXRlTmV1dHJhbCk7XHJcbiAgICAgICAgICAgIFRleHRSZW5kZXIuVGFnVG9Db2xvci5BZGREYXRhKFRhZ0luZm8uRnJvbUxhYmVsKCdjJywgJ20nKSwgRGVmYXVsdFBhbGV0dGVzLkM0QmxhY2tOZXV0cmFsKTtcclxuICAgICAgICAgICAgVGV4dFJlbmRlci5UYWdUb0NvbG9yLkFkZERhdGEoVGFnSW5mby5Gcm9tTGFiZWwoJ2MnLCAnZCcpLCBEZWZhdWx0UGFsZXR0ZXMuQzRCbGFja05ldXRyYWwpO1xyXG5cclxuICAgICAgICAgICAgc3RyaW5nIGdvdCA9IHN0b3J5Mi5SZXBsYWNlKFwiJVwiLCBcIlxcXCJcIikuUmVwbGFjZShcIlxcclwiLCBcIlwiKTtcclxuICAgICAgICAgICAgc3RyaW5nIHRhZ2xlc3NUZXh0O1xyXG4gICAgICAgICAgICBUZXh0VGFnUmVhZGVyIHRleHRUYWdSZWFkZXIgPSBuZXcgVGV4dFRhZ1JlYWRlcigpO1xyXG4gICAgICAgICAgICB0ZXh0VGFnUmVhZGVyLkVuZFBhc3NhZ2VPbkFzcGFzID0gZW5kVGFnT25Bc3BhcztcclxuICAgICAgICAgICAgdmFyIHRhZ0luZm8gPSB0ZXh0VGFnUmVhZGVyLkV4dHJhY3RUYWdJbmZvKGdvdCwgb3V0IHRhZ2xlc3NUZXh0KTtcclxuICAgICAgICAgICAgVGV4dFJlbmRlci5TZXR1cCh0YWdsZXNzVGV4dCwgdywgaCwgdGFnSW5mbyk7XHJcbiAgICAgICAgICAgIFRleHRSZW5kZXIudGV4dFdvcmxkLnBhbGV0dGUgPSBEZWZhdWx0UGFsZXR0ZXMuQzRSZWFkZXI7XHJcbiAgICAgICAgICAgIHRleHRTY3JlZW4gPSBuZXcgVGV4dFJlbmRlclRvU2NyZWVuKFRleHRSZW5kZXIpO1xyXG4gICAgICAgIH1cclxuXG5cclxuXHJcbiAgICBcbnByaXZhdGUgVGV4dFNjcmVlbkhvbGRlciBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fU2NyZWVuSG9sZGVyPW5ldyBUZXh0U2NyZWVuSG9sZGVyKCk7fVxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5Ob3ZlbEJhc2U7XHJcbnVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBOb3ZlbEFwcFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgVGV4dFJlbmRlclRvU2NyZWVuIDogSVRleHRTY3JlZW5cclxuICAgIHtcclxuICAgICAgICBUZXh0UmVuZGVyIHRleHRSZW5kZXI7XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0UmVuZGVyVG9TY3JlZW4oVGV4dFJlbmRlciB0ZXh0UmVuZGVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy50ZXh0UmVuZGVyID0gdGV4dFJlbmRlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgSW5wdXRVbmljb2RlIHsgc2V0OyBnZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIFRleHRCb2FyZCBHZXRCb2FyZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGV4dFJlbmRlci50ZXh0V29ybGQubWFpbkJvYXJkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVXBkYXRlKGZsb2F0IGYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoSW5wdXRVbmljb2RlICE9IC0xKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0UmVuZGVyLlJlY2VpdmVJbnB1dCgpO1xyXG4gICAgICAgICAgICAgICAgSW5wdXRVbmljb2RlID0gLTE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGV4dFJlbmRlci5VcGRhdGUoZik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZztcclxuXHJcbm5hbWVzcGFjZSBOb3ZlbEFwcFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgR2VuZXJpY1RleHRNZW51IDogVGV4dFNjcmVlbk5cclxuICAgIHtcclxuXHJcbiAgICAgICAgTGlzdDxzdHJpbmc+IG9wdGlvbnMgPSBuZXcgTGlzdDxzdHJpbmc+KCk7XHJcbiAgICAgICAgcHVibGljIGludCBDaG9zZW5PcHRpb24geyBwcml2YXRlIHNldDsgZ2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIFVwZGF0ZShmbG9hdCBmKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKElucHV0VW5pY29kZSA+PSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChJbnB1dEFzTnVtYmVyID4gMCAmJiBJbnB1dEFzTnVtYmVyIDw9IG9wdGlvbnMuQ291bnQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZShJbnB1dEFzTnVtYmVyICsgXCJ4XCIpO1xyXG4gICAgICAgICAgICAgICAgQ2hvc2VuT3B0aW9uID0gSW5wdXRBc051bWJlci0xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBib2FyZCA9IEdldEJvYXJkKCk7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgb3B0aW9ucy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbnQgeCA9IDA7XHJcbiAgICAgICAgICAgICAgICBpbnQgeSA9IGk7XHJcbiAgICAgICAgICAgICAgICBib2FyZC5EcmF3Q2hhcigoY2hhcikoJzEnK2kpLCB4LCB5LCAzKTtcclxuICAgICAgICAgICAgICAgIGJvYXJkLkRyYXdDaGFyKChjaGFyKSgnLScpLCB4KzIsIHksIDMpO1xyXG4gICAgICAgICAgICAgICAgYm9hcmQuRHJhdyhvcHRpb25zW2ldLCB4KzQsIHksIDMpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgUmVzZXQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ2hvc2VuT3B0aW9uID0gLTEwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBBZGRPcHRpb25zKHBhcmFtcyBzdHJpbmdbXSBhcmdzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5BZGRSYW5nZShhcmdzKTtcclxuICAgICAgICB9XHJcblxuICAgIFxucHJpdmF0ZSBpbnQgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX0Nob3Nlbk9wdGlvbj0tMTt9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5UZXh0UmVuZGVyaW5nXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBCbGlua0FuaW0gOiBUZXh0QW5pbWF0aW9uPEJsaW5rQW5pbS5CbGlua0RhdGE+XHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgTW9kaWZ5KFRleHRFbnRpdHkgZW50aXR5LCBCbGlua0RhdGEgbWFpbkRhdGEsIGZsb2F0IHByb2dyZXNzLCBmbG9hdCBsZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLk1vZGlmeShlbnRpdHksIG1haW5EYXRhLCBwcm9ncmVzcywgbGVuZ3RoKTtcclxuICAgICAgICAgICAgZmxvYXQgYXV4ID0gcHJvZ3Jlc3M7XHJcbiAgICAgICAgICAgIGJvb2wgYmxpbmsgPSB0cnVlO1xyXG4gICAgICAgICAgICB3aGlsZSAodHJ1ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGJsaW5rKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGF1eCAtPSBtYWluRGF0YS5ibGlua0FjdGl2ZVRpbWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXV4IC09IG1haW5EYXRhLmJsaW5rSW5hY3RpdmU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYXV4IDwgMClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBibGluayA9ICFibGluaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWJsaW5rKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBlbnRpdHkuYW5pbWF0aW9uLlNldEFsbChtYWluRGF0YS50ZXh0LCBtYWluRGF0YS50ZXh0Q29sb3IsIG1haW5EYXRhLmJhY2tDb2xvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RydWN0IEJsaW5rRGF0YVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGNoYXIgdGV4dDtcclxuICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGludCBiYWNrQ29sb3IsIHRleHRDb2xvcjtcclxuICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGZsb2F0IGJsaW5rQWN0aXZlVGltZTtcclxuICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGZsb2F0IGJsaW5rSW5hY3RpdmU7XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgQmxpbmtEYXRhKGNoYXIgdGV4dCwgaW50IGJhY2tDb2xvciwgaW50IHRleHRDb2xvciwgZmxvYXQgYmxpbmtBY3RpdmVUaW1lLCBmbG9hdCBibGlua0luYWN0aXZlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHQgPSB0ZXh0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iYWNrQ29sb3IgPSBiYWNrQ29sb3I7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHRDb2xvciA9IHRleHRDb2xvcjtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmxpbmtBY3RpdmVUaW1lID0gYmxpbmtBY3RpdmVUaW1lO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ibGlua0luYWN0aXZlID0gYmxpbmtJbmFjdGl2ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHVibGljIHN0YXRpYyBCbGlua0RhdGEgQmFja0NvbG9yKGludCBiYWNrQ29sb3IsIGZsb2F0IGJsaW5rRHVyYXRpb24pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQmxpbmtEYXRhKFRleHRCb2FyZC5OT0NIQU5HRUNIQVIsIGJhY2tDb2xvciwgVGV4dEJvYXJkLk5PQ0hBTkdFQ09MT1IsIGJsaW5rRHVyYXRpb24sIGJsaW5rRHVyYXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgc3RhdGljIEJsaW5rRGF0YSBDaGFyKGNoYXIgYywgZmxvYXQgYmxpbmtEdXJhdGlvbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBCbGlua0RhdGEoYywgVGV4dEJvYXJkLk5PQ0hBTkdFQ09MT1IsIFRleHRCb2FyZC5OT0NIQU5HRUNPTE9SLCBibGlua0R1cmF0aW9uLCBibGlua0R1cmF0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJuYW1lc3BhY2UgUGlkcm9oLlRleHRSZW5kZXJpbmdcclxue1xyXG4gICAgcHVibGljIGNsYXNzIENoYXJCeUNoYXJBbmltYXRpb24gOiBUZXh0QW5pbWF0aW9uPENoYXJCeUNoYXJBbmltYXRpb24uQ2hhckJ5Q2hhckRhdGE+XHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgTW9kaWZ5KFRleHRFbnRpdHkgZW50aXR5LCBDaGFyQnlDaGFyRGF0YSBtYWluRGF0YSwgZmxvYXQgcHJvZ3Jlc3MsIGZsb2F0IGxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuTW9kaWZ5KGVudGl0eSwgbWFpbkRhdGEsIHByb2dyZXNzLCBsZW5ndGgpO1xyXG4gICAgICAgICAgICBmbG9hdCByYXRpbyA9IHByb2dyZXNzIC8gbGVuZ3RoO1xyXG4gICAgICAgICAgICBmbG9hdCBsZW5ndGhUZXh0ID0gbWFpbkRhdGEuY2hhckVuZCAtIG1haW5EYXRhLmNoYXJTdGFydDtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IG1haW5EYXRhLmNoYXJTdGFydDsgaSA8IG1haW5EYXRhLmNoYXJFbmQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW50IG9mZnNldGVkID0gaTtcclxuICAgICAgICAgICAgICAgIGludCBsaW5lID0gMDtcclxuICAgICAgICAgICAgICAgIHZhciB0YiA9IGVudGl0eS5hbmltYXRpb247XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAob2Zmc2V0ZWQgPj0gdGIuV2lkdGgpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZSsrO1xyXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldGVkIC09IHRiLldpZHRoO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGkgPiAoKGxlbmd0aFRleHQgKiByYXRpbykgKyBtYWluRGF0YS5jaGFyU3RhcnQpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRiLkRyYXdDaGFyKCcgJywgb2Zmc2V0ZWQsIGxpbmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGIuRHJhdyhcIlwiICsgaSwgNiwgNSwgMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIGNsYXNzIENoYXJCeUNoYXJEYXRhXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBpbnQgY2hhclN0YXJ0O1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBpbnQgY2hhckVuZDtcclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBDaGFyQnlDaGFyRGF0YShpbnQgY2hhclN0YXJ0LCBpbnQgY2hhckVuZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFyU3RhcnQgPSBjaGFyU3RhcnQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYXJFbmQgPSBjaGFyRW5kO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdCn0K

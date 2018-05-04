/**
 * @version 1.0.0.0
 * @author UNITCOM PC
 * @copyright Copyright © UNITCOM PC 2018
 * @compiler Bridge.NET 16.8.2
 */
Bridge.assembly("BridgeBuild", function ($asm, globals) {
    "use strict";

    Bridge.define("BridgeBuild.App", {
        main: function Main () {

            BridgeBuild.App.novelMain = new NovelApp.NovelMain().Init(70, 25);
            BridgeBuild.App.colors = Pidroh.TextRendering.DefaultPalettes.C4Reader.HtmlColors;

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
            BridgeBuild.App.buffer = 9;
            BridgeBuild.App.bufferOn = false;

            document.onkeypress = Bridge.fn.combine(document.onkeypress, function (a) {

                var unicode = a.keyCode;
                //InputKey ik = InputKey.NONE;
                //switch (unicode)
                //{
                //    case 32:
                //         ik = InputKey.DONE;
                //        break;
                //    case 'f':
                //        ik = InputKey.FIRE;
                //        break;
                //    case 'g':
                //        ik = InputKey.NORMALSHOT;
                //        break;
                //    case 'i':
                //        ik = InputKey.ICE;
                //        break;
                //    case 't':
                //        ik = InputKey.THUNDER;
                //        break;
                //    case 'w':
                //    case 38:
                //        ik = InputKey.UP;
                //        break;
                //    case 'a':
                //    case 37:
                //        ik = InputKey.LEFT;
                //        break;
                //    case 's':
                //    case 40:
                //        ik = InputKey.DOWN;
                //        break;
                //    case 39:
                //    case 'd':
                //        ik = InputKey.RIGHT;
                //        break;
                //    case 'r':
                //        ik = InputKey.REDO;
                //        break;


                //    default:
                //        break;
                //}
                //buffer = a.CharCode;
                //buffer = (int)ik;
                BridgeBuild.App.buffer = unicode;
                BridgeBuild.App.bufferOn = true;
            });

            BridgeBuild.App.UpdateGame();

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

                    screen.NovelApp$ITextScreen$Update(delta);
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

    Bridge.define("NovelApp.ITextScreen", {
        $kind: "interface"
    });

    Bridge.define("NovelApp.NovelMain", {
        fields: {
            w: 0,
            h: 0,
            menu: null,
            TextRender: null,
            screen: null,
            ScreenHolder: null,
            textScreen: null
        },
        ctors: {
            init: function () {
                this.ScreenHolder = new NovelApp.TextScreenHolder();
            }
        },
        methods: {
            Update: function (time) {
                if (Bridge.referenceEquals(this.ScreenHolder.Screen, this.menu) && this.menu.ChosenOption >= 0) {

                    var story2 = NovelApp.Stories.story2;
                    var endTagOnAspas = false;
                    switch (this.menu.ChosenOption) {
                        case 0: 
                            story2 = NovelApp.Stories.story;
                            break;
                        case 1: 
                            story2 = NovelApp.Stories.storyA;
                            break;
                        case 3: 
                            endTagOnAspas = true;
                            break;
                        case 4: 
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
            Init: function (w, h) {
                this.w = w;
                this.h = h;
                this.menu = new NovelApp.GenericTextMenu();
                this.menu.AddOptions(["Story 1", "Story 1 A", "Story 2", "Story 2 A", "Story 2 B"]);
                this.menu.Init(w, h);
                this.ScreenHolder.Screen = this.menu;


                return this;
            },
            InitTextRender: function (story2, endTagOnAspas) {
                this.TextRender = new Pidroh.NovelBase.TextRender();
                this.TextRender.TagToColor.AddData(Pidroh.NovelBase.TagInfo.FromLabel(99, 112), Pidroh.TextRendering.DefaultPalettes.C4WhiteNeutral);
                this.TextRender.TagToColor.AddData(Pidroh.NovelBase.TagInfo.FromLabel(99, 109), Pidroh.TextRendering.DefaultPalettes.C4BlackNeutral);

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

    Bridge.define("NovelApp.Stories", {
        statics: {
            fields: {
                story: null,
                storyA: null,
                story2: null,
                story3: null
            },
            ctors: {
                init: function () {
                    this.story = "#cmWelcome back, dear.\r\n#cmHow was school today?\r\nShe says that everyday.\r\n#cpNormal.\r\n#cmGood.\r\n#cmOh, your father called saying he'll be late today.\r\n#cpI see.\r\nI rush to my room, cutting off whatever mom was about to say.\r\ns";
                    this.storyA = "#cmMOM: Welcome back, dear.\r\n#cmMOM: How was school today?\r\nShe says that everyday.\r\n#cpSARA: Normal.\r\n#cmMOM: Good.\r\n#cmMOM: Oh, your father called saying he'll be late today.\r\n#cpSARA: I see.\r\nI rush to my room, cutting off whatever mom was about to say.\r\ns";
                    this.story2 = "#cm%Welcome back, dear% is what I hear as I enter, greeted with a smile so big you can see every teeth.\r\n#cm%How was school today?%\r\n#cp%Normal,% I say.\r\n#cm%Good.%\r\n#cm%Oh, your father called saying he'll be late today.% She mutters, finally letting go of her smile.\r\n#cp%I see.%\r\n\r\nI make my way to my room cutting off whatever mom was about to say. Can't spend the entire afternoon on small talk.\r\n";
                    this.story3 = "%Welcome back, dear% is what I hear as I enter, greeted with a smile so big you can see every teeth.\r\n%How was school today?%\r\n%Normal,% I say.\r\n%Good.%\r\n%Oh, your father called saying he'll be late today.% She mutters, finally letting go of her smile.\r\n%I see.%\r\n\r\nI make my way to my room cutting off whatever mom was about to say. Can't spend the entire afternoon on small talk.\r\n";
                }
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
                        $t.System$IDisposable$dispose();
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
            lb: 0,
            x: 0,
            indexes: null,
            TextHolder: null,
            tagInfo: null,
            text: null,
            textWorld: null,
            lineBreaks: null,
            charIndex: 0,
            passageDone: false,
            timeOfChar: 0,
            timeBuffer: 0,
            backgroundColorDefault: 0,
            textColorDefault: 0,
            TagToColor: null,
            quickSkip: false,
            Finished: false
        },
        ctors: {
            init: function () {
                this.indexer = 0;
                this.lb = 2;
                this.x = 1;
                this.indexes = new (System.Collections.Generic.List$1(System.Int32)).ctor();
                this.timeOfChar = 0.04;
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
                //Console.WriteLine(got);
                //Console.ReadKey();


                this.indexes.add(-1);
                var openAspas = false;
                var lastStop = -10;
                for (var i = 0; i < ((text.length - 1) | 0); i = (i + 1) | 0) {
                    if (((i - lastStop) | 0) < 2) {

                    } else {

                        if ((text.charCodeAt(i) === 46 && (text.charCodeAt(((i + 1) | 0)) !== 46 && text.charCodeAt(((i + 1) | 0)) !== 34 && text.charCodeAt(((i + 1) | 0)) !== 10 && text.charCodeAt(((i + 1) | 0)) !== 13))) {
                            this.indexes.add(i);
                            lastStop = i;
                        }
                        if (text.charCodeAt(i) === 34) {
                            openAspas = !openAspas;
                            if (!openAspas) {
                                this.indexes.add(i);
                                lastStop = i;
                            }
                        }
                        if (text.charCodeAt(i) === 10) {
                            this.indexes.add(i);
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
                        xPos = 0;
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

                var DrawChar = true;
                if (this.indexes.Count > ((this.indexer + 1) | 0)) {
                    DrawChar = this.charIndex < ((this.indexes.getItem(((this.indexer + 1) | 0)) + 1) | 0);
                }
                if (DrawChar) {
                    this.x = (this.x + 1) | 0;
                    if (this.charIndex >= this.text.length) {
                        this.Finished = true;
                        return false;
                    }
                    var value = this.text.charCodeAt(this.charIndex);
                    if (this.lineBreaks.contains(this.charIndex)) {

                        this.lb = (this.lb + 1) | 0;
                        this.x = 1;
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
                        this.TextHolder.origin.DrawChar$1(value, this.x, this.lb, textColor, this.backgroundColorDefault);
                        this.textWorld.Draw();

                    }

                    if (value === 10) {
                        this.lb = (this.lb + 1) | 0;
                        this.lb = (this.lb + 1) | 0;
                        this.x = 1;
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
                                $t.System$IDisposable$dispose();
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
                    this.progress.setItem(i, this.progress.getItem(i)+delta);
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
                        $t.System$IDisposable$dispose();
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
                        $t.System$IDisposable$dispose();
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
                C4Black: 0,
                C4BlackNeutral: 0,
                C4WhiteNeutral: 0,
                C4White: 0
            },
            ctors: {
                init: function () {
                    this.C4KiroKaze = new Pidroh.TextRendering.Palette(["#332c50", "#46878f", "#94e344", "#e2f3e4"]);
                    this.C4Reader = new Pidroh.TextRendering.Palette(["#262626", "#8b8cba", "#8bba91", "#649f8d"]);
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
                        $t.System$IDisposable$dispose();
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
                        $t.System$IDisposable$dispose();
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
                    this.DrawChar$1(v.charCodeAt(i), ((x + i) | 0), y, color, backColor);
                }
            },
            Draw: function (v, x, y, color, backColor) {
                if (backColor === void 0) { backColor = -2; }
                for (var i = 0; i < System.Linq.Enumerable.from(v).count(); i = (i + 1) | 0) {
                    this.DrawChar$1(System.Linq.Enumerable.from(v).elementAt(i), ((x + i) | 0), y, color, backColor);
                }
            },
            Draw$2: function (v, x2, y2, input) {
                throw new System.NotImplementedException();
            },
            DrawGrid: function (x, y, width, height, color) {

                this.DrawRepeated(124, x, y, 1, height, color);
                this.DrawRepeated(124, ((((x + width) | 0) - 1) | 0), y, 1, height, color);
                this.DrawRepeated(45, x, y, width, 1, color);
                this.DrawRepeated(45, x, ((((y + height) | 0) - 1) | 0), width, 1, color);
            },
            DrawGrid$1: function (v1, v2, v3, v4, board) {
                throw new System.NotImplementedException();
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

    Bridge.define("Pidroh.TextRendering.TextEntity", {
        fields: {
            id: 0,
            origin: null,
            animation: null,
            freeIfIdle: false,
            animating: false
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
                this.animation.Set(this.origin);
            },
            ResetFull: function () {
                this.origin.ResetInvisible();
            },
            SetSize: function (w, h) {
                if (this.origin == null) {
                    this.origin = new Pidroh.TextRendering.TextBoard(w, h);
                    this.animation = new Pidroh.TextRendering.TextBoard(w, h);
                }
                this.origin.Resize(w, h);
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
                            $t.System$IDisposable$dispose();
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
                        $t.System$IDisposable$dispose();
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
                        $t.System$IDisposable$dispose();
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
                this.options.addRange(args);
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
                    target = entity.origin;
                }
                target.Position = Pidroh.TextRendering.Vector2D.InterpolateRounded(mainData.startPosition.$clone(), mainData.endPosition.$clone(), progress / length);

            }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJCcmlkZ2VCdWlsZC5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiQXBwLmNzIiwiLi4vTm92ZWxBcHAvTm92ZWxNYWluLmNzIiwiLi4vTm92ZWxCYXNlL1RleHRUYWdSZWFkZXIuY3MiLCIuLi9Ob3ZlbEJhc2UvVGFnVG9EYXRhLmNzIiwiLi4vTm92ZWxCYXNlL1Rlc3RTdG9yaWVzLmNzIiwiLi4vTm92ZWxCYXNlL1RleHRSZW5kZXIuY3MiLCIuLi8uLi8uLi8uLi9UdXJuQmFzZWQvVmlzdWFsU3R1ZGlvU29sdXRpb24vVGV4dFJlbmRlcmluZ0xvZ2ljL1RleHRXb3JsZC5jcyIsIi4uLy4uLy4uLy4uL1R1cm5CYXNlZC9WaXN1YWxTdHVkaW9Tb2x1dGlvbi9UZXh0UmVuZGVyaW5nTG9naWMvUGFsZXR0ZS5jcyIsIi4uLy4uLy4uLy4uL1R1cm5CYXNlZC9WaXN1YWxTdHVkaW9Tb2x1dGlvbi9UZXh0UmVuZGVyaW5nTG9naWMvVGV4dEJvYXJkLmNzIiwiLi4vLi4vLi4vLi4vVHVybkJhc2VkL1Zpc3VhbFN0dWRpb1NvbHV0aW9uL0Jhc2VVdGlscy9WZWN0b3IyRC5jcyIsIi4uL05vdmVsQXBwL0lUZXh0U2NyZWVuTi5jcyIsIi4uL05vdmVsQXBwL1RleHRSZW5kZXJUb1NjcmVlbi5jcyIsIi4uL05vdmVsQXBwL0dlbmVyaWNUZXh0TWVudS5jcyIsIi4uLy4uLy4uLy4uL1R1cm5CYXNlZC9WaXN1YWxTdHVkaW9Tb2x1dGlvbi9UZXh0UmVuZGVyaW5nTG9naWMvQmxpbmtBbmltYXRpb24uY3MiLCIuLi8uLi8uLi8uLi9UdXJuQmFzZWQvVmlzdWFsU3R1ZGlvU29sdXRpb24vVGV4dFJlbmRlcmluZ0xvZ2ljL0NoYXJCeUNoYXJBbmltYXRpb24uY3MiXSwKICAibmFtZXMiOiBbIiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7OztZQTBCWUEsNEJBQVlBLElBQUlBO1lBQ2hCQSx5QkFBU0E7Ozs7Ozs7Ozs7OztZQVlUQSxZQUFZ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QUFtQkE7Z0JBQ25CQSxpQkFBaUJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0NPN0pHQSxRQUFtQkEsVUFBb0JBLFVBQWdCQTtnQkFFL0VBLDZHQUFZQSxRQUFRQSxVQUFVQSxVQUFVQTtnQkFDeENBLFVBQVlBO2dCQUNaQTtnQkFDQUE7b0JBRUlBLElBQUlBO3dCQUVBQSxPQUFPQTs7d0JBSVBBLE9BQU9BOztvQkFFWEEsSUFBSUE7d0JBRUFBOzt3QkFJQUEsUUFBUUEsQ0FBQ0E7OztnQkFHakJBLElBQUlBLENBQUNBO29CQUVEQSx3QkFBd0JBLGVBQWVBLG9CQUFvQkE7Ozs7Ozs7OztnQ0MvQnZDQSxRQUFtQkEsVUFBeUJBLFVBQWdCQTtnQkFFcEZBLDRIQUFZQSxRQUFRQSxVQUFVQSxVQUFVQTtnQkFDeENBLFlBQWNBLFdBQVdBO2dCQUN6QkEsaUJBQW1CQSxvQkFBbUJBO2dCQUN0Q0EsS0FBS0EsUUFBUUEsb0JBQW9CQSxJQUFJQSxrQkFBa0JBO29CQUVuREEsZUFBZUE7b0JBQ2ZBO29CQUNBQSxTQUFTQTtvQkFDVEEsT0FBT0EsWUFBWUE7d0JBRWZBO3dCQUNBQSx1QkFBWUE7O29CQUVoQkEsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsYUFBYUEsU0FBU0E7d0JBRTVCQSxnQkFBaUJBLFVBQVVBOzs7Ozs7Ozs7Ozs7Z0NSOEhYQSxRQUFtQkEsVUFBdUJBLFVBQWdCQTtnQkFFbEZBLHdIQUFZQSxRQUFRQSxVQUFVQSxVQUFVQTtnQkFDeENBLGFBQW1CQTtnQkFDbkJBLElBQUlBO29CQUNBQSxTQUFTQTs7Z0JBQ2JBLGtCQUFrQkEsaURBQTRCQSxpQ0FBd0JBLCtCQUFzQkEsV0FBV0EiLAogICJzb3VyY2VzQ29udGVudCI6IFsidXNpbmcgQnJpZGdlO1xyXG51c2luZyBCcmlkZ2UuSHRtbDU7XHJcbnVzaW5nIE5ld3RvbnNvZnQuSnNvbjtcclxudXNpbmcgTm92ZWxBcHA7XHJcbnVzaW5nIFBpZHJvaC5Ob3ZlbEJhc2U7XHJcbnVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nO1xyXG5cclxuLy91c2luZyBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQ7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgQnJpZGdlQnVpbGRcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEFwcFxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGludCBidWZmZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgYm9vbCBidWZmZXJPbjtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBOb3ZlbE1haW4gbm92ZWxNYWluO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFRleHRCb2FyZCBUZXh0Qm9hcmQ7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgc3RyaW5nW10gY29sb3JzO1xyXG5cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNYWluKClcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICBub3ZlbE1haW4gPSBuZXcgTm92ZWxNYWluKCkuSW5pdCg3MCwgMjUpO1xyXG4gICAgICAgICAgICBjb2xvcnMgPSBEZWZhdWx0UGFsZXR0ZXMuQzRSZWFkZXIuSHRtbENvbG9ycztcclxuXHJcbiAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoXCJHYW1lIFN0YXJ0XCIpO1xyXG4gICAgICAgICAgICAvL2NvbG9ycyA9IG5ldyBzdHJpbmdbMjBdO1xyXG5cclxuICAgICAgICAgICAgLy9mb3IgKGludCBpID0gMDsgaSA8IGNvbG9ycy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgLy97XHJcbiAgICAgICAgICAgIC8vICAgIC8vY29sb3JzW2ldID0gXCIjMWYyMDI2XCI7XHJcblxyXG4gICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgLy9jb2xvcnNbMV0gPSBcIiNmZmZmZmZcIjtcclxuXHJcbiAgICAgICAgICAgIHZhciBzdHlsZSA9IG5ldyBIVE1MU3R5bGVFbGVtZW50KCk7XHJcbiAgICAgICAgICAgIHN0eWxlLklubmVySFRNTCA9IFwiaHRtbCxib2R5IHtmb250LWZhbWlseTogQ291cmllcjsgYmFja2dyb3VuZC1jb2xvcjojMWYyNTI2OyBoZWlnaHQ6IDEwMCU7fVwiICsgXCJcXG4gI2NhbnZhcy1jb250YWluZXIge3dpZHRoOiAxMDAlOyBoZWlnaHQ6IDEwMCU7IHRleHQtYWxpZ246Y2VudGVyOyB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOyB9IFwiO1xyXG4gICAgICAgICAgICBEb2N1bWVudC5IZWFkLkFwcGVuZENoaWxkKHN0eWxlKTtcclxuICAgICAgICAgICAgYnVmZmVyID0gOTtcclxuICAgICAgICAgICAgYnVmZmVyT24gPSBmYWxzZTsgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBEb2N1bWVudC5PbktleVByZXNzICs9IChLZXlib2FyZEV2ZW50IGEpID0+IHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaW50IHVuaWNvZGUgPSBhLktleUNvZGU7XHJcbiAgICAgICAgICAgICAgICAvL0lucHV0S2V5IGlrID0gSW5wdXRLZXkuTk9ORTtcclxuICAgICAgICAgICAgICAgIC8vc3dpdGNoICh1bmljb2RlKVxyXG4gICAgICAgICAgICAgICAgLy97XHJcbiAgICAgICAgICAgICAgICAvLyAgICBjYXNlIDMyOlxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBpayA9IElucHV0S2V5LkRPTkU7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBjYXNlICdmJzpcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBpayA9IElucHV0S2V5LkZJUkU7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBjYXNlICdnJzpcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBpayA9IElucHV0S2V5Lk5PUk1BTFNIT1Q7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBjYXNlICdpJzpcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBpayA9IElucHV0S2V5LklDRTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIC8vICAgIGNhc2UgJ3QnOlxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIGlrID0gSW5wdXRLZXkuVEhVTkRFUjtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIC8vICAgIGNhc2UgJ3cnOlxyXG4gICAgICAgICAgICAgICAgLy8gICAgY2FzZSAzODpcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBpayA9IElucHV0S2V5LlVQO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgY2FzZSAnYSc6XHJcbiAgICAgICAgICAgICAgICAvLyAgICBjYXNlIDM3OlxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIGlrID0gSW5wdXRLZXkuTEVGVDtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIC8vICAgIGNhc2UgJ3MnOlxyXG4gICAgICAgICAgICAgICAgLy8gICAgY2FzZSA0MDpcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBpayA9IElucHV0S2V5LkRPV047XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBjYXNlIDM5OlxyXG4gICAgICAgICAgICAgICAgLy8gICAgY2FzZSAnZCc6XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgaWsgPSBJbnB1dEtleS5SSUdIVDtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIC8vICAgIGNhc2UgJ3InOlxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIGlrID0gSW5wdXRLZXkuUkVETztcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBicmVhaztcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgLy9idWZmZXIgPSBhLkNoYXJDb2RlO1xyXG4gICAgICAgICAgICAgICAgLy9idWZmZXIgPSAoaW50KWlrO1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyID0gdW5pY29kZTtcclxuICAgICAgICAgICAgICAgIGJ1ZmZlck9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFVwZGF0ZUdhbWUoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEFmdGVyIGJ1aWxkaW5nIChDdHJsICsgU2hpZnQgKyBCKSB0aGlzIHByb2plY3QsIFxyXG4gICAgICAgICAgICAvLyBicm93c2UgdG8gdGhlIC9iaW4vRGVidWcgb3IgL2Jpbi9SZWxlYXNlIGZvbGRlci5cclxuXHJcbiAgICAgICAgICAgIC8vIEEgbmV3IGJyaWRnZS8gZm9sZGVyIGhhcyBiZWVuIGNyZWF0ZWQgYW5kXHJcbiAgICAgICAgICAgIC8vIGNvbnRhaW5zIHlvdXIgcHJvamVjdHMgSmF2YVNjcmlwdCBmaWxlcy4gXHJcblxyXG4gICAgICAgICAgICAvLyBPcGVuIHRoZSBicmlkZ2UvaW5kZXguaHRtbCBmaWxlIGluIGEgYnJvd3NlciBieVxyXG4gICAgICAgICAgICAvLyBSaWdodC1DbGljayA+IE9wZW4gV2l0aC4uLiwgdGhlbiBjaG9vc2UgYVxyXG4gICAgICAgICAgICAvLyB3ZWIgYnJvd3NlciBmcm9tIHRoZSBsaXN0XHJcblxyXG4gICAgICAgICAgICAvLyBUaGlzIGFwcGxpY2F0aW9uIHdpbGwgdGhlbiBydW4gaW4gYSBicm93c2VyLlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdm9pZCBVcGRhdGVHYW1lKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBzY3JlZW4gPSBub3ZlbE1haW4uU2NyZWVuSG9sZGVyLlNjcmVlbjtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IGZsb2F0IGRlbHRhID0gMC4wMzNmO1xyXG4gICAgICAgICAgICBub3ZlbE1haW4uVXBkYXRlKGRlbHRhKTtcclxuICAgICAgICAgICAgVGV4dEJvYXJkID0gc2NyZWVuLkdldEJvYXJkKCk7XHJcbiAgICAgICAgICAgIHNjcmVlbi5VcGRhdGUoZGVsdGEpO1xyXG4gICAgICAgICAgICAvL2dyLkRyYXcoMC4wMzNmKTtcclxuXHJcbiAgICAgICAgICAgIHNjcmVlbi5VcGRhdGUoZGVsdGEpO1xyXG4gICAgICAgICAgICBpZiAoYnVmZmVyT24pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNjcmVlbi5JbnB1dFVuaWNvZGUgPSBidWZmZXI7XHJcblxyXG4gICAgICAgICAgICAgICAgYnVmZmVyT24gPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNjcmVlbi5JbnB1dFVuaWNvZGUgPSAtMTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgU2NyaXB0LkNhbGwoXCJjbGVhclwiKTtcclxuICAgICAgICAgICAgRHJhd1RleHRCb2FyZCgpO1xyXG5cclxuICAgICAgICAgICAgV2luZG93LlNldFRpbWVvdXQoKGdsb2JhbDo6U3lzdGVtLkFjdGlvbilVcGRhdGVHYW1lLCAzMyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyB2b2lkIERyYXdUZXh0Qm9hcmQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaiA9IDA7IGogPCBUZXh0Qm9hcmQuSGVpZ2h0OyBqKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgVGV4dEJvYXJkLldpZHRoOyBpKyspXHJcbiAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGludCB0YyA9IFRleHRCb2FyZC5UZXh0Q29sb3JbaSwgal07XHJcbiAgICAgICAgICAgICAgICAgICAgaW50IHRiID0gVGV4dEJvYXJkLkJhY2tDb2xvcltpLCBqXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGMgPCAwKSB0YyA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRiIDwgMCkgdGIgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0cmluZyBjb2xvcjEgPSBjb2xvcnNbdGNdO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHN0cmluZyBjb2xvckJhY2sgPSBjb2xvcnNbdGJdO1xyXG4gICAgICAgICAgICAgICAgICAgIFNjcmlwdC5DYWxsKFwiZHJhd1wiLCBpLCBqLCBjb2xvcjEsIGNvbG9yQmFjaywgXCJcIiArIFRleHRCb2FyZC5DaGFyQXQoaSwgaikpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFBpZHJvaC5Ob3ZlbEJhc2U7XHJcbnVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBOb3ZlbEFwcFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgTm92ZWxNYWluXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgdztcclxuICAgICAgICBwcml2YXRlIGludCBoO1xyXG4gICAgICAgIHByaXZhdGUgR2VuZXJpY1RleHRNZW51IG1lbnU7XHJcbiAgICAgICAgcHVibGljIFRleHRSZW5kZXIgVGV4dFJlbmRlcjtcclxuICAgICAgICBUZXh0U2NyZWVuTiBzY3JlZW47XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0U2NyZWVuSG9sZGVyIFNjcmVlbkhvbGRlciA9IG5ldyBUZXh0U2NyZWVuSG9sZGVyKCk7XHJcbiAgICAgICAgcHJpdmF0ZSBUZXh0UmVuZGVyVG9TY3JlZW4gdGV4dFNjcmVlbjtcclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVXBkYXRlKGZsb2F0IHRpbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoU2NyZWVuSG9sZGVyLlNjcmVlbiA9PSBtZW51ICYmIG1lbnUuQ2hvc2VuT3B0aW9uID49IDApXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBzdHJpbmcgc3RvcnkyID0gU3Rvcmllcy5zdG9yeTI7XHJcbiAgICAgICAgICAgICAgICBib29sIGVuZFRhZ09uQXNwYXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAobWVudS5DaG9zZW5PcHRpb24pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdG9yeTIgPSBTdG9yaWVzLnN0b3J5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3J5MiA9IFN0b3JpZXMuc3RvcnlBO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZFRhZ09uQXNwYXMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3J5MiA9IFN0b3JpZXMuc3RvcnkzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChtZW51LkNob3Nlbk9wdGlvbiA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RvcnkyID0gU3Rvcmllcy5zdG9yeTtcclxuICAgICAgICAgICAgICAgIH0gIFxyXG4gICAgICAgICAgICAgICAgSW5pdFRleHRSZW5kZXIoc3RvcnkyLCBlbmRUYWdPbkFzcGFzKTtcclxuICAgICAgICAgICAgICAgIFNjcmVlbkhvbGRlci5TY3JlZW4gPSB0ZXh0U2NyZWVuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChTY3JlZW5Ib2xkZXIuU2NyZWVuID09IHRleHRTY3JlZW4gJiYgVGV4dFJlbmRlci5GaW5pc2hlZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgU2NyZWVuSG9sZGVyLlNjcmVlbiA9IG1lbnU7XHJcbiAgICAgICAgICAgICAgICBtZW51LlJlc2V0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBOb3ZlbE1haW4gSW5pdChpbnQgdywgaW50IGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLncgPSB3O1xyXG4gICAgICAgICAgICB0aGlzLmggPSBoO1xyXG4gICAgICAgICAgICBtZW51ID0gbmV3IEdlbmVyaWNUZXh0TWVudSgpO1xyXG4gICAgICAgICAgICBtZW51LkFkZE9wdGlvbnMoXCJTdG9yeSAxXCIsIFwiU3RvcnkgMSBBXCIsIFwiU3RvcnkgMlwiLCBcIlN0b3J5IDIgQVwiLCBcIlN0b3J5IDIgQlwiKTtcclxuICAgICAgICAgICAgbWVudS5Jbml0KHcsIGgpO1xyXG4gICAgICAgICAgICBTY3JlZW5Ib2xkZXIuU2NyZWVuID0gbWVudTtcclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBJbml0VGV4dFJlbmRlcihzdHJpbmcgc3RvcnkyLCBib29sIGVuZFRhZ09uQXNwYXMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBUZXh0UmVuZGVyID0gbmV3IFRleHRSZW5kZXIoKTtcclxuICAgICAgICAgICAgVGV4dFJlbmRlci5UYWdUb0NvbG9yLkFkZERhdGEoVGFnSW5mby5Gcm9tTGFiZWwoJ2MnLCAncCcpLCBEZWZhdWx0UGFsZXR0ZXMuQzRXaGl0ZU5ldXRyYWwpO1xyXG4gICAgICAgICAgICBUZXh0UmVuZGVyLlRhZ1RvQ29sb3IuQWRkRGF0YShUYWdJbmZvLkZyb21MYWJlbCgnYycsICdtJyksIERlZmF1bHRQYWxldHRlcy5DNEJsYWNrTmV1dHJhbCk7XHJcblxyXG4gICAgICAgICAgICBzdHJpbmcgZ290ID0gc3RvcnkyLlJlcGxhY2UoXCIlXCIsIFwiXFxcIlwiKS5SZXBsYWNlKFwiXFxyXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICBzdHJpbmcgdGFnbGVzc1RleHQ7XHJcbiAgICAgICAgICAgIFRleHRUYWdSZWFkZXIgdGV4dFRhZ1JlYWRlciA9IG5ldyBUZXh0VGFnUmVhZGVyKCk7XHJcbiAgICAgICAgICAgIHRleHRUYWdSZWFkZXIuRW5kUGFzc2FnZU9uQXNwYXMgPSBlbmRUYWdPbkFzcGFzO1xyXG4gICAgICAgICAgICB2YXIgdGFnSW5mbyA9IHRleHRUYWdSZWFkZXIuRXh0cmFjdFRhZ0luZm8oZ290LCBvdXQgdGFnbGVzc1RleHQpO1xyXG4gICAgICAgICAgICBUZXh0UmVuZGVyLlNldHVwKHRhZ2xlc3NUZXh0LCB3LCBoLCB0YWdJbmZvKTtcclxuICAgICAgICAgICAgVGV4dFJlbmRlci50ZXh0V29ybGQucGFsZXR0ZSA9IERlZmF1bHRQYWxldHRlcy5DNFJlYWRlcjtcclxuICAgICAgICAgICAgdGV4dFNjcmVlbiA9IG5ldyBUZXh0UmVuZGVyVG9TY3JlZW4oVGV4dFJlbmRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Ob3ZlbEJhc2Vcclxue1xyXG5cclxuXHJcblxyXG4gICAgcHVibGljIGNsYXNzIFRleHRUYWdSZWFkZXJcclxuICAgIHtcclxuXHJcbiAgICAgICAgTGlzdDxUYWdJbmZvPiB0YWdzT3BlbmVkID0gbmV3IExpc3Q8VGFnSW5mbz4oKTtcclxuICAgICAgICBTdHJpbmdCdWlsZGVyIGF1eCA9IG5ldyBTdHJpbmdCdWlsZGVyKCk7XHJcbiAgICAgICAgcHVibGljIGJvb2wgRW5kUGFzc2FnZU9uQXNwYXMgPSB0cnVlO1xyXG5cclxuICAgICAgICBwdWJsaWMgVGFnSW5mb0hvbGRlciBFeHRyYWN0VGFnSW5mbyhzdHJpbmcgdGV4dCwgb3V0IHN0cmluZyB0YWdsZXNzVGV4dClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGF1eC5MZW5ndGggPSAwO1xyXG4gICAgICAgICAgICB0YWdzT3BlbmVkLkNsZWFyKCk7XHJcbiAgICAgICAgICAgIHZhciB0aWggPSBuZXcgVGFnSW5mb0hvbGRlcigpO1xyXG4gICAgICAgICAgICBpbnQgcmVtb3ZlZFRhZ09mZnNldCA9IDA7XHJcbiAgICAgICAgICAgIGJvb2wgYXNwYXNPcGVuZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB0ZXh0Lkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGV4dFtpXSA9PSAnIycpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgVGFnSW5mbyB0aSA9IG5ldyBUYWdJbmZvKGkgLSByZW1vdmVkVGFnT2Zmc2V0LCB0ZXh0W2kgKyAxXSwgdGV4dFtpICsgMl0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRpaC5UYWdzLkFkZCh0aSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFnc09wZW5lZC5BZGQodGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZWRUYWdPZmZzZXQgKz0gMztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJvb2wgZW5kRGV0ZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmICh0ZXh0W2ldID09ICdcIicpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKEVuZFBhc3NhZ2VPbkFzcGFzICYmIGFzcGFzT3BlbmVkKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5kRGV0ZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBhc3Bhc09wZW5lZCA9ICFhc3Bhc09wZW5lZDtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGV4dFtpXSA9PSAnXFxuJyB8fCBlbmREZXRlY3RlZClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiB0YWdzT3BlbmVkKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5FbmQgPSBpIC0gcmVtb3ZlZFRhZ09mZnNldDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGFnc09wZW5lZC5DbGVhcigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgdGV4dC5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRleHRbaV0gPT0gJyMnKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGkgKz0gMjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhdXguQXBwZW5kKHRleHRbaV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRhZ2xlc3NUZXh0ID0gYXV4LlRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aWg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBUYWdJbmZvSG9sZGVyXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIExpc3Q8VGFnSW5mbz4gVGFncyA9IG5ldyBMaXN0PFRhZ0luZm8+KCk7XHJcblxyXG4gICAgICAgIGludGVybmFsIFRhZ0luZm8gR2V0VGFnT2ZJbmRleChpbnQgY2hhckluZGV4LCBpbnQgdGFnTnVtYmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IHROID0gMDtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gVGFncylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uVmFsaWRGb3JQb3NpdGlvbihjaGFySW5kZXgpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YWdOdW1iZXIgPT0gdE4pIHJldHVybiBpdGVtO1xyXG4gICAgICAgICAgICAgICAgICAgIHROKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBUYWdJbmZvXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIGludCBTdGFydDtcclxuICAgICAgICBwdWJsaWMgaW50IEVuZDtcclxuICAgICAgICBjaGFyW10gVGFnID0gbmV3IGNoYXJbMl07XHJcblxyXG4gICAgICAgIHB1YmxpYyBUYWdJbmZvKGludCBzdGFydCwgY2hhciBjaGFyMSwgY2hhciBjaGFyMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFRhZ1swXSA9IGNoYXIxO1xyXG4gICAgICAgICAgICBUYWdbMV0gPSBjaGFyMjtcclxuICAgICAgICAgICAgdGhpcy5TdGFydCA9IHN0YXJ0O1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHN0YXRpYyBUYWdJbmZvIEZyb21MYWJlbChjaGFyIHYxLCBjaGFyIHYyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBUYWdJbmZvKDAsIHYxLCB2Mik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBib29sIFNhbWVMYWJlbChUYWdJbmZvIHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gVGFnWzBdID09IHQuVGFnWzBdICYmIFRhZ1sxXSA9PSB0LlRhZ1sxXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIGJvb2wgVmFsaWRGb3JQb3NpdGlvbihpbnQgY2hhckluZGV4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNoYXJJbmRleCA+PSBTdGFydCAmJiBjaGFySW5kZXggPD0gRW5kO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIiwiXHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Ob3ZlbEJhc2Vcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFRhZ1RvRGF0YTxUPlxyXG4gICAge1xyXG4gICAgICAgIExpc3Q8VGFnSW5mbz4gdGFncyA9IG5ldyBMaXN0PFRhZ0luZm8+KCk7XHJcbiAgICAgICAgTGlzdDxUPiBkYXRhcyA9IG5ldyBMaXN0PFQ+KCk7XHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkRGF0YShUYWdJbmZvIHRhZywgVCBkYXRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZGF0YXMuQWRkKGRhdGEpO1xyXG4gICAgICAgICAgICB0YWdzLkFkZCh0YWcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFQgR2V0RGF0YShUYWdJbmZvIHRhZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBHZXREYXRhKHRhZywgZGVmYXVsdChUKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVCBHZXREYXRhKFRhZ0luZm8gdGFnLCBUIGRlZmF1bHRWKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB0YWdzLkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICh0YWcuU2FtZUxhYmVsKHRhZ3NbaV0pKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhc1tpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZGVmYXVsdFY7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guTm92ZWxCYXNlXHJcbntcclxuICAgIHB1YmxpYyBzdGF0aWMgY2xhc3MgVGVzdFN0b3JpZXNcclxuICAgIHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgc3RyaW5nIGdvdCA9IEBcIiUjY3BXZSBzaG91bGQgc3RhcnQgYmFjaywlIEdhcmVkIHVyZ2VkIGFzIHRoZSB3b29kcyBiZWdhbiB0byBncm93IGRhcmsgYXJvdW5kIHRoZW0uICVUaGUgd2lsZGxpbmdzIGFyZSBkZWFkLiUgXHJcbiVEbyB0aGUgZGVhZCBmcmlnaHRlbiB5b3U/JSBTZXIgV2F5bWFyIFJveWNlIGFza2VkIHdpdGgganVzdCB0aGUgaGludCBvZiBhIHNtaWxlLlxyXG5HYXJlZCBkaWQgbm90IHJpc2UgdG8gdGhlIGJhaXQuIEhlIHdhcyBhbiBvbGQgbWFuLCBwYXN0IGZpZnR5LCBhbmQgaGUgaGFkIHNlZW4gdGhlIGxvcmRsaW5ncyBjb21lIGFuZCBnby4gJURlYWQgaXMgZGVhZCwlIGhlIHNhaWQuICVXZSBoYXZlIG5vIGJ1c2luZXNzIHdpdGggdGhlIGRlYWQuJVxyXG4lQXJlIHRoZXkgZGVhZD8lIFJveWNlIGFza2VkIHNvZnRseS4gJVdoYXQgcHJvb2YgaGF2ZSB3ZT8lXHJcbiVXaWxsIHNhdyB0aGVtLCUgR2FyZWQgc2FpZC4gJUlmIGhlIHNheXMgdGhleSBhcmUgZGVhZCwgdGhhdOKAmXMgcHJvb2YgZW5vdWdoIGZvciBtZS4lXHJcbldpbGwgaGFkIGtub3duIHRoZXkgd291bGQgZHJhZyBoaW0gaW50byB0aGUgcXVhcnJlbCBzb29uZXIgb3IgbGF0ZXIuIEhlIHdpc2hlZCBpdCBoYWQgYmVlbiBsYXRlciByYXRoZXIgdGhhbiBzb29uZXIuICVNeSBtb3RoZXIgdG9sZCBtZSB0aGF0IGRlYWQgbWVuIHNpbmcgbm8gc29uZ3MsJSBoZSBwdXQgaW4uXHJcbiVNeSB3ZXQgbnVyc2Ugc2FpZCB0aGUgc2FtZSB0aGluZywgV2lsbCwlIFJveWNlIHJlcGxpZWQuICVOZXZlciBiZWxpZXZlIGFueXRoaW5nIHlvdSBoZWFyIGF0IGEgd29tYW7igJlzIHRpdC4gVGhlcmUgYXJlIHRoaW5ncyB0byBiZSBsZWFybmVkIGV2ZW4gZnJvbSB0aGUgZGVhZC4lIEhpcyB2b2ljZSBlY2hvZWQsIHRvbyBsb3VkIGluIHRoZSB0d2lsaXQgZm9yZXN0LlwiO1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHN0cmluZyBHb3QgeyBnZXQgeyByZXR1cm4gZ290LlJlcGxhY2UoXCIlXCIsXCJcXFwiXCIpOyB9XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBnb3QgPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Ob3ZlbEJhc2Vcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFRleHRSZW5kZXJcclxuICAgIHtcclxuXHJcbiAgICAgICAgaW50IGluZGV4ZXIgPSAwO1xyXG4gICAgICAgIGludCBsYiA9IDI7XHJcbiAgICAgICAgaW50IHggPSAxO1xyXG4gICAgICAgIExpc3Q8aW50PiBpbmRleGVzID0gbmV3IExpc3Q8aW50PigpO1xyXG4gICAgICAgIHB1YmxpYyBUZXh0RW50aXR5IFRleHRIb2xkZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBUYWdJbmZvSG9sZGVyIHRhZ0luZm87XHJcbiAgICAgICAgcHJpdmF0ZSBzdHJpbmcgdGV4dDtcclxuICAgICAgICBwdWJsaWMgVGV4dFdvcmxkIHRleHRXb3JsZDtcclxuICAgICAgICBwcml2YXRlIExpc3Q8aW50PiBsaW5lQnJlYWtzO1xyXG4gICAgICAgIHByaXZhdGUgaW50IGNoYXJJbmRleDtcclxuICAgICAgICBwcml2YXRlIGJvb2wgcGFzc2FnZURvbmU7XHJcbiAgICAgICAgZmxvYXQgdGltZU9mQ2hhciA9IDAuMDRmO1xyXG4gICAgICAgIGZsb2F0IHRpbWVCdWZmZXI7XHJcbiAgICAgICAgaW50IGJhY2tncm91bmRDb2xvckRlZmF1bHQgPSBEZWZhdWx0UGFsZXR0ZXMuQzRCbGFjaztcclxuICAgICAgICBpbnQgdGV4dENvbG9yRGVmYXVsdCA9IERlZmF1bHRQYWxldHRlcy5DNFdoaXRlO1xyXG5cclxuICAgICAgICBwdWJsaWMgVGFnVG9EYXRhPGludD4gVGFnVG9Db2xvciA9IG5ldyBUYWdUb0RhdGE8aW50PigpO1xyXG4gICAgICAgIHByaXZhdGUgYm9vbCBxdWlja1NraXA7XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIEZpbmlzaGVkIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTZXR1cChzdHJpbmcgdGV4dCwgaW50IHdpZHRoLCBpbnQgaGVpZ2h0LCBUYWdJbmZvSG9sZGVyIHRhZ0luZm8pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnRhZ0luZm8gPSB0YWdJbmZvO1xyXG4gICAgICAgICAgICB0aGlzLnRleHQgPSB0ZXh0O1xyXG4gICAgICAgICAgICB0ZXh0V29ybGQgPSBuZXcgVGV4dFdvcmxkKCk7XHJcbiAgICAgICAgICAgIGludCBidWZmZXJXaWR0aCA9IHdpZHRoO1xyXG4gICAgICAgICAgICBpbnQgYnVmZmVySGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgICAgICB0ZXh0V29ybGQuSW5pdChidWZmZXJXaWR0aCAtIDEsIGJ1ZmZlckhlaWdodCAtIDEpO1xyXG4gICAgICAgICAgICBUZXh0SG9sZGVyID0gdGV4dFdvcmxkLkdldEZyZWVFbnRpdHkoYnVmZmVyV2lkdGggLSA0LCBidWZmZXJIZWlnaHQgLSAyKTtcclxuICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShnb3QpO1xyXG4gICAgICAgICAgICAvL0NvbnNvbGUuUmVhZEtleSgpO1xyXG5cclxuICAgICAgICAgICAgI3JlZ2lvbiBtZXNzYWdlIHBhY2luZyBtYXJrZXJcclxuXHJcbiAgICAgICAgICAgIGluZGV4ZXMuQWRkKC0xKTtcclxuICAgICAgICAgICAgYm9vbCBvcGVuQXNwYXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgaW50IGxhc3RTdG9wID0gLTEwO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHRleHQuTGVuZ3RoIC0gMTsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaSAtIGxhc3RTdG9wIDwgMilcclxuICAgICAgICAgICAgICAgIC8vaWYoZmFsc2UpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgodGV4dFtpXSA9PSAnLicgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgKHRleHRbaSArIDFdICE9ICcuJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgdGV4dFtpICsgMV0gIT0gJ1wiJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgdGV4dFtpICsgMV0gIT0gJ1xcbidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIHRleHRbaSArIDFdICE9ICdcXHInKSkpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleGVzLkFkZChpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFN0b3AgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGV4dFtpXSA9PSAnXCInKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3BlbkFzcGFzID0gIW9wZW5Bc3BhcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFvcGVuQXNwYXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ZXMuQWRkKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFN0b3AgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZXh0W2ldID09ICdcXG4nKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXhlcy5BZGQoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTdG9wID0gaTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAgICAgI3JlZ2lvbiBsaW5lYnJlYWsgbWFya2VyXHJcbiAgICAgICAgICAgIGxpbmVCcmVha3MgPSBuZXcgTGlzdDxpbnQ+KCk7XHJcbiAgICAgICAgICAgIGludCB3aXNoZWRXaWR0aCA9IGJ1ZmZlcldpZHRoIC0gNDtcclxuICAgICAgICAgICAgaW50IHhQb3MgPSAwO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHRleHQuTGVuZ3RoIC0gMTsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB4UG9zKys7XHJcbiAgICAgICAgICAgICAgICBpZiAodGV4dFtpXSA9PSAnXFxuJylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB4UG9zID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0ZXh0W2ldID09ICcgJylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnQgeFBvc0F1eCA9IHhQb3MgKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSBpICsgMTsgaiA8IHRleHQuTGVuZ3RoOyBqKyspXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoeFBvc0F1eCA+PSB3aXNoZWRXaWR0aCAtIDIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lQnJlYWtzLkFkZChpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhQb3MgPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGV4dFtqXSAhPSAnICcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhQb3NBdXgrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGV4dFtqXSA9PSAnICcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlY2VpdmVJbnB1dCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAocGFzc2FnZURvbmUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHBhc3NhZ2VEb25lID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBxdWlja1NraXAgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVXBkYXRlKGZsb2F0IGRlbHRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGltZUJ1ZmZlciArPSBkZWx0YTtcclxuICAgICAgICAgICAgaWYgKHF1aWNrU2tpcClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGltZUJ1ZmZlciArPSAxMDA7XHJcbiAgICAgICAgICAgICAgICBxdWlja1NraXAgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB3aGlsZSAodGltZUJ1ZmZlciA+IHRpbWVPZkNoYXIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRpbWVCdWZmZXIgLT0gdGltZU9mQ2hhcjtcclxuICAgICAgICAgICAgICAgIFRyeURyYXdOZXh0Q2hhcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBUcnlEcmF3TmV4dENoYXIoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKCFwYXNzYWdlRG9uZSkgRHJhd05leHRDaGFyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBEcmF3TmV4dENoYXIoKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIGJvb2wgRHJhd0NoYXIgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXhlcy5Db3VudCA+IGluZGV4ZXIgKyAxKSB7XHJcbiAgICAgICAgICAgICAgICBEcmF3Q2hhciA9IGNoYXJJbmRleCA8IGluZGV4ZXNbaW5kZXhlciArIDFdICsgMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoRHJhd0NoYXIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHgrKztcclxuICAgICAgICAgICAgICAgIGlmIChjaGFySW5kZXggPj0gdGV4dC5MZW5ndGgpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgRmluaXNoZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNoYXIgdmFsdWUgPSB0ZXh0W2NoYXJJbmRleF07XHJcbiAgICAgICAgICAgICAgICBpZiAobGluZUJyZWFrcy5Db250YWlucyhjaGFySW5kZXgpKVxyXG4gICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsYisrO1xyXG4gICAgICAgICAgICAgICAgICAgIHggPSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGludCB0YWdOdW1iZXIgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGludCB0ZXh0Q29sb3IgPSB0ZXh0Q29sb3JEZWZhdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIFRhZ0luZm8gdGkgPSB0YWdJbmZvLkdldFRhZ09mSW5kZXgoY2hhckluZGV4LCB0YWdOdW1iZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICh0aSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW50IGNvbG9yID0gVGFnVG9Db2xvci5HZXREYXRhKHRpLCAtMTApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29sb3IgIT0gLTEwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0Q29sb3IgPSBjb2xvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWdOdW1iZXIrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGkgPSB0YWdJbmZvLkdldFRhZ09mSW5kZXgoY2hhckluZGV4LCB0YWdOdW1iZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBUZXh0SG9sZGVyLm9yaWdpbi5EcmF3Q2hhcih2YWx1ZSwgeCwgbGIsIHRleHRDb2xvciwgYmFja2dyb3VuZENvbG9yRGVmYXVsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dFdvcmxkLkRyYXcoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09ICdcXG4nKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGxiKys7XHJcbiAgICAgICAgICAgICAgICAgICAgbGIrKztcclxuICAgICAgICAgICAgICAgICAgICB4ID0gMTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjaGFySW5kZXgrKztcclxuICAgICAgICAgICAgICAgIHBhc3NhZ2VEb25lID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbmRleGVyKys7XHJcblxyXG4gICAgICAgICAgICAgICAgcGFzc2FnZURvbmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnM7XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLlRleHRSZW5kZXJpbmdcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFRleHRXb3JsZFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBQYWxldHRlIHBhbGV0dGUgPSBEZWZhdWx0UGFsZXR0ZXMuQzRLaXJvS2F6ZTtcclxuICAgICAgICBMaXN0PFRleHRFbnRpdHk+IGFjdGl2ZUFnZW50cyA9IG5ldyBMaXN0PFRleHRFbnRpdHk+KCk7XHJcbiAgICAgICAgTGlzdDxUZXh0RW50aXR5PiBmcmVlQm9hcmRzID0gbmV3IExpc3Q8VGV4dEVudGl0eT4oKTtcclxuICAgICAgICBMaXN0PFRleHRBbmltYXRpb24+IGFuaW1hdGlvbnMgPSBuZXcgTGlzdDxUZXh0QW5pbWF0aW9uPigpO1xyXG4gICAgICAgIHB1YmxpYyBUZXh0Qm9hcmQgbWFpbkJvYXJkO1xyXG4gICAgICAgIGludCBsYXRlc3RJZCA9IC0xO1xyXG5cclxuICAgICAgICBwdWJsaWMgVCBBZGRBbmltYXRpb248VD4oVCB0YSkgd2hlcmUgVCA6IFRleHRBbmltYXRpb25cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGFuaW1hdGlvbnMuQWRkKHRhKTtcclxuICAgICAgICAgICAgdGEuUmVnaXN0ZXJMaXN0cygpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBJbml0KGludCB3aWR0aCwgaW50IGhlaWdodClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1haW5Cb2FyZCA9IG5ldyBUZXh0Qm9hcmQod2lkdGgsIGhlaWdodCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhdygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtYWluQm9hcmQuUmVzZXQoKTtcclxuICAgICAgICAgICAgRHJhd0NoaWxkcmVuKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3Q2hpbGRyZW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBhY3RpdmVBZ2VudHMuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYWN0aXZlQWdlbnRzW2ldLlJlc2V0QW5pbWF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgYW5pbSBpbiBhbmltYXRpb25zKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGFuaW0uTW9kaWZ5KGFjdGl2ZUFnZW50c1tpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYWN0aXZlQWdlbnRzW2ldLmZyZWVJZklkbGUgJiYgIWFjdGl2ZUFnZW50c1tpXS5hbmltYXRpbmcpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZnJlZUJvYXJkcy5BZGQoYWN0aXZlQWdlbnRzW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICBhY3RpdmVBZ2VudHMuUmVtb3ZlKGFjdGl2ZUFnZW50c1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaS0tO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG1haW5Cb2FyZC5JbnNlcnQoYWN0aXZlQWdlbnRzW2ldLmFuaW1hdGlvbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dEVudGl0eSBHZXRGcmVlRW50aXR5KGludCB3LCBpbnQgaClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFRleHRFbnRpdHkgdGU7XHJcbiAgICAgICAgICAgIGlmIChmcmVlQm9hcmRzLkNvdW50ID4gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGUgPSBmcmVlQm9hcmRzW2ZyZWVCb2FyZHMuQ291bnQgLSAxXTtcclxuICAgICAgICAgICAgICAgIGZyZWVCb2FyZHMuUmVtb3ZlQXQoZnJlZUJvYXJkcy5Db3VudCAtIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGUgPSBuZXcgVGV4dEVudGl0eSgpO1xyXG4gICAgICAgICAgICAgICAgdGUuaWQgPSArK2xhdGVzdElkO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYWN0aXZlQWdlbnRzLkFkZCh0ZSk7XHJcbiAgICAgICAgICAgIHRlLmZyZWVJZklkbGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGUuU2V0U2l6ZSh3LCBoKTtcclxuICAgICAgICAgICAgdGUuUmVzZXRGdWxsKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0RW50aXR5IEdldFRlbXBFbnRpdHkoaW50IHcsIGludCBoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHRlID0gR2V0RnJlZUVudGl0eSh3LCBoKTtcclxuICAgICAgICAgICAgdGUuZnJlZUlmSWRsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybiB0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkdmFuY2VUaW1lKGZsb2F0IHYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgYW5pbSBpbiBhbmltYXRpb25zKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBhbmltLlVwZGF0ZSh2KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgSXNEb25lKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBhbmltIGluIGFuaW1hdGlvbnMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICghYW5pbS5Jc0RvbmUoKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgVGV4dEVudGl0eVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBpbnQgaWQ7XHJcbiAgICAgICAgcHVibGljIFRleHRCb2FyZCBvcmlnaW47XHJcbiAgICAgICAgcHVibGljIFRleHRCb2FyZCBhbmltYXRpb247XHJcbiAgICAgICAgcHVibGljIGJvb2wgZnJlZUlmSWRsZSA9IGZhbHNlO1xyXG4gICAgICAgIGludGVybmFsIGJvb2wgYW5pbWF0aW5nO1xyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dEFuaW1hdGlvbi5CYXNlRGF0YSBBbmltQmFzZShmbG9hdCBsZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFRleHRBbmltYXRpb24uQmFzZURhdGEobGVuZ3RoLCAwLCBpZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFJlc2V0QW5pbWF0aW9uKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGFuaW1hdGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBhbmltYXRpb24uU2V0KG9yaWdpbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFJlc2V0RnVsbCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBvcmlnaW4uUmVzZXRJbnZpc2libGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgU2V0U2l6ZShpbnQgdywgaW50IGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAob3JpZ2luID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG9yaWdpbiA9IG5ldyBUZXh0Qm9hcmQodywgaCk7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb24gPSBuZXcgVGV4dEJvYXJkKHcsIGgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9yaWdpbi5SZXNpemUodywgaCk7XHJcbiAgICAgICAgICAgIGFuaW1hdGlvbi5SZXNpemUodywgaCk7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGNsYXNzIFBvc2l0aW9uQW5pbWF0aW9uIDogVGV4dEFuaW1hdGlvbjxQb3NpdGlvbkFuaW1hdGlvbi5Qb3NpdGlvbkRhdGE+XHJcbiAgICB7XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIE1vZGlmeShUZXh0RW50aXR5IGVudGl0eSwgUG9zaXRpb25EYXRhIG1haW5EYXRhLCBmbG9hdCBwcm9ncmVzcywgZmxvYXQgbGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYmFzZS5Nb2RpZnkoZW50aXR5LCBtYWluRGF0YSwgcHJvZ3Jlc3MsIGxlbmd0aCk7XHJcbiAgICAgICAgICAgIFRleHRCb2FyZCB0YXJnZXQgPSBlbnRpdHkuYW5pbWF0aW9uO1xyXG4gICAgICAgICAgICBpZiAobWFpbkRhdGEucGVybWFuZW50KVxyXG4gICAgICAgICAgICAgICAgdGFyZ2V0ID0gZW50aXR5Lm9yaWdpbjtcclxuICAgICAgICAgICAgdGFyZ2V0LlBvc2l0aW9uID0gVmVjdG9yMkQuSW50ZXJwb2xhdGVSb3VuZGVkKG1haW5EYXRhLnN0YXJ0UG9zaXRpb24sIG1haW5EYXRhLmVuZFBvc2l0aW9uLCBwcm9ncmVzcyAvIGxlbmd0aCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cnVjdCBQb3NpdGlvbkRhdGFcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBib29sIHBlcm1hbmVudDtcclxuICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IFZlY3RvcjJEIHN0YXJ0UG9zaXRpb24sIGVuZFBvc2l0aW9uO1xyXG5cclxuICAgICAgICAgICAgcHVibGljIFBvc2l0aW9uRGF0YShWZWN0b3IyRCBzdGFydFBvc2l0aW9uLCBWZWN0b3IyRCBlbmRQb3NpdGlvbiwgYm9vbCBwZXJtID0gZmFsc2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRQb3NpdGlvbiA9IHN0YXJ0UG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVuZFBvc2l0aW9uID0gZW5kUG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBlcm1hbmVudCA9IHBlcm07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFic3RyYWN0IGNsYXNzIFRleHRBbmltYXRpb248VD4gOiBUZXh0QW5pbWF0aW9uXHJcbiAgICB7XHJcbiAgICAgICAgcHJvdGVjdGVkIExpc3Q8VD4gbWFpbkRhdGEgPSBuZXcgTGlzdDxUPigpO1xyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIFJlcXVlc3RSZWdpc3Rlckxpc3RzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuUmVnaXN0ZXJMaXN0KG1haW5EYXRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkZChCYXNlRGF0YSBiYXNlRGF0YSwgVCBtYWluRClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuQWRkKGJhc2VEYXRhKTtcclxuICAgICAgICAgICAgbWFpbkRhdGEuQWRkKG1haW5EKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIE1vZGlmeShUZXh0RW50aXR5IGVudGl0eSwgaW50IGluZGV4LCBmbG9hdCBwcm9ncmVzcywgZmxvYXQgbGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTW9kaWZ5KGVudGl0eSwgbWFpbkRhdGFbaW5kZXhdLCBwcm9ncmVzcywgbGVuZ3RoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIHZvaWQgTW9kaWZ5KFRleHRFbnRpdHkgZW50aXR5LCBUIG1haW5EYXRhLCBmbG9hdCBwcm9ncmVzcywgZmxvYXQgbGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vaW50ZXJuYWwgb3ZlcnJpZGUgdm9pZCBFeGVjdXRlKGludCBpbmRleCwgQmFzZURhdGEgYmFzZURhdGEpXHJcbiAgICAgICAgLy97XHJcbiAgICAgICAgLy8gICAgdGhpcy5FeGVjdXRlKG1haW5EYXRhW2luZGV4XSwgYmFzZURhdGEpO1xyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICAvL3B1YmxpYyBhYnN0cmFjdCB2b2lkIEV4ZWN1dGUoVCBtYWluRGF0YSwgQmFzZURhdGEgYmFzZURhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBjbGFzcyBUZXh0QW5pbWF0aW9uXHJcbiAgICB7XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJ1Y3QgQmFzZURhdGFcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBmbG9hdCBsZW5ndGg7XHJcbiAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBmbG9hdCBwcm9ncmVzcztcclxuICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGludCB0YXJnZXQ7XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgQmFzZURhdGEoZmxvYXQgbGVuZ3RoLCBmbG9hdCBwcm9ncmVzcywgaW50IHRhcmdldClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzID0gcHJvZ3Jlc3M7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBMaXN0PGZsb2F0PiBsZW5ndGggPSBuZXcgTGlzdDxmbG9hdD4oKTtcclxuICAgICAgICBMaXN0PGZsb2F0PiBwcm9ncmVzcyA9IG5ldyBMaXN0PGZsb2F0PigpO1xyXG4gICAgICAgIExpc3Q8aW50PiB0YXJnZXRzID0gbmV3IExpc3Q8aW50PigpO1xyXG4gICAgICAgIExpc3Q8SUxpc3Q+IGxpc3RzID0gbmV3IExpc3Q8SUxpc3Q+KCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlZ2lzdGVyTGlzdHMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGlzdHMuQWRkKGxlbmd0aCk7XHJcbiAgICAgICAgICAgIGxpc3RzLkFkZChwcm9ncmVzcyk7XHJcbiAgICAgICAgICAgIGxpc3RzLkFkZCh0YXJnZXRzKTtcclxuICAgICAgICAgICAgUmVxdWVzdFJlZ2lzdGVyTGlzdHMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBhYnN0cmFjdCB2b2lkIFJlcXVlc3RSZWdpc3Rlckxpc3RzKCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFVwZGF0ZShmbG9hdCBkZWx0YSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgcHJvZ3Jlc3MuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3NbaV0gKz0gZGVsdGE7XHJcbiAgICAgICAgICAgICAgICBpZiAocHJvZ3Jlc3NbaV0gPj0gbGVuZ3RoW2ldKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEVuZFRhc2soaSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9FeGVjdXRlKGksIG5ldyBCYXNlRGF0YShsZW5ndGhbaV0scHJvZ3Jlc3NbaV0sIHRhcmdldHNbaV0pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9pbnRlcm5hbCBhYnN0cmFjdCB2b2lkIEV4ZWN1dGUoaW50IGluZGV4LCBCYXNlRGF0YSBiYXNlRGF0YSk7XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgQWRkKEJhc2VEYXRhIGJkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHJvZ3Jlc3MuQWRkKGJkLnByb2dyZXNzKTtcclxuICAgICAgICAgICAgdGFyZ2V0cy5BZGQoYmQudGFyZ2V0KTtcclxuICAgICAgICAgICAgbGVuZ3RoLkFkZChiZC5sZW5ndGgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgSXNEb25lKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIGxpc3RzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5Db3VudCAhPSBwcm9ncmVzcy5Db3VudClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzdHJpbmcgcyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgcy5UcmltKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHByb2dyZXNzLkNvdW50ID09IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIEVuZFRhc2soaW50IGkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgbCBpbiBsaXN0cylcclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgIGwuUmVtb3ZlQXQoaSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgUmVnaXN0ZXJMaXN0KElMaXN0IG1haW5EYXRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGlzdHMuQWRkKG1haW5EYXRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgTW9kaWZ5KFRleHRFbnRpdHkgYSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgcHJvZ3Jlc3MuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGEuaWQgPT0gdGFyZ2V0c1tpXSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBNb2RpZnkoYSwgaSwgcHJvZ3Jlc3NbaV0sIGxlbmd0aFtpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYS5hbmltYXRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCB2b2lkIE1vZGlmeShUZXh0RW50aXR5IGVudGl0eSwgaW50IGluZGV4LCBmbG9hdCBwcm9ncmVzcywgZmxvYXQgbGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLlRleHRSZW5kZXJpbmdcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFBhbGV0dGVcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RyaW5nW10gSHRtbENvbG9ycztcclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBQYWxldHRlKHBhcmFtcyBzdHJpbmdbXSBjb2xvcnMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBIdG1sQ29sb3JzID0gY29sb3JzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgRGVmYXVsdFBhbGV0dGVzXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBQYWxldHRlIEM0S2lyb0themUgPSBuZXcgUGFsZXR0ZShcIiMzMzJjNTBcIiwgXCIjNDY4NzhmXCIsIFwiIzk0ZTM0NFwiLCBcIiNlMmYzZTRcIik7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBQYWxldHRlIEM0UmVhZGVyID0gbmV3IFBhbGV0dGUoXCIjMjYyNjI2XCIsIFwiIzhiOGNiYVwiLCBcIiM4YmJhOTFcIiwgXCIjNjQ5ZjhkXCIpO1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBpbnQgQzRCbGFjayA9IDA7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGludCBDNEJsYWNrTmV1dHJhbCA9IDE7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGludCBDNFdoaXRlTmV1dHJhbCA9IDI7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGludCBDNFdoaXRlID0gMztcclxuXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5UZXh0UmVuZGVyaW5nXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBUZXh0Qm9hcmRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgY29uc3QgY2hhciBOT0NIQU5HRUNIQVIgPSAoY2hhcikxO1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBjaGFyIElOVklTSUJMRUNIQVIgPSAoY2hhcikyO1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBpbnQgTk9DSEFOR0VDT0xPUiA9IC0yO1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBpbnQgSU5WSVNJQkxFQ09MT1IgPSAtMTtcclxuICAgICAgICBjaGFyWyxdIGNoYXJzO1xyXG4gICAgICAgIHB1YmxpYyBpbnRbLF0gVGV4dENvbG9yIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBpbnRbLF0gQmFja0NvbG9yIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgIC8vU3RyaW5nQnVpbGRlciBzdHJpbmdCdWlsZGVyID0gbmV3IFN0cmluZ0J1aWxkZXIoKTtcclxuICAgICAgICBpbnQgY3Vyc29yWCA9IDA7XHJcbiAgICAgICAgaW50IGN1cnNvclkgPSAwO1xyXG4gICAgICAgIHB1YmxpYyBWZWN0b3IyRCBQb3NpdGlvbiB7IGdldDsgc2V0OyB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dEJvYXJkKGludCB3aWR0aCwgaW50IGhlaWdodClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vU2V0TWF4U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICAgICAgUmVzaXplKHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd09uQ2VudGVyKHN0cmluZyBtZXNzYWdlLCBpbnQgY29sb3IsIGludCB4T2ZmID0gMCwgaW50IHlPZmYgPSAwLCBib29sIGFsaWduU3RyaW5nID0gdHJ1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCB4ID0gKFdpZHRoKSAvIDI7XHJcbiAgICAgICAgICAgIGlmIChhbGlnblN0cmluZykgeCAtPSBtZXNzYWdlLkxlbmd0aCAvIDI7XHJcbiAgICAgICAgICAgIGludCB5ID0gSGVpZ2h0IC8gMjtcclxuICAgICAgICAgICAgRHJhdyhtZXNzYWdlLCB4ICsgeE9mZiwgeSArIHlPZmYsIGNvbG9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBTZXRNYXhTaXplKGludCB3aWR0aCwgaW50IGhlaWdodClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNoYXJzID0gbmV3IGNoYXJbd2lkdGgsIGhlaWdodF07XHJcbiAgICAgICAgICAgIFRleHRDb2xvciA9IG5ldyBpbnRbd2lkdGgsIGhlaWdodF07XHJcbiAgICAgICAgICAgIEJhY2tDb2xvciA9IG5ldyBpbnRbd2lkdGgsIGhlaWdodF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZXNldCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWQoJyAnLCAwLCAwLCBXaWR0aCwgSGVpZ2h0LCAwLCAwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlc2V0SW52aXNpYmxlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIERyYXdSZXBlYXRlZChJTlZJU0lCTEVDSEFSLCAwLCAwLCBXaWR0aCwgSGVpZ2h0LCBJTlZJU0lCTEVDT0xPUiwgSU5WSVNJQkxFQ09MT1IpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgV2lkdGggeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEluc2VydChUZXh0Qm9hcmQgc2Vjb25kQm9hcmQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHNlY29uZEJvYXJkLldpZHRoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSAwOyBqIDwgc2Vjb25kQm9hcmQuSGVpZ2h0OyBqKyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW50IHggPSAoaW50KXNlY29uZEJvYXJkLlBvc2l0aW9uLlggKyBpO1xyXG4gICAgICAgICAgICAgICAgICAgIGludCB5ID0gKGludClzZWNvbmRCb2FyZC5Qb3NpdGlvbi5ZICsgajtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2Vjb25kQm9hcmQuY2hhcnNbaSwgal0gIT0gSU5WSVNJQkxFQ0hBUilcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhcnNbeCwgeV0gPSBzZWNvbmRCb2FyZC5jaGFyc1tpLCBqXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2Vjb25kQm9hcmQuVGV4dENvbG9yW2ksIGpdICE9IElOVklTSUJMRUNPTE9SKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBUZXh0Q29sb3JbeCwgeV0gPSBzZWNvbmRCb2FyZC5UZXh0Q29sb3JbaSwgal07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlY29uZEJvYXJkLkJhY2tDb2xvcltpLCBqXSAhPSBJTlZJU0lCTEVDT0xPUilcclxuICAgICAgICAgICAgICAgICAgICAgICAgQmFja0NvbG9yW3gsIHldID0gc2Vjb25kQm9hcmQuQmFja0NvbG9yW2ksIGpdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaW50IEhlaWdodCB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgaW50IEN1cnNvclhcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBjdXJzb3JYOyB9XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjdXJzb3JYID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGludCBDdXJzb3JZIHsgZ2V0IHsgcmV0dXJuIGN1cnNvclk7IH1cclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGN1cnNvclkgPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd09uZURpZ2l0KGludCBpLCBpbnQgeCwgaW50IHksIGludCBjb2xvciA9IE5PQ0hBTkdFQ09MT1IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjaGFyIGMgPSAoY2hhcikoaSArICcwJyk7XHJcbiAgICAgICAgICAgIERyYXdDaGFyKGMsIHgsIHksIGNvbG9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgU2V0KFRleHRCb2FyZCBvcmlnaW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlBvc2l0aW9uID0gb3JpZ2luLlBvc2l0aW9uO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IFdpZHRoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSAwOyBqIDwgSGVpZ2h0OyBqKyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFyc1tpLCBqXSA9IG9yaWdpbi5jaGFyc1tpLCBqXTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkJhY2tDb2xvcltpLCBqXSA9IG9yaWdpbi5CYWNrQ29sb3JbaSwgal07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5UZXh0Q29sb3JbaSwgal0gPSBvcmlnaW4uVGV4dENvbG9yW2ksIGpdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFJlc2l6ZShpbnQgdywgaW50IGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoY2hhcnMgPT0gbnVsbCB8fCB3ID4gY2hhcnMuR2V0TGVuZ3RoKDApIHx8IGggPiBjaGFycy5HZXRMZW5ndGgoMSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFNldE1heFNpemUodywgaCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgV2lkdGggPSB3O1xyXG4gICAgICAgICAgICBIZWlnaHQgPSBoO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjaGFyIENoYXJBdChpbnQgaSwgaW50IGopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gY2hhcnNbaSwgal07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTZXRDdXJzb3JBdChpbnQgeCwgaW50IHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjdXJzb3JYID0geDtcclxuICAgICAgICAgICAgY3Vyc29yWSA9IHk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3X0N1cnNvcihzdHJpbmcgdilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBjIGluIHYpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIERyYXdfQ3Vyc29yKGMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3X0N1cnNvcihzdHJpbmcgdiwgaW50IGNvbG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGMgaW4gdilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRHJhd19DdXJzb3IoYywgY29sb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3T25lRGlnaXRfQ3Vyc29yKGludCBpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRHJhd19DdXJzb3IoKGNoYXIpKGkgKyAnMCcpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdfQ3Vyc29yKGNoYXIgYylcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICBEcmF3Q2hhcihjLCBjdXJzb3JYLCBjdXJzb3JZKTtcclxuICAgICAgICAgICAgQWR2YW5jZUN1cnNvcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd19DdXJzb3IoY2hhciBjLCBpbnQgY29sb3IpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgRHJhd0NoYXIoYywgY3Vyc29yWCwgY3Vyc29yWSwgY29sb3IpO1xyXG4gICAgICAgICAgICBBZHZhbmNlQ3Vyc29yKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgQWR2YW5jZUN1cnNvcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjdXJzb3JYKys7XHJcbiAgICAgICAgICAgIGlmIChjdXJzb3JYID49IFdpZHRoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjdXJzb3JYID0gMDtcclxuICAgICAgICAgICAgICAgIGN1cnNvclkrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQ3Vyc29yTmV3TGluZShpbnQgeClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGN1cnNvclkrKztcclxuICAgICAgICAgICAgY3Vyc29yWCA9IHg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3Q2hhcihjaGFyIHYsIGludCB4LCBpbnQgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICh2ICE9IE5PQ0hBTkdFQ0hBUilcclxuICAgICAgICAgICAgICAgIGNoYXJzW3gsIHldID0gdjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdDaGFyKGNoYXIgdiwgaW50IHgsIGludCB5LCBpbnQgY29sb3IsIGludCBiYWNrQ29sb3IgPSBOT0NIQU5HRUNPTE9SKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIERyYXdDaGFyKHYsIHgsIHkpO1xyXG4gICAgICAgICAgICBTZXRDb2xvcihjb2xvciwgeCwgeSk7XHJcbiAgICAgICAgICAgIFNldEJhY2tDb2xvcihiYWNrQ29sb3IsIHgsIHkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBTZXRBbGwoY2hhciB0ZXh0LCBpbnQgdGV4dENvbG9yLCBpbnQgYmFja0NvbG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRHJhd1JlcGVhdGVkKHRleHQsIDAsIDAsIFdpZHRoLCBIZWlnaHQsIHRleHRDb2xvciwgYmFja0NvbG9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdXaXRoR3JpZChzdHJpbmcgdGV4dCwgaW50IHgsIGludCB5LCBpbnQgZ3JpZENvbG9yLCBpbnQgdGV4dENvbG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IHdpZHRoID0gdGV4dC5MZW5ndGg7XHJcbiAgICAgICAgICAgIERyYXdHcmlkKHgsIHksIHdpZHRoICsgMiwgMywgZ3JpZENvbG9yKTtcclxuICAgICAgICAgICAgRHJhdyh0ZXh0LCB4ICsgMSwgeSArIDEsIHRleHRDb2xvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3KHN0cmluZyB2LCBpbnQgeCwgaW50IHksIGludCBjb2xvciwgaW50IGJhY2tDb2xvciA9IE5PQ0hBTkdFQ09MT1IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHYuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIERyYXdDaGFyKHZbaV0sIHggKyBpLCB5LCBjb2xvciwgYmFja0NvbG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhdyhJRW51bWVyYWJsZTxjaGFyPiB2LCBpbnQgeCwgaW50IHksIGludCBjb2xvciwgaW50IGJhY2tDb2xvciA9IE5PQ0hBTkdFQ09MT1IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuQ291bnQ8Y2hhcj4odik7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRHJhd0NoYXIoU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5FbGVtZW50QXQ8Y2hhcj4odixpKSwgeCArIGksIHksIGNvbG9yLCBiYWNrQ29sb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3R3JpZChpbnQgeCwgaW50IHksIGludCB3aWR0aCwgaW50IGhlaWdodCwgaW50IGNvbG9yKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIERyYXdSZXBlYXRlZCgnfCcsIHgsIHksIDEsIGhlaWdodCwgY29sb3IpO1xyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWQoJ3wnLCB4ICsgd2lkdGggLSAxLCB5LCAxLCBoZWlnaHQsIGNvbG9yKTtcclxuICAgICAgICAgICAgRHJhd1JlcGVhdGVkKCctJywgeCwgeSwgd2lkdGgsIDEsIGNvbG9yKTtcclxuICAgICAgICAgICAgRHJhd1JlcGVhdGVkKCctJywgeCwgeSArIGhlaWdodCAtIDEsIHdpZHRoLCAxLCBjb2xvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3UmVwZWF0ZWQoY2hhciBjLCBpbnQgeCwgaW50IHksIGludCB3aWR0aCwgaW50IGhlaWdodCwgaW50IGNvbG9yLCBpbnQgYmFja0NvbG9yID0gTk9DSEFOR0VDT0xPUilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSB4OyBpIDwgeCArIHdpZHRoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSB5OyBqIDwgeSArIGhlaWdodDsgaisrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIERyYXdDaGFyKGMsIGksIGosIGNvbG9yKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgU2V0QmFja0NvbG9yKGJhY2tDb2xvciwgaSwgaik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNldENvbG9yKGludCBjb2xvciwgaW50IHgsIGludCB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGNvbG9yICE9IE5PQ0hBTkdFQ09MT1IpXHJcbiAgICAgICAgICAgICAgICBUZXh0Q29sb3JbeCwgeV0gPSBjb2xvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNldEJhY2tDb2xvcihpbnQgY29sb3IsIGludCB4LCBpbnQgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChjb2xvciAhPSBOT0NIQU5HRUNPTE9SKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBCYWNrQ29sb3JbeCwgeV0gPSBjb2xvcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhdyhzdHJpbmcgdiwgaW50IHgyLCBpbnQgeTIsIG9iamVjdCBpbnB1dClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd0dyaWQoaW50IHYxLCBpbnQgdjIsIGludCB2MywgaW50IHY0LCBvYmplY3QgYm9hcmQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgTm90SW1wbGVtZW50ZWRFeGNlcHRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuLy91c2luZyBTeXN0ZW0uRHJhd2luZztcclxudXNpbmcgU3lzdGVtLkdsb2JhbGl6YXRpb247XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLlRleHRSZW5kZXJpbmdcclxue1xyXG4gICAgW1NlcmlhbGl6YWJsZV1cclxuICAgIHB1YmxpYyBzdHJ1Y3QgVmVjdG9yMkQgOiBJRXF1YXRhYmxlPFZlY3RvcjJEPlxyXG4gICAge1xyXG4gICAgICAgICNyZWdpb24gUHJpdmF0ZSBGaWVsZHNcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yMkQgemVyb1ZlY3RvciA9IG5ldyBWZWN0b3IyRCgwZiwgMGYpO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFZlY3RvcjJEIHVuaXRWZWN0b3IgPSBuZXcgVmVjdG9yMkQoMWYsIDFmKTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBWZWN0b3IyRCB1bml0WFZlY3RvciA9IG5ldyBWZWN0b3IyRCgxZiwgMGYpO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFZlY3RvcjJEIHVuaXRZVmVjdG9yID0gbmV3IFZlY3RvcjJEKDBmLCAxZik7XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gUHJpdmF0ZSBGaWVsZHNcclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gUHVibGljIEZpZWxkc1xyXG5cclxuICAgICAgICBwdWJsaWMgZmxvYXQgWDtcclxuICAgICAgICBwdWJsaWMgZmxvYXQgWTtcclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQdWJsaWMgRmllbGRzXHJcblxyXG4gICAgICAgICNyZWdpb24gQ29uc3RhbnRzXHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQcm9wZXJ0aWVzXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgWmVyb1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIHplcm9WZWN0b3I7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgT25lXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gdW5pdFZlY3RvcjsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBVbml0WFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIHVuaXRYVmVjdG9yOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIFVuaXRZXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gdW5pdFlWZWN0b3I7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gUHJvcGVydGllc1xyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBDb25zdHJ1Y3RvcnNcclxuXHJcbiAgICAgICAgcHVibGljIFZlY3RvcjJEKGZsb2F0IHgsIGZsb2F0IHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlggPSB4O1xyXG4gICAgICAgICAgICB0aGlzLlkgPSB5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFZlY3RvcjJEKGZsb2F0IHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5YID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuWSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBJbnRlcnBvbGF0ZVJvdW5kZWQoVmVjdG9yMkQgc3RhcnRQb3NpdGlvbiwgVmVjdG9yMkQgZW5kUG9zaXRpb24sIGZsb2F0IHJhdGlvKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIChzdGFydFBvc2l0aW9uICogKDEgLSByYXRpbykgKyBlbmRQb3NpdGlvbiAqIHJhdGlvKS5Sb3VuZCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBWZWN0b3IyRCBSb3VuZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjJEKChmbG9hdClNYXRoLlJvdW5kKFgpLCAoZmxvYXQpTWF0aC5Sb3VuZChZKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIENvbnN0cnVjdG9yc1xyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQdWJsaWMgTWV0aG9kc1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIEFkZChWZWN0b3IyRCB2YWx1ZTEsIFZlY3RvcjJEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICs9IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSArPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBBZGQocmVmIFZlY3RvcjJEIHZhbHVlMSwgcmVmIFZlY3RvcjJEIHZhbHVlMiwgb3V0IFZlY3RvcjJEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUxLlggKyB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSArIHZhbHVlMi5ZO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZmxvYXQgRGlzdGFuY2UoVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCB2MSA9IHZhbHVlMS5YIC0gdmFsdWUyLlgsIHYyID0gdmFsdWUxLlkgLSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmV0dXJuIChmbG9hdClNYXRoLlNxcnQoKHYxICogdjEpICsgKHYyICogdjIpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBEaXN0YW5jZShyZWYgVmVjdG9yMkQgdmFsdWUxLCByZWYgVmVjdG9yMkQgdmFsdWUyLCBvdXQgZmxvYXQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgdjEgPSB2YWx1ZTEuWCAtIHZhbHVlMi5YLCB2MiA9IHZhbHVlMS5ZIC0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IChmbG9hdClNYXRoLlNxcnQoKHYxICogdjEpICsgKHYyICogdjIpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZmxvYXQgRGlzdGFuY2VTcXVhcmVkKFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgdjEgPSB2YWx1ZTEuWCAtIHZhbHVlMi5YLCB2MiA9IHZhbHVlMS5ZIC0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJldHVybiAodjEgKiB2MSkgKyAodjIgKiB2Mik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgRGlzdGFuY2VTcXVhcmVkKHJlZiBWZWN0b3IyRCB2YWx1ZTEsIHJlZiBWZWN0b3IyRCB2YWx1ZTIsIG91dCBmbG9hdCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCB2MSA9IHZhbHVlMS5YIC0gdmFsdWUyLlgsIHYyID0gdmFsdWUxLlkgLSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmVzdWx0ID0gKHYxICogdjEpICsgKHYyICogdjIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBEaXZpZGUoVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAvPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgLz0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgRGl2aWRlKHJlZiBWZWN0b3IyRCB2YWx1ZTEsIHJlZiBWZWN0b3IyRCB2YWx1ZTIsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YIC8gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgLyB2YWx1ZTIuWTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgRGl2aWRlKFZlY3RvcjJEIHZhbHVlMSwgZmxvYXQgZGl2aWRlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IGZhY3RvciA9IDEgLyBkaXZpZGVyO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAqPSBmYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICo9IGZhY3RvcjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBEaXZpZGUocmVmIFZlY3RvcjJEIHZhbHVlMSwgZmxvYXQgZGl2aWRlciwgb3V0IFZlY3RvcjJEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IGZhY3RvciA9IDEgLyBkaXZpZGVyO1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YICogZmFjdG9yO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZhbHVlMS5ZICogZmFjdG9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBmbG9hdCBEb3QoVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKHZhbHVlMS5YICogdmFsdWUyLlgpICsgKHZhbHVlMS5ZICogdmFsdWUyLlkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIERvdChyZWYgVmVjdG9yMkQgdmFsdWUxLCByZWYgVmVjdG9yMkQgdmFsdWUyLCBvdXQgZmxvYXQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gKHZhbHVlMS5YICogdmFsdWUyLlgpICsgKHZhbHVlMS5ZICogdmFsdWUyLlkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGJvb2wgRXF1YWxzKG9iamVjdCBvYmopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAob2JqIGlzIFZlY3RvcjJEKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gRXF1YWxzKChWZWN0b3IyRCl0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgRXF1YWxzKFZlY3RvcjJEIG90aGVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIChYID09IG90aGVyLlgpICYmIChZID09IG90aGVyLlkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBSZWZsZWN0KFZlY3RvcjJEIHZlY3RvciwgVmVjdG9yMkQgbm9ybWFsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVmVjdG9yMkQgcmVzdWx0O1xyXG4gICAgICAgICAgICBmbG9hdCB2YWwgPSAyLjBmICogKCh2ZWN0b3IuWCAqIG5vcm1hbC5YKSArICh2ZWN0b3IuWSAqIG5vcm1hbC5ZKSk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmVjdG9yLlggLSAobm9ybWFsLlggKiB2YWwpO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZlY3Rvci5ZIC0gKG5vcm1hbC5ZICogdmFsKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBSZWZsZWN0KHJlZiBWZWN0b3IyRCB2ZWN0b3IsIHJlZiBWZWN0b3IyRCBub3JtYWwsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCB2YWwgPSAyLjBmICogKCh2ZWN0b3IuWCAqIG5vcm1hbC5YKSArICh2ZWN0b3IuWSAqIG5vcm1hbC5ZKSk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmVjdG9yLlggLSAobm9ybWFsLlggKiB2YWwpO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZlY3Rvci5ZIC0gKG5vcm1hbC5ZICogdmFsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBpbnQgR2V0SGFzaENvZGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFguR2V0SGFzaENvZGUoKSArIFkuR2V0SGFzaENvZGUoKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgZmxvYXQgTGVuZ3RoKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoZmxvYXQpTWF0aC5TcXJ0KChYICogWCkgKyAoWSAqIFkpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBMZW5ndGhTcXVhcmVkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoWCAqIFgpICsgKFkgKiBZKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBNYXgoVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjJEKHZhbHVlMS5YID4gdmFsdWUyLlggPyB2YWx1ZTEuWCA6IHZhbHVlMi5YLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUxLlkgPiB2YWx1ZTIuWSA/IHZhbHVlMS5ZIDogdmFsdWUyLlkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1heChyZWYgVmVjdG9yMkQgdmFsdWUxLCByZWYgVmVjdG9yMkQgdmFsdWUyLCBvdXQgVmVjdG9yMkQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2YWx1ZTEuWCA+IHZhbHVlMi5YID8gdmFsdWUxLlggOiB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSA+IHZhbHVlMi5ZID8gdmFsdWUxLlkgOiB2YWx1ZTIuWTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgTWluKFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyRCh2YWx1ZTEuWCA8IHZhbHVlMi5YID8gdmFsdWUxLlggOiB2YWx1ZTIuWCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlMS5ZIDwgdmFsdWUyLlkgPyB2YWx1ZTEuWSA6IHZhbHVlMi5ZKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNaW4ocmVmIFZlY3RvcjJEIHZhbHVlMSwgcmVmIFZlY3RvcjJEIHZhbHVlMiwgb3V0IFZlY3RvcjJEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUxLlggPCB2YWx1ZTIuWCA/IHZhbHVlMS5YIDogdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgPCB2YWx1ZTIuWSA/IHZhbHVlMS5ZIDogdmFsdWUyLlk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIE11bHRpcGx5KFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggKj0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICo9IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBNdWx0aXBseShWZWN0b3IyRCB2YWx1ZTEsIGZsb2F0IHNjYWxlRmFjdG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICo9IHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE11bHRpcGx5KHJlZiBWZWN0b3IyRCB2YWx1ZTEsIGZsb2F0IHNjYWxlRmFjdG9yLCBvdXQgVmVjdG9yMkQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2YWx1ZTEuWCAqIHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZhbHVlMS5ZICogc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTXVsdGlwbHkocmVmIFZlY3RvcjJEIHZhbHVlMSwgcmVmIFZlY3RvcjJEIHZhbHVlMiwgb3V0IFZlY3RvcjJEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUxLlggKiB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSAqIHZhbHVlMi5ZO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBOZWdhdGUoVmVjdG9yMkQgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZS5YID0gLXZhbHVlLlg7XHJcbiAgICAgICAgICAgIHZhbHVlLlkgPSAtdmFsdWUuWTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE5lZ2F0ZShyZWYgVmVjdG9yMkQgdmFsdWUsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IC12YWx1ZS5YO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IC12YWx1ZS5ZO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgTm9ybWFsaXplKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IHZhbCA9IDEuMGYgLyAoZmxvYXQpTWF0aC5TcXJ0KChYICogWCkgKyAoWSAqIFkpKTtcclxuICAgICAgICAgICAgWCAqPSB2YWw7XHJcbiAgICAgICAgICAgIFkgKj0gdmFsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBOb3JtYWxpemUoVmVjdG9yMkQgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCB2YWwgPSAxLjBmIC8gKGZsb2F0KU1hdGguU3FydCgodmFsdWUuWCAqIHZhbHVlLlgpICsgKHZhbHVlLlkgKiB2YWx1ZS5ZKSk7XHJcbiAgICAgICAgICAgIHZhbHVlLlggKj0gdmFsO1xyXG4gICAgICAgICAgICB2YWx1ZS5ZICo9IHZhbDtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE5vcm1hbGl6ZShyZWYgVmVjdG9yMkQgdmFsdWUsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCB2YWwgPSAxLjBmIC8gKGZsb2F0KU1hdGguU3FydCgodmFsdWUuWCAqIHZhbHVlLlgpICsgKHZhbHVlLlkgKiB2YWx1ZS5ZKSk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUuWCAqIHZhbDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZS5ZICogdmFsO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIFN1YnRyYWN0KFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggLT0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZIC09IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIFN1YnRyYWN0KHJlZiBWZWN0b3IyRCB2YWx1ZTEsIHJlZiBWZWN0b3IyRCB2YWx1ZTIsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YIC0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgLSB2YWx1ZTIuWTtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVG9TdHJpbmcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ3VsdHVyZUluZm8gY3VycmVudEN1bHR1cmUgPSBDdWx0dXJlSW5mby5DdXJyZW50Q3VsdHVyZTtcclxuICAgICAgICAgICAgcmV0dXJuIHN0cmluZy5Gb3JtYXQoY3VycmVudEN1bHR1cmUsIFwie3tYOnswfSBZOnsxfX19XCIsIG5ldyBvYmplY3RbXSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlguVG9TdHJpbmcoY3VycmVudEN1bHR1cmUpLCB0aGlzLlkuVG9TdHJpbmcoY3VycmVudEN1bHR1cmUpIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQdWJsaWMgTWV0aG9kc1xyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBPcGVyYXRvcnNcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBvcGVyYXRvciAtKFZlY3RvcjJEIHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUuWCA9IC12YWx1ZS5YO1xyXG4gICAgICAgICAgICB2YWx1ZS5ZID0gLXZhbHVlLlk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJvb2wgb3BlcmF0b3IgPT0oVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxLlggPT0gdmFsdWUyLlggJiYgdmFsdWUxLlkgPT0gdmFsdWUyLlk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIG9wZXJhdG9yICE9KFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMS5YICE9IHZhbHVlMi5YIHx8IHZhbHVlMS5ZICE9IHZhbHVlMi5ZO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgb3BlcmF0b3IgKyhWZWN0b3IyRCB2YWx1ZTEsIFZlY3RvcjJEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICs9IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSArPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIG9wZXJhdG9yIC0oVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAtPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgLT0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBvcGVyYXRvciAqKFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggKj0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICo9IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgb3BlcmF0b3IgKihWZWN0b3IyRCB2YWx1ZSwgZmxvYXQgc2NhbGVGYWN0b3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZS5YICo9IHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICB2YWx1ZS5ZICo9IHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBvcGVyYXRvciAqKGZsb2F0IHNjYWxlRmFjdG9yLCBWZWN0b3IyRCB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlLlggKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlLlkgKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIG9wZXJhdG9yIC8oVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAvPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgLz0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBvcGVyYXRvciAvKFZlY3RvcjJEIHZhbHVlMSwgZmxvYXQgZGl2aWRlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IGZhY3RvciA9IDEgLyBkaXZpZGVyO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAqPSBmYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICo9IGZhY3RvcjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gT3BlcmF0b3JzXHJcbiAgICB9XHJcbn0iLCJ1c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgTm92ZWxBcHBcclxue1xyXG4gICAgcHVibGljIGFic3RyYWN0IGNsYXNzIFRleHRTY3JlZW5OIDogSVRleHRTY3JlZW5cclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIFRleHRXb3JsZCB0dztcclxuXHJcbiAgICAgICAgcHVibGljIGFic3RyYWN0IHZvaWQgVXBkYXRlKGZsb2F0IGYpO1xyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBJbml0KGludCB3LCBpbnQgaClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHR3ID0gbmV3IFRleHRXb3JsZCgpO1xyXG4gICAgICAgICAgICB0dy5Jbml0KHcsIGgpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0Qm9hcmQgR2V0Qm9hcmQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHR3Lm1haW5Cb2FyZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGludCBJbnB1dFVuaWNvZGUgeyBzZXQ7IHByb3RlY3RlZCBnZXQ7IH1cclxuICAgICAgICBwcm90ZWN0ZWQgaW50IElucHV0QXNOdW1iZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSW5wdXRVbmljb2RlIC0gNDg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGludGVyZmFjZSBJVGV4dFNjcmVlblxyXG4gICAge1xyXG4gICAgICAgIFRleHRCb2FyZCBHZXRCb2FyZCgpO1xyXG4gICAgICAgIGludCBJbnB1dFVuaWNvZGUgeyBzZXQ7IH1cclxuICAgICAgICB2b2lkIFVwZGF0ZShmbG9hdCBmKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgVGV4dFNjcmVlbkhvbGRlclxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBJVGV4dFNjcmVlbiBTY3JlZW4geyBnZXQ7IHNldDsgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5Ob3ZlbEJhc2U7XHJcbnVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBOb3ZlbEFwcFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgVGV4dFJlbmRlclRvU2NyZWVuIDogSVRleHRTY3JlZW5cclxuICAgIHtcclxuICAgICAgICBUZXh0UmVuZGVyIHRleHRSZW5kZXI7XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0UmVuZGVyVG9TY3JlZW4oVGV4dFJlbmRlciB0ZXh0UmVuZGVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy50ZXh0UmVuZGVyID0gdGV4dFJlbmRlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgSW5wdXRVbmljb2RlIHsgc2V0OyBnZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIFRleHRCb2FyZCBHZXRCb2FyZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGV4dFJlbmRlci50ZXh0V29ybGQubWFpbkJvYXJkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVXBkYXRlKGZsb2F0IGYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoSW5wdXRVbmljb2RlICE9IC0xKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0UmVuZGVyLlJlY2VpdmVJbnB1dCgpO1xyXG4gICAgICAgICAgICAgICAgSW5wdXRVbmljb2RlID0gLTE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGV4dFJlbmRlci5VcGRhdGUoZik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZztcclxuXHJcbm5hbWVzcGFjZSBOb3ZlbEFwcFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgR2VuZXJpY1RleHRNZW51IDogVGV4dFNjcmVlbk5cclxuICAgIHtcclxuXHJcbiAgICAgICAgTGlzdDxzdHJpbmc+IG9wdGlvbnMgPSBuZXcgTGlzdDxzdHJpbmc+KCk7XHJcbiAgICAgICAgcHVibGljIGludCBDaG9zZW5PcHRpb24geyBwcml2YXRlIHNldDsgZ2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIFVwZGF0ZShmbG9hdCBmKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKElucHV0VW5pY29kZSA+PSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChJbnB1dEFzTnVtYmVyID4gMCAmJiBJbnB1dEFzTnVtYmVyIDw9IG9wdGlvbnMuQ291bnQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZShJbnB1dEFzTnVtYmVyICsgXCJ4XCIpO1xyXG4gICAgICAgICAgICAgICAgQ2hvc2VuT3B0aW9uID0gSW5wdXRBc051bWJlci0xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBib2FyZCA9IEdldEJvYXJkKCk7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgb3B0aW9ucy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbnQgeCA9IDA7XHJcbiAgICAgICAgICAgICAgICBpbnQgeSA9IGk7XHJcbiAgICAgICAgICAgICAgICBib2FyZC5EcmF3Q2hhcigoY2hhcikoJzEnK2kpLCB4LCB5LCAzKTtcclxuICAgICAgICAgICAgICAgIGJvYXJkLkRyYXdDaGFyKChjaGFyKSgnLScpLCB4KzIsIHksIDMpO1xyXG4gICAgICAgICAgICAgICAgYm9hcmQuRHJhdyhvcHRpb25zW2ldLCB4KzQsIHksIDMpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgUmVzZXQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ2hvc2VuT3B0aW9uID0gLTEwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBBZGRPcHRpb25zKHBhcmFtcyBzdHJpbmdbXSBhcmdzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5BZGRSYW5nZShhcmdzKTtcclxuICAgICAgICB9XHJcblxuICAgIFxucHJpdmF0ZSBpbnQgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX0Nob3Nlbk9wdGlvbj0tMTt9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5UZXh0UmVuZGVyaW5nXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBCbGlua0FuaW0gOiBUZXh0QW5pbWF0aW9uPEJsaW5rQW5pbS5CbGlua0RhdGE+XHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgTW9kaWZ5KFRleHRFbnRpdHkgZW50aXR5LCBCbGlua0RhdGEgbWFpbkRhdGEsIGZsb2F0IHByb2dyZXNzLCBmbG9hdCBsZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLk1vZGlmeShlbnRpdHksIG1haW5EYXRhLCBwcm9ncmVzcywgbGVuZ3RoKTtcclxuICAgICAgICAgICAgZmxvYXQgYXV4ID0gcHJvZ3Jlc3M7XHJcbiAgICAgICAgICAgIGJvb2wgYmxpbmsgPSB0cnVlO1xyXG4gICAgICAgICAgICB3aGlsZSAodHJ1ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGJsaW5rKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGF1eCAtPSBtYWluRGF0YS5ibGlua0FjdGl2ZVRpbWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXV4IC09IG1haW5EYXRhLmJsaW5rSW5hY3RpdmU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYXV4IDwgMClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBibGluayA9ICFibGluaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWJsaW5rKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBlbnRpdHkuYW5pbWF0aW9uLlNldEFsbChtYWluRGF0YS50ZXh0LCBtYWluRGF0YS50ZXh0Q29sb3IsIG1haW5EYXRhLmJhY2tDb2xvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RydWN0IEJsaW5rRGF0YVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGNoYXIgdGV4dDtcclxuICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGludCBiYWNrQ29sb3IsIHRleHRDb2xvcjtcclxuICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGZsb2F0IGJsaW5rQWN0aXZlVGltZTtcclxuICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGZsb2F0IGJsaW5rSW5hY3RpdmU7XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgQmxpbmtEYXRhKGNoYXIgdGV4dCwgaW50IGJhY2tDb2xvciwgaW50IHRleHRDb2xvciwgZmxvYXQgYmxpbmtBY3RpdmVUaW1lLCBmbG9hdCBibGlua0luYWN0aXZlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHQgPSB0ZXh0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iYWNrQ29sb3IgPSBiYWNrQ29sb3I7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHRDb2xvciA9IHRleHRDb2xvcjtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmxpbmtBY3RpdmVUaW1lID0gYmxpbmtBY3RpdmVUaW1lO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ibGlua0luYWN0aXZlID0gYmxpbmtJbmFjdGl2ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHVibGljIHN0YXRpYyBCbGlua0RhdGEgQmFja0NvbG9yKGludCBiYWNrQ29sb3IsIGZsb2F0IGJsaW5rRHVyYXRpb24pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQmxpbmtEYXRhKFRleHRCb2FyZC5OT0NIQU5HRUNIQVIsIGJhY2tDb2xvciwgVGV4dEJvYXJkLk5PQ0hBTkdFQ09MT1IsIGJsaW5rRHVyYXRpb24sIGJsaW5rRHVyYXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgc3RhdGljIEJsaW5rRGF0YSBDaGFyKGNoYXIgYywgZmxvYXQgYmxpbmtEdXJhdGlvbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBCbGlua0RhdGEoYywgVGV4dEJvYXJkLk5PQ0hBTkdFQ09MT1IsIFRleHRCb2FyZC5OT0NIQU5HRUNPTE9SLCBibGlua0R1cmF0aW9uLCBibGlua0R1cmF0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJuYW1lc3BhY2UgUGlkcm9oLlRleHRSZW5kZXJpbmdcclxue1xyXG4gICAgcHVibGljIGNsYXNzIENoYXJCeUNoYXJBbmltYXRpb24gOiBUZXh0QW5pbWF0aW9uPENoYXJCeUNoYXJBbmltYXRpb24uQ2hhckJ5Q2hhckRhdGE+XHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgTW9kaWZ5KFRleHRFbnRpdHkgZW50aXR5LCBDaGFyQnlDaGFyRGF0YSBtYWluRGF0YSwgZmxvYXQgcHJvZ3Jlc3MsIGZsb2F0IGxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuTW9kaWZ5KGVudGl0eSwgbWFpbkRhdGEsIHByb2dyZXNzLCBsZW5ndGgpO1xyXG4gICAgICAgICAgICBmbG9hdCByYXRpbyA9IHByb2dyZXNzIC8gbGVuZ3RoO1xyXG4gICAgICAgICAgICBmbG9hdCBsZW5ndGhUZXh0ID0gbWFpbkRhdGEuY2hhckVuZCAtIG1haW5EYXRhLmNoYXJTdGFydDtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IG1haW5EYXRhLmNoYXJTdGFydDsgaSA8IG1haW5EYXRhLmNoYXJFbmQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW50IG9mZnNldGVkID0gaTtcclxuICAgICAgICAgICAgICAgIGludCBsaW5lID0gMDtcclxuICAgICAgICAgICAgICAgIHZhciB0YiA9IGVudGl0eS5hbmltYXRpb247XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAob2Zmc2V0ZWQgPj0gdGIuV2lkdGgpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZSsrO1xyXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldGVkIC09IHRiLldpZHRoO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGkgPiAoKGxlbmd0aFRleHQgKiByYXRpbykgKyBtYWluRGF0YS5jaGFyU3RhcnQpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRiLkRyYXdDaGFyKCcgJywgb2Zmc2V0ZWQsIGxpbmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGIuRHJhdyhcIlwiICsgaSwgNiwgNSwgMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIGNsYXNzIENoYXJCeUNoYXJEYXRhXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBpbnQgY2hhclN0YXJ0O1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBpbnQgY2hhckVuZDtcclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBDaGFyQnlDaGFyRGF0YShpbnQgY2hhclN0YXJ0LCBpbnQgY2hhckVuZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFyU3RhcnQgPSBjaGFyU3RhcnQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYXJFbmQgPSBjaGFyRW5kO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdCn0K

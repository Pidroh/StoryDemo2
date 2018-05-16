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
            $.ajax({ mimeType: "mimeType: 'text/plain; charset=x-user-defined'", url: "shared/story.txt", success: function (data, str, jqxhr) {
                //Console.Write(data.ToString());
                var game = new NovelApp.DialogNarrationGame_PermaDeath();
                game.SetScript(Bridge.toString(data));
                new BridgeBuild.AppTextGame(game).Start(40, 14);
            }, error: function (d1, d2, d3) {
                var game = new NovelApp.DialogNarrationGame_PermaDeath();
                game.SetScript(NovelApp.Stories.story5);
                new BridgeBuild.AppTextGame(game).Start(40, 14);
            } });




            //new AppTextGame(new DialogNarratoinScreenTestGame()).Start(40, 14);
            //new AppTextGame(new DialogNarratoinControlTestGame()).Start(40, 14);

            //new AppTextGame(new TextRenderTests()).Start(40, 14);
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
                        //screen.InputUnicode = buffer;

                        BridgeBuild.App.bufferOn = false;
                    } else {
                        //screen.InputUnicode = -1;

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
            bufferMouse: false,
            game: null,
            TextBoard: null,
            colors: null,
            lastUpdate: 0
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

                this.bufferMouse = false;
                document.onkeypress = Bridge.fn.combine(document.onkeypress, Bridge.fn.bind(this, function (a) {

                    var code = a.keyCode;
                    if (code === 0) {
                        code = a.charCode;
                    }
                    this.buffer = code;
                    this.bufferOn = true;
                }));

                document.onmousedown = Bridge.fn.combine(document.onmousedown, Bridge.fn.bind(this, function (a) {
                    this.bufferMouse = true;
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
                var now = Date.now();
                var dt = now - this.lastUpdate;
                this.lastUpdate = now;


                var delta = dt / 1000.0;
                //delta *= 200;


                var screen = this.game.NovelApp$ITextGame$ScreenHolder.Screen;
                this.colors = this.game.NovelApp$ITextGame$GetPalette().HtmlColors;

                this.game.NovelApp$ITextGame$Update(delta);
                this.TextBoard = screen.NovelApp$ITextScreen$GetBoard();
                screen.NovelApp$ITextScreen$Update(delta);
                //gr.Draw(0.033f);

                //screen.Update(delta);
                if (this.bufferOn) {
                    this.game.NovelApp$ITextGame$ScreenHolder.Key.NovelApp$IKeyboardInput$InputUnicode = this.buffer;

                    this.bufferOn = false;
                } else {
                    this.game.NovelApp$ITextGame$ScreenHolder.Key.NovelApp$IKeyboardInput$InputUnicode = -1;

                }
                if (this.bufferMouse) {
                    if (this.game.NovelApp$ITextGame$ScreenHolder.Mouse != null) {
                        this.game.NovelApp$ITextGame$ScreenHolder.Mouse.NovelApp$IMouseInput$MouseEvent(NovelApp.MouseEvents.MouseDown, -1, -1);
                    }
                    this.bufferMouse = false;
                } else {
                    if (this.game.NovelApp$ITextGame$ScreenHolder.Mouse != null) {
                        this.game.NovelApp$ITextGame$ScreenHolder.Mouse.NovelApp$IMouseInput$MouseEvent(NovelApp.MouseEvents.None, -1, -1);
                    }
                    //Console.Write("Mouse NONE");
                }
                clear();
                this.DrawTextBoard();

                window.setTimeout(Bridge.fn.cacheBind(this, this.UpdateGame), 0);
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

    Bridge.define("NovelApp.ITextGame", {
        $kind: "interface"
    });

    Bridge.define("NovelApp.IKeyboardInput", {
        $kind: "interface"
    });

    Bridge.define("NovelApp.IMouseInput", {
        $kind: "interface"
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
                if (tag.LabelIs(112, 98)) {
                    this.screen.ForcePageBreak();
                    this.tagIndex = (this.tagIndex + 1) | 0;
                    this.ShowNext();
                    return;
                }
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
                if (this.screen.InputUnicode >= 0 || this.screen.Mouse === NovelApp.MouseEvents.MouseDown) {
                    this.ShowNext();
                }
            }
        }
    });

    Bridge.define("NovelApp.MouseEvents", {
        $kind: "enum",
        statics: {
            fields: {
                MouseDown: 0,
                None: 1
            }
        }
    });

    Bridge.define("NovelApp.ScriptTextToTaggedTagText", {
        methods: {
            Process: function (script, replaces, defaultTag) {
                var $t;
                var indexStart = System.String.indexOf(script, "START:");
                if (indexStart >= 0) {
                    script = script.substr(((indexStart + 6) | 0));
                }
                var sb = new System.Text.StringBuilder(script);

                //sb.Replace("\"", "B");
                sb.replace("\r", "");
                sb.replace(" \n", "\n");
                $t = Bridge.getEnumerator(replaces);
                try {
                    while ($t.moveNext()) {
                        var r = $t.Current;
                        sb.replace(r.key, r.value);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }//for (int i = 0; i < ToReplaceOriginal.Length; i++)
                //{
                //    sb.Replace(ToReplaceOriginal[i], ToReplaceNew[i]);
                //    //script = script.Replace(ToReplaceOriginal[i], ToReplaceNew[i]);
                //}
                for (var i = -1; i < ((sb.getLength() - 1) | 0); i = (i + 1) | 0) {
                    if ((i === -1 || sb.getChar(i) === 10) && sb.getChar(((i + 1) | 0)) !== 35 && sb.getChar(((i + 1) | 0)) !== 10) {
                        sb.insert(((i + 1) | 0), defaultTag);
                    }
                }
                return sb.toString();
            }
        }
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

                            if ((text.charCodeAt(i) === 46 && (text.charCodeAt(((i + 1) | 0)) !== 46 && text.charCodeAt(((i + 1) | 0)) !== 10 && text.charCodeAt(((i + 1) | 0)) !== 13))) {
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
            Screen: null,
            Mouse: null,
            Key: null
        },
        methods: {
            SetAll: function (dns) {
                this.Screen = Bridge.as(dns, NovelApp.ITextScreen);
                this.Mouse = Bridge.as(dns, NovelApp.IMouseInput);
                this.Key = Bridge.as(dns, NovelApp.IKeyboardInput);
            }
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
            LabelIs: function (v1, v2) {
                return this.Tag[System.Array.index(0, this.Tag)] === v1 && this.Tag[System.Array.index(1, this.Tag)] === v2;
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

    Bridge.define("NovelApp.DialogNarrationGame_PermaDeath", {
        inherits: [NovelApp.ITextGame],
        fields: {
            dnsc: null,
            ScreenHolder: null,
            text: null,
            speakerToTag: null
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
                this.speakerToTag = function (_o1) {
                        _o1.add(112, "Sara");
                        _o1.add(109, "Mom");
                        _o1.add(100, "Dad");
                        _o1.add(68, "Death 34");
                        _o1.add(114, "Red Merlin");
                        return _o1;
                    }(new (System.Collections.Generic.Dictionary$2(System.Char,System.String))());
            }
        },
        methods: {
            SetScript: function (script) {
                var $t;
                var replaces = new (System.Collections.Generic.Dictionary$2(System.String,System.String))();
                $t = Bridge.getEnumerator(this.speakerToTag);
                try {
                    while ($t.moveNext()) {
                        var item = $t.Current;
                        replaces.add((item.value || "") + ": ", "#c" + String.fromCharCode(item.key));
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                this.text = new NovelApp.ScriptTextToTaggedTagText().Process(script, replaces, "#nn");
                this.text = "#nnPress any key or click with your mouse to advance\n#pb" + (this.text || "");
                this.text = (this.text || "") + (("\n#pb\n#nnThis story is incomplete.\n\n#nnIf you wanna read the rest when it's done,\n#nnFollow me on Twitter -  @mabiremps\n#nnAbove all, thank you for playing!\n") || "");
                //Console.Write(text);
                //Console.ReadKey();
            },
            GetPalette: function () {
                return Pidroh.TextRendering.DefaultPalettes.C4Novel;
            },
            Init: function (w, h) {
                var $t;
                var dns = new NovelApp.DialogNarrationScreen();
                dns.Init(w, h);
                this.ScreenHolder.SetAll(dns);

                this.dnsc = new NovelApp.DialogNarrationScreenControl(dns);
                this.dnsc.SetText(this.text);
                //            dnsc.SetText(@"#cmWelcome back, dear.
                //#cmHow was school today?
                //#nnWhy won't this work?
                //s");
                $t = Bridge.getEnumerator(this.speakerToTag);
                try {
                    while ($t.moveNext()) {
                        var item = $t.Current;
                        //replaces.Add(item.Value + ": ", "#c" + item.Key);
                        this.dnsc.SpeakerData.add(item.key, item.value);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                //dnsc.SpeakerData.Add('p', "Sara");
                this.dnsc.ShowNext();
            },
            Update: function (delta) {
                this.dnsc.TryAdvance();
            }
        }
    });

    Bridge.define("NovelApp.DialogNarrationScreen", {
        inherits: [NovelApp.ITextScreen,NovelApp.IMouseInput,NovelApp.IKeyboardInput],
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
            InputUnicode: 0,
            Mouse: 0
        },
        alias: [
            "InputUnicode", "NovelApp$IKeyboardInput$InputUnicode",
            "GetBoard", "NovelApp$ITextScreen$GetBoard",
            "Update", "NovelApp$ITextScreen$Update",
            "MouseEvent", "NovelApp$IMouseInput$MouseEvent"
        ],
        ctors: {
            init: function () {
                this.InputUnicode = -1;
                this.Mouse = NovelApp.MouseEvents.None;
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
                    this.ForcePageBreak();

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
                this.charByCharAnim.Add$1(this.narrationE.AnimBase((((end - start) | 0)) * 0.005), new Pidroh.TextRendering.CharByCharAnimation.CharByCharData(cursorR.StartIndex, cursorR.EndIndex));
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

            },
            MouseEvent: function (eventType, v1, v2) {
                this.Mouse = eventType;
            },
            ForcePageBreak: function () {
                this.narrationE.ResetFull();
                this.narrationE.Origin.SetCursorAt(0, 0);
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
                this.ScreenHolder.SetAll(dns);

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
                this.ScreenHolder.SetAll(dns);
                dns.AddNarration("dasdsaddddddddddddddddd  dasdsad       dsads");
                dns.AddDialog("Mom", "What?");
                System.Console.Write("sss");
            },
            Update: function (delta) {

            }
        }
    });

    Bridge.define("NovelApp.TextScreenN", {
        inherits: [NovelApp.ITextScreen,NovelApp.IMouseInput,NovelApp.IKeyboardInput],
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
            "MouseEvent", "NovelApp$IMouseInput$MouseEvent",
            "InputUnicode", "NovelApp$IKeyboardInput$InputUnicode"
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
            },
            MouseEvent: function (mouseDown, v1, v2) {

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
                        this.ScreenHolder.SetAll(this.menu);
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
                    this.ScreenHolder.SetAll(this.textScreen);
                }
                if (Bridge.referenceEquals(this.ScreenHolder.Screen, this.textScreen) && this.TextRender.Finished) {
                    this.ScreenHolder.SetAll(this.menu);
                    this.menu.Reset();
                }

            },
            DialogNarration: function (narrationOnly) {
                this.dns = new NovelApp.DialogNarrationScreen();
                this.dns.Init(this.w, this.h);
                this.ScreenHolder.SetAll(this.dns);

                this.dnsc = new NovelApp.DialogNarrationScreenControl(this.dns);

                this.dnsc.NarrationOnly = narrationOnly;
                //            dnsc.SetText(@"#cmWelcome back, dear.
                //#cmHow was school today?
                //#nnWhy won't this work?
                //s");
                var instruc = "#nnUse your mouse or type a key to proceed\n#pb\n";
                this.dnsc.SetText((instruc || "") + (NovelApp.Stories.story5 || ""));
                //dnsc.SetText(instruc);
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
                this.ScreenHolder.SetAll(this.menu);


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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJCcmlkZ2VCdWlsZC5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiQXBwLmNzIiwiQXBwVGV4dEdhbWUuY3MiLCIuLi9Ob3ZlbEFwcC9EaWFsb2dOYXJyYXRpb25TY3JlZW4uY3MiLCIuLi9Ob3ZlbEFwcC9TY3JpcHRUZXh0VG9UYWdnZWRUZXh0LmNzIiwiLi4vTm92ZWxBcHAvU3RyaW5nVG9QYXNzYWdlLmNzIiwiLi4vTm92ZWxBcHAvSVRleHRTY3JlZW5OLmNzIiwiLi4vTm92ZWxCYXNlL1RleHRUYWdSZWFkZXIuY3MiLCIuLi9Ob3ZlbEJhc2UvVGFnVG9EYXRhLmNzIiwiLi4vTm92ZWxCYXNlL1Rlc3RTdG9yaWVzLmNzIiwiLi4vTm92ZWxCYXNlL1RleHRSZW5kZXIuY3MiLCIuLi9Ob3ZlbEJhc2UvVGV4dFJlbmRlckR5bmFtaWMuY3MiLCIuLi8uLi8uLi8uLi9UdXJuQmFzZWQvVmlzdWFsU3R1ZGlvU29sdXRpb24vVGV4dFJlbmRlcmluZ0xvZ2ljL1RleHRXb3JsZC5jcyIsIi4uLy4uLy4uLy4uL1R1cm5CYXNlZC9WaXN1YWxTdHVkaW9Tb2x1dGlvbi9UZXh0UmVuZGVyaW5nTG9naWMvUGFsZXR0ZS5jcyIsIi4uLy4uLy4uLy4uL1R1cm5CYXNlZC9WaXN1YWxTdHVkaW9Tb2x1dGlvbi9UZXh0UmVuZGVyaW5nTG9naWMvVGV4dEJvYXJkLmNzIiwiLi4vLi4vLi4vLi4vVHVybkJhc2VkL1Zpc3VhbFN0dWRpb1NvbHV0aW9uL0Jhc2VVdGlscy9WZWN0b3IyRC5jcyIsIi4uL05vdmVsQXBwL1RleHRSZW5kZXJUZXN0cy5jcyIsIi4uL05vdmVsQXBwL1RleHRSZW5kZXJUb1NjcmVlbi5jcyIsIi4uL05vdmVsQXBwL0dlbmVyaWNUZXh0TWVudS5jcyIsIi4uLy4uLy4uLy4uL1R1cm5CYXNlZC9WaXN1YWxTdHVkaW9Tb2x1dGlvbi9UZXh0UmVuZGVyaW5nTG9naWMvQmxpbmtBbmltYXRpb24uY3MiLCIuLi8uLi8uLi8uLi9UdXJuQmFzZWQvVmlzdWFsU3R1ZGlvU29sdXRpb24vVGV4dFJlbmRlcmluZ0xvZ2ljL0NoYXJCeUNoYXJBbmltYXRpb24uY3MiXSwKICAibmFtZXMiOiBbIiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7O1lBMEJZQTtZQUNBQTtZQUNBQSxPQUFZQSxnR0FJRUEsVUFBVUEsTUFBYUEsS0FBWUE7O2dCQUV6Q0EsV0FBc0NBLElBQUlBO2dCQUMxQ0EsZUFBZUE7Z0JBQ2ZBLElBQUlBLHdCQUFZQTtzQkFFWkEsVUFBU0EsSUFBVUEsSUFBV0E7Z0JBQ2xDQSxXQUFzQ0EsSUFBSUE7Z0JBQzFDQSxlQUFlQTtnQkFDZkEsSUFBSUEsd0JBQVlBOzs7Ozs7Ozs7O1lBV3hCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQWtEQUEsYUFBYUE7O29CQUViQTtvQkFDQUEsaUNBQWlCQTtvQkFDakJBLDRCQUFZQTtvQkFDWkEsbUNBQWNBOzs7O29CQUlkQSxJQUFJQTs7O3dCQUlBQTs7Ozs7b0JBT0pBO29CQUNBQTs7b0JBRUFBLGtCQUFrQkEsQUFBdUJBOzs7b0JBS3pDQSxLQUFLQSxXQUFXQSxJQUFJQSxrQ0FBa0JBO3dCQUVsQ0EsS0FBS0EsV0FBV0EsSUFBSUEsaUNBQWlCQTs7NEJBR2pDQSxTQUFTQSx5Q0FBb0JBLEdBQUdBOzRCQUNoQ0EsU0FBU0EseUNBQW9CQSxHQUFHQTs0QkFDaENBLElBQUlBO2dDQUFRQTs7NEJBQ1pBLElBQUlBO2dDQUFRQTs7NEJBQ1pBLGFBQWdCQSwwQ0FBT0EsSUFBUEE7OzRCQUVoQkEsZ0JBQW1CQSwwQ0FBT0EsSUFBUEE7NEJBQ25CQSxLQUFvQkEsR0FBR0EsR0FBR0EsUUFBUUEsV0FBV0EseUJBQUtBLGlDQUFpQkEsR0FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzRCQ3ZIL0RBOztnQkFFZkEsWUFBWUE7Ozs7NkJBR0VBLEdBQU9BOzs7Z0JBSXJCQSxrQ0FBVUEsR0FBR0E7OztnQkFHYkEsZUFBOEJBLEdBQUdBOzs7Ozs7Ozs7Ozs7Z0JBWWpDQSxZQUFZ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QkFFQUEsT0FBT0E7O3dCQUlQQSxPQUFPQTs7b0JBRVhBLElBQUlBO3dCQUVBQTs7d0JBSUFBLFFBQVFBLENBQUNBOzs7Z0JBR2pCQSxJQUFJQSxDQUFDQTtvQkFFREEsd0JBQXdCQSxlQUFlQSxvQkFBb0JBOzs7Ozs7Ozs7Z0NDL0J2Q0EsUUFBbUJBLFVBQXlCQSxVQUFnQkE7Z0JBRXBGQSw0SEFBWUEsUUFBUUEsVUFBVUEsVUFBVUE7Z0JBQ3hDQSxZQUFjQSxXQUFXQTtnQkFDekJBLGlCQUFtQkEsb0JBQW1CQTtnQkFDdENBLEtBQUtBLFFBQVFBLG9CQUFvQkEsSUFBSUEsa0JBQWtCQTtvQkFFbkRBLGVBQWVBO29CQUNmQTtvQkFDQUEsU0FBU0E7b0JBQ1RBLE9BQU9BLFlBQVlBO3dCQUVmQTt3QkFDQUEsdUJBQVlBOztvQkFFaEJBLElBQUlBLElBQUlBLENBQUNBLENBQUNBLGFBQWFBLFNBQVNBO3dCQUU1QkEsZ0JBQWlCQSxVQUFVQTs7Ozs7Ozs7Ozs7O2dDUnFJWEEsUUFBbUJBLFVBQXVCQSxVQUFnQkE7Z0JBRWxGQSx3SEFBWUEsUUFBUUEsVUFBVUEsVUFBVUE7Z0JBQ3hDQSxhQUFtQkE7Z0JBQ25CQSxJQUFJQTtvQkFDQUEsU0FBU0E7O2dCQUNiQSxrQkFBa0JBLGlEQUE0QkEsaUNBQXdCQSwrQkFBc0JBLFdBQVdBIiwKICAic291cmNlc0NvbnRlbnQiOiBbInVzaW5nIEJyaWRnZTtcclxudXNpbmcgQnJpZGdlLkh0bWw1O1xyXG51c2luZyBCcmlkZ2UualF1ZXJ5MjtcclxudXNpbmcgTmV3dG9uc29mdC5Kc29uO1xyXG51c2luZyBOb3ZlbEFwcDtcclxudXNpbmcgUGlkcm9oLk5vdmVsQmFzZTtcclxudXNpbmcgUGlkcm9oLlRleHRSZW5kZXJpbmc7XHJcblxyXG4vL3VzaW5nIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZDtcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBCcmlkZ2VCdWlsZFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQXBwXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgaW50IGJ1ZmZlcjtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBib29sIGJ1ZmZlck9uO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFRleHRSZW5kZXJUZXN0cyBub3ZlbE1haW47XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVGV4dEJvYXJkIFRleHRCb2FyZDtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBzdHJpbmdbXSBjb2xvcnM7XHJcblxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1haW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgaW50IFcgPSA0NTtcclxuICAgICAgICAgICAgY29uc3QgaW50IEggPSAxNDtcclxuICAgICAgICAgICAgalF1ZXJ5LkFqYXgobmV3IEFqYXhPcHRpb25zXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIE1pbWVUeXBlPSBcIm1pbWVUeXBlOiAndGV4dC9wbGFpbjsgY2hhcnNldD14LXVzZXItZGVmaW5lZCdcIixcclxuICAgICAgICAgICAgICAgIFVybCA9IFwic2hhcmVkL3N0b3J5LnR4dFwiLFxyXG4gICAgICAgICAgICAgICAgU3VjY2VzcyA9IGRlbGVnYXRlIChvYmplY3QgZGF0YSwgc3RyaW5nIHN0ciwganFYSFIganF4aHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoZGF0YS5Ub1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICBEaWFsb2dOYXJyYXRpb25HYW1lX1Blcm1hRGVhdGggZ2FtZSA9IG5ldyBEaWFsb2dOYXJyYXRpb25HYW1lX1Blcm1hRGVhdGgoKTtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lLlNldFNjcmlwdChkYXRhLlRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBBcHBUZXh0R2FtZShnYW1lKS5TdGFydCg0MCwgMTQpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIEVycm9yID0gZGVsZWdhdGUoanFYSFIgZDEsIHN0cmluZyBkMiwgc3RyaW5nIGQzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgRGlhbG9nTmFycmF0aW9uR2FtZV9QZXJtYURlYXRoIGdhbWUgPSBuZXcgRGlhbG9nTmFycmF0aW9uR2FtZV9QZXJtYURlYXRoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZS5TZXRTY3JpcHQoU3Rvcmllcy5zdG9yeTUpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBBcHBUZXh0R2FtZShnYW1lKS5TdGFydCg0MCwgMTQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgXHJcbiAgICAgICAgICAgIC8vbmV3IEFwcFRleHRHYW1lKG5ldyBEaWFsb2dOYXJyYXRvaW5TY3JlZW5UZXN0R2FtZSgpKS5TdGFydCg0MCwgMTQpO1xyXG4gICAgICAgICAgICAvL25ldyBBcHBUZXh0R2FtZShuZXcgRGlhbG9nTmFycmF0b2luQ29udHJvbFRlc3RHYW1lKCkpLlN0YXJ0KDQwLCAxNCk7XHJcblxyXG4gICAgICAgICAgICAvL25ldyBBcHBUZXh0R2FtZShuZXcgVGV4dFJlbmRlclRlc3RzKCkpLlN0YXJ0KDQwLCAxNCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIC8vbm92ZWxNYWluID0gbmV3IE5vdmVsTWFpbigpLkluaXQoNTAsIDIwKTtcclxuICAgICAgICAgICAgVGV4dFJlbmRlclRlc3RzIHRleHRSZW5kZXJUZXN0cyA9IG5ldyBUZXh0UmVuZGVyVGVzdHMoKTtcclxuICAgICAgICAgICAgbm92ZWxNYWluID0gdGV4dFJlbmRlclRlc3RzO1xyXG4gICAgICAgICAgICB0ZXh0UmVuZGVyVGVzdHMuSW5pdChXLCBIKTtcclxuICAgICAgICAgICAgY29sb3JzID0gRGVmYXVsdFBhbGV0dGVzLkM0UmVhZGVyLkh0bWxDb2xvcnM7XHJcbiAgICAgICAgICAgIFNjcmlwdC5DYWxsKFwic2V0RGlzcGxheVNpemVcIiwgVywgSCk7XHJcblxyXG4gICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKFwiR2FtZSBTdGFydFwiKTtcclxuICAgICAgICAgICAgLy9jb2xvcnMgPSBuZXcgc3RyaW5nWzIwXTtcclxuXHJcbiAgICAgICAgICAgIC8vZm9yIChpbnQgaSA9IDA7IGkgPCBjb2xvcnMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIC8ve1xyXG4gICAgICAgICAgICAvLyAgICAvL2NvbG9yc1tpXSA9IFwiIzFmMjAyNlwiO1xyXG5cclxuICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgIC8vY29sb3JzWzFdID0gXCIjZmZmZmZmXCI7XHJcblxyXG4gICAgICAgICAgICB2YXIgc3R5bGUgPSBuZXcgSFRNTFN0eWxlRWxlbWVudCgpO1xyXG4gICAgICAgICAgICBzdHlsZS5Jbm5lckhUTUwgPSBcImh0bWwsYm9keSB7Zm9udC1mYW1pbHk6IENvdXJpZXI7IGJhY2tncm91bmQtY29sb3I6IzFmMjUyNjsgaGVpZ2h0OiAxMDAlO31cIiArIFwiXFxuICNjYW52YXMtY29udGFpbmVyIHt3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlOyB0ZXh0LWFsaWduOmNlbnRlcjsgdmVydGljYWwtYWxpZ246IG1pZGRsZTsgfSBcIjtcclxuICAgICAgICAgICAgRG9jdW1lbnQuSGVhZC5BcHBlbmRDaGlsZChzdHlsZSk7XHJcbiAgICAgICAgICAgIGJ1ZmZlciA9IDk7XHJcbiAgICAgICAgICAgIGJ1ZmZlck9uID0gZmFsc2U7IFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgRG9jdW1lbnQuT25LZXlQcmVzcyArPSAoS2V5Ym9hcmRFdmVudCBhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGludCBjb2RlID0gYS5LZXlDb2RlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvZGUgPT0gMCkgY29kZSA9IGEuQ2hhckNvZGU7XHJcbiAgICAgICAgICAgICAgICBidWZmZXIgPSBjb2RlO1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyT24gPSB0cnVlO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgVXBkYXRlR2FtZSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gQWZ0ZXIgYnVpbGRpbmcgKEN0cmwgKyBTaGlmdCArIEIpIHRoaXMgcHJvamVjdCwgXHJcbiAgICAgICAgICAgIC8vIGJyb3dzZSB0byB0aGUgL2Jpbi9EZWJ1ZyBvciAvYmluL1JlbGVhc2UgZm9sZGVyLlxyXG5cclxuICAgICAgICAgICAgLy8gQSBuZXcgYnJpZGdlLyBmb2xkZXIgaGFzIGJlZW4gY3JlYXRlZCBhbmRcclxuICAgICAgICAgICAgLy8gY29udGFpbnMgeW91ciBwcm9qZWN0cyBKYXZhU2NyaXB0IGZpbGVzLiBcclxuXHJcbiAgICAgICAgICAgIC8vIE9wZW4gdGhlIGJyaWRnZS9pbmRleC5odG1sIGZpbGUgaW4gYSBicm93c2VyIGJ5XHJcbiAgICAgICAgICAgIC8vIFJpZ2h0LUNsaWNrID4gT3BlbiBXaXRoLi4uLCB0aGVuIGNob29zZSBhXHJcbiAgICAgICAgICAgIC8vIHdlYiBicm93c2VyIGZyb20gdGhlIGxpc3RcclxuXHJcbiAgICAgICAgICAgIC8vIFRoaXMgYXBwbGljYXRpb24gd2lsbCB0aGVuIHJ1biBpbiBhIGJyb3dzZXIuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyB2b2lkIFVwZGF0ZUdhbWUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHNjcmVlbiA9IG5vdmVsTWFpbi5TY3JlZW5Ib2xkZXIuU2NyZWVuO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc3QgZmxvYXQgZGVsdGEgPSAwLjAzM2Y7XHJcbiAgICAgICAgICAgIG5vdmVsTWFpbi5VcGRhdGUoZGVsdGEpO1xyXG4gICAgICAgICAgICBUZXh0Qm9hcmQgPSBzY3JlZW4uR2V0Qm9hcmQoKTtcclxuICAgICAgICAgICAgc2NyZWVuLlVwZGF0ZShkZWx0YSk7XHJcbiAgICAgICAgICAgIC8vZ3IuRHJhdygwLjAzM2YpO1xyXG5cclxuICAgICAgICAgICAgLy9zY3JlZW4uVXBkYXRlKGRlbHRhKTtcclxuICAgICAgICAgICAgaWYgKGJ1ZmZlck9uKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvL3NjcmVlbi5JbnB1dFVuaWNvZGUgPSBidWZmZXI7XHJcblxyXG4gICAgICAgICAgICAgICAgYnVmZmVyT24gPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vc2NyZWVuLklucHV0VW5pY29kZSA9IC0xO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBTY3JpcHQuQ2FsbChcImNsZWFyXCIpO1xyXG4gICAgICAgICAgICBEcmF3VGV4dEJvYXJkKCk7XHJcblxyXG4gICAgICAgICAgICBXaW5kb3cuU2V0VGltZW91dCgoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uKVVwZGF0ZUdhbWUsIDMzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHZvaWQgRHJhd1RleHRCb2FyZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBqID0gMDsgaiA8IFRleHRCb2FyZC5IZWlnaHQ7IGorKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBUZXh0Qm9hcmQuV2lkdGg7IGkrKylcclxuICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaW50IHRjID0gVGV4dEJvYXJkLlRleHRDb2xvcltpLCBqXTtcclxuICAgICAgICAgICAgICAgICAgICBpbnQgdGIgPSBUZXh0Qm9hcmQuQmFja0NvbG9yW2ksIGpdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YyA8IDApIHRjID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGIgPCAwKSB0YiA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RyaW5nIGNvbG9yMSA9IGNvbG9yc1t0Y107XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgc3RyaW5nIGNvbG9yQmFjayA9IGNvbG9yc1t0Yl07XHJcbiAgICAgICAgICAgICAgICAgICAgU2NyaXB0LkNhbGwoXCJkcmF3XCIsIGksIGosIGNvbG9yMSwgY29sb3JCYWNrLCBcIlwiICsgVGV4dEJvYXJkLkNoYXJBdChpLCBqKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwidXNpbmcgQnJpZGdlO1xyXG51c2luZyBCcmlkZ2UuSHRtbDU7XHJcbnVzaW5nIE5ld3RvbnNvZnQuSnNvbjtcclxudXNpbmcgTm92ZWxBcHA7XHJcbnVzaW5nIFBpZHJvaC5Ob3ZlbEJhc2U7XHJcbnVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nO1xyXG5cclxuLy91c2luZyBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQ7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgQnJpZGdlQnVpbGRcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEFwcFRleHRHYW1lXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgYnVmZmVyO1xyXG4gICAgICAgIHByaXZhdGUgYm9vbCBidWZmZXJPbjtcclxuICAgICAgICBwcml2YXRlIGJvb2wgYnVmZmVyTW91c2U7XHJcbiAgICAgICAgcHJpdmF0ZSBJVGV4dEdhbWUgZ2FtZTtcclxuICAgICAgICBwcml2YXRlIFRleHRCb2FyZCBUZXh0Qm9hcmQ7XHJcbiAgICAgICAgcHJpdmF0ZSBzdHJpbmdbXSBjb2xvcnM7XHJcbiAgICAgICAgcHJpdmF0ZSBkb3VibGUgbGFzdFVwZGF0ZTtcclxuXHJcbiAgICAgICAgcHVibGljIEFwcFRleHRHYW1lKElUZXh0R2FtZSBub3ZlbE1haW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmdhbWUgPSBub3ZlbE1haW47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTdGFydChpbnQgVywgaW50IEgpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgLy9ub3ZlbE1haW4gPSBuZXcgTm92ZWxNYWluKCkuSW5pdCg1MCwgMjApO1xyXG4gICAgICAgICAgICBnYW1lLkluaXQoVywgSCk7XHJcbiAgICAgICAgICAgIC8vbm92ZWxNYWluID0gbmV3IFRleHRSZW5kZXJUZXN0cygpLkluaXQoVywgSCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBTY3JpcHQuQ2FsbChcInNldERpc3BsYXlTaXplXCIsIFcsIEgpO1xyXG5cclxuICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShcIkdhbWUgU3RhcnRcIik7XHJcbiAgICAgICAgICAgIC8vY29sb3JzID0gbmV3IHN0cmluZ1syMF07XHJcblxyXG4gICAgICAgICAgICAvL2ZvciAoaW50IGkgPSAwOyBpIDwgY29sb3JzLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICAvL3tcclxuICAgICAgICAgICAgLy8gICAgLy9jb2xvcnNbaV0gPSBcIiMxZjIwMjZcIjtcclxuXHJcbiAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAvL2NvbG9yc1sxXSA9IFwiI2ZmZmZmZlwiO1xyXG5cclxuICAgICAgICAgICAgdmFyIHN0eWxlID0gbmV3IEhUTUxTdHlsZUVsZW1lbnQoKTtcclxuICAgICAgICAgICAgc3R5bGUuSW5uZXJIVE1MID0gXCJodG1sLGJvZHkge2ZvbnQtZmFtaWx5OiBDb3VyaWVyOyBiYWNrZ3JvdW5kLWNvbG9yOiMxZjI1MjY7IGhlaWdodDogMTAwJTt9XCIgKyBcIlxcbiAjY2FudmFzLWNvbnRhaW5lciB7d2lkdGg6IDEwMCU7IGhlaWdodDogMTAwJTsgdGV4dC1hbGlnbjpjZW50ZXI7IHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7IH0gXCI7XHJcbiAgICAgICAgICAgIERvY3VtZW50LkhlYWQuQXBwZW5kQ2hpbGQoc3R5bGUpO1xyXG4gICAgICAgICAgICBidWZmZXIgPSA5O1xyXG4gICAgICAgICAgICBidWZmZXJPbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgYnVmZmVyTW91c2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgRG9jdW1lbnQuT25LZXlQcmVzcyArPSAoS2V5Ym9hcmRFdmVudCBhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGludCBjb2RlID0gYS5LZXlDb2RlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvZGUgPT0gMCkgY29kZSA9IGEuQ2hhckNvZGU7XHJcbiAgICAgICAgICAgICAgICBidWZmZXIgPSBjb2RlO1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyT24gPSB0cnVlO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgRG9jdW1lbnQuT25Nb3VzZURvd24gKz0gKGEpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJ1ZmZlck1vdXNlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFVwZGF0ZUdhbWUoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEFmdGVyIGJ1aWxkaW5nIChDdHJsICsgU2hpZnQgKyBCKSB0aGlzIHByb2plY3QsIFxyXG4gICAgICAgICAgICAvLyBicm93c2UgdG8gdGhlIC9iaW4vRGVidWcgb3IgL2Jpbi9SZWxlYXNlIGZvbGRlci5cclxuXHJcbiAgICAgICAgICAgIC8vIEEgbmV3IGJyaWRnZS8gZm9sZGVyIGhhcyBiZWVuIGNyZWF0ZWQgYW5kXHJcbiAgICAgICAgICAgIC8vIGNvbnRhaW5zIHlvdXIgcHJvamVjdHMgSmF2YVNjcmlwdCBmaWxlcy4gXHJcblxyXG4gICAgICAgICAgICAvLyBPcGVuIHRoZSBicmlkZ2UvaW5kZXguaHRtbCBmaWxlIGluIGEgYnJvd3NlciBieVxyXG4gICAgICAgICAgICAvLyBSaWdodC1DbGljayA+IE9wZW4gV2l0aC4uLiwgdGhlbiBjaG9vc2UgYVxyXG4gICAgICAgICAgICAvLyB3ZWIgYnJvd3NlciBmcm9tIHRoZSBsaXN0XHJcblxyXG4gICAgICAgICAgICAvLyBUaGlzIGFwcGxpY2F0aW9uIHdpbGwgdGhlbiBydW4gaW4gYSBicm93c2VyLlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIFVwZGF0ZUdhbWUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG5vdyA9IERhdGUuTm93KCk7XHJcbiAgICAgICAgICAgIHZhciBkdCA9IG5vdyAtIGxhc3RVcGRhdGU7XHJcbiAgICAgICAgICAgIGxhc3RVcGRhdGUgPSBub3c7XHJcblxyXG5cclxuICAgICAgICAgICAgZmxvYXQgZGVsdGEgPSAoZmxvYXQpZHQvMTAwMGY7XHJcbiAgICAgICAgICAgIC8vZGVsdGEgKj0gMjAwO1xyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIHZhciBzY3JlZW4gPSBnYW1lLlNjcmVlbkhvbGRlci5TY3JlZW47XHJcbiAgICAgICAgICAgIGNvbG9ycyA9IGdhbWUuR2V0UGFsZXR0ZSgpLkh0bWxDb2xvcnM7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBnYW1lLlVwZGF0ZShkZWx0YSk7XHJcbiAgICAgICAgICAgIFRleHRCb2FyZCA9IHNjcmVlbi5HZXRCb2FyZCgpO1xyXG4gICAgICAgICAgICBzY3JlZW4uVXBkYXRlKGRlbHRhKTtcclxuICAgICAgICAgICAgLy9nci5EcmF3KDAuMDMzZik7XHJcblxyXG4gICAgICAgICAgICAvL3NjcmVlbi5VcGRhdGUoZGVsdGEpO1xyXG4gICAgICAgICAgICBpZiAoYnVmZmVyT24pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGdhbWUuU2NyZWVuSG9sZGVyLktleS5JbnB1dFVuaWNvZGUgPSBidWZmZXI7XHJcblxyXG4gICAgICAgICAgICAgICAgYnVmZmVyT24gPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGdhbWUuU2NyZWVuSG9sZGVyLktleS5JbnB1dFVuaWNvZGUgPSAtMTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGJ1ZmZlck1vdXNlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZS5TY3JlZW5Ib2xkZXIuTW91c2UgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICBnYW1lLlNjcmVlbkhvbGRlci5Nb3VzZS5Nb3VzZUV2ZW50KE1vdXNlRXZlbnRzLk1vdXNlRG93biwgLTEsIC0xKTtcclxuICAgICAgICAgICAgICAgIGJ1ZmZlck1vdXNlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZS5TY3JlZW5Ib2xkZXIuTW91c2UgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICBnYW1lLlNjcmVlbkhvbGRlci5Nb3VzZS5Nb3VzZUV2ZW50KE1vdXNlRXZlbnRzLk5vbmUsIC0xLCAtMSk7XHJcbiAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoXCJNb3VzZSBOT05FXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFNjcmlwdC5DYWxsKFwiY2xlYXJcIik7XHJcbiAgICAgICAgICAgIERyYXdUZXh0Qm9hcmQoKTtcclxuXHJcbiAgICAgICAgICAgIFdpbmRvdy5TZXRUaW1lb3V0KChnbG9iYWw6OlN5c3RlbS5BY3Rpb24pVXBkYXRlR2FtZSwgMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgRHJhd1RleHRCb2FyZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBqID0gMDsgaiA8IFRleHRCb2FyZC5IZWlnaHQ7IGorKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBUZXh0Qm9hcmQuV2lkdGg7IGkrKylcclxuICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaW50IHRjID0gVGV4dEJvYXJkLlRleHRDb2xvcltpLCBqXTtcclxuICAgICAgICAgICAgICAgICAgICBpbnQgdGIgPSBUZXh0Qm9hcmQuQmFja0NvbG9yW2ksIGpdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YyA8IDApIHRjID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGIgPCAwKSB0YiA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RyaW5nIGNvbG9yMSA9IGNvbG9yc1t0Y107XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgc3RyaW5nIGNvbG9yQmFjayA9IGNvbG9yc1t0Yl07XHJcbiAgICAgICAgICAgICAgICAgICAgU2NyaXB0LkNhbGwoXCJkcmF3XCIsIGksIGosIGNvbG9yMSwgY29sb3JCYWNrLCBcIlwiICsgVGV4dEJvYXJkLkNoYXJBdChpLCBqKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFBpZHJvaC5Ob3ZlbEJhc2U7XHJcbnVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nO1xyXG5cclxubmFtZXNwYWNlIE5vdmVsQXBwXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBEaWFsb2dOYXJyYXRpb25TY3JlZW4gOiBJVGV4dFNjcmVlbiwgSU1vdXNlSW5wdXQsIElLZXlib2FyZElucHV0XHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBjb25zdCBpbnQgTmFycmF0aW9uU3RhdGUgPSAxO1xyXG4gICAgICAgIHByaXZhdGUgY29uc3QgaW50IERpYWxvZ1N0YXRlID0gMjtcclxuICAgICAgICBwcml2YXRlIFRleHRXb3JsZCB3b3JsZDtcclxuICAgICAgICBwcml2YXRlIFRleHRFbnRpdHkgZGlhbG9nRnJhbWU7XHJcbiAgICAgICAgcHJpdmF0ZSBUZXh0RW50aXR5IGRpYWxvZ0U7XHJcbiAgICAgICAgcHJpdmF0ZSBUZXh0RW50aXR5IG5hcnJhdGlvbkU7XHJcbiAgICAgICAgcHJpdmF0ZSBDaGFyQnlDaGFyQW5pbWF0aW9uIGNoYXJCeUNoYXJBbmltO1xyXG4gICAgICAgIFN0cmluZ1RvUGFzc2FnZUl0ZXJhdG9yIHBhc3NhZ2VJdGVyYXRvcjtcclxuICAgICAgICBwcml2YXRlIGludCBtb2RlO1xyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBJbml0KGludCB3LCBpbnQgaClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHdvcmxkID0gbmV3IFRleHRXb3JsZCgpO1xyXG4gICAgICAgICAgICB3b3JsZC5wYWxldHRlID0gRGVmYXVsdFBhbGV0dGVzLkM0Tm92ZWw7XHJcbiAgICAgICAgICAgIHdvcmxkLkluaXQodywgaCk7XHJcbiAgICAgICAgICAgIGRpYWxvZ0ZyYW1lID0gd29ybGQuR2V0RnJlZUVudGl0eSh3LCA0KTtcclxuICAgICAgICAgICAgZGlhbG9nRnJhbWUuU2V0UG9zaXRpb24oMCwgaC00KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGRpYWxvZ0UgPSB3b3JsZC5HZXRGcmVlRW50aXR5KHctNCwgNCk7XHJcbiAgICAgICAgICAgIGRpYWxvZ0UuU2V0UG9zaXRpb24oMiwgaC00KTtcclxuICAgICAgICAgICAgbmFycmF0aW9uRSA9IHdvcmxkLkdldEZyZWVFbnRpdHkody00LCBoLTYpO1xyXG4gICAgICAgICAgICBuYXJyYXRpb25FLlNldFBvc2l0aW9uKDIsMSk7XHJcbiAgICAgICAgICAgIGNoYXJCeUNoYXJBbmltID0gbmV3IENoYXJCeUNoYXJBbmltYXRpb24oKTtcclxuICAgICAgICAgICAgd29ybGQuQWRkQW5pbWF0aW9uPGdsb2JhbDo6UGlkcm9oLlRleHRSZW5kZXJpbmcuQ2hhckJ5Q2hhckFuaW1hdGlvbj4oY2hhckJ5Q2hhckFuaW0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGludCBJbnB1dFVuaWNvZGUgeyBzZXQ7IGdldDsgfVxyXG4gICAgICAgIHB1YmxpYyBNb3VzZUV2ZW50cyBNb3VzZSB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkTmFycmF0aW9uKHN0cmluZyBuKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbW9kZSA9IE5hcnJhdGlvblN0YXRlO1xyXG4gICAgICAgICAgICBQYXNzYWdpZnkobik7XHJcbiAgICAgICAgICAgIGlmIChuYXJyYXRpb25FLk9yaWdpbi5DdXJzb3JYICE9IDAgfHwgbmFycmF0aW9uRS5PcmlnaW4uQ3Vyc29yWSAhPSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYXJyYXRpb25FLk9yaWdpbi5DdXJzb3JOZXdMaW5lKDApO1xyXG4gICAgICAgICAgICAgICAgbmFycmF0aW9uRS5PcmlnaW4uQ3Vyc29yTmV3TGluZSgwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobmFycmF0aW9uRS5PcmlnaW4uQ2FuRHJhd19DdXJzb3JfU21hcnRMaW5lQnJlYWsobikpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEZvcmNlUGFnZUJyZWFrKCk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFNob3dQYXNzYWdlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgU2hvd1Bhc3NhZ2UoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHBhc3NhZ2VJbmRleGVzID0gcGFzc2FnZUl0ZXJhdG9yLkN1cnJlbnRQYXNzYWdlKCk7XHJcbiAgICAgICAgICAgIEFkZE5hcnJhdGlvblBhc3NhZ2UocGFzc2FnZUl0ZXJhdG9yLkdldFRleHQoKSwgcGFzc2FnZUluZGV4ZXMuWEludCwgcGFzc2FnZUluZGV4ZXMuWUludCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgUGFzc2FnaWZ5KHN0cmluZyBuKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcGFzc2FnZUl0ZXJhdG9yID0gU3RyaW5nVG9QYXNzYWdlRmFjdG9yeS5Qb3B1bGF0ZShwYXNzYWdlSXRlcmF0b3IsIG4pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIEFkZE5hcnJhdGlvblBhc3NhZ2Uoc3RyaW5nIG4sIGludCBzdGFydCwgaW50IGVuZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgY3Vyc29yUiA9IG5hcnJhdGlvbkUuT3JpZ2luLkRyYXdfQ3Vyc29yX1NtYXJ0TGluZUJyZWFrKG4sIDIsIHN0YXJ0LCBlbmQpO1xyXG4gICAgICAgICAgICBjaGFyQnlDaGFyQW5pbS5BZGQobmFycmF0aW9uRS5BbmltQmFzZSgoZW5kLXN0YXJ0KSAqIDAuMDA1ZiksIG5ldyBDaGFyQnlDaGFyQW5pbWF0aW9uLkNoYXJCeUNoYXJEYXRhKGN1cnNvclIuU3RhcnRJbmRleCwgY3Vyc29yUi5FbmRJbmRleCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkRGlhbG9nKHN0cmluZyBzcGVha2VyLCBzdHJpbmcgdGV4dClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1vZGUgPSBEaWFsb2dTdGF0ZTtcclxuICAgICAgICAgICAgZGlhbG9nRnJhbWUuT3JpZ2luLlNldEFsbCgnICcsIDAsIDEpO1xyXG4gICAgICAgICAgICBkaWFsb2dFLk9yaWdpbi5TZXRBbGwoJyAnLCAwLCBUZXh0Qm9hcmQuSU5WSVNJQkxFQ09MT1IpO1xyXG4gICAgICAgICAgICBkaWFsb2dFLk9yaWdpbi5EcmF3KHNwZWFrZXIsIDAsMCwgMik7XHJcbiAgICAgICAgICAgIGRpYWxvZ0UuT3JpZ2luLlNldEN1cnNvckF0KDAsMSk7XHJcbiAgICAgICAgICAgIGRpYWxvZ0UuT3JpZ2luLkRyYXdfQ3Vyc29yX1NtYXJ0TGluZUJyZWFrKHRleHQsIDIpO1xyXG4gICAgICAgICAgICBjaGFyQnlDaGFyQW5pbS5BZGQoZGlhbG9nRS5BbmltQmFzZSh0ZXh0Lkxlbmd0aCAqIDAuMDA1ZiksIG5ldyBDaGFyQnlDaGFyQW5pbWF0aW9uLkNoYXJCeUNoYXJEYXRhKGRpYWxvZ0UuT3JpZ2luLldpZHRoLCB0ZXh0Lkxlbmd0aCsgZGlhbG9nRS5PcmlnaW4uV2lkdGgpKTtcclxuICAgICAgICAgICAgLy9kaWFsb2dFLk9yaWdpbi5EcmF3KHRleHQsIDAsMSwgMik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dEJvYXJkIEdldEJvYXJkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB3b3JsZC5tYWluQm9hcmQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBVcGRhdGUoZmxvYXQgZilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHdvcmxkLkRyYXcoKTtcclxuICAgICAgICAgICAgd29ybGQuQWR2YW5jZVRpbWUoZik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIEhpZGVEaWFsb2coKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZGlhbG9nRS5PcmlnaW4uU2V0QWxsKCcgJywgMCwgVGV4dEJvYXJkLklOVklTSUJMRUNPTE9SKTtcclxuICAgICAgICAgICAgZGlhbG9nRnJhbWUuT3JpZ2luLlNldEFsbCgnICcsIDAsIFRleHRCb2FyZC5JTlZJU0lCTEVDT0xPUik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBib29sIElzRG9uZSgpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHdvcmxkLklzRG9uZSgpICYmIChwYXNzYWdlSXRlcmF0b3I9PSBudWxsIHx8IHBhc3NhZ2VJdGVyYXRvci5Jc0RvbmUoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIEFkdmFuY2VSZXF1ZXN0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICghd29ybGQuSXNEb25lKCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHdvcmxkLkFkdmFuY2VUaW1lKDk5OWYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgIHBhc3NhZ2VJdGVyYXRvci5BZHZhbmNlKCk7XHJcbiAgICAgICAgICAgICAgICBTaG93UGFzc2FnZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgTW91c2VFdmVudChNb3VzZUV2ZW50cyBldmVudFR5cGUsIGludCB2MSwgaW50IHYyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTW91c2UgPSBldmVudFR5cGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIEZvcmNlUGFnZUJyZWFrKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hcnJhdGlvbkUuUmVzZXRGdWxsKCk7XHJcbiAgICAgICAgICAgIG5hcnJhdGlvbkUuT3JpZ2luLlNldEN1cnNvckF0KDAsIDApO1xyXG4gICAgICAgIH1cclxuXG4gICAgXG5wcml2YXRlIGludCBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fSW5wdXRVbmljb2RlPS0xO3ByaXZhdGUgTW91c2VFdmVudHMgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX01vdXNlPU1vdXNlRXZlbnRzLk5vbmU7fVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBEaWFsb2dOYXJyYXRpb25TY3JlZW5Db250cm9sXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBzdHJpbmcgdGV4dDtcclxuICAgICAgICBwcml2YXRlIFRhZ0luZm9Ib2xkZXIgdGFnSW5mbztcclxuICAgICAgICBpbnQgdGFnSW5kZXg7XHJcbiAgICAgICAgRGlhbG9nTmFycmF0aW9uU2NyZWVuIHNjcmVlbjtcclxuICAgICAgICBwdWJsaWMgRGljdGlvbmFyeTxjaGFyLCBzdHJpbmc+IFNwZWFrZXJEYXRhID0gbmV3IERpY3Rpb25hcnk8Y2hhciwgc3RyaW5nPigpO1xyXG4gICAgICAgIHB1YmxpYyBib29sIERvbmUgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBib29sIE5hcnJhdGlvbk9ubHk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBEaWFsb2dOYXJyYXRpb25TY3JlZW5Db250cm9sKERpYWxvZ05hcnJhdGlvblNjcmVlbiBzY3JlZW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnNjcmVlbiA9IHNjcmVlbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNldFRleHQoc3RyaW5nIHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0ID0gdC5SZXBsYWNlKFwiJVwiLCBcIlxcXCJcIikuUmVwbGFjZShcIlxcclwiLCBcIlwiKTtcclxuICAgICAgICAgICAgVGV4dFRhZ1JlYWRlciB0dHIgPSBuZXcgVGV4dFRhZ1JlYWRlcigpO1xyXG4gICAgICAgICAgICB0aGlzLnRleHQgPSBudWxsO1xyXG4gICAgICAgICAgICB0YWdJbmZvID0gdHRyLkV4dHJhY3RUYWdJbmZvKHQsIG91dCB0aGlzLnRleHQpO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiB0YWdJbmZvLlRhZ3MpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoXCJUQUdcIik7XHJcbiAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKHRoaXMudGV4dC5TdWJzdHJpbmcoaXRlbS5TdGFydCwgaXRlbS5FbmQgLSBpdGVtLlN0YXJ0KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNob3dOZXh0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICghc2NyZWVuLklzRG9uZSgpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzY3JlZW4uQWR2YW5jZVJlcXVlc3QoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGFnSW5mby5UYWdzLkNvdW50IDw9IHRhZ0luZGV4KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBEb25lID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIHRhZyA9IHRhZ0luZm8uVGFnc1t0YWdJbmRleF07XHJcbiAgICAgICAgICAgIGlmICh0YWcuTGFiZWxJcygncCcsICdiJykpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNjcmVlbi5Gb3JjZVBhZ2VCcmVhaygpO1xyXG4gICAgICAgICAgICAgICAgdGFnSW5kZXgrKztcclxuICAgICAgICAgICAgICAgIFNob3dOZXh0KCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYm9vbCBjaGFyYVRhZyA9IHRhZy5MYWJlbEluZGV4SXMoJ2MnLCAwKTtcclxuICAgICAgICAgICAgaWYgKGNoYXJhVGFnICYmICFOYXJyYXRpb25Pbmx5KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdHJpbmcgc3BlYWtlciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBpZiAoU3BlYWtlckRhdGEuVHJ5R2V0VmFsdWUodGFnLkdldExhYmVsQ2hhcigxKSwgb3V0IHNwZWFrZXIpKVxyXG4gICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzcGVha2VyID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHN0cmluZyB0ZXh0MSA9IHRleHQuU3Vic3RyaW5nKHRhZy5TdGFydCwgdGFnLkVuZC0gdGFnLlN0YXJ0KTtcclxuICAgICAgICAgICAgICAgIHNjcmVlbi5BZGREaWFsb2coc3BlYWtlciwgdGV4dDEpO1xyXG4gICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlKHRleHQxKTtcclxuICAgICAgICAgICAgICAgIC8vc2NyZWVuLkFkZERpYWxvZyhcInNcIiwgXCJiYmJiXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0YWcuTGFiZWxJbmRleElzKCduJywgMCkgfHwgTmFycmF0aW9uT25seSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW50IGxlbmd0aCA9IHRhZy5FbmQgLSB0YWcuU3RhcnQ7XHJcbiAgICAgICAgICAgICAgICBpZiAobGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHN0cmluZyB0ZXh0MSA9IHRleHQuU3Vic3RyaW5nKHRhZy5TdGFydCwgbGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hhcmFUYWcgJiYgTmFycmF0aW9uT25seSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmcgc3BlYWtlciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChTcGVha2VyRGF0YS5UcnlHZXRWYWx1ZSh0YWcuR2V0TGFiZWxDaGFyKDEpLCBvdXQgc3BlYWtlcikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGVha2VyID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0MSA9IHNwZWFrZXIgKyBcIjogXCIgKyB0ZXh0MTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgc2NyZWVuLkFkZE5hcnJhdGlvbih0ZXh0MSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NyZWVuLkhpZGVEaWFsb2coKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlKHRleHQxKTtcclxuICAgICAgICAgICAgICAgIC8vc2NyZWVuLkFkZERpYWxvZyhcInNcIiwgXCJiYmJiXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRhZ0luZGV4Kys7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFRyeUFkdmFuY2UoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHNjcmVlbi5JbnB1dFVuaWNvZGUgPj0gMCB8fCBzY3JlZW4uTW91c2UgPT0gTW91c2VFdmVudHMuTW91c2VEb3duKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBTaG93TmV4dCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBEaWFsb2dOYXJyYXRvaW5Db250cm9sVGVzdEdhbWUgOiBJVGV4dEdhbWVcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIERpYWxvZ05hcnJhdGlvblNjcmVlbkNvbnRyb2wgZG5zYztcclxuXHJcbiAgICAgICAgcHVibGljIFRleHRTY3JlZW5Ib2xkZXIgU2NyZWVuSG9sZGVyIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIFBhbGV0dGUgR2V0UGFsZXR0ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gRGVmYXVsdFBhbGV0dGVzLkM0Tm92ZWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBJbml0KGludCB3LCBpbnQgaClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBkbnMgPSBuZXcgRGlhbG9nTmFycmF0aW9uU2NyZWVuKCk7XHJcbiAgICAgICAgICAgIGRucy5Jbml0KHcsIGgpO1xyXG4gICAgICAgICAgICBTY3JlZW5Ib2xkZXIuU2V0QWxsKGRucyk7XHJcblxyXG4gICAgICAgICAgICBkbnNjID0gbmV3IERpYWxvZ05hcnJhdGlvblNjcmVlbkNvbnRyb2woZG5zKTtcclxuICAgICAgICAgICAgZG5zYy5TZXRUZXh0KFN0b3JpZXMuc3Rvcnk0KTtcclxuLy8gICAgICAgICAgICBkbnNjLlNldFRleHQoQFwiI2NtV2VsY29tZSBiYWNrLCBkZWFyLlxyXG4vLyNjbUhvdyB3YXMgc2Nob29sIHRvZGF5P1xyXG4vLyNubldoeSB3b24ndCB0aGlzIHdvcms/XHJcbi8vc1wiKTtcclxuICAgICAgICAgICAgZG5zYy5TcGVha2VyRGF0YS5BZGQoJ20nLCBcIk1vbVwiKTtcclxuICAgICAgICAgICAgZG5zYy5TcGVha2VyRGF0YS5BZGQoJ3AnLCBcIlNhcmFcIik7XHJcbiAgICAgICAgICAgIGRuc2MuU2hvd05leHQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFVwZGF0ZShmbG9hdCBkZWx0YSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRuc2MuVHJ5QWR2YW5jZSgpO1xyXG4gICAgICAgIH1cclxuXG4gICAgXG5wcml2YXRlIFRleHRTY3JlZW5Ib2xkZXIgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX1NjcmVlbkhvbGRlcj1uZXcgVGV4dFNjcmVlbkhvbGRlcigpO31cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgRGlhbG9nTmFycmF0b2luU2NyZWVuVGVzdEdhbWUgOiBJVGV4dEdhbWVcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgVGV4dFNjcmVlbkhvbGRlciBTY3JlZW5Ib2xkZXIgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUGFsZXR0ZSBHZXRQYWxldHRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBEZWZhdWx0UGFsZXR0ZXMuQzROb3ZlbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEluaXQoaW50IHcsIGludCBoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGRucyA9IG5ldyBEaWFsb2dOYXJyYXRpb25TY3JlZW4oKTtcclxuICAgICAgICAgICAgZG5zLkluaXQodywgaCk7XHJcbiAgICAgICAgICAgIFNjcmVlbkhvbGRlci5TZXRBbGwoZG5zKTtcclxuICAgICAgICAgICAgZG5zLkFkZE5hcnJhdGlvbihcImRhc2RzYWRkZGRkZGRkZGRkZGRkZGRkICBkYXNkc2FkICAgICAgIGRzYWRzXCIpO1xyXG4gICAgICAgICAgICBkbnMuQWRkRGlhbG9nKFwiTW9tXCIsIFwiV2hhdD9cIik7XHJcbiAgICAgICAgICAgIENvbnNvbGUuV3JpdGUoXCJzc3NcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBVcGRhdGUoZmxvYXQgZGVsdGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxuICAgIFxucHJpdmF0ZSBUZXh0U2NyZWVuSG9sZGVyIF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19TY3JlZW5Ib2xkZXI9bmV3IFRleHRTY3JlZW5Ib2xkZXIoKTt9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIERpYWxvZ05hcnJhdGlvbkdhbWVfUGVybWFEZWF0aCA6IElUZXh0R2FtZVxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgRGlhbG9nTmFycmF0aW9uU2NyZWVuQ29udHJvbCBkbnNjO1xyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dFNjcmVlbkhvbGRlciBTY3JlZW5Ib2xkZXIgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIHN0cmluZyB0ZXh0O1xyXG4gICAgICAgIC8vc3RyaW5nW10gc2NyaXB0VGFncyA9IG5ldyBzdHJpbmdbXSB7XCJEZWF0aCAzNDogXCIsIFwiTW9tOiBcIiwgXCJEYWQ6IFwiLCBcIlJlZCBNZXJsaW46IFwifTtcclxuICAgICAgICAvL3N0cmluZ1tdIHNjcmlwdFRhZ3NSZXBsYWNlID0gbmV3IHN0cmluZ1tdIHsgXCIjY2RcIiwgXCIjY21cIiwgXCIjY0RcIiwgXCJjclwiIH07XHJcbiAgICAgICAgRGljdGlvbmFyeTxjaGFyLCBzdHJpbmc+IHNwZWFrZXJUb1RhZyA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBEaWN0aW9uYXJ5PGNoYXIsIHN0cmluZz4oKSwoX28xKT0+e19vMS5BZGQoJ3AnLFwiU2FyYVwiKTtfbzEuQWRkKCdtJyxcIk1vbVwiKTtfbzEuQWRkKCdkJyxcIkRhZFwiKTtfbzEuQWRkKCdEJyxcIkRlYXRoIDM0XCIpO19vMS5BZGQoJ3InLFwiUmVkIE1lcmxpblwiKTtyZXR1cm4gX28xO30pO1xyXG4gICAgcHVibGljIHZvaWQgU2V0U2NyaXB0KHN0cmluZyBzY3JpcHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgcmVwbGFjZXMgPSBuZXcgRGljdGlvbmFyeTxzdHJpbmcsIHN0cmluZz4oKTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gc3BlYWtlclRvVGFnKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXBsYWNlcy5BZGQoaXRlbS5WYWx1ZSArIFwiOiBcIixcIiNjXCIgK2l0ZW0uS2V5KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGV4dCA9IG5ldyBTY3JpcHRUZXh0VG9UYWdnZWRUYWdUZXh0KCkuUHJvY2VzcyhzY3JpcHQsIFxyXG4gICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgcmVwbGFjZXMsXHJcbiAgICAgICAgICAgICAgICBcIiNublwiKTtcclxuICAgICAgICAgICAgdGV4dCA9IFwiI25uUHJlc3MgYW55IGtleSBvciBjbGljayB3aXRoIHlvdXIgbW91c2UgdG8gYWR2YW5jZVxcbiNwYlwiICsgdGV4dDtcclxuICAgICAgICAgICAgdGV4dCArPSBcIlxcbiNwYlwiICtcclxuICAgICAgICAgICAgICAgIFwiXFxuI25uVGhpcyBzdG9yeSBpcyBpbmNvbXBsZXRlLlxcblwiICtcclxuICAgICAgICAgICAgICAgIFwiXFxuI25uSWYgeW91IHdhbm5hIHJlYWQgdGhlIHJlc3Qgd2hlbiBpdCdzIGRvbmUsXCIgK1xyXG4gICAgICAgICAgICAgICAgXCJcXG4jbm5Gb2xsb3cgbWUgb24gVHdpdHRlciAtICBAbWFiaXJlbXBzXCIgK1xyXG4gICAgICAgICAgICAgICAgXCJcXG4jbm5BYm92ZSBhbGwsIHRoYW5rIHlvdSBmb3IgcGxheWluZyFcXG5cIjtcclxuICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlKHRleHQpO1xyXG4gICAgICAgICAgICAvL0NvbnNvbGUuUmVhZEtleSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFBhbGV0dGUgR2V0UGFsZXR0ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gRGVmYXVsdFBhbGV0dGVzLkM0Tm92ZWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBJbml0KGludCB3LCBpbnQgaClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBkbnMgPSBuZXcgRGlhbG9nTmFycmF0aW9uU2NyZWVuKCk7XHJcbiAgICAgICAgICAgIGRucy5Jbml0KHcsIGgpO1xyXG4gICAgICAgICAgICBTY3JlZW5Ib2xkZXIuU2V0QWxsKGRucyk7XHJcblxyXG4gICAgICAgICAgICBkbnNjID0gbmV3IERpYWxvZ05hcnJhdGlvblNjcmVlbkNvbnRyb2woZG5zKTtcclxuICAgICAgICAgICAgZG5zYy5TZXRUZXh0KHRleHQpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGRuc2MuU2V0VGV4dChAXCIjY21XZWxjb21lIGJhY2ssIGRlYXIuXHJcbiAgICAgICAgICAgIC8vI2NtSG93IHdhcyBzY2hvb2wgdG9kYXk/XHJcbiAgICAgICAgICAgIC8vI25uV2h5IHdvbid0IHRoaXMgd29yaz9cclxuICAgICAgICAgICAgLy9zXCIpO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBzcGVha2VyVG9UYWcpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vcmVwbGFjZXMuQWRkKGl0ZW0uVmFsdWUgKyBcIjogXCIsIFwiI2NcIiArIGl0ZW0uS2V5KTtcclxuICAgICAgICAgICAgICAgIGRuc2MuU3BlYWtlckRhdGEuQWRkKGl0ZW0uS2V5LCBpdGVtLlZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy9kbnNjLlNwZWFrZXJEYXRhLkFkZCgncCcsIFwiU2FyYVwiKTtcclxuICAgICAgICAgICAgZG5zYy5TaG93TmV4dCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVXBkYXRlKGZsb2F0IGRlbHRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZG5zYy5UcnlBZHZhbmNlKCk7XHJcbiAgICAgICAgfVxyXG5cbiAgICBcbnByaXZhdGUgVGV4dFNjcmVlbkhvbGRlciBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fU2NyZWVuSG9sZGVyPW5ldyBUZXh0U2NyZWVuSG9sZGVyKCk7fVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIE5vdmVsQXBwXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBTY3JpcHRUZXh0VG9UYWdnZWRUYWdUZXh0XHJcbiAgICB7XHJcblxyXG4gICAgICAgIC8vc3RyaW5nW10gVG9SZXBsYWNlT3JpZ2luYWw7XHJcbiAgICAgICAgLy9zdHJpbmdbXSBUb1JlcGxhY2VOZXc7XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgUHJvY2VzcyhzdHJpbmcgc2NyaXB0LCBEaWN0aW9uYXJ5PHN0cmluZywgc3RyaW5nPiByZXBsYWNlcywgc3RyaW5nIGRlZmF1bHRUYWcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgaW5kZXhTdGFydCA9IHNjcmlwdC5JbmRleE9mKFwiU1RBUlQ6XCIpO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXhTdGFydCA+PSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzY3JpcHQgPSBzY3JpcHQuU3Vic3RyaW5nKGluZGV4U3RhcnQrNik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgU3RyaW5nQnVpbGRlciBzYiA9IG5ldyBTdHJpbmdCdWlsZGVyKHNjcmlwdCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL3NiLlJlcGxhY2UoXCJcXFwiXCIsIFwiQlwiKTtcclxuICAgICAgICAgICAgc2IuUmVwbGFjZShcIlxcclwiLCBcIlwiKTtcclxuICAgICAgICAgICAgc2IuUmVwbGFjZShcIiBcXG5cIiwgXCJcXG5cIik7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciByIGluIHJlcGxhY2VzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzYi5SZXBsYWNlKHIuS2V5LCByLlZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL2ZvciAoaW50IGkgPSAwOyBpIDwgVG9SZXBsYWNlT3JpZ2luYWwuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIC8ve1xyXG4gICAgICAgICAgICAvLyAgICBzYi5SZXBsYWNlKFRvUmVwbGFjZU9yaWdpbmFsW2ldLCBUb1JlcGxhY2VOZXdbaV0pO1xyXG4gICAgICAgICAgICAvLyAgICAvL3NjcmlwdCA9IHNjcmlwdC5SZXBsYWNlKFRvUmVwbGFjZU9yaWdpbmFsW2ldLCBUb1JlcGxhY2VOZXdbaV0pO1xyXG4gICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IC0xOyBpIDwgc2IuTGVuZ3RoLTE7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKChpID09IC0xIHx8IHNiW2ldID09ICdcXG4nKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIHNiW2krMV0gIT0gJyMnJiZcclxuICAgICAgICAgICAgICAgICAgICBzYltpKzFdICE9ICdcXG4nKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHNiLkluc2VydChpKzEsIGRlZmF1bHRUYWcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBzYi5Ub1N0cmluZygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgTm92ZWxBcHBcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFN0cmluZ1RvUGFzc2FnZVxyXG4gICAge1xyXG4gICAgICAgIGludGVybmFsIExpc3Q8aW50PiBQYXNzYWdlSW5kZXhlcyA9IG5ldyBMaXN0PGludD4oKTtcclxuICAgICAgICBpbnRlcm5hbCBzdHJpbmcgVGV4dDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgU3RyaW5nVG9QYXNzYWdlSXRlcmF0b3JcclxuICAgIHtcclxuXHJcbiAgICAgICAgaW50ZXJuYWwgU3RyaW5nVG9QYXNzYWdlIFN0cmluZ1RvUGFzc2FnZTtcclxuICAgICAgICBpbnQgcHJvZ3Jlc3M7XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkdmFuY2UoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHJvZ3Jlc3MrKztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBWZWN0b3IyRCBDdXJyZW50UGFzc2FnZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjJEKFxyXG4gICAgICAgICAgICAgICAgU3RyaW5nVG9QYXNzYWdlLlBhc3NhZ2VJbmRleGVzW3Byb2dyZXNzXSsxLCBTdHJpbmdUb1Bhc3NhZ2UuUGFzc2FnZUluZGV4ZXNbcHJvZ3Jlc3MgKyAxXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIEdldFRleHQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFN0cmluZ1RvUGFzc2FnZS5UZXh0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgSXNEb25lKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBTdHJpbmdUb1Bhc3NhZ2UuUGFzc2FnZUluZGV4ZXMuQ291bnQgPD0gcHJvZ3Jlc3MgKyAyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBSZXNldCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBTdHJpbmdUb1Bhc3NhZ2UuUGFzc2FnZUluZGV4ZXMuQ2xlYXIoKTtcclxuICAgICAgICAgICAgcHJvZ3Jlc3MgPSAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgU3RyaW5nVG9QYXNzYWdlRmFjdG9yeVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgU3RyaW5nVG9QYXNzYWdlSXRlcmF0b3IgUG9wdWxhdGUoU3RyaW5nVG9QYXNzYWdlSXRlcmF0b3IgaXRlcmF0b3IsIHN0cmluZyB0ZXh0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGl0ZXJhdG9yID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGl0ZXJhdG9yID0gbmV3IFN0cmluZ1RvUGFzc2FnZUl0ZXJhdG9yKCk7XHJcbiAgICAgICAgICAgICAgICBpdGVyYXRvci5TdHJpbmdUb1Bhc3NhZ2UgPSBuZXcgU3RyaW5nVG9QYXNzYWdlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaXRlcmF0b3IuUmVzZXQoKTtcclxuICAgICAgICAgICAgaXRlcmF0b3IuU3RyaW5nVG9QYXNzYWdlLlRleHQgPSB0ZXh0O1xyXG4gICAgICAgICAgICB2YXIgcGFzc2FnZU1hcmtlcnMgPSBpdGVyYXRvci5TdHJpbmdUb1Bhc3NhZ2UuUGFzc2FnZUluZGV4ZXM7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBwYXNzYWdlTWFya2Vycy5BZGQoLTEpO1xyXG4gICAgICAgICAgICBib29sIG9wZW5Bc3BhcyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpbnQgbGFzdFN0b3AgPSAtMTA7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgdGV4dC5MZW5ndGggLSAxOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChpIC0gbGFzdFN0b3AgPCAyKVxyXG4gICAgICAgICAgICAgICAgLy9pZihmYWxzZSlcclxuICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgodGV4dFtpXSA9PSAnLicgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgKHRleHRbaSArIDFdICE9ICcuJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8mJiB0ZXh0W2kgKyAxXSAhPSAnXCInXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiB0ZXh0W2kgKyAxXSAhPSAnXFxuJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgdGV4dFtpICsgMV0gIT0gJ1xccicpKSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhc3NhZ2VNYXJrZXJzLkFkZChpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFN0b3AgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGV4dFtpXSA9PSAnXCInKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3BlbkFzcGFzID0gIW9wZW5Bc3BhcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFvcGVuQXNwYXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhc3NhZ2VNYXJrZXJzLkFkZChpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTdG9wID0gaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGV4dFtpXSA9PSAnXFxuJylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhc3NhZ2VNYXJrZXJzLkFkZChpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFN0b3AgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwYXNzYWdlTWFya2Vycy5BZGQodGV4dC5MZW5ndGggLSAxKTtcclxuICAgICAgICAgICAgcmV0dXJuIGl0ZXJhdG9yO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgTm92ZWxBcHBcclxue1xyXG4gICAgcHVibGljIGFic3RyYWN0IGNsYXNzIFRleHRTY3JlZW5OIDogSVRleHRTY3JlZW4sIElNb3VzZUlucHV0LCBJS2V5Ym9hcmRJbnB1dFxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgVGV4dFdvcmxkIHR3O1xyXG5cclxuICAgICAgICBwdWJsaWMgYWJzdHJhY3Qgdm9pZCBVcGRhdGUoZmxvYXQgZik7XHJcblxyXG4gICAgICAgIHB1YmxpYyAgdm9pZCBJbml0KGludCB3LCBpbnQgaClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHR3ID0gbmV3IFRleHRXb3JsZCgpO1xyXG4gICAgICAgICAgICB0dy5Jbml0KHcsIGgpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0Qm9hcmQgR2V0Qm9hcmQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHR3Lm1haW5Cb2FyZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBQYWxldHRlIEdldFBhbGV0dGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHR3LnBhbGV0dGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBNb3VzZUV2ZW50KE1vdXNlRXZlbnRzIG1vdXNlRG93biwgaW50IHYxLCBpbnQgdjIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgSW5wdXRVbmljb2RlIHsgc2V0OyBwcm90ZWN0ZWQgZ2V0OyB9XHJcbiAgICAgICAgcHJvdGVjdGVkIGludCBJbnB1dEFzTnVtYmVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIElucHV0VW5pY29kZSAtIDQ4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbnRlcmZhY2UgSVRleHRTY3JlZW5cclxuICAgIHtcclxuICAgICAgICBcclxuICAgICAgICBUZXh0Qm9hcmQgR2V0Qm9hcmQoKTtcclxuICAgICAgICBcclxuICAgICAgICB2b2lkIFVwZGF0ZShmbG9hdCBmKTtcclxuICAgICAgICBcclxuICAgICAgICAvL1BhbGV0dGUgR2V0UGFsZXR0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbnRlcmZhY2UgSU1vdXNlSW5wdXRcclxuICAgIHtcclxuICAgICAgICB2b2lkIE1vdXNlRXZlbnQoTW91c2VFdmVudHMgZXZlbnRUeXBlLCBpbnQgdjEsIGludCB2Mik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGludGVyZmFjZSBJS2V5Ym9hcmRJbnB1dFxyXG4gICAge1xyXG4gICAgICAgIGludCBJbnB1dFVuaWNvZGUgeyBzZXQ7IH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW51bSBNb3VzZUV2ZW50c1xyXG4gICAgeyBcclxuICAgICAgICBNb3VzZURvd24sXHJcbiAgICAgICAgTm9uZVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBUZXh0U2NyZWVuSG9sZGVyXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIElUZXh0U2NyZWVuIFNjcmVlbiB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIElNb3VzZUlucHV0IE1vdXNlIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgSUtleWJvYXJkSW5wdXQgS2V5IHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBTZXRBbGwob2JqZWN0IGRucylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFNjcmVlbiA9IGRucyBhcyBJVGV4dFNjcmVlbjtcclxuICAgICAgICAgICAgTW91c2UgPSBkbnMgYXMgSU1vdXNlSW5wdXQ7XHJcbiAgICAgICAgICAgIEtleSA9IGRucyBhcyBJS2V5Ym9hcmRJbnB1dDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLk5vdmVsQmFzZVxyXG57XHJcblxyXG5cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgVGV4dFRhZ1JlYWRlclxyXG4gICAge1xyXG5cclxuICAgICAgICBMaXN0PFRhZ0luZm8+IHRhZ3NPcGVuZWQgPSBuZXcgTGlzdDxUYWdJbmZvPigpO1xyXG4gICAgICAgIFN0cmluZ0J1aWxkZXIgYXV4ID0gbmV3IFN0cmluZ0J1aWxkZXIoKTtcclxuICAgICAgICBwdWJsaWMgYm9vbCBFbmRQYXNzYWdlT25Bc3BhcyA9IHRydWU7XHJcblxyXG4gICAgICAgIHB1YmxpYyBUYWdJbmZvSG9sZGVyIEV4dHJhY3RUYWdJbmZvKHN0cmluZyB0ZXh0LCBvdXQgc3RyaW5nIHRhZ2xlc3NUZXh0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYXV4Lkxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgIHRhZ3NPcGVuZWQuQ2xlYXIoKTtcclxuICAgICAgICAgICAgdmFyIHRpaCA9IG5ldyBUYWdJbmZvSG9sZGVyKCk7XHJcbiAgICAgICAgICAgIGludCByZW1vdmVkVGFnT2Zmc2V0ID0gMDtcclxuICAgICAgICAgICAgYm9vbCBhc3Bhc09wZW5lZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHRleHQuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICh0ZXh0W2ldID09ICcjJylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBUYWdJbmZvIHRpID0gbmV3IFRhZ0luZm8oaSAtIHJlbW92ZWRUYWdPZmZzZXQsIHRleHRbaSArIDFdLCB0ZXh0W2kgKyAyXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGloLlRhZ3MuQWRkKHRpKTtcclxuICAgICAgICAgICAgICAgICAgICB0YWdzT3BlbmVkLkFkZCh0aSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlZFRhZ09mZnNldCArPSAzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYm9vbCBlbmREZXRlY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRleHRbaV0gPT0gJ1wiJylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoRW5kUGFzc2FnZU9uQXNwYXMgJiYgYXNwYXNPcGVuZWQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmREZXRlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGFzcGFzT3BlbmVkID0gIWFzcGFzT3BlbmVkO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0ZXh0W2ldID09ICdcXG4nIHx8IGVuZERldGVjdGVkKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIHRhZ3NPcGVuZWQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLkVuZCA9IGkgLSByZW1vdmVkVGFnT2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0YWdzT3BlbmVkLkNsZWFyKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB0ZXh0Lkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGV4dFtpXSA9PSAnIycpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaSArPSAyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGF1eC5BcHBlbmQodGV4dFtpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGFnbGVzc1RleHQgPSBhdXguVG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRpaDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFRhZ0luZm9Ib2xkZXJcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgTGlzdDxUYWdJbmZvPiBUYWdzID0gbmV3IExpc3Q8VGFnSW5mbz4oKTtcclxuXHJcbiAgICAgICAgaW50ZXJuYWwgVGFnSW5mbyBHZXRUYWdPZkluZGV4KGludCBjaGFySW5kZXgsIGludCB0YWdOdW1iZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgdE4gPSAwO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBUYWdzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5WYWxpZEZvclBvc2l0aW9uKGNoYXJJbmRleCkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhZ051bWJlciA9PSB0TikgcmV0dXJuIGl0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgdE4rKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFRhZ0luZm9cclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgaW50IFN0YXJ0O1xyXG4gICAgICAgIHB1YmxpYyBpbnQgRW5kO1xyXG4gICAgICAgIGNoYXJbXSBUYWcgPSBuZXcgY2hhclsyXTtcclxuXHJcbiAgICAgICAgcHVibGljIFRhZ0luZm8oaW50IHN0YXJ0LCBjaGFyIGNoYXIxLCBjaGFyIGNoYXIyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVGFnWzBdID0gY2hhcjE7XHJcbiAgICAgICAgICAgIFRhZ1sxXSA9IGNoYXIyO1xyXG4gICAgICAgICAgICB0aGlzLlN0YXJ0ID0gc3RhcnQ7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgc3RhdGljIFRhZ0luZm8gRnJvbUxhYmVsKGNoYXIgdjEsIGNoYXIgdjIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFRhZ0luZm8oMCwgdjEsIHYyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIGNoYXIgR2V0TGFiZWxDaGFyKGludCB2KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFRhZ1t2XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIGJvb2wgTGFiZWxJbmRleElzKGNoYXIgdjEsIGludCB2MilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBUYWdbdjJdID09IHYxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgYm9vbCBMYWJlbElzKGNoYXIgdjEsIGNoYXIgdjIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gVGFnWzBdID09IHYxICYmIFRhZ1sxXSA9PSB2MjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIGJvb2wgU2FtZUxhYmVsKFRhZ0luZm8gdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBUYWdbMF0gPT0gdC5UYWdbMF0gJiYgVGFnWzFdID09IHQuVGFnWzFdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgYm9vbCBWYWxpZEZvclBvc2l0aW9uKGludCBjaGFySW5kZXgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gY2hhckluZGV4ID49IFN0YXJ0ICYmIGNoYXJJbmRleCA8PSBFbmQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iLCJcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLk5vdmVsQmFzZVxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgVGFnVG9EYXRhPFQ+XHJcbiAgICB7XHJcbiAgICAgICAgTGlzdDxUYWdJbmZvPiB0YWdzID0gbmV3IExpc3Q8VGFnSW5mbz4oKTtcclxuICAgICAgICBMaXN0PFQ+IGRhdGFzID0gbmV3IExpc3Q8VD4oKTtcclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGREYXRhKFRhZ0luZm8gdGFnLCBUIGRhdGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBkYXRhcy5BZGQoZGF0YSk7XHJcbiAgICAgICAgICAgIHRhZ3MuQWRkKHRhZyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVCBHZXREYXRhKFRhZ0luZm8gdGFnKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIEdldERhdGEodGFnLCBkZWZhdWx0KFQpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUIEdldERhdGEoVGFnSW5mbyB0YWcsIFQgZGVmYXVsdFYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHRhZ3MuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRhZy5TYW1lTGFiZWwodGFnc1tpXSkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGFzW2ldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBkZWZhdWx0VjtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Ob3ZlbEJhc2Vcclxue1xyXG4gICAgcHVibGljIHN0YXRpYyBjbGFzcyBUZXN0U3Rvcmllc1xyXG4gICAge1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBzdHJpbmcgZ290ID0gQFwiJSNjcFdlIHNob3VsZCBzdGFydCBiYWNrLCUgR2FyZWQgdXJnZWQgYXMgdGhlIHdvb2RzIGJlZ2FuIHRvIGdyb3cgZGFyayBhcm91bmQgdGhlbS4gJVRoZSB3aWxkbGluZ3MgYXJlIGRlYWQuJSBcclxuJURvIHRoZSBkZWFkIGZyaWdodGVuIHlvdT8lIFNlciBXYXltYXIgUm95Y2UgYXNrZWQgd2l0aCBqdXN0IHRoZSBoaW50IG9mIGEgc21pbGUuXHJcbkdhcmVkIGRpZCBub3QgcmlzZSB0byB0aGUgYmFpdC4gSGUgd2FzIGFuIG9sZCBtYW4sIHBhc3QgZmlmdHksIGFuZCBoZSBoYWQgc2VlbiB0aGUgbG9yZGxpbmdzIGNvbWUgYW5kIGdvLiAlRGVhZCBpcyBkZWFkLCUgaGUgc2FpZC4gJVdlIGhhdmUgbm8gYnVzaW5lc3Mgd2l0aCB0aGUgZGVhZC4lXHJcbiVBcmUgdGhleSBkZWFkPyUgUm95Y2UgYXNrZWQgc29mdGx5LiAlV2hhdCBwcm9vZiBoYXZlIHdlPyVcclxuJVdpbGwgc2F3IHRoZW0sJSBHYXJlZCBzYWlkLiAlSWYgaGUgc2F5cyB0aGV5IGFyZSBkZWFkLCB0aGF04oCZcyBwcm9vZiBlbm91Z2ggZm9yIG1lLiVcclxuV2lsbCBoYWQga25vd24gdGhleSB3b3VsZCBkcmFnIGhpbSBpbnRvIHRoZSBxdWFycmVsIHNvb25lciBvciBsYXRlci4gSGUgd2lzaGVkIGl0IGhhZCBiZWVuIGxhdGVyIHJhdGhlciB0aGFuIHNvb25lci4gJU15IG1vdGhlciB0b2xkIG1lIHRoYXQgZGVhZCBtZW4gc2luZyBubyBzb25ncywlIGhlIHB1dCBpbi5cclxuJU15IHdldCBudXJzZSBzYWlkIHRoZSBzYW1lIHRoaW5nLCBXaWxsLCUgUm95Y2UgcmVwbGllZC4gJU5ldmVyIGJlbGlldmUgYW55dGhpbmcgeW91IGhlYXIgYXQgYSB3b21hbuKAmXMgdGl0LiBUaGVyZSBhcmUgdGhpbmdzIHRvIGJlIGxlYXJuZWQgZXZlbiBmcm9tIHRoZSBkZWFkLiUgSGlzIHZvaWNlIGVjaG9lZCwgdG9vIGxvdWQgaW4gdGhlIHR3aWxpdCBmb3Jlc3QuXCI7XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc3RyaW5nIEdvdCB7IGdldCB7IHJldHVybiBnb3QuUmVwbGFjZShcIiVcIixcIlxcXCJcIik7IH1cclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGdvdCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLk5vdmVsQmFzZVxyXG57XHJcbiAgICAvKlxyXG4gICAgICogXHJcbiAgICAgKiBBIGNsYXNzIHRvIHNob3cgdGV4dCBjaGFyIGJ5IGNoYXIuIEFsbCB0ZXh0IGhhcyB0byBiZSBpbnNlcnRlZCBvbiB0aGUgc2V0dXAgcGhhc2UuXHJcbiAgICAgKiBDaGFycyBjYW4gYmUgc2hvd24gdGljayBieSB0aWNrIG9yIHRocm91Z2ggYW4gdXBkYXRlIGZ1bmN0aW9uLiBcclxuICAgICAqIENhbGN1bGF0ZXMgcGFzc2FnZSBicmVha3MsIGxpbmUgYnJlYWtzIGFuZCBwYWdlIGJyZWFrc1xyXG4gICAgICogXHJcbiAgICAgKiBNYXJrZWQgYXMgb2Jzb2xldGUgYmVjYXVzZSBvdGhlciBjbGFzc2VzIHdpbGwgZG8gd2hhdCBpdCBkb2VzIGJldHRlciBidXQgd2l0aCBkeW5hbWljIHRleHQgaW5zZXJ0aW9uXHJcbiAgICAgKi9cclxuICAgIFtPYnNvbGV0ZV1cclxuICAgIHB1YmxpYyBjbGFzcyBUZXh0UmVuZGVyXHJcbiAgICB7XHJcblxyXG4gICAgICAgIGludCBpbmRleGVyID0gMDtcclxuICAgICAgICBpbnQgbGluZWJyZWFrc1Byb2dyZXNzZWQgPSAwO1xyXG4gICAgICAgIGludCB4ID0gMDtcclxuICAgICAgICBMaXN0PGludD4gcGFzc2FnZU1hcmtlcnMgPSBuZXcgTGlzdDxpbnQ+KCk7XHJcbiAgICAgICAgcHVibGljIFRleHRFbnRpdHkgVGV4dEhvbGRlcjtcclxuICAgICAgICBwcml2YXRlIFRhZ0luZm9Ib2xkZXIgdGFnSW5mbztcclxuICAgICAgICBwcml2YXRlIHN0cmluZyB0ZXh0O1xyXG4gICAgICAgIHB1YmxpYyBUZXh0V29ybGQgdGV4dFdvcmxkO1xyXG4gICAgICAgIHByaXZhdGUgTGlzdDxpbnQ+IGxpbmVCcmVha3M7XHJcbiAgICAgICAgcHJpdmF0ZSBMaXN0PGludD4gcGFnZUJyZWFrcyA9IG5ldyBMaXN0PGludD4oKTtcclxuICAgICAgICBwcml2YXRlIGludCBjaGFySW5kZXg7XHJcbiAgICAgICAgcHJpdmF0ZSBib29sIHBhc3NhZ2VEb25lO1xyXG4gICAgICAgIGZsb2F0IHRpbWVPZkNoYXIgPSAwLjAyZjtcclxuICAgICAgICBmbG9hdCB0aW1lQnVmZmVyO1xyXG4gICAgICAgIGludCBiYWNrZ3JvdW5kQ29sb3JEZWZhdWx0ID0gRGVmYXVsdFBhbGV0dGVzLkM0QmxhY2s7XHJcbiAgICAgICAgaW50IHRleHRDb2xvckRlZmF1bHQgPSBEZWZhdWx0UGFsZXR0ZXMuQzRXaGl0ZTtcclxuXHJcbiAgICAgICAgcHVibGljIFRhZ1RvRGF0YTxpbnQ+IFRhZ1RvQ29sb3IgPSBuZXcgVGFnVG9EYXRhPGludD4oKTtcclxuICAgICAgICBwcml2YXRlIGJvb2wgcXVpY2tTa2lwO1xyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBGaW5pc2hlZCB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICBpbnQgbGluZU9mZnNldDtcclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU2V0dXAoc3RyaW5nIHRleHQsIGludCB3aWR0aCwgaW50IGhlaWdodCwgVGFnSW5mb0hvbGRlciB0YWdJbmZvKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy50YWdJbmZvID0gdGFnSW5mbztcclxuICAgICAgICAgICAgdGhpcy50ZXh0ID0gdGV4dDtcclxuICAgICAgICAgICAgdGV4dFdvcmxkID0gbmV3IFRleHRXb3JsZCgpO1xyXG4gICAgICAgICAgICBpbnQgYnVmZmVyV2lkdGggPSB3aWR0aDtcclxuICAgICAgICAgICAgaW50IGJ1ZmZlckhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICAgICAgdGV4dFdvcmxkLkluaXQoYnVmZmVyV2lkdGggLSAxLCBidWZmZXJIZWlnaHQgLSAxKTtcclxuICAgICAgICAgICAgVGV4dEhvbGRlciA9IHRleHRXb3JsZC5HZXRGcmVlRW50aXR5KGJ1ZmZlcldpZHRoIC0gNCwgYnVmZmVySGVpZ2h0IC0gMik7XHJcbiAgICAgICAgICAgIFRleHRIb2xkZXIuU2V0UG9zaXRpb24oMiwgMSk7XHJcbiAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoZ290KTtcclxuICAgICAgICAgICAgLy9Db25zb2xlLlJlYWRLZXkoKTtcclxuXHJcbiAgICAgICAgICAgICNyZWdpb24gbWVzc2FnZSBwYWNpbmcgbWFya2VyXHJcblxyXG4gICAgICAgICAgICBwYXNzYWdlTWFya2Vycy5BZGQoLTEpO1xyXG4gICAgICAgICAgICBib29sIG9wZW5Bc3BhcyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpbnQgbGFzdFN0b3AgPSAtMTA7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgdGV4dC5MZW5ndGggLSAxOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChpIC0gbGFzdFN0b3AgPCAyKVxyXG4gICAgICAgICAgICAgICAgLy9pZihmYWxzZSlcclxuICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgodGV4dFtpXSA9PSAnLicgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgKHRleHRbaSArIDFdICE9ICcuJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgdGV4dFtpICsgMV0gIT0gJ1wiJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgdGV4dFtpICsgMV0gIT0gJ1xcbidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIHRleHRbaSArIDFdICE9ICdcXHInKSkpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXNzYWdlTWFya2Vycy5BZGQoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTdG9wID0gaTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRleHRbaV0gPT0gJ1wiJylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5Bc3BhcyA9ICFvcGVuQXNwYXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghb3BlbkFzcGFzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXNzYWdlTWFya2Vycy5BZGQoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0U3RvcCA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRleHRbaV0gPT0gJ1xcbicpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXNzYWdlTWFya2Vycy5BZGQoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTdG9wID0gaTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAgICAgI3JlZ2lvbiBsaW5lYnJlYWsgbWFya2VyXHJcbiAgICAgICAgICAgIGxpbmVCcmVha3MgPSBuZXcgTGlzdDxpbnQ+KCk7XHJcbiAgICAgICAgICAgIGludCB3aXNoZWRXaWR0aCA9IGJ1ZmZlcldpZHRoIC0gNDtcclxuICAgICAgICAgICAgaW50IHhQb3MgPSAwO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHRleHQuTGVuZ3RoIC0gMTsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB4UG9zKys7XHJcbiAgICAgICAgICAgICAgICBpZiAodGV4dFtpXSA9PSAnXFxuJylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsaW5lQnJlYWtzLkFkZChpKTtcclxuICAgICAgICAgICAgICAgICAgICBsaW5lQnJlYWtzLkFkZChpKTtcclxuICAgICAgICAgICAgICAgICAgICB4UG9zID0gLTE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGV4dFtpXSA9PSAnICcpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW50IHhQb3NBdXggPSB4UG9zICsgMTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBqID0gaSArIDE7IGogPCB0ZXh0Lkxlbmd0aDsgaisrKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHhQb3NBdXggPj0gd2lzaGVkV2lkdGggLSAyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZUJyZWFrcy5BZGQoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4UG9zID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRleHRbal0gIT0gJyAnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4UG9zQXV4Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRleHRbal0gPT0gJyAnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAgICAgLy9pZiB0aGUgY3VycmVudCBwYXNzYWdlIHdpbGwgYnJlYWsgdGhyb3VnaCB0aGUgcGFnZSwgbWFrZSB0aGUgc3RhcnQgb2YgdGhlIGN1cnJlbnQgcGFzc2FnZSBhIHBhZ2VicmVha2VyXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGludCBsaW5lT2Zmc2V0ID0gMDtcclxuICAgICAgICAgICAgICAgIHdoaWxlICh0cnVlKVxyXG4gICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpbnQgZGFuZ2VyTGluZSA9IFRleHRIb2xkZXIuSGVpZ2h0IC0gMSArIGxpbmVPZmZzZXQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYW5nZXJMaW5lIDwgbGluZUJyZWFrcy5Db3VudClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnQgbGluZUVuZGVyID0gbGluZUJyZWFrc1tkYW5nZXJMaW5lXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW50IGxpbmVFbmRlcjIgPSA5OTk5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGFuZ2VyTGluZSA8IGxpbmVCcmVha3MuQ291bnQgLSAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lRW5kZXIyID0gbGluZUJyZWFrc1tkYW5nZXJMaW5lICsgMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludCBwYXNzYWdlID0gLTE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gZGFuZ2VyTGluZSAtIDE7IGkgPj0gMDsgaS0tKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFzc2FnZU1hcmtlcnMuQ29udGFpbnMobGluZUJyZWFrc1tpXSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZU9mZnNldCArPSBpIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXNzYWdlID0gbGluZUJyZWFrc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFnZUJyZWFrcy5BZGQocGFzc2FnZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlY2VpdmVJbnB1dCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAocGFzc2FnZURvbmUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHBhc3NhZ2VEb25lID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBxdWlja1NraXAgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVXBkYXRlKGZsb2F0IGRlbHRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGltZUJ1ZmZlciArPSBkZWx0YTtcclxuICAgICAgICAgICAgaWYgKHF1aWNrU2tpcClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGltZUJ1ZmZlciArPSAxMDA7XHJcbiAgICAgICAgICAgICAgICBxdWlja1NraXAgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB3aGlsZSAodGltZUJ1ZmZlciA+IHRpbWVPZkNoYXIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRpbWVCdWZmZXIgLT0gdGltZU9mQ2hhcjtcclxuICAgICAgICAgICAgICAgIFRyeURyYXdOZXh0Q2hhcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBUcnlEcmF3TmV4dENoYXIoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKCFwYXNzYWdlRG9uZSkgRHJhd05leHRDaGFyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBEcmF3TmV4dENoYXIoKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIGJvb2wgRHJhd0NoYXIgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAocGFzc2FnZU1hcmtlcnMuQ291bnQgPiBpbmRleGVyICsgMSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRHJhd0NoYXIgPSBjaGFySW5kZXggPCBwYXNzYWdlTWFya2Vyc1tpbmRleGVyICsgMV0gKyAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChEcmF3Q2hhcilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy93aGlsZSAobGluZWJyZWFrc1Byb2dyZXNzZWQgLSBsaW5lT2Zmc2V0ID49IFRleHRIb2xkZXIuSGVpZ2h0KVxyXG4gICAgICAgICAgICAgICAgaWYgKHBhZ2VCcmVha3MuQ29udGFpbnMoY2hhckluZGV4KSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsaW5lT2Zmc2V0ICs9IFRleHRIb2xkZXIuSGVpZ2h0IC0gMTtcclxuICAgICAgICAgICAgICAgICAgICBsaW5lT2Zmc2V0ID0gbGluZWJyZWFrc1Byb2dyZXNzZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgVGV4dEhvbGRlci5SZXNldEZ1bGwoKTtcclxuICAgICAgICAgICAgICAgICAgICB4ID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlKFwiUEFHRSBCUkVBSyBcIiArIGNoYXJJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9Db25zb2xlLlJlYWRLZXkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoXCJucCAtIFwiK2NoYXJJbmRleCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB4Kys7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hhckluZGV4ID49IHRleHQuTGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEZpbmlzaGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjaGFyIHZhbHVlID0gdGV4dFtjaGFySW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpbmVCcmVha3MuQ29udGFpbnMoY2hhckluZGV4KSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgbGIgaW4gbGluZUJyZWFrcylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYiA9PSBjaGFySW5kZXgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVicmVha3NQcm9ncmVzc2VkKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHggPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGludCB0YWdOdW1iZXIgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGludCB0ZXh0Q29sb3IgPSB0ZXh0Q29sb3JEZWZhdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIFRhZ0luZm8gdGkgPSB0YWdJbmZvLkdldFRhZ09mSW5kZXgoY2hhckluZGV4LCB0YWdOdW1iZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICh0aSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW50IGNvbG9yID0gVGFnVG9Db2xvci5HZXREYXRhKHRpLCAtMTApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29sb3IgIT0gLTEwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0Q29sb3IgPSBjb2xvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWdOdW1iZXIrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGkgPSB0YWdJbmZvLkdldFRhZ09mSW5kZXgoY2hhckluZGV4LCB0YWdOdW1iZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBUZXh0SG9sZGVyLk9yaWdpbi5EcmF3Q2hhcih2YWx1ZSwgeCwgbGluZWJyZWFrc1Byb2dyZXNzZWQgLSBsaW5lT2Zmc2V0LCB0ZXh0Q29sb3IsIGJhY2tncm91bmRDb2xvckRlZmF1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHRXb3JsZC5EcmF3KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNoYXJJbmRleCsrO1xyXG4gICAgICAgICAgICAgICAgcGFzc2FnZURvbmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGluZGV4ZXIrKztcclxuXHJcbiAgICAgICAgICAgICAgICBwYXNzYWdlRG9uZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLk5vdmVsQmFzZVxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgVGV4dFJlbmRlckR5bmFtaWNcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIFRleHRFbnRpdHkgZW50aXR5O1xyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBJbml0KFRleHRFbnRpdHkgdGV4dClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZW50aXR5ID0gdGV4dDtcclxuICAgICAgICAgICAgdGV4dC5PcmlnaW4uU2V0Q3Vyc29yQXQoMCwwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEluc2VydFRleHQoc3RyaW5nIHRleHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlbnRpdHkuT3JpZ2luLkRyYXdfQ3Vyc29yKHRleHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucztcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guVGV4dFJlbmRlcmluZ1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgVGV4dFdvcmxkXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIFBhbGV0dGUgcGFsZXR0ZSA9IERlZmF1bHRQYWxldHRlcy5DNEtpcm9LYXplO1xyXG4gICAgICAgIExpc3Q8VGV4dEVudGl0eT4gYWN0aXZlQWdlbnRzID0gbmV3IExpc3Q8VGV4dEVudGl0eT4oKTtcclxuICAgICAgICBMaXN0PFRleHRFbnRpdHk+IGZyZWVCb2FyZHMgPSBuZXcgTGlzdDxUZXh0RW50aXR5PigpO1xyXG4gICAgICAgIExpc3Q8VGV4dEFuaW1hdGlvbj4gYW5pbWF0aW9ucyA9IG5ldyBMaXN0PFRleHRBbmltYXRpb24+KCk7XHJcbiAgICAgICAgcHVibGljIFRleHRCb2FyZCBtYWluQm9hcmQ7XHJcbiAgICAgICAgaW50IGxhdGVzdElkID0gLTE7XHJcblxyXG4gICAgICAgIHB1YmxpYyBUIEFkZEFuaW1hdGlvbjxUPihUIHRhKSB3aGVyZSBUIDogVGV4dEFuaW1hdGlvblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYW5pbWF0aW9ucy5BZGQodGEpO1xyXG4gICAgICAgICAgICB0YS5SZWdpc3Rlckxpc3RzKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0YTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEluaXQoaW50IHdpZHRoLCBpbnQgaGVpZ2h0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbWFpbkJvYXJkID0gbmV3IFRleHRCb2FyZCh3aWR0aCwgaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1haW5Cb2FyZC5SZXNldCgpO1xyXG4gICAgICAgICAgICBEcmF3Q2hpbGRyZW4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdDaGlsZHJlbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGFjdGl2ZUFnZW50cy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBhY3RpdmVBZ2VudHNbaV0uUmVzZXRBbmltYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBhbmltIGluIGFuaW1hdGlvbnMpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYW5pbS5Nb2RpZnkoYWN0aXZlQWdlbnRzW2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChhY3RpdmVBZ2VudHNbaV0uZnJlZUlmSWRsZSAmJiAhYWN0aXZlQWdlbnRzW2ldLmFuaW1hdGluZylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmcmVlQm9hcmRzLkFkZChhY3RpdmVBZ2VudHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZUFnZW50cy5SZW1vdmUoYWN0aXZlQWdlbnRzW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICBpLS07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbkJvYXJkLkluc2VydChhY3RpdmVBZ2VudHNbaV0uYW5pbWF0aW9uKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0RW50aXR5IEdldEZyZWVFbnRpdHkoaW50IHcsIGludCBoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVGV4dEVudGl0eSB0ZTtcclxuICAgICAgICAgICAgaWYgKGZyZWVCb2FyZHMuQ291bnQgPiAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0ZSA9IGZyZWVCb2FyZHNbZnJlZUJvYXJkcy5Db3VudCAtIDFdO1xyXG4gICAgICAgICAgICAgICAgZnJlZUJvYXJkcy5SZW1vdmVBdChmcmVlQm9hcmRzLkNvdW50IC0gMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0ZSA9IG5ldyBUZXh0RW50aXR5KCk7XHJcbiAgICAgICAgICAgICAgICB0ZS5pZCA9ICsrbGF0ZXN0SWQ7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBhY3RpdmVBZ2VudHMuQWRkKHRlKTtcclxuICAgICAgICAgICAgdGUuZnJlZUlmSWRsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0ZS5TZXRTaXplKHcsIGgpO1xyXG4gICAgICAgICAgICB0ZS5SZXNldEZ1bGwoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRleHRFbnRpdHkgR2V0VGVtcEVudGl0eShpbnQgdywgaW50IGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdGUgPSBHZXRGcmVlRW50aXR5KHcsIGgpO1xyXG4gICAgICAgICAgICB0ZS5mcmVlSWZJZGxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIHRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWR2YW5jZVRpbWUoZmxvYXQgdilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBhbmltIGluIGFuaW1hdGlvbnMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGFuaW0uVXBkYXRlKHYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBJc0RvbmUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGFuaW0gaW4gYW5pbWF0aW9ucylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFhbmltLklzRG9uZSgpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBUZXh0RW50aXR5XHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIGludCBpZDtcclxuICAgICAgICBwdWJsaWMgVGV4dEJvYXJkIE9yaWdpbjtcclxuICAgICAgICBwdWJsaWMgVGV4dEJvYXJkIGFuaW1hdGlvbjtcclxuICAgICAgICBwdWJsaWMgYm9vbCBmcmVlSWZJZGxlID0gZmFsc2U7XHJcbiAgICAgICAgaW50ZXJuYWwgYm9vbCBhbmltYXRpbmc7XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgSGVpZ2h0IHsgZ2V0IHsgcmV0dXJuIE9yaWdpbi5IZWlnaHQ7IH0gfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dEFuaW1hdGlvbi5CYXNlRGF0YSBBbmltQmFzZShmbG9hdCBsZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFRleHRBbmltYXRpb24uQmFzZURhdGEobGVuZ3RoLCAwLCBpZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFJlc2V0QW5pbWF0aW9uKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGFuaW1hdGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBhbmltYXRpb24uU2V0KE9yaWdpbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFJlc2V0RnVsbCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBPcmlnaW4uUmVzZXRJbnZpc2libGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgU2V0UG9zaXRpb24oaW50IHgsIGludCB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgT3JpZ2luLlBvc2l0aW9uID0gbmV3IFZlY3RvcjJEKHgseSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFNldFNpemUoaW50IHcsIGludCBoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKE9yaWdpbiA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBPcmlnaW4gPSBuZXcgVGV4dEJvYXJkKHcsIGgpO1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uID0gbmV3IFRleHRCb2FyZCh3LCBoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBPcmlnaW4uUmVzaXplKHcsIGgpO1xyXG4gICAgICAgICAgICBhbmltYXRpb24uUmVzaXplKHcsIGgpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBQb3NpdGlvbkFuaW1hdGlvbiA6IFRleHRBbmltYXRpb248UG9zaXRpb25BbmltYXRpb24uUG9zaXRpb25EYXRhPlxyXG4gICAge1xyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBNb2RpZnkoVGV4dEVudGl0eSBlbnRpdHksIFBvc2l0aW9uRGF0YSBtYWluRGF0YSwgZmxvYXQgcHJvZ3Jlc3MsIGZsb2F0IGxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuTW9kaWZ5KGVudGl0eSwgbWFpbkRhdGEsIHByb2dyZXNzLCBsZW5ndGgpO1xyXG4gICAgICAgICAgICBUZXh0Qm9hcmQgdGFyZ2V0ID0gZW50aXR5LmFuaW1hdGlvbjtcclxuICAgICAgICAgICAgaWYgKG1haW5EYXRhLnBlcm1hbmVudClcclxuICAgICAgICAgICAgICAgIHRhcmdldCA9IGVudGl0eS5PcmlnaW47XHJcbiAgICAgICAgICAgIHRhcmdldC5Qb3NpdGlvbiA9IFZlY3RvcjJELkludGVycG9sYXRlUm91bmRlZChtYWluRGF0YS5zdGFydFBvc2l0aW9uLCBtYWluRGF0YS5lbmRQb3NpdGlvbiwgcHJvZ3Jlc3MgLyBsZW5ndGgpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJ1Y3QgUG9zaXRpb25EYXRhXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgYm9vbCBwZXJtYW5lbnQ7XHJcbiAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBWZWN0b3IyRCBzdGFydFBvc2l0aW9uLCBlbmRQb3NpdGlvbjtcclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBQb3NpdGlvbkRhdGEoVmVjdG9yMkQgc3RhcnRQb3NpdGlvbiwgVmVjdG9yMkQgZW5kUG9zaXRpb24sIGJvb2wgcGVybSA9IGZhbHNlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0UG9zaXRpb24gPSBzdGFydFBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbmRQb3NpdGlvbiA9IGVuZFBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wZXJtYW5lbnQgPSBwZXJtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBjbGFzcyBUZXh0QW5pbWF0aW9uPFQ+IDogVGV4dEFuaW1hdGlvblxyXG4gICAge1xyXG4gICAgICAgIHByb3RlY3RlZCBMaXN0PFQ+IG1haW5EYXRhID0gbmV3IExpc3Q8VD4oKTtcclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBSZXF1ZXN0UmVnaXN0ZXJMaXN0cygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLlJlZ2lzdGVyTGlzdChtYWluRGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGQoQmFzZURhdGEgYmFzZURhdGEsIFQgbWFpbkQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLkFkZChiYXNlRGF0YSk7XHJcbiAgICAgICAgICAgIG1haW5EYXRhLkFkZChtYWluRCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBNb2RpZnkoVGV4dEVudGl0eSBlbnRpdHksIGludCBpbmRleCwgZmxvYXQgcHJvZ3Jlc3MsIGZsb2F0IGxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE1vZGlmeShlbnRpdHksIG1haW5EYXRhW2luZGV4XSwgcHJvZ3Jlc3MsIGxlbmd0aCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCB2b2lkIE1vZGlmeShUZXh0RW50aXR5IGVudGl0eSwgVCBtYWluRGF0YSwgZmxvYXQgcHJvZ3Jlc3MsIGZsb2F0IGxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2ludGVybmFsIG92ZXJyaWRlIHZvaWQgRXhlY3V0ZShpbnQgaW5kZXgsIEJhc2VEYXRhIGJhc2VEYXRhKVxyXG4gICAgICAgIC8ve1xyXG4gICAgICAgIC8vICAgIHRoaXMuRXhlY3V0ZShtYWluRGF0YVtpbmRleF0sIGJhc2VEYXRhKTtcclxuICAgICAgICAvL31cclxuXHJcbiAgICAgICAgLy9wdWJsaWMgYWJzdHJhY3Qgdm9pZCBFeGVjdXRlKFQgbWFpbkRhdGEsIEJhc2VEYXRhIGJhc2VEYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgY2xhc3MgVGV4dEFuaW1hdGlvblxyXG4gICAge1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RydWN0IEJhc2VEYXRhXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgZmxvYXQgbGVuZ3RoO1xyXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgZmxvYXQgcHJvZ3Jlc3M7XHJcbiAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBpbnQgdGFyZ2V0O1xyXG5cclxuICAgICAgICAgICAgcHVibGljIEJhc2VEYXRhKGZsb2F0IGxlbmd0aCwgZmxvYXQgcHJvZ3Jlc3MsIGludCB0YXJnZXQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzcyA9IHByb2dyZXNzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgTGlzdDxmbG9hdD4gbGVuZ3RoID0gbmV3IExpc3Q8ZmxvYXQ+KCk7XHJcbiAgICAgICAgTGlzdDxmbG9hdD4gcHJvZ3Jlc3MgPSBuZXcgTGlzdDxmbG9hdD4oKTtcclxuICAgICAgICBMaXN0PGludD4gdGFyZ2V0cyA9IG5ldyBMaXN0PGludD4oKTtcclxuICAgICAgICBMaXN0PElMaXN0PiBsaXN0cyA9IG5ldyBMaXN0PElMaXN0PigpO1xyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZWdpc3Rlckxpc3RzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxpc3RzLkFkZChsZW5ndGgpO1xyXG4gICAgICAgICAgICBsaXN0cy5BZGQocHJvZ3Jlc3MpO1xyXG4gICAgICAgICAgICBsaXN0cy5BZGQodGFyZ2V0cyk7XHJcbiAgICAgICAgICAgIFJlcXVlc3RSZWdpc3Rlckxpc3RzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgYWJzdHJhY3Qgdm9pZCBSZXF1ZXN0UmVnaXN0ZXJMaXN0cygpO1xyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBVcGRhdGUoZmxvYXQgZGVsdGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHByb2dyZXNzLkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHByb2dyZXNzW2ldICs9IGRlbHRhO1xyXG4gICAgICAgICAgICAgICAgaWYgKHByb2dyZXNzW2ldID49IGxlbmd0aFtpXSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBFbmRUYXNrKGkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vRXhlY3V0ZShpLCBuZXcgQmFzZURhdGEobGVuZ3RoW2ldLHByb2dyZXNzW2ldLCB0YXJnZXRzW2ldKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vaW50ZXJuYWwgYWJzdHJhY3Qgdm9pZCBFeGVjdXRlKGludCBpbmRleCwgQmFzZURhdGEgYmFzZURhdGEpO1xyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIEFkZChCYXNlRGF0YSBiZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHByb2dyZXNzLkFkZChiZC5wcm9ncmVzcyk7XHJcbiAgICAgICAgICAgIHRhcmdldHMuQWRkKGJkLnRhcmdldCk7XHJcbiAgICAgICAgICAgIGxlbmd0aC5BZGQoYmQubGVuZ3RoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIElzRG9uZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBsaXN0cylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uQ291bnQgIT0gcHJvZ3Jlc3MuQ291bnQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RyaW5nIHMgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIHMuVHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBwcm9ncmVzcy5Db3VudCA9PSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBFbmRUYXNrKGludCBpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGwgaW4gbGlzdHMpXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsLlJlbW92ZUF0KGkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFJlZ2lzdGVyTGlzdChJTGlzdCBtYWluRGF0YSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxpc3RzLkFkZChtYWluRGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIE1vZGlmeShUZXh0RW50aXR5IGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHByb2dyZXNzLkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChhLmlkID09IHRhcmdldHNbaV0pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgTW9kaWZ5KGEsIGksIHByb2dyZXNzW2ldLCBsZW5ndGhbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGEuYW5pbWF0aW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgdm9pZCBNb2RpZnkoVGV4dEVudGl0eSBlbnRpdHksIGludCBpbmRleCwgZmxvYXQgcHJvZ3Jlc3MsIGZsb2F0IGxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5UZXh0UmVuZGVyaW5nXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBQYWxldHRlXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0cmluZ1tdIEh0bWxDb2xvcnM7XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgUGFsZXR0ZShwYXJhbXMgc3RyaW5nW10gY29sb3JzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgSHRtbENvbG9ycyA9IGNvbG9ycztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIERlZmF1bHRQYWxldHRlc1xyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgUGFsZXR0ZSBDNEtpcm9LYXplID0gbmV3IFBhbGV0dGUoXCIjMzMyYzUwXCIsIFwiIzQ2ODc4ZlwiLCBcIiM5NGUzNDRcIiwgXCIjZTJmM2U0XCIpO1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgUGFsZXR0ZSBDNFJlYWRlciA9IG5ldyBQYWxldHRlKFwiIzI2MjYyNlwiLCBcIiM4YjhjYmFcIiwgXCIjOGJiYTkxXCIsIFwiIzY0OWY4ZFwiKTtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIFBhbGV0dGUgQzROb3ZlbCA9IG5ldyBQYWxldHRlKFwiIzI2MjYyNlwiLCBcIiMzNDJkNDFcIiwgXCIjYjhiOGI4XCIsIFwiIzhiOGNiYVwiKTtcclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IEM0QmxhY2sgPSAwO1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBpbnQgQzRCbGFja05ldXRyYWwgPSAxO1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBpbnQgQzRXaGl0ZU5ldXRyYWwgPSAyO1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBpbnQgQzRXaGl0ZSA9IDM7XHJcblxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guVGV4dFJlbmRlcmluZ1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgVGV4dEJvYXJkXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGNoYXIgTk9DSEFOR0VDSEFSID0gKGNoYXIpMTtcclxuICAgICAgICBwdWJsaWMgY29uc3QgY2hhciBJTlZJU0lCTEVDSEFSID0gKGNoYXIpMjtcclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IE5PQ0hBTkdFQ09MT1IgPSAtMjtcclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IElOVklTSUJMRUNPTE9SID0gLTE7XHJcbiAgICAgICAgY2hhclssXSBjaGFycztcclxuICAgICAgICBwdWJsaWMgaW50WyxdIFRleHRDb2xvciB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgaW50WyxdIEJhY2tDb2xvciB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICAvL1N0cmluZ0J1aWxkZXIgc3RyaW5nQnVpbGRlciA9IG5ldyBTdHJpbmdCdWlsZGVyKCk7XHJcbiAgICAgICAgaW50IGN1cnNvclggPSAwO1xyXG4gICAgICAgIGludCBjdXJzb3JZID0gMDtcclxuICAgICAgICBwdWJsaWMgVmVjdG9yMkQgUG9zaXRpb24geyBnZXQ7IHNldDsgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIFRleHRCb2FyZChpbnQgd2lkdGgsIGludCBoZWlnaHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL1NldE1heFNpemUod2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgICAgIFJlc2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdPbkNlbnRlcihzdHJpbmcgbWVzc2FnZSwgaW50IGNvbG9yLCBpbnQgeE9mZiA9IDAsIGludCB5T2ZmID0gMCwgYm9vbCBhbGlnblN0cmluZyA9IHRydWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgeCA9IChXaWR0aCkgLyAyO1xyXG4gICAgICAgICAgICBpZiAoYWxpZ25TdHJpbmcpIHggLT0gbWVzc2FnZS5MZW5ndGggLyAyO1xyXG4gICAgICAgICAgICBpbnQgeSA9IEhlaWdodCAvIDI7XHJcbiAgICAgICAgICAgIERyYXcobWVzc2FnZSwgeCArIHhPZmYsIHkgKyB5T2ZmLCBjb2xvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBcclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIFNldE1heFNpemUoaW50IHdpZHRoLCBpbnQgaGVpZ2h0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2hhcnMgPSBuZXcgY2hhclt3aWR0aCwgaGVpZ2h0XTtcclxuICAgICAgICAgICAgVGV4dENvbG9yID0gbmV3IGludFt3aWR0aCwgaGVpZ2h0XTtcclxuICAgICAgICAgICAgQmFja0NvbG9yID0gbmV3IGludFt3aWR0aCwgaGVpZ2h0XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlc2V0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIERyYXdSZXBlYXRlZCgnICcsIDAsIDAsIFdpZHRoLCBIZWlnaHQsIDAsIDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVzZXRJbnZpc2libGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRHJhd1JlcGVhdGVkKElOVklTSUJMRUNIQVIsIDAsIDAsIFdpZHRoLCBIZWlnaHQsIElOVklTSUJMRUNPTE9SLCBJTlZJU0lCTEVDT0xPUik7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIGludCBXaWR0aCB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgSW5zZXJ0KFRleHRCb2FyZCBzZWNvbmRCb2FyZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgc2Vjb25kQm9hcmQuV2lkdGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IDA7IGogPCBzZWNvbmRCb2FyZC5IZWlnaHQ7IGorKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnQgeCA9IChpbnQpc2Vjb25kQm9hcmQuUG9zaXRpb24uWCArIGk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW50IHkgPSAoaW50KXNlY29uZEJvYXJkLlBvc2l0aW9uLlkgKyBqO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWNvbmRCb2FyZC5jaGFyc1tpLCBqXSAhPSBJTlZJU0lCTEVDSEFSKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFyc1t4LCB5XSA9IHNlY29uZEJvYXJkLmNoYXJzW2ksIGpdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWNvbmRCb2FyZC5UZXh0Q29sb3JbaSwgal0gIT0gSU5WSVNJQkxFQ09MT1IpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRleHRDb2xvclt4LCB5XSA9IHNlY29uZEJvYXJkLlRleHRDb2xvcltpLCBqXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2Vjb25kQm9hcmQuQmFja0NvbG9yW2ksIGpdICE9IElOVklTSUJMRUNPTE9SKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBCYWNrQ29sb3JbeCwgeV0gPSBzZWNvbmRCb2FyZC5CYWNrQ29sb3JbaSwgal07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgSGVpZ2h0IHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBpbnQgQ3Vyc29yWFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIGN1cnNvclg7IH1cclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGN1cnNvclggPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgaW50IEN1cnNvclkgeyBnZXQgeyByZXR1cm4gY3Vyc29yWTsgfVxyXG4gICAgICAgICAgICBzZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yWSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3T25lRGlnaXQoaW50IGksIGludCB4LCBpbnQgeSwgaW50IGNvbG9yID0gTk9DSEFOR0VDT0xPUilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNoYXIgYyA9IChjaGFyKShpICsgJzAnKTtcclxuICAgICAgICAgICAgRHJhd0NoYXIoYywgeCwgeSwgY29sb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBTZXQoVGV4dEJvYXJkIG9yaWdpbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuUG9zaXRpb24gPSBvcmlnaW4uUG9zaXRpb247XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgV2lkdGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IDA7IGogPCBIZWlnaHQ7IGorKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYXJzW2ksIGpdID0gb3JpZ2luLmNoYXJzW2ksIGpdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQmFja0NvbG9yW2ksIGpdID0gb3JpZ2luLkJhY2tDb2xvcltpLCBqXTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlRleHRDb2xvcltpLCBqXSA9IG9yaWdpbi5UZXh0Q29sb3JbaSwgal07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgUmVzaXplKGludCB3LCBpbnQgaClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChjaGFycyA9PSBudWxsIHx8IHcgPiBjaGFycy5HZXRMZW5ndGgoMCkgfHwgaCA+IGNoYXJzLkdldExlbmd0aCgxKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgU2V0TWF4U2l6ZSh3LCBoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBXaWR0aCA9IHc7XHJcbiAgICAgICAgICAgIEhlaWdodCA9IGg7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNoYXIgQ2hhckF0KGludCBpLCBpbnQgailcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBjaGFyc1tpLCBqXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNldEN1cnNvckF0KGludCB4LCBpbnQgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGN1cnNvclggPSB4O1xyXG4gICAgICAgICAgICBjdXJzb3JZID0geTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdfQ3Vyc29yKHN0cmluZyB2KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGMgaW4gdilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRHJhd19DdXJzb3IoYyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdfQ3Vyc29yKHN0cmluZyB2LCBpbnQgY29sb3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgYyBpbiB2KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBEcmF3X0N1cnNvcihjLCBjb2xvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIGJvb2wgQ2FuRHJhd19DdXJzb3JfU21hcnRMaW5lQnJlYWsoc3RyaW5nIHYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgY3VycmVudFggPSBjdXJzb3JYO1xyXG4gICAgICAgICAgICBpbnQgY3VycmVudFkgPSBjdXJzb3JZO1xyXG5cclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB2Lkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBib29sIGxpbmVCcmVhayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYm9vbCBzaG91bGRDaGVja0ZvckxpbmVCcmVha3MgPSAoaSA9PSAwIHx8IHZbaV0gPT0gJyAnKSAmJiBpICE9IHYuTGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgICAgIGlmIChzaG91bGRDaGVja0ZvckxpbmVCcmVha3MpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IDE7IGogPCB2Lkxlbmd0aCAtIGk7IGorKylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChqICsgY3VycmVudFggPj0gV2lkdGgpIC8vcmVhY2ggZW5kIG9mIHRoZSBsaW5lIHdpdGhvdXQgZW5kaW5nIHRoZSB3b3JkLCBzaG91bGQgbGluZSBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodltpXSA9PSAnICcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSsrOyAvL3NraXAgdGhyb3VnaCB0aGUgc3BhY2UgaWYgaXQncyBhIG5ldyBsaW5lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lQnJlYWsgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZbaSArIGpdID09ICcgJykgLy9uZXcgd29yZCBiZWdpbnMgc28gbm8gbmVlZCB0byBsaW5lIGJyZWFrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGxpbmVCcmVhaylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50WSsrO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRYID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGN1cnJlbnRYKys7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFggPj0gV2lkdGgpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFkrKztcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50WCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFggPj0gV2lkdGggfHwgY3VycmVudFkgPj0gSGVpZ2h0KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIERyYXdDdXJzb3JSZXN1bHQgRHJhd19DdXJzb3JfU21hcnRMaW5lQnJlYWsoc3RyaW5nIHYsIGludCBjb2xvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCBvZmZTdGFydCA9IDA7XHJcbiAgICAgICAgICAgIGludCBvZmZFbmQgPSB2Lkxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgIHJldHVybiBEcmF3X0N1cnNvcl9TbWFydExpbmVCcmVhayh2LCBjb2xvciwgb2ZmU3RhcnQsIG9mZkVuZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRHJhd0N1cnNvclJlc3VsdCBEcmF3X0N1cnNvcl9TbWFydExpbmVCcmVhayhzdHJpbmcgdiwgaW50IGNvbG9yLCBpbnQgb2ZmU3RhcnQsIGludCBvZmZFbmQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgZW5kSW5kZXggPSBvZmZFbmQgKyAxO1xyXG4gICAgICAgICAgICBWZWN0b3IyRCBzdGFydCA9IG5ldyBWZWN0b3IyRChDdXJzb3JYLCBDdXJzb3JZKTtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IG9mZlN0YXJ0OyBpIDwgZW5kSW5kZXg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW50IG9yaWdpblggPSBjdXJzb3JYO1xyXG4gICAgICAgICAgICAgICAgYm9vbCBsaW5lQnJlYWsgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGJvb2wgc2hvdWxkQ2hlY2tGb3JMaW5lQnJlYWtzID0gKGkgPT0gMCB8fCB2W2ldID09ICcgJykgJiYgaSAhPSBlbmRJbmRleCAtIDE7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2hvdWxkQ2hlY2tGb3JMaW5lQnJlYWtzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSAxOyBqIDwgZW5kSW5kZXggLSBpOyBqKyspXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaiArIG9yaWdpblggPj0gV2lkdGgpIC8vcmVhY2ggZW5kIG9mIHRoZSBsaW5lIHdpdGhvdXQgZW5kaW5nIHRoZSB3b3JkLCBzaG91bGQgbGluZSBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodltpXSA9PSAnICcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSsrOyAvL3NraXAgdGhyb3VnaCB0aGUgc3BhY2UgaWYgaXQncyBhIG5ldyBsaW5lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lQnJlYWsgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZbaSArIGpdID09ICcgJykgLy9uZXcgd29yZCBiZWdpbnMgc28gbm8gbmVlZCB0byBsaW5lIGJyZWFrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGxpbmVCcmVhaylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBDdXJzb3JOZXdMaW5lKDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgRHJhd19DdXJzb3IodltpXSwgY29sb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFZlY3RvcjJEIGVuZCA9IG5ldyBWZWN0b3IyRChDdXJzb3JYLCBDdXJzb3JZKTtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBEcmF3Q3Vyc29yUmVzdWx0KFBvc2l0aW9uVG9JbmRleChzdGFydCksIFBvc2l0aW9uVG9JbmRleChlbmQpLCBzdGFydCwgZW5kKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgaW50IFBvc2l0aW9uVG9JbmRleChWZWN0b3IyRCBzdGFydClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoaW50KShzdGFydC5YICsgc3RhcnQuWSAqIFdpZHRoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdPbmVEaWdpdF9DdXJzb3IoaW50IGkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBEcmF3X0N1cnNvcigoY2hhcikoaSArICcwJykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd19DdXJzb3IoY2hhciBjKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIERyYXdDaGFyKGMsIGN1cnNvclgsIGN1cnNvclkpO1xyXG4gICAgICAgICAgICBBZHZhbmNlQ3Vyc29yKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3X0N1cnNvcihjaGFyIGMsIGludCBjb2xvcilcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICBEcmF3Q2hhcihjLCBjdXJzb3JYLCBjdXJzb3JZLCBjb2xvcik7XHJcbiAgICAgICAgICAgIEFkdmFuY2VDdXJzb3IoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBBZHZhbmNlQ3Vyc29yKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGN1cnNvclgrKztcclxuICAgICAgICAgICAgaWYgKGN1cnNvclggPj0gV2lkdGgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGN1cnNvclggPSAwO1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yWSsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBDdXJzb3JOZXdMaW5lKGludCB4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY3Vyc29yWSsrO1xyXG4gICAgICAgICAgICBjdXJzb3JYID0geDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdDaGFyKGNoYXIgdiwgaW50IHgsIGludCB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICh2ICE9IE5PQ0hBTkdFQ0hBUikge1xyXG4gICAgICAgICAgICAgICAgY2hhcnNbeCwgeV0gPSB2O1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3Q2hhcihjaGFyIHYsIGludCB4LCBpbnQgeSwgaW50IGNvbG9yLCBpbnQgYmFja0NvbG9yID0gTk9DSEFOR0VDT0xPUilcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICBEcmF3Q2hhcih2LCB4LCB5KTtcclxuICAgICAgICAgICAgU2V0Q29sb3IoY29sb3IsIHgsIHkpO1xyXG4gICAgICAgICAgICBTZXRCYWNrQ29sb3IoYmFja0NvbG9yLCB4LCB5KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgU2V0QWxsKGNoYXIgdGV4dCwgaW50IHRleHRDb2xvciwgaW50IGJhY2tDb2xvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIERyYXdSZXBlYXRlZCh0ZXh0LCAwLCAwLCBXaWR0aCwgSGVpZ2h0LCB0ZXh0Q29sb3IsIGJhY2tDb2xvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3V2l0aEdyaWQoc3RyaW5nIHRleHQsIGludCB4LCBpbnQgeSwgaW50IGdyaWRDb2xvciwgaW50IHRleHRDb2xvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCB3aWR0aCA9IHRleHQuTGVuZ3RoO1xyXG4gICAgICAgICAgICBEcmF3R3JpZCh4LCB5LCB3aWR0aCArIDIsIDMsIGdyaWRDb2xvcik7XHJcbiAgICAgICAgICAgIERyYXcodGV4dCwgeCArIDEsIHkgKyAxLCB0ZXh0Q29sb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhdyhzdHJpbmcgdiwgaW50IHgsIGludCB5LCBpbnQgY29sb3IsIGludCBiYWNrQ29sb3IgPSBOT0NIQU5HRUNPTE9SKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB2Lkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbnQgeDIgPSB4ICsgaTtcclxuICAgICAgICAgICAgICAgIGludCB5MiA9IHk7XHJcbiAgICAgICAgICAgICAgICBpZih4MiA+PSBXaWR0aClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB4MiAtPSBXaWR0aDtcclxuICAgICAgICAgICAgICAgICAgICB5MisrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgRHJhd0NoYXIodltpXSwgeDIsIHkyLCBjb2xvciwgYmFja0NvbG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhdyhJRW51bWVyYWJsZTxjaGFyPiB2LCBpbnQgeCwgaW50IHksIGludCBjb2xvciwgaW50IGJhY2tDb2xvciA9IE5PQ0hBTkdFQ09MT1IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuQ291bnQ8Y2hhcj4odik7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRHJhd0NoYXIoU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5FbGVtZW50QXQ8Y2hhcj4odixpKSwgeCArIGksIHksIGNvbG9yLCBiYWNrQ29sb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3R3JpZChpbnQgeCwgaW50IHksIGludCB3aWR0aCwgaW50IGhlaWdodCwgaW50IGNvbG9yKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIERyYXdSZXBlYXRlZCgnfCcsIHgsIHksIDEsIGhlaWdodCwgY29sb3IpO1xyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWQoJ3wnLCB4ICsgd2lkdGggLSAxLCB5LCAxLCBoZWlnaHQsIGNvbG9yKTtcclxuICAgICAgICAgICAgRHJhd1JlcGVhdGVkKCctJywgeCwgeSwgd2lkdGgsIDEsIGNvbG9yKTtcclxuICAgICAgICAgICAgRHJhd1JlcGVhdGVkKCctJywgeCwgeSArIGhlaWdodCAtIDEsIHdpZHRoLCAxLCBjb2xvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3UmVwZWF0ZWQoY2hhciBjLCBpbnQgeCwgaW50IHksIGludCB3aWR0aCwgaW50IGhlaWdodCwgaW50IGNvbG9yLCBpbnQgYmFja0NvbG9yID0gTk9DSEFOR0VDT0xPUilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSB4OyBpIDwgeCArIHdpZHRoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSB5OyBqIDwgeSArIGhlaWdodDsgaisrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIERyYXdDaGFyKGMsIGksIGosIGNvbG9yKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgU2V0QmFja0NvbG9yKGJhY2tDb2xvciwgaSwgaik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNldENvbG9yKGludCBjb2xvciwgaW50IHgsIGludCB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGNvbG9yICE9IE5PQ0hBTkdFQ09MT1IpXHJcbiAgICAgICAgICAgICAgICBUZXh0Q29sb3JbeCwgeV0gPSBjb2xvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNldEJhY2tDb2xvcihpbnQgY29sb3IsIGludCB4LCBpbnQgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChjb2xvciAhPSBOT0NIQU5HRUNPTE9SKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBCYWNrQ29sb3JbeCwgeV0gPSBjb2xvcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhdyhzdHJpbmcgdiwgaW50IHgyLCBpbnQgeTIsIG9iamVjdCBpbnB1dClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd0dyaWQoaW50IHYxLCBpbnQgdjIsIGludCB2MywgaW50IHY0LCBvYmplY3QgYm9hcmQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgTm90SW1wbGVtZW50ZWRFeGNlcHRpb24oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJ1Y3QgRHJhd0N1cnNvclJlc3VsdFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIGludCBTdGFydEluZGV4O1xyXG4gICAgICAgICAgICBwdWJsaWMgaW50IEVuZEluZGV4O1xyXG4gICAgICAgICAgICBwdWJsaWMgVmVjdG9yMkQgU3RhcnRQb3NpdGlvbjtcclxuICAgICAgICAgICAgcHVibGljIFZlY3RvcjJEIEVuZFBvc2l0aW9uO1xyXG5cclxuICAgICAgICAgICAgcHVibGljIERyYXdDdXJzb3JSZXN1bHQoaW50IHN0YXJ0SW5kZXgsIGludCBlbmRJbmRleCwgVmVjdG9yMkQgc3RhcnRQb3NpdGlvbiwgVmVjdG9yMkQgZW5kUG9zaXRpb24pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFN0YXJ0SW5kZXggPSBzdGFydEluZGV4O1xyXG4gICAgICAgICAgICAgICAgRW5kSW5kZXggPSBlbmRJbmRleDtcclxuICAgICAgICAgICAgICAgIFN0YXJ0UG9zaXRpb24gPSBzdGFydFBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgRW5kUG9zaXRpb24gPSBlbmRQb3NpdGlvbjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG4vL3VzaW5nIFN5c3RlbS5EcmF3aW5nO1xyXG51c2luZyBTeXN0ZW0uR2xvYmFsaXphdGlvbjtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guVGV4dFJlbmRlcmluZ1xyXG57XHJcbiAgICBbU2VyaWFsaXphYmxlXVxyXG4gICAgcHVibGljIHN0cnVjdCBWZWN0b3IyRCA6IElFcXVhdGFibGU8VmVjdG9yMkQ+XHJcbiAgICB7XHJcbiAgICAgICAgI3JlZ2lvbiBQcml2YXRlIEZpZWxkc1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBWZWN0b3IyRCB6ZXJvVmVjdG9yID0gbmV3IFZlY3RvcjJEKDBmLCAwZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yMkQgdW5pdFZlY3RvciA9IG5ldyBWZWN0b3IyRCgxZiwgMWYpO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFZlY3RvcjJEIHVuaXRYVmVjdG9yID0gbmV3IFZlY3RvcjJEKDFmLCAwZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yMkQgdW5pdFlWZWN0b3IgPSBuZXcgVmVjdG9yMkQoMGYsIDFmKTtcclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQcml2YXRlIEZpZWxkc1xyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQdWJsaWMgRmllbGRzXHJcblxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBYO1xyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBZO1xyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIFB1YmxpYyBGaWVsZHNcclxuXHJcbiAgICAgICAgIyByZWdpb24gUHVibGljIFByb3BlcnRpZXNcclxuXHJcbiAgICAgICAgcHVibGljIGludCBYSW50IHsgZ2V0IHsgcmV0dXJuIChpbnQpWDsgfSB9XHJcbiAgICAgICAgcHVibGljIGludCBZSW50IHsgZ2V0IHsgcmV0dXJuIChpbnQpIFk7IH0gfVxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIFB1YmxpYyBQcm9wZXJ0aWVzXHJcblxyXG4gICAgICAgICNyZWdpb24gQ29uc3RhbnRzXHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQcm9wZXJ0aWVzXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgWmVyb1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIHplcm9WZWN0b3I7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgT25lXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gdW5pdFZlY3RvcjsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBVbml0WFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIHVuaXRYVmVjdG9yOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIFVuaXRZXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gdW5pdFlWZWN0b3I7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gUHJvcGVydGllc1xyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBDb25zdHJ1Y3RvcnNcclxuXHJcbiAgICAgICAgcHVibGljIFZlY3RvcjJEKGZsb2F0IHgsIGZsb2F0IHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlggPSB4O1xyXG4gICAgICAgICAgICB0aGlzLlkgPSB5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFZlY3RvcjJEKGZsb2F0IHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5YID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuWSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBJbnRlcnBvbGF0ZVJvdW5kZWQoVmVjdG9yMkQgc3RhcnRQb3NpdGlvbiwgVmVjdG9yMkQgZW5kUG9zaXRpb24sIGZsb2F0IHJhdGlvKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIChzdGFydFBvc2l0aW9uICogKDEgLSByYXRpbykgKyBlbmRQb3NpdGlvbiAqIHJhdGlvKS5Sb3VuZCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBWZWN0b3IyRCBSb3VuZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjJEKChmbG9hdClNYXRoLlJvdW5kKFgpLCAoZmxvYXQpTWF0aC5Sb3VuZChZKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIENvbnN0cnVjdG9yc1xyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQdWJsaWMgTWV0aG9kc1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIEFkZChWZWN0b3IyRCB2YWx1ZTEsIFZlY3RvcjJEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICs9IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSArPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBBZGQocmVmIFZlY3RvcjJEIHZhbHVlMSwgcmVmIFZlY3RvcjJEIHZhbHVlMiwgb3V0IFZlY3RvcjJEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUxLlggKyB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSArIHZhbHVlMi5ZO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZmxvYXQgRGlzdGFuY2UoVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCB2MSA9IHZhbHVlMS5YIC0gdmFsdWUyLlgsIHYyID0gdmFsdWUxLlkgLSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmV0dXJuIChmbG9hdClNYXRoLlNxcnQoKHYxICogdjEpICsgKHYyICogdjIpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBEaXN0YW5jZShyZWYgVmVjdG9yMkQgdmFsdWUxLCByZWYgVmVjdG9yMkQgdmFsdWUyLCBvdXQgZmxvYXQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgdjEgPSB2YWx1ZTEuWCAtIHZhbHVlMi5YLCB2MiA9IHZhbHVlMS5ZIC0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IChmbG9hdClNYXRoLlNxcnQoKHYxICogdjEpICsgKHYyICogdjIpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZmxvYXQgRGlzdGFuY2VTcXVhcmVkKFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgdjEgPSB2YWx1ZTEuWCAtIHZhbHVlMi5YLCB2MiA9IHZhbHVlMS5ZIC0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJldHVybiAodjEgKiB2MSkgKyAodjIgKiB2Mik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgRGlzdGFuY2VTcXVhcmVkKHJlZiBWZWN0b3IyRCB2YWx1ZTEsIHJlZiBWZWN0b3IyRCB2YWx1ZTIsIG91dCBmbG9hdCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCB2MSA9IHZhbHVlMS5YIC0gdmFsdWUyLlgsIHYyID0gdmFsdWUxLlkgLSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmVzdWx0ID0gKHYxICogdjEpICsgKHYyICogdjIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBEaXZpZGUoVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAvPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgLz0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgRGl2aWRlKHJlZiBWZWN0b3IyRCB2YWx1ZTEsIHJlZiBWZWN0b3IyRCB2YWx1ZTIsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YIC8gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgLyB2YWx1ZTIuWTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgRGl2aWRlKFZlY3RvcjJEIHZhbHVlMSwgZmxvYXQgZGl2aWRlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IGZhY3RvciA9IDEgLyBkaXZpZGVyO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAqPSBmYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICo9IGZhY3RvcjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBEaXZpZGUocmVmIFZlY3RvcjJEIHZhbHVlMSwgZmxvYXQgZGl2aWRlciwgb3V0IFZlY3RvcjJEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IGZhY3RvciA9IDEgLyBkaXZpZGVyO1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YICogZmFjdG9yO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZhbHVlMS5ZICogZmFjdG9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBmbG9hdCBEb3QoVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKHZhbHVlMS5YICogdmFsdWUyLlgpICsgKHZhbHVlMS5ZICogdmFsdWUyLlkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIERvdChyZWYgVmVjdG9yMkQgdmFsdWUxLCByZWYgVmVjdG9yMkQgdmFsdWUyLCBvdXQgZmxvYXQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gKHZhbHVlMS5YICogdmFsdWUyLlgpICsgKHZhbHVlMS5ZICogdmFsdWUyLlkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGJvb2wgRXF1YWxzKG9iamVjdCBvYmopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAob2JqIGlzIFZlY3RvcjJEKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gRXF1YWxzKChWZWN0b3IyRCl0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgRXF1YWxzKFZlY3RvcjJEIG90aGVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIChYID09IG90aGVyLlgpICYmIChZID09IG90aGVyLlkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBSZWZsZWN0KFZlY3RvcjJEIHZlY3RvciwgVmVjdG9yMkQgbm9ybWFsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVmVjdG9yMkQgcmVzdWx0O1xyXG4gICAgICAgICAgICBmbG9hdCB2YWwgPSAyLjBmICogKCh2ZWN0b3IuWCAqIG5vcm1hbC5YKSArICh2ZWN0b3IuWSAqIG5vcm1hbC5ZKSk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmVjdG9yLlggLSAobm9ybWFsLlggKiB2YWwpO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZlY3Rvci5ZIC0gKG5vcm1hbC5ZICogdmFsKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBSZWZsZWN0KHJlZiBWZWN0b3IyRCB2ZWN0b3IsIHJlZiBWZWN0b3IyRCBub3JtYWwsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCB2YWwgPSAyLjBmICogKCh2ZWN0b3IuWCAqIG5vcm1hbC5YKSArICh2ZWN0b3IuWSAqIG5vcm1hbC5ZKSk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmVjdG9yLlggLSAobm9ybWFsLlggKiB2YWwpO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZlY3Rvci5ZIC0gKG5vcm1hbC5ZICogdmFsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBpbnQgR2V0SGFzaENvZGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFguR2V0SGFzaENvZGUoKSArIFkuR2V0SGFzaENvZGUoKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgZmxvYXQgTGVuZ3RoKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoZmxvYXQpTWF0aC5TcXJ0KChYICogWCkgKyAoWSAqIFkpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBMZW5ndGhTcXVhcmVkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoWCAqIFgpICsgKFkgKiBZKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBNYXgoVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjJEKHZhbHVlMS5YID4gdmFsdWUyLlggPyB2YWx1ZTEuWCA6IHZhbHVlMi5YLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUxLlkgPiB2YWx1ZTIuWSA/IHZhbHVlMS5ZIDogdmFsdWUyLlkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1heChyZWYgVmVjdG9yMkQgdmFsdWUxLCByZWYgVmVjdG9yMkQgdmFsdWUyLCBvdXQgVmVjdG9yMkQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2YWx1ZTEuWCA+IHZhbHVlMi5YID8gdmFsdWUxLlggOiB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSA+IHZhbHVlMi5ZID8gdmFsdWUxLlkgOiB2YWx1ZTIuWTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgTWluKFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyRCh2YWx1ZTEuWCA8IHZhbHVlMi5YID8gdmFsdWUxLlggOiB2YWx1ZTIuWCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlMS5ZIDwgdmFsdWUyLlkgPyB2YWx1ZTEuWSA6IHZhbHVlMi5ZKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNaW4ocmVmIFZlY3RvcjJEIHZhbHVlMSwgcmVmIFZlY3RvcjJEIHZhbHVlMiwgb3V0IFZlY3RvcjJEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUxLlggPCB2YWx1ZTIuWCA/IHZhbHVlMS5YIDogdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgPCB2YWx1ZTIuWSA/IHZhbHVlMS5ZIDogdmFsdWUyLlk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIE11bHRpcGx5KFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggKj0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICo9IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBNdWx0aXBseShWZWN0b3IyRCB2YWx1ZTEsIGZsb2F0IHNjYWxlRmFjdG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICo9IHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE11bHRpcGx5KHJlZiBWZWN0b3IyRCB2YWx1ZTEsIGZsb2F0IHNjYWxlRmFjdG9yLCBvdXQgVmVjdG9yMkQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2YWx1ZTEuWCAqIHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZhbHVlMS5ZICogc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTXVsdGlwbHkocmVmIFZlY3RvcjJEIHZhbHVlMSwgcmVmIFZlY3RvcjJEIHZhbHVlMiwgb3V0IFZlY3RvcjJEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUxLlggKiB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSAqIHZhbHVlMi5ZO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBOZWdhdGUoVmVjdG9yMkQgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZS5YID0gLXZhbHVlLlg7XHJcbiAgICAgICAgICAgIHZhbHVlLlkgPSAtdmFsdWUuWTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE5lZ2F0ZShyZWYgVmVjdG9yMkQgdmFsdWUsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IC12YWx1ZS5YO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IC12YWx1ZS5ZO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgTm9ybWFsaXplKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IHZhbCA9IDEuMGYgLyAoZmxvYXQpTWF0aC5TcXJ0KChYICogWCkgKyAoWSAqIFkpKTtcclxuICAgICAgICAgICAgWCAqPSB2YWw7XHJcbiAgICAgICAgICAgIFkgKj0gdmFsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBOb3JtYWxpemUoVmVjdG9yMkQgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCB2YWwgPSAxLjBmIC8gKGZsb2F0KU1hdGguU3FydCgodmFsdWUuWCAqIHZhbHVlLlgpICsgKHZhbHVlLlkgKiB2YWx1ZS5ZKSk7XHJcbiAgICAgICAgICAgIHZhbHVlLlggKj0gdmFsO1xyXG4gICAgICAgICAgICB2YWx1ZS5ZICo9IHZhbDtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE5vcm1hbGl6ZShyZWYgVmVjdG9yMkQgdmFsdWUsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCB2YWwgPSAxLjBmIC8gKGZsb2F0KU1hdGguU3FydCgodmFsdWUuWCAqIHZhbHVlLlgpICsgKHZhbHVlLlkgKiB2YWx1ZS5ZKSk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUuWCAqIHZhbDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZS5ZICogdmFsO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIFN1YnRyYWN0KFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggLT0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZIC09IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIFN1YnRyYWN0KHJlZiBWZWN0b3IyRCB2YWx1ZTEsIHJlZiBWZWN0b3IyRCB2YWx1ZTIsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YIC0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgLSB2YWx1ZTIuWTtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVG9TdHJpbmcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ3VsdHVyZUluZm8gY3VycmVudEN1bHR1cmUgPSBDdWx0dXJlSW5mby5DdXJyZW50Q3VsdHVyZTtcclxuICAgICAgICAgICAgcmV0dXJuIHN0cmluZy5Gb3JtYXQoY3VycmVudEN1bHR1cmUsIFwie3tYOnswfSBZOnsxfX19XCIsIG5ldyBvYmplY3RbXSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlguVG9TdHJpbmcoY3VycmVudEN1bHR1cmUpLCB0aGlzLlkuVG9TdHJpbmcoY3VycmVudEN1bHR1cmUpIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQdWJsaWMgTWV0aG9kc1xyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBPcGVyYXRvcnNcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBvcGVyYXRvciAtKFZlY3RvcjJEIHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUuWCA9IC12YWx1ZS5YO1xyXG4gICAgICAgICAgICB2YWx1ZS5ZID0gLXZhbHVlLlk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJvb2wgb3BlcmF0b3IgPT0oVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxLlggPT0gdmFsdWUyLlggJiYgdmFsdWUxLlkgPT0gdmFsdWUyLlk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIG9wZXJhdG9yICE9KFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMS5YICE9IHZhbHVlMi5YIHx8IHZhbHVlMS5ZICE9IHZhbHVlMi5ZO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgb3BlcmF0b3IgKyhWZWN0b3IyRCB2YWx1ZTEsIFZlY3RvcjJEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICs9IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSArPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIG9wZXJhdG9yIC0oVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAtPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgLT0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBvcGVyYXRvciAqKFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggKj0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICo9IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgb3BlcmF0b3IgKihWZWN0b3IyRCB2YWx1ZSwgZmxvYXQgc2NhbGVGYWN0b3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZS5YICo9IHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICB2YWx1ZS5ZICo9IHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBvcGVyYXRvciAqKGZsb2F0IHNjYWxlRmFjdG9yLCBWZWN0b3IyRCB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlLlggKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlLlkgKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIG9wZXJhdG9yIC8oVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAvPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgLz0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBvcGVyYXRvciAvKFZlY3RvcjJEIHZhbHVlMSwgZmxvYXQgZGl2aWRlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IGZhY3RvciA9IDEgLyBkaXZpZGVyO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAqPSBmYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICo9IGZhY3RvcjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gT3BlcmF0b3JzXHJcbiAgICB9XHJcbn0iLCJ1c2luZyBQaWRyb2guTm92ZWxCYXNlO1xyXG51c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgTm92ZWxBcHBcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFRleHRSZW5kZXJUZXN0cyA6IElUZXh0R2FtZVxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgaW50IHc7XHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgaDtcclxuICAgICAgICBwcml2YXRlIEdlbmVyaWNUZXh0TWVudSBtZW51O1xyXG4gICAgICAgIHB1YmxpYyBUZXh0UmVuZGVyIFRleHRSZW5kZXI7XHJcbiAgICAgICAgVGV4dFNjcmVlbk4gc2NyZWVuO1xyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dFNjcmVlbkhvbGRlciBTY3JlZW5Ib2xkZXIgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgcHJpdmF0ZSBUZXh0UmVuZGVyVG9TY3JlZW4gdGV4dFNjcmVlbjtcclxuICAgICAgICBwcml2YXRlIERpYWxvZ05hcnJhdGlvblNjcmVlbkNvbnRyb2wgZG5zYztcclxuICAgICAgICBwcml2YXRlIERpYWxvZ05hcnJhdGlvblNjcmVlbiBkbnM7XHJcblxyXG4gICAgICAgIHB1YmxpYyBQYWxldHRlIEdldFBhbGV0dGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKFNjcmVlbkhvbGRlci5TY3JlZW4gPT0gdGV4dFNjcmVlbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIERlZmF1bHRQYWxldHRlcy5DNFJlYWRlcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gRGVmYXVsdFBhbGV0dGVzLkM0Tm92ZWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBVcGRhdGUoZmxvYXQgdGltZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChkbnNjICE9IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChTY3JlZW5Ib2xkZXIuU2NyZWVuID09IGRucyAmJiBkbnNjLkRvbmUpIC8vY2hhbmdlIHRvIGlzIGRvbmUgc2hpdFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFNjcmVlbkhvbGRlci5TZXRBbGwobWVudSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVudS5SZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZG5zYy5UcnlBZHZhbmNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKFNjcmVlbkhvbGRlci5TY3JlZW4gPT0gbWVudSAmJiBtZW51LkNob3Nlbk9wdGlvbiA+PSAwKVxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgc3RyaW5nIHN0b3J5MiA9IFN0b3JpZXMuc3RvcnkyO1xyXG4gICAgICAgICAgICAgICAgYm9vbCBlbmRUYWdPbkFzcGFzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKG1lbnUuQ2hvc2VuT3B0aW9uKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9vbCBuYXJyYXRpb25Pbmx5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBEaWFsb2dOYXJyYXRpb24obmFycmF0aW9uT25seSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9vbCBuYXJyYXRpb25Pbmx5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIERpYWxvZ05hcnJhdGlvbihuYXJyYXRpb25Pbmx5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RvcnkyID0gU3Rvcmllcy5zdG9yeUE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5kVGFnT25Bc3BhcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RvcnkyID0gU3Rvcmllcy5zdG9yeTM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChtZW51LkNob3Nlbk9wdGlvbiA9PSAwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0b3J5MiA9IFN0b3JpZXMuc3Rvcnk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBJbml0VGV4dFJlbmRlcihzdG9yeTIsIGVuZFRhZ09uQXNwYXMpO1xyXG4gICAgICAgICAgICAgICAgU2NyZWVuSG9sZGVyLlNldEFsbCh0ZXh0U2NyZWVuKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoU2NyZWVuSG9sZGVyLlNjcmVlbiA9PSB0ZXh0U2NyZWVuICYmIFRleHRSZW5kZXIuRmluaXNoZWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFNjcmVlbkhvbGRlci5TZXRBbGwobWVudSk7XHJcbiAgICAgICAgICAgICAgICBtZW51LlJlc2V0KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgRGlhbG9nTmFycmF0aW9uKGJvb2wgbmFycmF0aW9uT25seSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRucyA9IG5ldyBEaWFsb2dOYXJyYXRpb25TY3JlZW4oKTtcclxuICAgICAgICAgICAgZG5zLkluaXQodywgaCk7XHJcbiAgICAgICAgICAgIFNjcmVlbkhvbGRlci5TZXRBbGwoZG5zKTtcclxuXHJcbiAgICAgICAgICAgIGRuc2MgPSBuZXcgRGlhbG9nTmFycmF0aW9uU2NyZWVuQ29udHJvbChkbnMpO1xyXG5cclxuICAgICAgICAgICAgZG5zYy5OYXJyYXRpb25Pbmx5ID0gbmFycmF0aW9uT25seTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBkbnNjLlNldFRleHQoQFwiI2NtV2VsY29tZSBiYWNrLCBkZWFyLlxyXG4gICAgICAgICAgICAvLyNjbUhvdyB3YXMgc2Nob29sIHRvZGF5P1xyXG4gICAgICAgICAgICAvLyNubldoeSB3b24ndCB0aGlzIHdvcms/XHJcbiAgICAgICAgICAgIC8vc1wiKTtcclxuICAgICAgICAgICAgc3RyaW5nIGluc3RydWMgPSBcIiNublVzZSB5b3VyIG1vdXNlIG9yIHR5cGUgYSBrZXkgdG8gcHJvY2VlZFxcbiNwYlxcblwiO1xyXG4gICAgICAgICAgICBkbnNjLlNldFRleHQoaW5zdHJ1YyArIFN0b3JpZXMuc3Rvcnk1KTtcclxuICAgICAgICAgICAgLy9kbnNjLlNldFRleHQoaW5zdHJ1Yyk7XHJcbiAgICAgICAgICAgIGRuc2MuU3BlYWtlckRhdGEuQWRkKCdtJywgXCJNb21cIik7XHJcbiAgICAgICAgICAgIGRuc2MuU3BlYWtlckRhdGEuQWRkKCdwJywgXCJTYXJhXCIpO1xyXG4gICAgICAgICAgICBkbnNjLlNwZWFrZXJEYXRhLkFkZCgnZCcsIFwiRGFkXCIpO1xyXG4gICAgICAgICAgICBkbnNjLlNob3dOZXh0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBJbml0KGludCB3LCBpbnQgaClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMudyA9IHc7XHJcbiAgICAgICAgICAgIHRoaXMuaCA9IGg7XHJcbiAgICAgICAgICAgIG1lbnUgPSBuZXcgR2VuZXJpY1RleHRNZW51KCk7XHJcbiAgICAgICAgICAgIG1lbnUuQWRkT3B0aW9ucyhcIlN0b3J5IFhcIiwgXCJTdG9yeSBZXCIpO1xyXG4gICAgICAgICAgICBtZW51LkluaXQodywgaCk7XHJcbiAgICAgICAgICAgIFNjcmVlbkhvbGRlci5TZXRBbGwobWVudSk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy9yZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBJbml0VGV4dFJlbmRlcihzdHJpbmcgc3RvcnkyLCBib29sIGVuZFRhZ09uQXNwYXMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBUZXh0UmVuZGVyID0gbmV3IFRleHRSZW5kZXIoKTtcclxuICAgICAgICAgICAgVGV4dFJlbmRlci5UYWdUb0NvbG9yLkFkZERhdGEoVGFnSW5mby5Gcm9tTGFiZWwoJ2MnLCAncCcpLCBEZWZhdWx0UGFsZXR0ZXMuQzRXaGl0ZU5ldXRyYWwpO1xyXG4gICAgICAgICAgICBUZXh0UmVuZGVyLlRhZ1RvQ29sb3IuQWRkRGF0YShUYWdJbmZvLkZyb21MYWJlbCgnYycsICdtJyksIERlZmF1bHRQYWxldHRlcy5DNEJsYWNrTmV1dHJhbCk7XHJcbiAgICAgICAgICAgIFRleHRSZW5kZXIuVGFnVG9Db2xvci5BZGREYXRhKFRhZ0luZm8uRnJvbUxhYmVsKCdjJywgJ2QnKSwgRGVmYXVsdFBhbGV0dGVzLkM0QmxhY2tOZXV0cmFsKTtcclxuXHJcbiAgICAgICAgICAgIHN0cmluZyBnb3QgPSBzdG9yeTIuUmVwbGFjZShcIiVcIiwgXCJcXFwiXCIpLlJlcGxhY2UoXCJcXHJcIiwgXCJcIik7XHJcbiAgICAgICAgICAgIHN0cmluZyB0YWdsZXNzVGV4dDtcclxuICAgICAgICAgICAgVGV4dFRhZ1JlYWRlciB0ZXh0VGFnUmVhZGVyID0gbmV3IFRleHRUYWdSZWFkZXIoKTtcclxuICAgICAgICAgICAgdGV4dFRhZ1JlYWRlci5FbmRQYXNzYWdlT25Bc3BhcyA9IGVuZFRhZ09uQXNwYXM7XHJcbiAgICAgICAgICAgIHZhciB0YWdJbmZvID0gdGV4dFRhZ1JlYWRlci5FeHRyYWN0VGFnSW5mbyhnb3QsIG91dCB0YWdsZXNzVGV4dCk7XHJcbiAgICAgICAgICAgIFRleHRSZW5kZXIuU2V0dXAodGFnbGVzc1RleHQsIHcsIGgsIHRhZ0luZm8pO1xyXG4gICAgICAgICAgICBUZXh0UmVuZGVyLnRleHRXb3JsZC5wYWxldHRlID0gRGVmYXVsdFBhbGV0dGVzLkM0UmVhZGVyO1xyXG4gICAgICAgICAgICB0ZXh0U2NyZWVuID0gbmV3IFRleHRSZW5kZXJUb1NjcmVlbihUZXh0UmVuZGVyKTtcclxuICAgICAgICB9XHJcblxuXHJcblxyXG4gICAgXG5wcml2YXRlIFRleHRTY3JlZW5Ib2xkZXIgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX1NjcmVlbkhvbGRlcj1uZXcgVGV4dFNjcmVlbkhvbGRlcigpO31cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guTm92ZWxCYXNlO1xyXG51c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgTm92ZWxBcHBcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFRleHRSZW5kZXJUb1NjcmVlbiA6IElUZXh0U2NyZWVuXHJcbiAgICB7XHJcbiAgICAgICAgVGV4dFJlbmRlciB0ZXh0UmVuZGVyO1xyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dFJlbmRlclRvU2NyZWVuKFRleHRSZW5kZXIgdGV4dFJlbmRlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMudGV4dFJlbmRlciA9IHRleHRSZW5kZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaW50IElucHV0VW5pY29kZSB7IHNldDsgZ2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0Qm9hcmQgR2V0Qm9hcmQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRleHRSZW5kZXIudGV4dFdvcmxkLm1haW5Cb2FyZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFVwZGF0ZShmbG9hdCBmKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKElucHV0VW5pY29kZSAhPSAtMSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGV4dFJlbmRlci5SZWNlaXZlSW5wdXQoKTtcclxuICAgICAgICAgICAgICAgIElucHV0VW5pY29kZSA9IC0xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRleHRSZW5kZXIuVXBkYXRlKGYpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgUGlkcm9oLlRleHRSZW5kZXJpbmc7XHJcblxyXG5uYW1lc3BhY2UgTm92ZWxBcHBcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEdlbmVyaWNUZXh0TWVudSA6IFRleHRTY3JlZW5OXHJcbiAgICB7XHJcblxyXG4gICAgICAgIExpc3Q8c3RyaW5nPiBvcHRpb25zID0gbmV3IExpc3Q8c3RyaW5nPigpO1xyXG4gICAgICAgIHB1YmxpYyBpbnQgQ2hvc2VuT3B0aW9uIHsgcHJpdmF0ZSBzZXQ7IGdldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBVcGRhdGUoZmxvYXQgZilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChJbnB1dFVuaWNvZGUgPj0gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoSW5wdXRBc051bWJlciA+IDAgJiYgSW5wdXRBc051bWJlciA8PSBvcHRpb25zLkNvdW50KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoSW5wdXRBc051bWJlciArIFwieFwiKTtcclxuICAgICAgICAgICAgICAgIENob3Nlbk9wdGlvbiA9IElucHV0QXNOdW1iZXItMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgYm9hcmQgPSBHZXRCb2FyZCgpO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IG9wdGlvbnMuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW50IHggPSAwO1xyXG4gICAgICAgICAgICAgICAgaW50IHkgPSBpO1xyXG4gICAgICAgICAgICAgICAgYm9hcmQuRHJhd0NoYXIoKGNoYXIpKCcxJytpKSwgeCwgeSwgMyk7XHJcbiAgICAgICAgICAgICAgICBib2FyZC5EcmF3Q2hhcigoY2hhcikoJy0nKSwgeCsyLCB5LCAzKTtcclxuICAgICAgICAgICAgICAgIGJvYXJkLkRyYXcob3B0aW9uc1tpXSwgeCs0LCB5LCAzKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFJlc2V0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENob3Nlbk9wdGlvbiA9IC0xMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgQWRkT3B0aW9ucyhwYXJhbXMgc3RyaW5nW10gYXJncylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMuQWRkUmFuZ2UoYXJncyk7XHJcbiAgICAgICAgfVxyXG5cbiAgICBcbnByaXZhdGUgaW50IF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19DaG9zZW5PcHRpb249LTE7fVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guVGV4dFJlbmRlcmluZ1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQmxpbmtBbmltIDogVGV4dEFuaW1hdGlvbjxCbGlua0FuaW0uQmxpbmtEYXRhPlxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIE1vZGlmeShUZXh0RW50aXR5IGVudGl0eSwgQmxpbmtEYXRhIG1haW5EYXRhLCBmbG9hdCBwcm9ncmVzcywgZmxvYXQgbGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYmFzZS5Nb2RpZnkoZW50aXR5LCBtYWluRGF0YSwgcHJvZ3Jlc3MsIGxlbmd0aCk7XHJcbiAgICAgICAgICAgIGZsb2F0IGF1eCA9IHByb2dyZXNzO1xyXG4gICAgICAgICAgICBib29sIGJsaW5rID0gdHJ1ZTtcclxuICAgICAgICAgICAgd2hpbGUgKHRydWUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChibGluaylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhdXggLT0gbWFpbkRhdGEuYmxpbmtBY3RpdmVUaW1lO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGF1eCAtPSBtYWluRGF0YS5ibGlua0luYWN0aXZlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGF1eCA8IDApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmxpbmsgPSAhYmxpbms7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFibGluaylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZW50aXR5LmFuaW1hdGlvbi5TZXRBbGwobWFpbkRhdGEudGV4dCwgbWFpbkRhdGEudGV4dENvbG9yLCBtYWluRGF0YS5iYWNrQ29sb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0cnVjdCBCbGlua0RhdGFcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBjaGFyIHRleHQ7XHJcbiAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBpbnQgYmFja0NvbG9yLCB0ZXh0Q29sb3I7XHJcbiAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBmbG9hdCBibGlua0FjdGl2ZVRpbWU7XHJcbiAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBmbG9hdCBibGlua0luYWN0aXZlO1xyXG5cclxuICAgICAgICAgICAgcHVibGljIEJsaW5rRGF0YShjaGFyIHRleHQsIGludCBiYWNrQ29sb3IsIGludCB0ZXh0Q29sb3IsIGZsb2F0IGJsaW5rQWN0aXZlVGltZSwgZmxvYXQgYmxpbmtJbmFjdGl2ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0ID0gdGV4dDtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmFja0NvbG9yID0gYmFja0NvbG9yO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0Q29sb3IgPSB0ZXh0Q29sb3I7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJsaW5rQWN0aXZlVGltZSA9IGJsaW5rQWN0aXZlVGltZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmxpbmtJbmFjdGl2ZSA9IGJsaW5rSW5hY3RpdmU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBzdGF0aWMgQmxpbmtEYXRhIEJhY2tDb2xvcihpbnQgYmFja0NvbG9yLCBmbG9hdCBibGlua0R1cmF0aW9uKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEJsaW5rRGF0YShUZXh0Qm9hcmQuTk9DSEFOR0VDSEFSLCBiYWNrQ29sb3IsIFRleHRCb2FyZC5OT0NIQU5HRUNPTE9SLCBibGlua0R1cmF0aW9uLCBibGlua0R1cmF0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHVibGljIHN0YXRpYyBCbGlua0RhdGEgQ2hhcihjaGFyIGMsIGZsb2F0IGJsaW5rRHVyYXRpb24pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQmxpbmtEYXRhKGMsIFRleHRCb2FyZC5OT0NIQU5HRUNPTE9SLCBUZXh0Qm9hcmQuTk9DSEFOR0VDT0xPUiwgYmxpbmtEdXJhdGlvbiwgYmxpbmtEdXJhdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwibmFtZXNwYWNlIFBpZHJvaC5UZXh0UmVuZGVyaW5nXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBDaGFyQnlDaGFyQW5pbWF0aW9uIDogVGV4dEFuaW1hdGlvbjxDaGFyQnlDaGFyQW5pbWF0aW9uLkNoYXJCeUNoYXJEYXRhPlxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIE1vZGlmeShUZXh0RW50aXR5IGVudGl0eSwgQ2hhckJ5Q2hhckRhdGEgbWFpbkRhdGEsIGZsb2F0IHByb2dyZXNzLCBmbG9hdCBsZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLk1vZGlmeShlbnRpdHksIG1haW5EYXRhLCBwcm9ncmVzcywgbGVuZ3RoKTtcclxuICAgICAgICAgICAgZmxvYXQgcmF0aW8gPSBwcm9ncmVzcyAvIGxlbmd0aDtcclxuICAgICAgICAgICAgZmxvYXQgbGVuZ3RoVGV4dCA9IG1haW5EYXRhLmNoYXJFbmQgLSBtYWluRGF0YS5jaGFyU3RhcnQ7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSBtYWluRGF0YS5jaGFyU3RhcnQ7IGkgPCBtYWluRGF0YS5jaGFyRW5kOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGludCBvZmZzZXRlZCA9IGk7XHJcbiAgICAgICAgICAgICAgICBpbnQgbGluZSA9IDA7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGIgPSBlbnRpdHkuYW5pbWF0aW9uO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKG9mZnNldGVkID49IHRiLldpZHRoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpbmUrKztcclxuICAgICAgICAgICAgICAgICAgICBvZmZzZXRlZCAtPSB0Yi5XaWR0aDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpID4gKChsZW5ndGhUZXh0ICogcmF0aW8pICsgbWFpbkRhdGEuY2hhclN0YXJ0KSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0Yi5EcmF3Q2hhcignICcsIG9mZnNldGVkLCBsaW5lKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3RiLkRyYXcoXCJcIiArIGksIDYsIDUsIDEpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBjbGFzcyBDaGFyQnlDaGFyRGF0YVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50ZXJuYWwgaW50IGNoYXJTdGFydDtcclxuICAgICAgICAgICAgaW50ZXJuYWwgaW50IGNoYXJFbmQ7XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgQ2hhckJ5Q2hhckRhdGEoaW50IGNoYXJTdGFydCwgaW50IGNoYXJFbmQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhclN0YXJ0ID0gY2hhclN0YXJ0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFyRW5kID0gY2hhckVuZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXQp9Cg==

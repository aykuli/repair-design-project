# repair-design-project
From Rolling Scopes School 2019Q3

[Task](https://github.com/rolling-scopes-school/tasks/blob/master/tasks/markups/level-3/repair-design-project/repair-design-project-en.md)

## Prepare and test
1. Open folder with the project in [Visual Studio Code](https://code.visualstudio.com/download)
2. Install `Live Sass Compiler` plugin in `Visual Studio Code`.
3. Open paremeters of Visual Studio Code (`Ctrl + <`)
4. Enter `edit setting.json`.
5. In `setting.json` file configure `Live Sass Compiler`
6. Add


    "liveSassCompile.settings.formats": [{
                "format": "expanded",
        "extensionName": ".css",
        "savePath": "/css/" //write here your destination folder for css file
        }],
    }


7. Press `F1` or `ctrl+shift+P` and type `Live Sass: Watch Sass` to start live compilation or, type `Live Sass: Stop Watching Sass` to stop a live compilation.
8. Press `F1` or `ctrl+shift+P` and type `Live Sass: Compile Sass - Without Watch Mode` to compile Sass or Scss for one time.


### How to add a package

0. Install nami, and config `nami.deno.base` to current directory

    ```
    curl -L https://raw.githubusercontent.com/txthinking/nami/master/install.sh | bash && sleep 3 && exec -l $SHELL
    nami config nami.deno.base ./
    ```

1. Create a `name`.js in current directory, name is the package name
2. import nami
    ```
    import nami from 'https://raw.githubusercontent.com/txthinking/nami/master/nami.js';
    ```
3. init nami with `name`
    ```
    var n = nami("name");
    ```
4. Tell users whether this package is open source and its home page url
    ```
    // open sourced
    n.open_sourced_on("package home page url");

    // or not open sourced
    n.not_open_sourced_on("package home page url");
    ```
5. Get latest version string from anywhere and tell users

    ```
    // ...
    // some code to get latest version string from anywhere then tell users
    // ...
    await n.version("latest version string");
    ```
6. Download package commands

    1. Based on `Deno.build.os` and `Deno.build.arch`
        ```
        if(Deno.build.os == "linux" && Deno.build.arch == "x86_64"){
        }
        ```
    2. Here are 3 convenient ways to download commands directly from URL
        ```
        // download one command from url
        await n.download_command_from_url("command file url", "command")

        // download one or more commands from zip url
        await n.download_commands_from_zip_url("zip file url", {
            "command": "The relative path of the file in the zip",
            "another command": "The relative path of the file in the zip",
        })

        // download one or more commands from tgz url
        await n.download_commands_from_tgz_url("tgz file url", {
            "command": "The relative path of the file in the tgz",
            "another command": "The relative path of the file in the tgz",
        })
        ```
7. Tell users unsupport if no OS and Arch match
    ```
    n.unsupport();
    ```
8. Test your `name`.js
    ```
    nami install name
    ```
9. Fork nami project, put your `name`.js to package directory, create a PR

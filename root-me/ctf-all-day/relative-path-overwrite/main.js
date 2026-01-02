window.onload = () => {
    alert("xss");
    var cleanDrop = (type) => {
        if (type === "in") {
            var drop_zone = document.getElementById("drop_zone");
            var upload_text = document.getElementById("upload_text");
            drop_zone.style = "background-color: white";
            upload_text.innerHTML = 'Drop to upload.';
        } else if (type === "out") {
            var drop_zone = document.getElementById("drop_zone");
            var upload_text = document.getElementById("upload_text");
            drop_zone.style = "background-color: #C8DADF";
            upload_text.innerHTML = '<a href="#" onclick="clickHandler()">Choose a file</a> or drag it here.';
        }
    }

    clickHandler = (e) => {
        var upload = document.getElementById("upload");
        upload.click();
    }

    fileChangeHandler = (e) => {
        var upload = document.getElementById("upload");
        const file = upload.files[0];
        uploadFile(file);
    }

    dropHandler = (e) => {
        e.preventDefault();

        if (e.dataTransfer.items) {
            [...e.dataTransfer.items].forEach((item, i) => {
                if (item.kind === "file") {
                    const file = item.getAsFile();
                    cleanDrop("out");
                    uploadFile(file);
                }
            });
        } else {
            [...e.dataTransfer.files].forEach((file, i) => {
                cleanDrop("out");
                uploadFile(file);
            });
        }
    }

    dragOverHandler = (e) => {
        e.preventDefault();
        cleanDrop("in");
    }

    dragLeaveHandler = (e) => {
        e.preventDefault();
        cleanDrop("out");
    }

    uploadFile = (file) => {
        const formData = new FormData();
        formData.append("file", file, file.name);
        fetch("/upload", {
            method: "POST",
            body: formData
        })
        .then(d => d.json())
        .then((d) => {
            var result = document.getElementById("result");
            if (d["success"] === true) {
                result.innerHTML = `File successfully uploaded: <a href="${d['Link']}">link</a>`;
            } else {
                result.innerHTML = d["error"];
            }
        });
    }
}


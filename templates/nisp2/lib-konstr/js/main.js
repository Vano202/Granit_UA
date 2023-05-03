'use strict';
(function ($) {
    $(document).ready(function () {

        var FF = 'Ubuntu, Arial, Helvetica, sans-serif';
        var FFEpit = 'pm-2 , sans-serif';

        var inputSurname = $('#input__surname');
        var inputName = $('#input__name');
        var inputPatronymic = $('#input__patronymic');
        var inputDate = $('#input__date');
        var inputEpit = $('#input__epit');

        var canvas = new fabric.Canvas('stone-canvas', {
            backgroundColor: 'transparent'
        });


        var bg = $('#urlbg').text();
        // canvas.setBackgroundImage(bg, canvas.renderAll.bind(canvas), {
        //  height: 600,
        //  width: 380,
        // });

        $(".stone__img").click(function () {
            $('.stone-list .stone').removeClass('active')
            $(this).closest('.stone').addClass('active')
            var imgUrl = $(this).attr("src");
            var article = $(this).next().text();
            // canvas.setBackgroundImage(imgUrl, canvas.renderAll.bind(canvas), {
            //       height: 600,
            //       width: 380,
            // });
            // console.log(article);
            $('.canvas-back-image').attr('src', imgUrl);
            $("#article__plane").html(article);
            // console.log($("#article__plane"));
        });


        var surname = new fabric.Text("Фамилия", {
            fontSize: 20, fill: '#fff', top: 190, left: 155, fontFamily: FF,
        });
        var name = new fabric.Text("Имя", {
            fontSize: 24, fill: '#fff', top: 220, left: 175, fontFamily: FF,
        });
        var patronymic = new fabric.Text("Отчество", {
            fontSize: 20, fill: '#fff', top: 250, left: 155, fontFamily: FF,
        });
        var date = new fabric.Text("01.01.1900 ~ 01.01.2000", {
            fontSize: 15, fill: '#fff', top: 280, left: 115, fontFamily: FF,
        });
        var epit = new fabric.Text("Эпитафия", {
            fontSize: 18, fill: '#fff', top: 310, left: 155, fontStyle: 'oblique', fontFamily: FFEpit,
        });
        canvas.add(surname);
        canvas.add(name);
        canvas.add(patronymic);
        canvas.add(date);
        canvas.add(epit);

        function textsToFront() {
            surname.bringToFront()
            name.bringToFront()
            patronymic.bringToFront()
            date.bringToFront()
            epit.bringToFront()
        }
        // canvas.renderAll();

        $('#input__surname').on("keyup", function () {
            var value = $(this).val();
            surname.text = value;
            canvas.renderAll();
        });
        $('#input__name').on("keyup", function () {
            var value = $(this).val();
            name.text = value;
            canvas.renderAll();
        });
        $('#input__patronymic').on("keyup", function () {
            var value = $(this).val();
            patronymic.text = value;
            canvas.renderAll();
        });
        $('#input__date').on("keyup", function () {
            var value = $(this).val();
            date.text = value;
            canvas.renderAll();
        });
        $('#input__epit').on("keyup", function () {
            var value = $(this).val();
            epit.text = value;
            // console.log(value);
            canvas.renderAll();
        });


        var inputs = [];
        // добавить поле "Надпись"
        $("#add-field").click(function () {

            // var stone = $(".plane-data-img");
            var element = $(document.createElement("div"));
            // var stoneElement = $(document.createElement("div"));

            $(".stone__input-list").append(element);
            element.addClass("new-block");
            element.append("<input class='form-text form_input' type='text' value='Надпись' />");
            element.append("<button type='button' class='btn btn-dark btn-sm btn-remove'><i class=\"fa fa-minus\" aria-hidden=\"true\"></i>\n</button><br>");

            element.find(".form-text").click(function () {
                $(this).css("background", "#424F60");
            });

            var newInput = new fabric.Text("Надпись", {
                fontSize: 22, fill: '#fff', top: 320, left: 100, fontFamily: FF,
            });
            canvas.add(newInput);
            inputs.push(newInput);
            // console.log(inputs);

            element.find(".form-text").on("keyup", function () {
                var value = $(this).val();
                newInput.text = value;
                canvas.renderAll();
            })

            element.find(".btn-remove").click(function () {
                newInput.remove();
                $(this).parent().next().remove();
                $(this).parent().remove();
                $(this).remove();
                fontSizeAddElement.remove();
            });


        });


        // кнопка назад
        $('#closeConstructBtn').click(function () {
            window.history.back();
            return false; //just in case
        });

        // кнопка обновить
        $('#reloadPage').click(function () {
            location.reload();
        });

        bsCustomFileInput.init()

        // работа с блоками изображений
        $(".img-blk").click(function () {

            closeConstructorSelect()

            var url = $(this).children(":first-child").attr('src');
            var mask = $(this).children(":first-child").data('mask');

            if (!$(this).hasClass('uploader')) {
                fabric.Image.fromURL(url, function (pic) {
                    pic.set('left', 60).set('top', 30);
                    canvas.add(pic);
                    textsToFront()
                });
            } else {
                $('body').addClass('overflow-hidden')
                $('#uploaderModal').removeClass('d-none')
                // $("#uploaderModal").modal('show')
                // $("#uploaderModal .croppier-preview .cr-border").css('backgroundImage', 'url('+url+')')
                $("#uploaderModal .croppier-preview .cr-border").html('<img src="' + mask + '">')
            }
        });

        // Загрузка и обрезка картинок
        var $uploadCrop;

        function readFile(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('.uploader-body').addClass('ready');
                    $uploadCrop.croppie('bind', {
                        url: e.target.result
                    }).then(function () {
                        console.log('jQuery bind complete');
                    });
                }
                reader.readAsDataURL(input.files[0]);
            }
            else {
                alert("Sorry - you're browser doesn't support the FileReader API");
            }
        }

        // function grayscaleImageData(imageData) {
        //     var data = imageData.data
        //     for (var i = 0; i < data.length; i += 4) {
        //       var brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2]
        //       data[i] = brightness
        //       data[i + 1] = brightness
        //       data[i + 2] = brightness
        //     }
        //     return imageData
        // }

        // function processSepia (imageData) {
        //   // получаем одномерный массив, описывающий все пиксели изображения
        //   var pixels = imageData.data;
        //   // циклически преобразуем массив, изменяя значения красного, зеленого и синего каналов
        //   for (var i = 0; i < pixels.length; i += 4) {
        //     var r = pixels[i];
        //     var g = pixels[i + 1];
        //     var b = pixels[i + 2];
        //     pixels[i]     = (r * 0.393)+(g * 0.769)+(b * 0.189); // red
        //     pixels[i + 1] = (r * 0.349)+(g * 0.686)+(b * 0.168); // green
        //     pixels[i + 2] = (r * 0.272)+(g * 0.534)+(b * 0.131); // blue
        //   }
        //   return imageData;
        // };

        $uploadCrop = $('#uploadView').croppie({
            viewport: {
                width: 140,
                height: 190,
                type: 'square'
            }
        });

        $('#upload').on('change', function () {
            readFile(this);
        });

        // var crImage = document.getElementById("cr-image");
        // var crContext = crImage.getContext('2d')
        // var tmpImage = new Image(140, 190);

        function croppieResult() {
            $uploadCrop.croppie('result', {
                type: 'canvas',
                size: 'viewport'
            }).then(function (resp) {
                // tmpImage.src = resp
                // crContext.drawImage(tmpImage, 0, 0)
                $('.croppier-preview .cr-image').css('backgroundImage', 'url(' + resp + ')')
            });
        }

        // $('.upload-result').on('click', function (ev) {
        $uploadCrop.on('update.croppie', function (ev, cropData) {
            croppieResult()
        });

        $('.upload-insert').on('click', function () {
            $('.uploader-body').addClass('progress');
            var imgNode = document.querySelector('.croppier-preview')
            html2canvas(imgNode, { scale: 0.7 }).then(function (canv) {
                var img = new fabric.Image(canv)
                canvas.add(img)
                textsToFront()
                $("#uploaderModal").addClass('d-none')
                $('body').removeClass('overflow-hidden')
                $('.uploader-body').removeClass('progress');
            })
        })

        // $('body').on('click', '.js-effect-chb', function (e) {
        //     e.preventDefault()
        //     var imgD = crContext.getImageData(0, 0, crImage.width, crImage.height)
        //     crContext.putImageData(grayscaleImageData(imgD), 0, 0)
        // })
        // $('body').on('click', '.js-effect-sepia', function (e) {
        //     e.preventDefault()
        //     var imgD = crContext.getImageData(0, 0, crImage.width, crImage.height)
        //     crContext.putImageData(processSepia(imgD), 0, 0)
        // })
        // $('body').on('click', '.js-effect-original', function (e) {
        //     e.preventDefault()
        //     croppieResult()
        // })

        // ************************

        // Работа со шрифтами

        $(".fonts").click(function () {
            var fontsClass = $(this).attr("class").replace('fonts', '').trim();
            var font = $(this).css('font-family');

            surname.fontFamily = font;
            name.fontFamily = font;
            patronymic.fontFamily = font;
            date.fontFamily = font;
            inputs.forEach(function (el) {
                el.fontFamily = font;
            });

            canvas.renderAll();

            $('.fonts').removeClass('current')
            $(this).addClass('current')
        })


        // $('#printWrapper').click(function(){
        $('body').on('click', '.js-printWrapper-open', function (e) {
            // console.log('click');
            e.preventDefault()
            //
            renderStone()
        });




        // Вывод на модальное окно

        $('#modalStone').on('show.bs.modal', function () {
            // console.log('test');
            var modal = $(this);
            var printElement = $('.testCanvas').css("display", "block");
            printElement.children().attr("id", "modalStonePrint");
            modal.find('.modal-body').append(printElement);

        });


        // сохранить эскиз
        $("#saveImg").click(function () {
            renderStone('saveStone')
        });

        // распечатать эскиз
        $("#printImg").click(function () {
            renderStone('printVoucher')
        });

        $('#sendStone').on('click', function () {
            renderStone('popupSendStone')
        })

        $('.stonesend-popup_form').on('submit', function (e) {
            e.preventDefault()
            var _self = $(this),
                name = $('#stonesendName').val(),
                phone = $('#stonesendPhone').val()

            $('#modalStonePrint')[0].toBlob(function (blobCanvas) {
                var formData = new FormData();
                formData.append('image', blobCanvas, 'stoneImage.png')
                formData.append('action', 'sendStone')
                formData.append('name', name)
                formData.append('phone', phone)

                console.log(blobCanvas)
                $.ajax({
                    method: 'post',
                    url: '/ajax/constructor.php',
                    cache: false,
                    contentType: false,
                    processData: false,
                    data: formData,
                    success: function (resp) {
                        console.log(resp)
                        _self.closest('.callback-popup_window').find('.popup-result').removeClass('d-none')
                    }
                })
            })

        })


        $('body').on('click', '.constructor-select_field', function () {
            if ($(this).hasClass('disabled')) {
                // console.log('disabled')
                return false
            }
            var constSelect = $(this).closest('.constructor-select')
            if (constSelect.hasClass('open')) {
                closeConstructorSelect()
            } else {
                constSelect.addClass('open')
                $('body').addClass('constructor-select-open')
                $('body').prepend('<div class="constructor-select-overflow"></div>')
            }
        })
        $('body').on('click', '.constructor-select-overflow', function () {
            closeConstructorSelect()
        })
        var closeConstructorSelect = function () {
            $('.constructor-select').removeClass('open')
            $('body').removeClass('constructor-select-open')
            $('.constructor-select-overflow').remove()
        }

        $('.popup-close').on('click', function (e) {
            $(this).closest('.popup').addClass('d-none')
            $('body').removeClass('overflow-hidden')
            $('.popup-result').addClass('d-none')
        })
    });

    function printVoucher() {
        var dataUrl = $('#modalStonePrint')[0].toDataURL(); //attempt to save base64 string to server using this var  
        var windowContent = '<!DOCTYPE html>';
        windowContent += '<html>'
        windowContent += '<head><title>Print canvas</title></head>';
        windowContent += '<body>'
        windowContent += '<img src="' + dataUrl + '">';
        windowContent += '</body>';
        windowContent += '</html>';
        var printWin = window.open();
        printWin.document.open();
        printWin.document.write(windowContent);
        printWin.document.close();
        printWin.focus();
        printWin.print();
    }

    function saveStone() {
        $("#modalStonePrint").get(0).toBlob(function (blob) {
            saveAs(blob, "stone.png");
        });
    }

    function popupSendStone() {
        $('.stonesend-popup').removeClass('d-none')
        $('body').addClass('overflow-hidden')
    }

    var flagClickPrintBtn = false;
    function renderStone(callback = false) {
        var element = $('#printWrapper')[0]
        if (!flagClickPrintBtn) {
            flagClickPrintBtn = true;
            $('html, body').animate({
                scrollTop: 0
            }, 0, function () {
                html2canvas(element, {
                    width: 500,
                    height: 600,
                    windowWidth: element.scrollWidth,
                    windowHeight: element.scrollHeight
                }).then(function (canvas) {
                    document.body.appendChild(canvas);
                    $('.testCanvas').html(canvas);
                    $('.testCanvas').children().attr("id", "modalStonePrint")
                    // var printElement = $('.testCanvas').css("display", "block");
                    // printElement.children().attr("id", "modalStonePrint");
                    // modal.find('.modal-body').append(printElement);
                    if (callback) {
                        eval(callback)()
                    }
                    flagClickPrintBtn = false;
                });
            });
        }
        return true
    }

})(jQuery);


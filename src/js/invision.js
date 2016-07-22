function Invision() {
    this.hideLabel = function (element) {
        var label = element.parentNode.getElementsByTagName('label')[0];
        label.innerHTML = '';
    };
    this.checkInput = function (element, checkFunction, text) {
        var label = element.parentNode.getElementsByTagName('label')[0];
        if (element.value.length > 0) {
            label.innerText = '';
        } else {
            label.innerText = text;
        }
        element.parentNode.getElementsByTagName('label')[0].style.color = '#8a959e';
        var value = element.value;
        if (!checkFunction(value)) {
            element.classList.add('invision-error');
            return false;
        } else {
            element.classList.remove('invision-error');
            return true;
        }
    };
    this.checkName = function (string) {
        if (string.length <= 0) {
            return false;
        }
        if (string.split(' ').length - 1 === string.length) {
            console.log('work');
            return false;
        }
        return true;
    };
    this.checkMail = function (string) {
        var re = /^([a-z0-9_\-]+\.)*[a-z0-9_\-]+@([a-z0-9][a-z0-9\-]*[a-z0-9]\.)+[a-z]{2,6}$/i;
        if (!re.test(string)) {
            return false;
        }
        return true;
    };
    this.checkPass = function (string) {
        if (string.length <= 3) {
            return false;
        }
        return true;
    };
    this.changeLable = function (element) {
        element.parentNode.getElementsByTagName('label')[0].style.color = '#aab5be';
    };
    this.submitForm = function () {
        var inputs = {
            name: {
                input: document.getElementById('name'),
                str: 'Your Name',
                func: this.checkName
            },
            email: {
                input: document.getElementById('email'),
                str: 'Email Address',
                func: this.checkMail
            },
            pass: {
                input: document.getElementById('pass'),
                str: 'Create a Password',
                func: this.checkPass
            }
        };
        var data = {};
        var check = true;
        for (var item in inputs) {
            check *= inputs[item].check = this.checkInput(inputs[item].input, inputs[item].func, inputs[item].str);
            data[item] = inputs[item].input.value;
        }
        if (check) {
            $.ajax({
                type: 'POST',
                url: '/api',
                data: data,
                success: function () {
                    console.log('ok');
                },
                error: function () {
                    console.log('fail');
                },
                dataType: 'json'
            });
        }
    };
}

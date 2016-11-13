;
(function() {
    var stepForms = document.querySelectorAll('form.page-form');

    stepForms.forEach(function(form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            handleForm(event.currentTarget);
        });
    });

    // stepForms.forEach(function(form) {
    //     var inputsList = form.querySelectorAll('input');
    //
    //     inputsList.forEach(function(input) {
    //         input.addEventListener('change', function(event) {
    //             handleForm(event.currentTarget.form);
    //         });
    //     });
    // });

    var handleForm = function(form) {
        if (form.hasAttribute('name')) {
            var inputsList = form.querySelectorAll('input');

            clearFormResult(form);
            switch (form.name) {
                case 'form1':
                    handleForm1(form);
                    break;
                case 'form2':
                    handleForm2(form);
                    break;
                case 'form3':
                    handleForm3(form);
                    break;
                default:

            }
        }
    }

    var handleForm1 = function(form) {
        var result = -2.01,
            error = false;

        form.querySelectorAll('input').forEach(function(input) {
            var val = getFloatValue(input);
            if (val !== false) {
                switch (input.name) {
                    case 'field1':
                        val *= 1.1;
                        break;
                    case 'field2':
                        val *= -0.16;
                        break;
                    case 'field3':
                        val *= -0.01;
                        break;
                    case 'field4':
                        val *= 2.81;
                        break;
                    default:

                }
                result += val;
            } else {
                error = true;
            }
        });

        if (error) {
            return false;
        }
        result = (1 / (1 + Math.pow(Math.E, -result))) * 100;

        showFormPrecentResult(
            form,
            result >= 70 ? 'высокая' : 'низкая',
            result.toFixed(0)
        );
    }

    var handleForm2 = function(form) {
        var result = -4.46,
            error = false;

        form.querySelectorAll('input').forEach(function(input) {
            var val = getFloatValue(input);
            if (val !== false) {
                switch (input.name) {
                    case 'field1':
                        val *= 0.96;
                        break;
                    case 'field2':
                        val *= 0.05;
                        break;
                    case 'field3':
                        val *= 0.1;
                        break;
                    case 'field4':
                        val *= -0.01;
                        break;
                    default:

                }
                result += val;
            } else {
                error = true;
            }
        });

        if (error) {
            return false;
        }
        result = (1 / (1 + Math.pow(Math.E, -result))) * 100;

        showFormPrecentResult(
            form,
            result >= 70 ? 'высокая' : 'низкая',
            result.toFixed(0)
        );
    }

    var handleForm3 = function(form) {
        var result1 = -206.99,
            result2 = -160.72,
            result3 = -145.36,
            error = false;

        form.querySelectorAll('input').forEach(function(input) {
            var val = getFloatValue(input);
            if (val !== false) {
                switch (input.name) {
                    case 'field1':
                        val1 = val * 0.72;
                        val2 = val * 0.72;
                        val3 = val * 0.71;
                        break;
                    case 'field2':
                        val1 = val * 3.76;
                        val2 = val * 3.93;
                        val3 = val * 3.54;
                        break;
                    case 'field3':
                        val1 = val * 0.25;
                        val2 = val * 0.14;
                        val3 = val * 0.13;
                        break;
                    case 'field4':
                        val1 = val * 12.61;
                        val2 = val * 12.37;
                        val3 = val * 9.18;
                        break;
                    case 'field5':
                        val1 = val * 36.35;
                        val2 = val * 27.03;
                        val3 = val * 26.83;
                        break;
                    case 'field6':
                        val1 = val * 17.83;
                        val2 = val * 9.72;
                        val3 = val * 12.34;
                        break;
                    case 'field7':
                        val1 = val * 7.37;
                        val2 = val * -2.67;
                        val3 = val * -0.65;
                        break;
                    case 'field8':
                        val1 = val * -8.17;
                        val2 = val * 25.96;
                        val3 = val * 23.76;
                        break;
                    default:

                }
                result1 += val1;
                result2 += val2;
                result3 += val3;
            } else {
                error = true;
            }
        });

        if (error) {
            return false;
        }

        switch (Math.max(result1, result2, result3)) {
            case result1:
                showFormTacticsResult(form, 'сохранены', 'роды через естественные родовые пути');
                break;
            case result2:
                showFormTacticsResult(form, 'снижены', 'роды путем операции кесарево сечение в плановом порядке');
                break;
            case result3:
                showFormTacticsResult(form, 'резко снижены', 'роды путем операции кесарево сечение в экстренном порядке');
                break;
            default:

        }
    }

    var getFloatValue = function(input) {
        return input.checkValidity() && input.value ? parseFloat(input.value) : false;
    }

    var showFormPrecentResult = function(form, propability, percent) {
        var formResult = document.querySelector('#' + form.id + '-result'),
            resultTitlePropability = formResult.querySelector('.mdl-card__title .mdl-card__title-text p'),
            resultDescriptionPropability = formResult.querySelector('.mdl-card__supporting-text .probability'),
            resultDescriptionPercent = formResult.querySelector('.mdl-card__supporting-text .percent');

        if (formResult.classList.contains('hidden')) {
            formResult.classList.remove('hidden');
        }

        if (resultTitlePropability) {
            resultTitlePropability.textContent = 'РЕЗУЛЬТАТ:';
        }
        if (resultDescriptionPercent) {
            resultDescriptionPropability.textContent = propability;
        }
        if (resultDescriptionPropability) {
            resultDescriptionPercent.textContent = percent;
        }
    }

    var showFormTacticsResult = function(form, capabilities, tactics) {
        var formResult = document.querySelector('#' + form.id + '-result'),
            resultTitlePropability = formResult.querySelector('.mdl-card__title .mdl-card__title-text p'),
            resultCapabilities = formResult.querySelector('.mdl-card__supporting-text .capabilities'),
            resultTactics = formResult.querySelector('.mdl-card__supporting-text .tactics');

        if (formResult.classList.contains('hidden')) {
            formResult.classList.remove('hidden');
        }

        if (resultTitlePropability) {
            resultTitlePropability.textContent = 'РЕЗУЛЬТАТ:';
        }
        if (resultCapabilities) {
            resultCapabilities.textContent = capabilities;
        }
        if (resultTactics) {
            resultTactics.textContent = tactics;
        }
    }

    var clearFormResult = function(form) {
        var formResult = document.querySelector('#' + form.id + '-result'),
            resultTitlePropability = formResult.querySelector('.mdl-card__title .mdl-card__title-text p'),
            resultDescriptionPropability = formResult.querySelector('.mdl-card__supporting-text .probability'),
            resultDescriptionPercent = formResult.querySelector('.mdl-card__supporting-text .percent'),
            resultCapabilities = formResult.querySelector('.mdl-card__supporting-text .capabilities'),
            resultTactics = formResult.querySelector('.mdl-card__supporting-text .tactics');

        if (!formResult.classList.contains('hidden')) {
            formResult.classList.add('hidden');
        }

        if (resultTitlePropability) {
            resultTitlePropability.textContent = '';
        }
        if (resultDescriptionPercent) {
            resultDescriptionPercent.textContent = '';
        }
        if (resultDescriptionPropability) {
            resultDescriptionPropability.textContent = '';
        }
        if (resultCapabilities) {
            resultCapabilities.textContent = '';
        }
        if (resultTactics) {
            resultCapabilities.textContent = '';
        }
    }
})();

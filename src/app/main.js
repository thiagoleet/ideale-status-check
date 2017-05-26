var contentType ="application/x-www-form-urlencoded; charset=utf-8";
if(window.XDomainRequest) //for IE8,IE9
    contentType = "text/plain";

var core_apis = [];
var public_apis = [];

function loadApis(url){
    return new Promise((resolve, reject) => {
        $.getJSON(url, function(data){
            console.log(data);
            resolve(data);
        });
    });
}


/**
 * Faz um HEAD na API para verificar se ela está respondendo
 * 
 * @param {any} arr 
 * @param {any} container 
 * @param {any} status 
 */
function checkApis(arr, container, status){
    arr.forEach(function(api){
        $.ajax({
            type: 'HEAD',
            url: api.url + '/swagger/ui/index.html',
            dataType: 'text/plain',
        }).done(function(response, status, xhr){
            var row = document.createElement('tr');
            row.className = '';
            row.innerHTML = `
                <td class="text-success">Online</td>
                <td>${api.id.toUpperCase()}</td>
                <td><a href="${api.url}/swagger/ui/" target="_blank">${api.url}</a></td>
            `;
            document.querySelector(container + ' table tbody').appendChild(row);
            arr.map(a => {
                if(a.id == api.id)
                    a.status = true;
            });

        }).fail(function(response, xhr) {
            var row = document.createElement('tr');
            row.className = 'table-danger';
            row.innerHTML = `
                <td>Offline</td>
                <td>${api.id.toUpperCase()}</td>
                <td><a href="${api.url}/swagger/ui/" target="_blank">${api.url}</a></td>
            `;
            document.querySelector(container + ' table tbody').appendChild(li);
            arr.map(a => {
                if(a.id == api.id)
                    a.status = false;
            });
        }).always(function(){
            let health = 0;
            let online = arr.filter(a => a.status === true).length;
            let offline = arr.filter(a => a.status === false).length;

            if(online === 0){
                health = 0;
            }
            else{
                health = (online / arr.length) * 100 ;
            }

            $(container + ' .title-offline .badge').text(offline);
            $(container + ' .title-online .badge').text(online);
            
            
            $(container + ' .progress-bar')
                .text(health.toFixed(1) + '%')
                .attr('aria-valuenow', Math.round(health))
                .css('width', health + '%');

            
        });
        
    });
}

// TODO: Transformar numa função auto-invocável 
$(document).ready(function(){
    jQuery.support.cors = true;
    Promise.all([loadApis('apis/public.json'), loadApis('apis/core.json')])
    .then(response => {
        public_apis = response[0];
        core_apis = response[1];
        checkApis(public_apis, '#public');
        checkApis(core_apis, '#core');
    });

});
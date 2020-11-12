'use strict';

const { indexOf } = require('lodash');
const docker = require('../index');

const client = docker.Client({
  socket: '/var/run/docker.sock'
});


function test(client) {
  const name = 'test';

  // client.networks().create({Name: 'cunan-network', Driver: 'overlay', Attachable: true}).then((info)=>{
  //   console.log(info)
  // }).catch((err) => {
  //   console.error(err)
  // });
  console.log(1);
  client.networks().remove('cunan-network').then((info) => {
    // console.log(info);
    console.log('1-1');
    client.networks().create({Name: 'cunan-network'}).then((info) => {
      console.log('2-1');
      console.log(info)
      console.log(3);
      var model = {
        Hostname: 'test.example.com',
        Image: 'alpine:3.11',
        Domainname: 'example.com',
        Cmd: [ 'ping', 'www.baidu.com' ]
      };
      
      model.Hostname = 'test1';
      client.containers().create(model,{name:'test1'}).then((info) => {
        // console.log(info);
        console.log('3-1');
        let id = info.Id;
        client.containers().start(id).then(() => {
          console.log("success");
          client.networks().connect('cunan-network',{Container: 'test1'}).then(() => {
            console.log('connect ok');
          });
        }).catch((err) => {
          console.error(err);
        });
      }).catch((err)=>{
        console.error(err);
      });
      
      model.Hostname = 'test2';
      client.containers().create(model,{name:'test2'}).then((info) => {
        // console.log(info);
        let id = info.Id;
        client.containers().start(id).then(() => {
          client.networks().connect('cunan-network',{Container: 'test2'}).then(() => {
            console.log('connect ok');
          });
        }).catch((err) => {
          console.error(err);
        });
      }).catch((err)=>{
        console.error(err);
      });
    }).catch((err) => {
      console.error(err)
    });
  }).catch((err) => {
    console.error(err.message);
  });
  console.log(2);
}

test(client);

// client.containers().list().then((info) => {
//   console.log(info);
// }).catch((err) => {
//   console.error(err);
// });

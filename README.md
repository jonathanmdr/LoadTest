# Load Test

Estrutura para realização de testes de carga utilizando `k6`, `influxdb` e `grafana`.

### Funcionamento:
O `k6` permite que montemos diversos cenários para realização de testes de carga para vermos como um determinado serviço se comporta ao receber diversas requisições.

Todos os dados gerados pelo `k6` são entregues em uma base de dados de série temporal, no nosso caso o `influxdb`.

O `grafana` lê todos os dados dispostos no `influxdb` e exibe os resultados em um dashboard.

### Dashboards Grafana:
O dashboard utilizado para exibir os resultados dos testes de carga do `k6` pode ser encontrado aqui: https://grafana.com/grafana/dashboards/2587

### Configuração:

Os cenários de teste são disponibilizados no diretório `/scripts`, onde cada script representa um cenário único de teste.

Os cenários são desenvolvidos utilizando arquivos `.js`.

Para maiores informações, visite a documentação oficial do `k6` disponível em: https://k6.io/docs/

> :warning: É necessário ter o `docker` e `docker-compose` devidamente instalados e configurados.

#### Estrutura base de um script:

```js
import http from 'k6/http';

import env from './config/env.js';

export let options = {
  // Configuring tresholds
};

export default function () {
  // Scenario code
}
```

> :warning: O arquivo `env.js` é de uso exclusivo para variáveis de ambiente compartilhadas entre os diversos cenários.

Para simplificar a criação do ambiente e execução dos cenários de teste, foram criados dois scripts shell, sendo o `setup` responsável por prover o ambiente com o `influxdb` e `grafana`, e o `run-load-test` por executar os cenários baseado no nome do mesmo.

> :warning: Os scripts shell devem ser executados à partir da pasta `/utils`, sendo necessário acessá-la antes de realizar a execução, o uso de qualquer outra forma pode apresentar problemas de execução pela forma como os scripts foram construídos.

#### Configurando o ambiente:
_O parâmetro `up` faz com que os containeres sejam inicializados, e o parâmetro `down` faz com que os mesmos sejam finalizados._ 

```sh
~$ cd utils
~$ ./setup up
~$ ./setup down
```

#### Executando um cenário de teste:
_O parâmetro de entrada é o nome de um arquivo de cenário de teste._

```sh
~$ cd utils
~$ ./run-load-test get-token
~$ ./run-load-test health-check
```

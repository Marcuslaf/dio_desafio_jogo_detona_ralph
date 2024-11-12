# dio_desafio_jogo_detona_ralph
Desafio do Bootcamp da Dio encrementando melhorias no jogo Detona Ralph.

As principais alterações foram:
Adicionado bestScore no state para acompanhar a melhor pontuação das 3 tentativas
Modificada a função updateLives() para:
Atualizar o bestScore quando necessário.
Reiniciar apenas a rodada atual quando ainda há vidas.
Modificada a função saveScore() para:
Salvar apenas o melhor score das 3 tentativas.
Verificar se o jogador já existe no ranking.
Atualizar a pontuação apenas se o novo score for maior que o anterior.

Nova função resetRound() para:
Reiniciar apenas os valores da rodada atual.
Manter o número de vidas e o bestScore.

Modificada a função resetGame() para:
Reiniciar todas as variáveis, incluindo vidas e bestScore.
Chamar resetRound() para iniciar uma nova partida.

Adicionada a flag canClick no state:
Modificada a função randomSquare() para resetar a flag de clique:
Modificada a função addListenerHitBox() para verificar a flag:

Adicionado reset da flag nas funções:
resetRound()
resetGame()

Agora o jogo:
Mantém registro do melhor score durante as 3 tentativas
Só salva no ranking quando acabarem todas as vidas
Salva apenas a maior pontuação conseguida nas 3 tentativas
Atualiza o ranking apenas se o jogador superar sua própria pontuação anterior
Só permite um clique válido por inimigo
Reseta a possibilidade de clique quando um novo inimigo aparece
Mantém todas as funcionalidades anteriores do ranking e vidas
Previne que o jogador ganhe pontos extras clicando múltiplas vezes no mesmo quadrado

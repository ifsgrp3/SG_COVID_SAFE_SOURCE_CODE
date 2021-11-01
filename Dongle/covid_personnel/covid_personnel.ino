#include <RFduinoBLE.h>
#include <string.h>
#include <Crypto.h>
#include <AES.h>
#include <RNG.h>

AES128 aes128;
bool rssidisplay;
int dotcount=0;
const char * myid = "ble_device_2";

struct credential_set {
    byte key[16];
};

static credential_set const credentials = {
    .key = {0x31, 0x31, 0x31, 0x31, 0x32, 0x32, 0x32, 0x32, 0x33, 0x33, 0x33, 0x33, 0x34, 0x34, 0x34, 0x34},
}; 

void byte_array_to_hex_string(byte array[], unsigned int len, char result[]) {
    for (unsigned int i = 0; i < len; i++) {
    byte nib_1 = (array[i] >> 4) & 0x0F;
    byte nib_2 = (array[i] >> 0) & 0x0F;
    result[i*2+0] = nib_1  < 0xA ? '0' + nib_1  : 'A' + nib_1  - 0xA;
    result[i*2+1] = nib_2  < 0xA ? '0' + nib_2  : 'A' + nib_2  - 0xA;
    }
    result[len*2] = '\0';
}

void substring(char str[], char new_str[], int pos, int len) {
    int i = 0;
    while (i < len) {
      new_str[i] = str[pos+i-1];
      i++;
    }
    new_str[i] = '\0';
}

void print_hex(uint8_t num) {
    char hex_Car[2];
    sprintf(hex_Car, "%02X", num);
    Serial.print(hex_Car);
}

void split_block(byte cipher_block[16], byte serial_number[64], int pos) {
    for (int i = 0; i < 16; i++) {
      cipher_block[i] = serial_number[i+pos];
    }
}

void add_encrypted_block(byte ciphertext[64], byte ciphertext_block[16], int pos) {
    for (int i = 0; i < 16; i++) {
      ciphertext[i+pos] = ciphertext_block[i]; 
    }
}

void cbc_encryption(byte cipher_block[16], byte iv[16]) {
  for (int i = 0; i < 16; i++) {
    cipher_block[i] ^= iv[i];
  }
}

void encrypt_serial_number(BlockCipher *cipher, const struct credential_set *credentials, byte ciphertext[64], byte iv[16]) {

    byte serial_number[64] = {0x6b,0x70,0x6e,0x7a,0x35,0x72,0x33,0x39,
                              0x32,0x73,0x69,0x36,0x63,0x6d,0x33,0x34,
                              0x39,0x37,0x6f,0x68,0x6a,0x37,0x34,0x73,
                              0x70,0x78,0x73,0x78,0x31,0x33,0x67,0x6a,
                              0x76,0x61,0x67,0x7a,0x30,0x39,0x6e,0x39,
                              0x79,0x6e,0x72,0x76,0x64,0x75,0x38,0x70,
                              0x6e,0x72,0x35,0x31,0x6b,0x33,0x7a,0x66,
                              0x31,0x62,0x68,0x61,0x33,0x32,0x70,0x6f};
    
    byte cipher_block[16] = "";
    byte ciphertext_block[16] = "";

    RNG.rand(iv, sizeof(iv));
    crypto_feed_watchdog();
    cipher->setKey(credentials->key, cipher->keySize());
    for (int pos = 0; pos < 64; pos += 16) {
      split_block(cipher_block, serial_number, pos);
      if (pos == 0) {
        cbc_encryption(cipher_block, iv);
      } else {
        cbc_encryption(cipher_block, ciphertext_block);
      }
      cipher->encryptBlock(ciphertext_block, cipher_block);
      add_encrypted_block(ciphertext, ciphertext_block, pos);
    } 
}

void setup() {
    RFduinoBLE.advertisementData = "echo";
    RFduinoBLE.deviceName = myid;          
    RFduinoBLE.begin();                            
    Serial.begin(9600);                            
    Serial.print(myid); 
    Serial.println(" device restarting..."); 
}

void RFduinoBLE_onReceive(char *data, int len) {
    const char * authentication_code = "JmOANYLinV80i7fy";
    byte ciphertext_array[64];
    byte iv[16]; 
    char ciphertext[128] = "";
    char iv_string[32] = "";
    char packet[20];
    char iv_packet[16];
    data[len] = 0;

    Serial.println();
    
    if(strcmp(data, authentication_code) == 0) {
      Serial.println("Password success");
      Serial.println("Generating random iv");
      Serial.println("Encrypting serial number");
      Serial.println("Sending encrypted data");
    
      encrypt_serial_number(&aes128, &credentials, ciphertext_array, iv);
      byte_array_to_hex_string(ciphertext_array, 64, ciphertext);
    
      for (int i = 0; i < 8; i++) {
        if (i == 6) {
          substring(ciphertext, packet, 121, 8);
          RFduinoBLE.send(packet, 8);
        } else if (i == 7) {
          byte_array_to_hex_string(iv, 16, iv_string);
          substring(iv_string, iv_packet, 1, 16);
          RFduinoBLE.send(iv_packet, 16);
          substring(iv_string, iv_packet, 17, 16);
          RFduinoBLE.send(iv_packet, 16);
        } else {
          substring(ciphertext, packet, (i*20)+1, 20);
          RFduinoBLE.send(packet, 20);
        }
        delay(100);
      }
      substring(ciphertext, packet, 121, 8);
      RFduinoBLE.send(iv_string, 32);
    }
}

void loop() {
    RFduino_ULPDelay( SECONDS(0.5) );                
    dotcount++;
    if (dotcount<40) {
      Serial.print("."); 
    } else {
      Serial.println();
      dotcount=0;
    }
}

/*
void do_encrypt(String msg, String key_str, String iv_str) {
  byte iv[16];
  memcpy(iv,(byte *) iv_str.c_str(), 16);

  int blen = base64_encode(b64,(char *)msg.c_str(),msg.length());

  aes.calc_size_n_pad(blen);

  int len = aes.get_size();
  byte plain_P[len];
  for(int i=0;i<blen;i++) plain_p[i]=b64[i];
  for(int i=blen;i<len;i++) plain_P[i]='\0';

  int blocks = len/16
  aes.set_key ((byte *)key_str.c_str(), 16);
  aes.cbc_encrypt (plain_p, cipher, blocks, iv);

  Serial.println("Encrypted Data output: " + String((char*)b64));
} */

/*
bool testCipher_N(Cipher *cipher, const struct TestVector *test, size_t inc)
{
    byte output[MAX_CIPHERTEXT_SIZE];
    size_t posn, len;

    cipher->clear();
    if (!cipher->setKey(test->key, cipher->keySize())) {
        Serial.print("setKey ");
        return false;
    }
    if (!cipher->setIV(test->iv, cipher->ivSize())) {
        Serial.print("setIV ");
        return false;
    }

    memset(output, 0xBA, sizeof(output));

    for (posn = 0; posn < test->size; posn += inc) {
        len = test->size - posn;
        if (len > inc)
            len = inc;
        cipher->encrypt(output + posn, test->plaintext + posn, len);
    }

    if (memcmp(output, test->ciphertext, test->size) != 0) {
        Serial.print(output[0], HEX);
        Serial.print("->");
        Serial.print(test->ciphertext[0], HEX);
        return false;
    }

    cipher->setKey(test->key, cipher->keySize());
    cipher->setIV(test->iv, cipher->ivSize());

    for (posn = 0; posn < test->size; posn += inc) {
        len = test->size - posn;
        if (len > inc)
            len = inc;
        cipher->decrypt(output + posn, test->ciphertext + posn, len);
    }

    if (memcmp(output, test->plaintext, test->size) != 0)
        return false;

    return true;
} */

/*
void aes_encrypt(BlockCipher *cipher, const struct credential_set *credentials, byte ciphertext[16]) {
    crypto_feed_watchdog();
    cipher->setKey(credentials->key, cipher->keySize());
    cipher->encryptBlock(ciphertext, credentials->serial_num);
    /*
    char str[65];
    memcpy(str, ciphertext, 64);
    str[64] = 0;
    for(int i=0; i<64; i++){
    print_Hex(str[i]);
    } */

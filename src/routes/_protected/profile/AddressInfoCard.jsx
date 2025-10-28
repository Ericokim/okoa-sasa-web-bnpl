
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react';
import { Edit2Icon, MapPinIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useAccountStore } from '@/data/accountStore';

export const Route = createFileRoute('/_protected/profile/AddressInfoCard')({
  component: RouteComponent,
})

export function AddressInfoCard() {
  const { addresses, updateAddress } = useAccountStore();
  const [editingType, setEditingType] = useState(null);
  const [formData, setFormData] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });

  const handleEdit = (type) => {
    const address = addresses.find((addr) => addr.type === type);
    if (address) {
      setFormData({
        street: address.street,
        city: address.city,
        state: address.state,
        zip: address.zip,
        country: address.country,
      });
      setEditingType(type);
    }
  };

  const handleSave = () => {
    if (editingType) {
      updateAddress(editingType, formData);
      setEditingType(null);
    }
  };

  const handleCancel = () => {
    setEditingType(null);
  };

  const officeAddress = addresses.find((addr) => addr.type === 'office');
  const homeAddress = addresses.find((addr) => addr.type === 'home');

  return (
    <Card className="border border-border rounded-lg">
      <div className="bg-card rounded-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-sans font-semibold text-foreground">Address</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {officeAddress && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <MapPinIcon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  <h4 className="text-base font-sans font-semibold text-foreground">Office Address</h4>
                </div>
                {editingType !== 'office' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit('office')}
                    className="bg-transparent text-primary hover:bg-primary/10 hover:text-primary"
                  >
                    <Edit2Icon className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                )}
              </div>
              {editingType === 'office' ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="office-address" className="text-sm font-body font-medium text-foreground">Office Address</Label>
                    <Input
                      id="office-address"
                      value={formData.street}
                      onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                      className="bg-background border-border"
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Button
                      onClick={handleSave}
                      className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Save Changes
                    </Button>
                    <Button
                      onClick={handleCancel}
                      variant="outline"
                      className="flex-1 border-border"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-sm font-body text-foreground">
                  <p className="font-semibold">{officeAddress.street}</p>
                </div>
              )}
            </div>
          )}

          {officeAddress && homeAddress && <Separator />}

          {homeAddress && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <MapPinIcon className="w-5 h-5 text-tertiary" strokeWidth={1.5} />
                  <h4 className="text-base font-sans font-semibold text-foreground">Home Address</h4>
                </div>
                {editingType !== 'home' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit('home')}
                    className="bg-transparent text-primary hover:bg-primary/10 hover:text-primary"
                  >
                    <Edit2Icon className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                )}
              </div>
              {editingType === 'home' ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="home-address" className="text-sm font-body font-medium text-foreground">Home Address</Label>
                    <Input
                      id="home-address"
                      value={formData.street}
                      onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                      className="bg-background border-border"
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Button
                      onClick={handleSave}
                      className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Save Changes
                    </Button>
                    <Button
                      onClick={handleCancel}
                      variant="outline"
                      className="flex-1 border-border"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-sm font-body text-foreground">
                  <p className="font-semibold">{homeAddress.street}</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  );
}